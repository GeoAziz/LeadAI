type PageTitleProps = {
  title: string;
  subtitle?: string;
};

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div>
      <h1 className="font-headline text-3xl md:text-4xl font-bold text-glow">{title}</h1>
      {subtitle && <p className="mt-2 text-lg text-foreground/70">{subtitle}</p>}
    </div>
  );
}
