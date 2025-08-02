'use client';

type Props = {
  id: string;
  state: { id: string | null; state: 'ASC' | 'DESC' | null };
  ascOnClick: () => void;
  desOnClick: () => void;
};

export const SortButton: React.FC<Props> = ({ id, state, ascOnClick, desOnClick }) => {
  const currentState = state.id === id ? state.state : null;

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`${currentState === 'ASC' ? 'is-active' : ''} cursor-pointer triangle`}
        onClick={ascOnClick}
      ></div>
      <div
        className={`${currentState === 'DESC' ? 'is-active' : ''} cursor-pointer triangle down`}
        onClick={desOnClick}
      ></div>
    </div>
  );
};