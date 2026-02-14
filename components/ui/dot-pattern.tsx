"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

export interface DotPatternProps {
	className?: string;
	children?: React.ReactNode;
	/** Dot diameter in pixels */
	dotSize?: number;
	/** Gap between dots in pixels */
	gap?: number;
	/** Base dot color (hex) */
	baseColor?: string;
	/** Glow color on hover (hex) */
	glowColor?: string;
	/** Mouse proximity radius for highlighting */
	proximity?: number;
	/** Glow intensity multiplier */
	glowIntensity?: number;
	/** Wave animation speed (0 to disable) */
	waveSpeed?: number;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: Number.parseInt(result[1], 16),
				g: Number.parseInt(result[2], 16),
				b: Number.parseInt(result[3], 16),
			}
		: { r: 0, g: 0, b: 0 };
}

interface Dot {
	x: number;
	y: number;
	baseOpacity: number;
}

export function DotPattern({
	className,
	children,
	dotSize = 2,
	gap = 24,
	baseColor = "#404040",
	glowColor = "#22d3ee",
	proximity = 120,
	glowIntensity = 1,
	waveSpeed = 0.5,
}: DotPatternProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const dotsRef = useRef<Dot[]>([]);
	const mouseRef = useRef({ x: -1000, y: -1000 });
	const animationRef = useRef<number>(0);
	const startTimeRef = useRef<number>(0);

	const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
	const glowRgb = useMemo(() => hexToRgb(glowColor), [glowColor]);

	useEffect(() => {
		startTimeRef.current = Date.now();
	}, []);

	const buildGrid = useCallback(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const rect = container.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;
		const dpr = window.devicePixelRatio || 1;

		canvas.width = Math.floor(width * dpr);
		canvas.height = Math.floor(height * dpr);
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

		const dots: Dot[] = [];
		const offset = gap / 2;

		for (let y = offset; y <= height; y += gap) {
			for (let x = offset; x <= width; x += gap) {
				dots.push({
					x,
					y,
					baseOpacity: 0.18 + Math.random() * 0.18,
				});
			}
		}

		dotsRef.current = dots;
	}, [gap]);

	const draw = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const dpr = window.devicePixelRatio || 1;
		ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

		const { x: mx, y: my } = mouseRef.current;
		const proxSq = proximity * proximity;
		const time = (Date.now() - startTimeRef.current) * 0.001 * waveSpeed;

		for (const dot of dotsRef.current) {
			const dx = dot.x - mx;
			const dy = dot.y - my;
			const distSq = dx * dx + dy * dy;

			// Wave animation
			const wave =
				Math.sin(dot.x * 0.02 + dot.y * 0.02 + time) * 0.5 + 0.5;
			const waveOpacity = dot.baseOpacity + wave * 0.15;
			const waveScale = 1 + wave * 0.2;

			let opacity = waveOpacity;
			let scale = waveScale;
			let r = baseRgb.r;
			let g = baseRgb.g;
			let b = baseRgb.b;
			let glow = 0;

			// Mouse proximity effect
			if (distSq < proxSq) {
				const dist = Math.sqrt(distSq);
				const t = 1 - dist / proximity;
				const easedT = t * t * (3 - 2 * t); // smoothstep

				// Interpolate color
				r = Math.round(baseRgb.r + (glowRgb.r - baseRgb.r) * easedT);
				g = Math.round(baseRgb.g + (glowRgb.g - baseRgb.g) * easedT);
				b = Math.round(baseRgb.b + (glowRgb.b - baseRgb.b) * easedT);

				opacity = Math.min(1, waveOpacity + easedT * 0.7);
				scale = waveScale + easedT * 0.8;
				glow = easedT * glowIntensity;
			}

			const radius = (dotSize / 2) * scale;

			// Draw glow
			if (glow > 0) {
				const gradient = ctx.createRadialGradient(
					dot.x,
					dot.y,
					0,
					dot.x,
					dot.y,
					radius * 4,
				);
				gradient.addColorStop(
					0,
					`rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glow * 0.4})`,
				);
				gradient.addColorStop(
					0.5,
					`rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glow * 0.1})`,
				);
				gradient.addColorStop(
					1,
					`rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, 0)`,
				);
				ctx.beginPath();
				ctx.arc(dot.x, dot.y, radius * 4, 0, Math.PI * 2);
				ctx.fillStyle = gradient;
				ctx.fill();
			}

			// Draw dot
			ctx.beginPath();
			ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
			ctx.fill();
		}
	}, [proximity, baseRgb, glowRgb, dotSize, glowIntensity, waveSpeed]);

	useEffect(() => {
		buildGrid();

		const container = containerRef.current;
		if (!container) return;

		const ro = new ResizeObserver(buildGrid);
		ro.observe(container);

		return () => ro.disconnect();
	}, [buildGrid]);

	useEffect(() => {
		const tick = () => {
			draw();
			animationRef.current = requestAnimationFrame(tick);
		};
		animationRef.current = requestAnimationFrame(tick);
		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [draw]);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			mouseRef.current = {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			};
		};

		const handleMouseLeave = () => {
			mouseRef.current = { x: -1000, y: -1000 };
		};

		const container = containerRef.current;
		if (container) {
			container.addEventListener("mousemove", handleMouseMove);
			container.addEventListener("mouseleave", handleMouseLeave);
		}

		return () => {
			if (container) {
				container.removeEventListener("mousemove", handleMouseMove);
				container.removeEventListener("mouseleave", handleMouseLeave);
			}
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className={cn(
				"relative w-full overflow-hidden bg-neutral-950",
				className,
			)}
		>
			<canvas
				ref={canvasRef}
				className="absolute inset-0 h-full w-full"
			/>

			{/* Vignette overlay */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						"radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(10,10,10,0.6) 100%)",
				}}
			/>

			{/* Content layer */}
			{children && (
				<div className="relative z-10 w-full">{children}</div>
			)}
		</div>
	);
}

export default function DotPatternDemo() {
	return <DotPattern />;
}
