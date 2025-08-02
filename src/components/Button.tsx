'use:client';
type Props = {
  content: string;
  color: 'primary' | 'gray-200';
  disabled?: boolean;
  onClick?: (e) => void;
};

export const Button: React.FC<Props> = ({ content, color, disabled, onClick }) => {
  const otherClassNames = [
    color === 'primary' ? 'bg-primary border-primary text-white hover:bg-primary-dark' : '',
    color === 'gray-200' ? 'bg-gray-200 border-gray-200' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
  ];
  return (
    <button
      className={`w-full py-1 px-2  rounded-sm border  ${otherClassNames.join(' ')}`}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};
