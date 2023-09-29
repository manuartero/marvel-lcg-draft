import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./../assets/toolbar.css";

type Props = {
  onCollection: () => void;
};

export function Toolbar({ onCollection }: Props) {
  return (
    <nav
      id="Toolbar"
      className="bg-gray-100 w-full p-2 flex items-end justify-end"
    >
      <button className="px-8 py-4 rounded-md text-xl" onClick={onCollection}>
        <div>
          <FontAwesomeIcon color="white" icon={faBars} />
        </div>
      </button>
    </nav>
  );
}
