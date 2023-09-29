type Props = {
  onCollection: () => void;
};

export function Toolbar({ onCollection }: Props) {
  return (
    <nav className="toolbar bg-gray-100 w-full p-2 flex items-end justify-between">
      <ul className="flex space-x-4 justify-end">
        <li>
          <button className="px-4 py-2 rounded-md" onClick={onCollection}>
            Collection
          </button>
        </li>
      </ul>
    </nav>
  );
}
