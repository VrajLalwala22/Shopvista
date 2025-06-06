import React from 'react';

interface PriceRangeSliderProps {
  value: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
  min: number;
  max: number;
  step?: number;
  className?: string;
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  className = ''
}) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), value.max);
    onChange({ ...value, min: newMin });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), value.min);
    onChange({ ...value, max: newMax });
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value.min}
        onChange={handleMinChange}
        className="w-full"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value.max}
        onChange={handleMaxChange}
        className="w-full"
      />
    </div>
  );
}; 