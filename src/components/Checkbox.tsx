'use:client';

type Props = {
  label: string;
  value: string | boolean;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox: React.FC<Props> = ({ label, value, checked, onChange }) => {
  return (
    <label className="flex gap-1">
      <input type="checkbox" value={value} checked={checked} onChange={onChange} /> {label}
    </label>
  );
};
