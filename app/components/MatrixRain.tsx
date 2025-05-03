"use client";
import React, { useEffect, useRef } from "react";

/**
 * Matrix rain animation as a React component (background canvas).
 * Inspired by manikineko-site-main/new/js/matrix.js
 */
export default function MatrixRain({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame: number;
    let running = true;
    let fontSize = 16;
    let columns = Math.floor(window.innerWidth / fontSize);
    let rainDrops: number[] = [];
    const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const alphabet = katakana + latin + nums;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      rainDrops = Array.from({ length: columns }, () => 1);
    }
    resize();
    window.addEventListener("resize", resize);

    function rainbowColor(i: number, t: number) {
      const hue = (i * 18 + t * 0.4) % 360;
      return `hsl(${hue}, 90%, 55%)`;
    }

    function draw() {
      if (!running) return;
      context.fillStyle = "rgba(33,37,41,0.07)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.font = fontSize + "px monospace";
      const now = Date.now() / 20;
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        context.fillStyle = rainbowColor(i, now);
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
      animationFrame = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
