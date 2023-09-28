type Props = {
  onClick: () => void;
};

export function ReadyButton({ onClick }: Props) {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold"
      onClick={onClick}
    >
      READY!
    </button>
  );
}
