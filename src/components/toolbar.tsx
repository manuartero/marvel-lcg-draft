import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./toolbar.css";
import { Tooltip } from "elements/tooltip";
import { useState } from "react";

type Props = {
  onCollection: () => void;
};

export function Toolbar({ onCollection }: Props) {
  const [collectionTooltip, setCollectionTooltip] = useState(false);

  return (
    <nav
      id="Toolbar"
      className="bg-gray-100 w-full p-2 flex items-end justify-end"
    >
      <button
        className="px-8 py-4 rounded-md text-xl"
        aria-label="Collection"
        onClick={onCollection}
        onMouseEnter={() => setCollectionTooltip(true)}
        onMouseLeave={() => setCollectionTooltip(false)}
      >
        <div className="relative">
          <FontAwesomeIcon color="white" icon={faList} />
          <Tooltip show={collectionTooltip}>Collection</Tooltip>
        </div>
      </button>
    </nav>
  );
}
