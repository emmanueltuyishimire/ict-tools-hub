type PageHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-headline">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground sm:text-xl">
          {description}
        </p>
      )}
    </div>
  );
}
