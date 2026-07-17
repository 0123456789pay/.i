interface SectionHeaderProps {
  title: string;
  category?: string;
}

export default function SectionHeader({ title, category }: SectionHeaderProps) {
  return (
    <div className="mb-8 pb-4 border-b-2 border-primary inline-block">
      <h2 className="font-heading text-3xl font-bold text-slate-900">
        {title}
      </h2>
      {category && (
        <p className="text-sm text-slate-500 mt-1">{category}</p>
      )}
    </div>
  );
}
