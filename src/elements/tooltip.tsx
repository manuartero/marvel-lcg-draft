import c from "classnames";

type Props = {
  show: boolean;
  children: React.ReactNode;
};

export function Tooltip({ show, children }: Props) {
  return (
    <div
      className={c(
        show ? "opacity-1" : "opacity-0",
        "absolute z-10",
        "bg-gray-800 text-white text-sm py-1 px-2 rounded-md",
        "top-full left-1/2 transform -translate-x-1/2",
        "show-up-transition pointer-events-none"
      )}
    >
      {children}
    </div>
  );
}
