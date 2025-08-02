'use:client';

type Props = {
  label: string;
  name: string;
  value: string | number | boolean;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Radio: React.FC<Props> = ({ label, name, value, checked, onChange }) => {
  return (
    <label className="flex gap-1">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} /> {label}
    </label>
  );
};
