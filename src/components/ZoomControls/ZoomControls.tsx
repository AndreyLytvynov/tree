import { FC, useState } from "react";

import PositionControls from "../PositionControlsBtn/PositionControlsBtn";

import styles from "../../styles/ZoomControls.module.css";

type ZoomControlsProps = {
  children: React.ReactNode;
};

const ZoomControls: FC<ZoomControlsProps> = ({ children }) => {
  const [scale, setScale] = useState(1);
  const [positionX, setPositionX] = useState(1);
  const [positionY, setPositionY] = useState(100);

  const handleChangePosition = (direction: string) => {
    switch (direction.toLowerCase()) {
      case "left":
        setPositionX(positionX + 30);
        break;
      case "right":
        setPositionX(positionX - 30);
        break;
      case "up":
        setPositionY(positionY + 30);
        break;
      case "down":
        setPositionY(positionY - 30);
        break;
      case "+":
        setScale(scale + 0.1);
        break;
      case "-":
        setScale(scale - 0.1);
        break;
      default:
        setScale(1);
        setPositionY(100);
        setPositionX(1);
    }
  };

  const zoomStyles = {
    transform: `scale(${scale}) translate(${positionX}px, ${positionY}px)`,
    transformOrigin: "center center",
  };

  return (
    <section>
      <div className={styles.zoomContainer}>
        <PositionControls
          onPositionChange={handleChangePosition}
          className={styles.leftBtn}
          text='Left'
        />
        <PositionControls
          onPositionChange={handleChangePosition}
          text='Right'
          className={styles.rightBtn}
        />
        <PositionControls
          onPositionChange={handleChangePosition}
          text='Up'
          className={styles.upBtn}
        />
        <PositionControls
          onPositionChange={handleChangePosition}
          text='Down'
          className={styles.downBtn}
        />
        <div className={styles.zoomControlsContainer}>
          <PositionControls
            onPositionChange={handleChangePosition}
            text='+'
            className={styles.zoomInBtn}
          />

          <PositionControls
            onPositionChange={handleChangePosition}
            text={`${Math.round(scale * 100)}%`}
            className={styles.zoomOutBtn}
          />
          <PositionControls
            onPositionChange={handleChangePosition}
            text='-'
            className={styles.zoomOutBtn}
          />
        </div>
        <div style={zoomStyles} className={styles.test}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default ZoomControls;
