"use client";

import { useEffect, useRef, useState } from "react";

type MusicPlayerProps = {
  src: string;
};

export function MusicPlayer({ src }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const savedPreference = window.localStorage.getItem("wedding-music-enabled") === "true";
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    if (savedPreference && !isMobile && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      window.localStorage.setItem("wedding-music-enabled", "false");
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      window.localStorage.setItem("wedding-music-enabled", "true");
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="metadata" playsInline className="hidden" aria-hidden>
        <source src={src} type="audio/wav" />
      </audio>
      <button
        type="button"
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 z-50 rounded-full border border-amber-300 bg-white/95 px-4 py-3 text-xs uppercase tracking-[0.24em] text-rose-900 shadow-md"
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
      >
        {isPlaying ? "Pause Music" : "Play Music"}
      </button>
    </>
  );
}
