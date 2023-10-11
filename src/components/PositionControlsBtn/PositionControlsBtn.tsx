import { FC } from "react";

import styles from "../../styles/ZoomControls.module.css";

type PositionControlsProps = {
  onPositionChange: (direction: string) => void;
  text: string;
  className?: string;
};

const PositionControls: FC<PositionControlsProps> = ({
  onPositionChange,
  text,
  className,
}) => {
  return (
    <button
      type='button'
      className={`${styles.controlBtn} ${className}`}
      onClick={() => onPositionChange(text)}
    >
      {text}
    </button>
  );
};

export default PositionControls;
