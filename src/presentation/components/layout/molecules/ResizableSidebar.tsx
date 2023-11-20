import React, { useCallback, useEffect, useRef, useState } from "react";
import { DELTA_SENSITIVITY, SIDEBAR_WIDTH } from "../../../../shared/constants";

type ResizableSidebarProps = {
  initialWidth: number;
  minWidth?: number;
  maxWidth?: number;
  className?: string;
  children: React.ReactNode;
  side?: "left" | "right";
};
type ResizableSidebarComponent = React.FC<ResizableSidebarProps>;

const ResizeHandle: React.FC<
  React.PropsWithChildren<{
    onMouseDown: (e: React.MouseEvent) => void;
    side: "left" | "right";
  }>
> = ({ onMouseDown, side, children }) => (
  <>
    {side === "left" && children}
    <div
      className={`w-1 h-full bg-gray-500 opacity-0 hover:opacity-50 flex-grow-0 flex-shrink-0 flex-basis-3 cursor-ew-resize resize-handle
      ${side === "left" ? "flex-start" : "flex-end"}`}
      onMouseDown={onMouseDown}
    />
    {side === "right" && children}
  </>
);

const ResizableSidebar: ResizableSidebarComponent = ({
  initialWidth = SIDEBAR_WIDTH,
  minWidth = 0,
  maxWidth = Infinity,
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
            ? Math.max(minWidth, Math.min(maxWidth, prevWidth + deltaX))
            : Math.max(minWidth, Math.min(maxWidth, prevWidth - deltaX))
        );
      }
    },
    [isResizing, side, startX, minWidth, maxWidth]
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
    >
      <ResizeHandle onMouseDown={startResizing} side={side}>
        {children}
      </ResizeHandle>
    </div>
  );
};

export default ResizableSidebar;
