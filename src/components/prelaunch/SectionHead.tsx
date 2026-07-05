export default function SectionHead({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="sec-head">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}
