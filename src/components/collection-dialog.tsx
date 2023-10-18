import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { groupPackagesByWaves } from "app-domain";
import { useCollectionContext } from "contexts/collection-context";
import { Dialog } from "elements/dialog";

import type { CardPackage } from "services/cards";

type Props = {
  onClose: () => void;
};

const PACKAGES_GROUPED_BY_WAVE = groupPackagesByWaves();

export function CollectionDialog({ onClose }: Props) {
  const { packages, togglePackage } = useCollectionContext();

  return (
    <Dialog>
      <div className="flex justify-between items-center pr-8">
        <h2 className="text-2xl font-semibold">Collection</h2>
        <button onClick={onClose}>
          <FontAwesomeIcon color="green" icon={faCheck} size="xl" />
        </button>
      </div>
      <div>
        {Object.keys(PACKAGES_GROUPED_BY_WAVE).map((key) => {
          const bigBox = key as CardPackage;
          return (
            <div key={`wave-${bigBox}`} className="pl-8 pr-8">
              <hr className="my-4" />
              <div className="mb-2">
                <input
                  type="checkbox"
                  id={`checkbox-${bigBox}`}
                  checked={packages[bigBox]}
                  onChange={() => togglePackage(bigBox)}
                />
                <label
                  className="text-lg font-semibold text-gray-800 m-2"
                  htmlFor={`checkbox-${bigBox}`}
                >
                  {bigBox}
                </label>
              </div>

              <div className="grid grid-cols-3 gap-1">
                {PACKAGES_GROUPED_BY_WAVE[bigBox].map((pkg) => (
                  <div key={`package-${pkg}`}>
                    <input
                      type="checkbox"
                      id={`checkbox-${pkg}`}
                      checked={packages[pkg]}
                      onChange={() => togglePackage(pkg)}
                    />
                    <label className="m-2" htmlFor={`checkbox-${pkg}`}>
                      {pkg}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Dialog>
  );
}
