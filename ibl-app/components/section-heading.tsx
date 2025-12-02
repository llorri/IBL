type SectionHeadingProps = {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, heading, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">{eyebrow}</p>}
      <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">{heading}</h2>
      {description && <p className="mt-3 text-base text-slate-600">{description}</p>}
    </div>
  );
}
