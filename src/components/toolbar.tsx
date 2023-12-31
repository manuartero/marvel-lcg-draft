import { faList, faDiceOne } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "elements/tooltip";
import { useBool } from "hooks/use-bool";

type Props = {
  onDeckSettings: () => void;
  onCollection: () => void;
};

export function Toolbar({ onDeckSettings, onCollection }: Props) {
  const [deckSizeTooltip, toggleDeckSizeTooltip] = useBool();
  const [collectionTooltip, toggleCollectionTooltip] = useBool();

  return (
    <nav
      id="Toolbar"
      className="bg-[var(--light-grey)] w-full flex items-end justify-end px-4"
    >
      <button
        className="px-8 py-4 rounded-md text-xl"
        aria-label="Deck Settings"
        onClick={onDeckSettings}
        onMouseEnter={toggleDeckSizeTooltip}
        onMouseLeave={toggleDeckSizeTooltip}
      >
        <div className="relative">
          <FontAwesomeIcon color="white" icon={faDiceOne} />
          <Tooltip show={deckSizeTooltip}>Deck Size</Tooltip>
        </div>
      </button>
      <button
        className="px-8 py-4 rounded-md text-xl"
        aria-label="Collection"
        onClick={onCollection}
        onMouseEnter={toggleCollectionTooltip}
        onMouseLeave={toggleCollectionTooltip}
      >
        <div className="relative">
          <FontAwesomeIcon color="white" icon={faList} />
          <Tooltip show={collectionTooltip}>Collection</Tooltip>
        </div>
      </button>
    </nav>
  );
}
