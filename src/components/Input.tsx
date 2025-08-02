'use:client';

type Props = {
  id: string;
  value: string | number;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  min?: number;
  max?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({ id, type, value, min, max, onChange }) => {
  return (
    <input
      className="py-1 px-2 border  border-gray-300 rounded-sm outline-0"
      id={id}
      type={type ? type : 'text'}
      value={value}
      min={min}
      max={max}
      onChange={onChange}
    />
  );
};
