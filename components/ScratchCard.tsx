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

        const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, "#c8c3bc");
        gradient.addColorStop(0.5, "#b8b2ab");
        gradient.addColorStop(1, "#d0cbc5");
        context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

        // Accent line
        context.strokeStyle = "rgba(139, 115, 85, 0.4)";
        context.lineWidth = 1;
        context.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        // Hint text
        context.fillStyle = "rgba(80, 65, 50, 0.7)";
        context.font = "500 13px sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("Scratch to reveal the date", canvas.width / 2, canvas.height / 2);
    };

    paint();
    const resizeObserver = new ResizeObserver(paint);
    resizeObserver.observe(canvas);

    const scratch = (x: number, y: number) => {
      context.globalCompositeOperation = "destination-out";
      context.beginPath();
        context.arc(x, y, 28, 0, Math.PI * 2);
      context.fill();

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      let transparentPixels = 0;
      for (let index = 3; index < imageData.data.length; index += 4) {
        if (imageData.data[index] === 0) transparentPixels += 1;
      }

        if (transparentPixels / (canvas.width * canvas.height) > 0.35) {
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
      <div className="scratch-container">
      <div className="relative z-0 text-center">
              <p className="text-xs uppercase tracking-[0.5em] text-[var(--gold)] opacity-70">
                  {day}
              </p>
              <p className="mt-3 font-[var(--font-display)] text-3xl sm:text-4xl text-[var(--text-primary)] font-light tracking-wide">
                  {date}
              </p>
      </div>
      {!isRevealed && (
        <canvas
          ref={canvasRef}
                  className="absolute inset-0 z-10 h-full w-full touch-none cursor-crosshair"
          aria-label="Scratch card to reveal wedding date"
        />
      )}
    </div>
  );
}
