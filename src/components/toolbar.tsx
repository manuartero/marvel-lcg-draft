import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onCollection: () => void;
};

export function Toolbar({ onCollection }: Props) {
  return (
    <nav className="bg-gray-100 w-full p-2 flex items-end justify-end">
      <button className="px-8 py-4 rounded-md text-xl" onClick={onCollection}>
        <div>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </button>
    </nav>
  );
}
