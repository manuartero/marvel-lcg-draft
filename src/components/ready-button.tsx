type Props = {
  onClick: () => void;
};

export function ReadyButton({ onClick }: Props) {
  return (
    <button
      className="bg-gray-100 text-white px-4 py-2 rounded-md font-semibold"
      onClick={onClick}
    >
      READY!
    </button>
  );
}
