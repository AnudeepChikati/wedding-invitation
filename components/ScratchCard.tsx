"use client";

import { useEffect, useRef, useState } from "react";

type ScratchCardProps = {
  day: string;
  date: string;
};

export function ScratchCard({ day, date }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    const paint = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width));
      canvas.height = Math.max(1, Math.floor(height));
      context.globalCompositeOperation = "source-over";
      context.fillStyle = "#7a2337";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#f8e3b0";
      context.font = "600 20px serif";
      context.fillText("Scratch here", 20, canvas.height / 2);
    };

    paint();
    const resizeObserver = new ResizeObserver(paint);
    resizeObserver.observe(canvas);

    const scratch = (x: number, y: number) => {
      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc(x, y, 24, 0, Math.PI * 2);
      context.fill();

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      let transparentPixels = 0;
      for (let index = 3; index < imageData.data.length; index += 4) {
        if (imageData.data[index] === 0) transparentPixels += 1;
      }

      if (transparentPixels / (canvas.width * canvas.height) > 0.45) {
        setIsRevealed(true);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.buttons !== 1) return;
      const bounds = canvas.getBoundingClientRect();
      scratch(event.clientX - bounds.left, event.clientY - bounds.top);
    };

    canvas.addEventListener("pointermove", handlePointerMove);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div className="relative mt-8 overflow-hidden rounded-[1.5rem] border border-amber-200 bg-gradient-to-br from-rose-900 via-rose-800 to-amber-700 px-6 py-12 text-amber-50 shadow-lg">
      <div className="relative z-0 text-center">
        <p className="text-xs uppercase tracking-[0.38em] text-amber-200/80">{day}</p>
        <p className="mt-4 font-serif text-4xl sm:text-5xl">{date}</p>
      </div>
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 h-full w-full touch-none"
          aria-label="Scratch card to reveal wedding date"
        />
      )}
    </div>
  );
}
