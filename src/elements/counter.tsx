import { useState } from "react";

type Props = {
  onChange: (value: number) => void;
  maxValue?: number;
};

export function Counter({ onChange, maxValue = 3 }: Props) {
  const [value, setValue] = useState(1);

  const increment = () => {
    if (value == maxValue) {
      return;
    }
    const v = value + 1;
    setValue(v);
    onChange(v);
  };

  const decrement = () => {
    if (value == 1) {
      return;
    }
    const v = value - 1;
    setValue(v);
    onChange(v);
  };

  return (
    <div className="flex items-center justify-center px-8">
      <div className="w-1/4 text-center">
        <div className="bg-white p-1">
          <button
            className="px-4 py-2 rounded-sm bg-green-100 text-black text-3xl"
            disabled={value == 1}
            onClick={decrement}
          >
            «
          </button>
        </div>
      </div>

      <div className="w-2/4 text-center">
        <div className="bg-white p-1">
          <div className="px-4 py-2 bg-gray-100 rounded-lg text-black text-3xl">
            <span>{value}</span>
          </div>
        </div>
      </div>

      <div className="w-1/4 text-center">
        <div className="bg-white p-1">
          <button
            className="px-4 py-2 rounded-sm bg-green-100 text-black text-3xl"
            disabled={value == maxValue}
            onClick={increment}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
