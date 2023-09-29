type Props = {
  onClick: () => void;
};

export function ReadyButton({ onClick }: Props) {
  return (
    <button
      className="bg-sky-950 text-white px-10 py-4 hover:bg-sky-700 rounded-md font-semibold"
      onClick={onClick}
    >
      READY!
    </button>
  );
}
