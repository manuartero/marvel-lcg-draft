import c from "classnames";

type Props = {
  children: React.ReactNode;
};

export function Dialog({ children }: Props) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        className={c(
          "bg-white rounded-lg p-6 w-full max-w-screen-md",
          "overflow-y-auto no-scrollbar"
        )}
        style={{
          width: "90%",
          maxHeight: "70%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
