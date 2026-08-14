"use server";

import { createOrder, type OrderResult } from "@/lib/api/client";
import { resolvePlanSummary } from "@/lib/data/summary";
import { getPlan } from "@/lib/data/plans";
import { sql, ensureSchema, hasDatabase } from "@/lib/auth/db";
import { readSession } from "@/lib/auth/session";
import { sendMail, invoiceEmail } from "@/lib/auth/mailer";
import { generateInvoicePdf } from "@/lib/auth/invoice";

export async function placeOrder(planId: string, email: string): Promise<OrderResult> {
  if (!email || !planId) throw new Error("Missing order details");

  const result = await createOrder(planId, email);
  await persistOrder(planId, email, result);
  await sendInvoice(planId, email, result);
  return result;
}

/**
 * Emails the buyer a purchase confirmation with a branded PDF invoice attached.
 * Best-effort: a mail/PDF failure must not break delivery of an issued eSIM.
 */
async function sendInvoice(planId: string, email: string, order: OrderResult): Promise<void> {
  try {
    const summary = resolvePlanSummary(planId);
    if (!summary) return;
    const priceCents = Math.round(summary.price * 100);
    const issuedAt = new Date();

    let firstName: string | undefined;
    if (hasDatabase()) {
      const session = await readSession();
      if (session) {
        const rows = await sql()`SELECT first_name FROM users WHERE id = ${session.userId} LIMIT 1`;
        firstName = rows[0]?.first_name ?? undefined;
      }
    }

    const pdf = await generateInvoicePdf({
      orderRef: order.orderId,
      email,
      title: summary.title,
      dataLabel: summary.data,
      days: summary.days,
      priceCents,
      issuedAt,
    });

    await sendMail({
      to: email,
      ...invoiceEmail({ firstName, orderRef: order.orderId, title: summary.title, dataLabel: summary.data, days: summary.days, priceCents }),
      attachments: [{ filename: `invoice-${order.orderId}.pdf`, content: pdf }],
    });
  } catch (err) {
    console.error("[checkout] sendInvoice failed:", err);
  }
}

/**
 * Records the issued eSIM (and a purchase transaction for signed-in buyers) so
 * it shows up in the account wallet. Best-effort: a persistence failure must
 * not break delivery of an already-issued eSIM.
 */
async function persistOrder(planId: string, email: string, order: OrderResult): Promise<void> {
  if (!hasDatabase()) return;
  try {
    const summary = resolvePlanSummary(planId);
    if (!summary) return;
    const countrySlug = getPlan(planId)?.countrySlug ?? null;
    const priceCents = Math.round(summary.price * 100);

    const session = await readSession();
    const userId = session?.userId ?? null;

    await ensureSchema();
    await sql()`
      INSERT INTO esims (user_id, order_ref, email, plan_id, country_slug, title, flag, data_label, days, price_cents, activation_code, smdp_address)
      VALUES (${userId}, ${order.orderId}, ${email}, ${planId}, ${countrySlug}, ${summary.title}, ${summary.flag}, ${summary.data}, ${summary.days}, ${priceCents}, ${order.activationCode}, ${order.smdpAddress})
      ON CONFLICT (order_ref) DO NOTHING
    `;

    if (userId) {
      await sql()`
        INSERT INTO transactions (user_id, kind, description, amount_cents)
        VALUES (${userId}, 'purchase', ${`${summary.title} · ${summary.data}`}, ${-priceCents})
      `;
    }
  } catch (err) {
    console.error("[checkout] persistOrder failed:", err);
  }
}
