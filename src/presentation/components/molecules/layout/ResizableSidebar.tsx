import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  DELTA_SENSITIVITY,
  SIDEBAR_MAX_WIDTH,
  SIDEBAR_MIN_WIDTH,
  SIDEBAR_WIDTH,
} from "../../../../shared/constants";

type ResizableSidebarProps = {
  initialWidth: number;
  className?: string;
  children: React.ReactNode;
  side?: "left" | "right";
};
type ResizableSidebarComponent = React.FC<ResizableSidebarProps>;

const ResizableSidebar: ResizableSidebarComponent = ({
  initialWidth = SIDEBAR_WIDTH,
  className,
  children,
  side = "left",
}) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(initialWidth);

  const startResizing = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    setStartX(e.clientX);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        const deltaX = (mouseMoveEvent.clientX - startX) * DELTA_SENSITIVITY;

        setSidebarWidth((prevWidth) =>
          side === "left"
            ? Math.max(
                SIDEBAR_MIN_WIDTH,
                Math.min(SIDEBAR_MAX_WIDTH, prevWidth + deltaX)
              )
            : Math.max(
                SIDEBAR_MIN_WIDTH,
                Math.min(SIDEBAR_MAX_WIDTH, prevWidth - deltaX)
              )
        );
      }
    },
    [isResizing, startX, side]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div
      ref={sidebarRef}
      className={`flex ${className}`}
      style={{ width: sidebarWidth }}
      onMouseDown={startResizing}
    >
      {side === "right" ? (
        <div className="resize-handle w-1 h-full cursor-ew-resize bg-gray-500 opacity-0 hover:opacity-100 resize-x" />
      ) : null}
      {children}
      {side === "left" ? (
        <div className="resize-handle w-1 h-full cursor-ew-resize bg-gray-500 opacity-0 hover:opacity-100 resize-x" />
      ) : null}
    </div>
  );
};

export default ResizableSidebar;
