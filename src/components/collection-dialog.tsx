import { useCollectionContext } from "../contexts/collection-context";
import { groupPackagesByWaves } from "../utils/collection-waves";
import c from "classnames";

import type { CardPackage } from "../services/cards";

type DialogProps = {
  children: React.ReactNode;
};

function Dialog({ children }: DialogProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        className={c(
          "bg-white rounded-lg p-6 w-full max-w-screen-md overflow-y-auto",
          "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        )}
        style={{
          width: "90%",
          maxHeight: "80%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

type CollectionDialogProps = {
  onClose: () => void;
};

const PACKAGES_GROUPED_BY_WAVE = groupPackagesByWaves();

export function CollectionDialog({ onClose }: CollectionDialogProps) {
  const { packages, togglePackage } = useCollectionContext();

  return (
    <Dialog>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Collection</h2>
        <button onClick={onClose}>X</button>
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
