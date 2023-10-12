import { FC, useCallback, useEffect, useState } from "react";

import styles from "../../styles/main.module.css";

interface DraggableProps {
  children: React.ReactNode;
}

const Draggable: FC<DraggableProps> = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [divX, setDivX] = useState(0);
  const [divY, setDivY] = useState(0);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);

    const rect = e.currentTarget.getBoundingClientRect();

    setInitialX(e.clientX - rect.left);
    setInitialY(e.clientY - rect.top);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setDivX(e.clientX - initialX - 20);
        setDivY(e.clientY - initialY - 60);
      }
    },
    [isDragging, initialX, initialY]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    setDivX(screenWidth / 2 - 90);
    setDivY(screenHeight / 5);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, handleMouseMove]);

  return (
    <div
      className={styles.draggable}
      style={{
        position: "absolute",
        top: divY,
        left: divX,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default Draggable;
