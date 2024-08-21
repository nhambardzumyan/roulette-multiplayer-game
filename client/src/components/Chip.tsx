import React from 'react';
import classNames from 'classnames';
import { ChipValues } from '../types';

interface ChipProps {
  currentItemChips: { sum: number } | undefined;
  currentItem: { type: string; value: number };
  leftMin?: number;
  leftMax?: number;
  topMin?: number;
  topMax?: number;
}

const Chip: React.FC<ChipProps> = ({
  currentItemChips,
  currentItem,
  leftMin = -10,
  leftMax = 10,
  topMin = -30,
  topMax = 0,
}) => {
  const randomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const getChipClasses = (chip: ChipValues) => {
    const chipClass = (() => {
      switch (chip) {
        case ChipValues.HighRoller:
          return 'chip-100-placed';
        case ChipValues.Premium:
          return 'chip-20-placed';
        case ChipValues.Classic:
          return 'chip-10-placed';
        case ChipValues.LowRoller:
          return 'chip-5-placed';
        default:
          return '';
      }
    })();

    return classNames(chipClass, 'chipValueImage');
  };

  if (!currentItemChips) {
    return <></>;
  }

  let total = 0;
  const chipData = currentItemChips;
  const chipsImgs = [];

  const chipValues = [
    ChipValues.HighRoller,
    ChipValues.Premium,
    ChipValues.Classic,
    ChipValues.LowRoller,
  ];

  while (total < chipData.sum) {
    const totalSum = chipData.sum - total;
    const currentChip =
      chipValues.find((chip) => totalSum >= chip) || ChipValues.LowRoller;
    const currentChipPlaced = Math.floor(totalSum / currentChip);
    const calc = currentChip * currentChipPlaced;

    total += calc;

    for (let i = 0; i < currentChipPlaced; i++) {
      const key = `${currentItem.type}_${currentItem.value}_${currentChip}_${i}`;
      const style = {
        top: `${randomNumber(topMin, topMax)}px`,
        left: `${randomNumber(leftMin, leftMax)}px`,
      };

      chipsImgs.push(
        <div key={key} style={style} className={getChipClasses(currentChip)} />
      );
    }
  }

  return <div className="chipValue">{chipsImgs}</div>;
};

export default Chip;
