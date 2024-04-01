import { InputNumber } from "antd";
import React, { forwardRef, useState } from "react";

interface NumberRangFieldProps {
  value?: number;
  minFrom?: number;
  maxFrom?: number;
  minTo?: number;
  maxTo?: number;
}

export const NumberRangField = forwardRef(
  (
    { minFrom = 0, minTo = 0, maxTo, maxFrom }: NumberRangFieldProps,
    ref: any
  ) => {
    const [minValue, setMinValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const handleMinChange = (value: number | any) => {
      setMinValue(value);
    };

    const handleMaxChange = (value: number | any) => {
      if (value < minValue) {
        setError("Max value must be greater than min value");
      } else {
        setError("");
        setMaxValue(value);
      }
    };
    return (
      <div className="w-full">
        <div className="flex items-center w-full">
          <InputNumber
            min={minFrom}
            max={maxFrom}
            className={`w-full`}
            value={minValue}
            onChange={handleMinChange}
          />
          <div className="px-2">-</div>
          <InputNumber
            min={minTo}
            max={maxTo}
            className={`w-full`}
            value={maxValue}
            onChange={handleMaxChange}
          />
        </div>
        <div>{error}</div>
      </div>
    );
  }
);
