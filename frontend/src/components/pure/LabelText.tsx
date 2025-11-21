interface LabelTextProps {
  readonly label: string;
  readonly text: string;
}

export function LabelText({ label, text }: LabelTextProps) {
  return (
    <div className="flex gap-4 w-full justify-between">
      <p className="font-bold">{label}:</p>
      <p>{text}</p>
    </div>
  );
}
