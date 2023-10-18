import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeckSettingsContext } from "contexts/deck-settings-context";
import { Dialog } from "elements/dialog";

type Props = {
  onClose: () => void;
};

export function DeckSizeDialog({ onClose }: Props) {
  const { deckSize, setDeckSize } = useDeckSettingsContext();

  return (
    <Dialog>
      <div className="flex justify-between items-center pr-8">
        <h2 className="text-2xl font-semibold">Deck Settings</h2>
        <button onClick={onClose}>
          <FontAwesomeIcon color="green" icon={faCheck} size="xl" />
        </button>
      </div>
      <div className="flex justify-center items-center">
        <div className="mb-2">
          <label
            className="text-lg font-semibold text-gray-800 m-2"
            htmlFor="deck-size"
          >
            Deck Size
          </label>
          <input
            id="deck-size"
            className="text-center"
            type="number"
            value={deckSize}
            aria-label="Deck Size"
            min={40}
            max={50}
            onChange={(e) => setDeckSize(parseInt(e.target.value, 10))}
          />
        </div>
      </div>
    </Dialog>
  );
}
