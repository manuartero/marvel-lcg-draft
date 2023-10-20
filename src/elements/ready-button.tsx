import c from "classnames";

import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function ReadyButton({ onClick, ...rest }: Props) {
  return (
    <button
      className={c(
        "px-10 py-4",
        "text-white font-semibold",
        "bg-gray-700  hover:bg-gray-500 rounded-md",
        rest.disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={onClick}
      {...rest}
    >
      READY!
    </button>
  );
}
