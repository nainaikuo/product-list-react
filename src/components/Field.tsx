type Props = {
  id?: string;
  label: string;
  error?: string;
  children?: React.ReactNode;
};

export const Field: React.FC<Props> = ({ id, label, error, children }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm" htmlFor={id}>
        {label}
      </label>
      {children}
      <span className="text-red-500 text-xs font-bold">{error}</span>
    </div>
  );
};
