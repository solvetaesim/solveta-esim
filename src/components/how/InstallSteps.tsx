import { Tabs } from "@/components/ui/Tabs";

const ios = [
  "Open Settings → Mobile Service → Add eSIM.",
  "Tap “Use QR Code” and scan the code from your confirmation.",
  "Label the plan (e.g. “Solveta Japan”) and continue.",
  "Turn on Data Roaming for the Solveta line — this uses the local network, not your home carrier.",
  "Set Solveta as your Mobile Data line and you're online.",
];

const android = [
  "Open Settings → Network & internet → SIMs.",
  "Tap “Add eSIM” / “Download a SIM instead”.",
  "Scan the QR code from your confirmation email.",
  "Enable the Solveta eSIM and turn on Roaming for that SIM.",
  "Select Solveta for mobile data and you're connected.",
];

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-3">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-coral-tint font-mono text-sm font-semibold text-coral-strong">
            {i + 1}
          </span>
          <span className="pt-0.5 text-pretty text-ink">{s}</span>
        </li>
      ))}
    </ol>
  );
}

export function InstallSteps() {
  return (
    <Tabs
      tabs={[
        { id: "ios", label: "iPhone (iOS)", content: <StepList steps={ios} /> },
        { id: "android", label: "Android", content: <StepList steps={android} /> },
      ]}
    />
  );
}
