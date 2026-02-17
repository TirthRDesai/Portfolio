"use client";

import React from "react";

type Bubble = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	r: number;
	name: string;
	wanderX: number;
	wanderY: number;
	wanderTimerMs: number;
	maxSpeed: number;
	drag: number;
	pullSpeedMultiplier: number;
};

type Point = { x: number; y: number };

function randomRange(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

function BigBubble({
	children,
	className,
	onContainerReady,
	pinnedTargets,
}: {
	children?: React.ReactNode;
	className?: string;
	onContainerReady?: (element: HTMLDivElement | null) => void;
	pinnedTargets?: Record<string, Point>;
}) {
	const items = React.Children.toArray(children);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const bubbleRefs = React.useRef<Array<HTMLDivElement | null>>([]);
	const bubblesRef = React.useRef<Bubble[]>([]);
	const mouseRef = React.useRef({ x: 0, y: 0, tx: 0, ty: 0, active: false });
	const pinnedTargetsRef = React.useRef<Map<string, Point>>(new Map());

	React.useEffect(() => {
		const next = new Map<string, Point>();
		Object.entries(pinnedTargets || {}).forEach(([name, point]) => {
			next.set(name.trim().toLowerCase(), point);
		});
		pinnedTargetsRef.current = next;
	}, [pinnedTargets]);

	React.useEffect(() => {
		const container = containerRef.current;
		if (!container || items.length === 0) return;

		const bubbleGap = 14;
		const idleJitter = 0.01;
		const wanderForce = 0.02;
		const wanderBlend = 0.08;
		const defaultMaxSpeed = 0.78;
		const defaultDrag = 0.992;
		const pinnedSpeedMultiplier = 20;
		const mouseRadius = 34;
		const mouseImpulseBase = 0.32;
		const mouseImpulseScale = 0.038;
		const mouseCorrectionFactor = 0.5;
		const bubbleCorrectionFactor = 0.42;
		const maxCorrectionPerFrame = 1.5;
		const velocityDampingOnContact = 0.22;
		const mouseLerp = 0.12;

		let rafId = 0;
		let lastTime = 0;
		let width = container.clientWidth;
		let height = container.clientHeight;
		const center = () => ({ x: width / 2, y: height / 2 });
		const ellipseRadii = () => ({ rx: width / 2, ry: height / 2 });

		const measureBubbleRadius = (index: number) => {
			const el = bubbleRefs.current[index];
			if (!el) return 28;
			return Math.min(el.offsetWidth, el.offsetHeight) / 2;
		};

		const readBubbleName = (index: number) => {
			const wrapper = bubbleRefs.current[index];
			if (!wrapper) return `item-${index}`;
			const named = wrapper.querySelector<HTMLElement>("[data-bubble-name]");
			return named?.dataset.bubbleName || `item-${index}`;
		};

		const collidesWithAny = (
			x: number,
			y: number,
			r: number,
			upto: number,
		) => {
			for (let i = 0; i < upto; i += 1) {
				const b = bubblesRef.current[i];
				const dx = x - b.x;
				const dy = y - b.y;
				const minDist = r + b.r + bubbleGap;
				if (dx * dx + dy * dy < minDist * minDist) return true;
			}
			return false;
		};

		const initialize = () => {
			width = container.clientWidth;
			height = container.clientHeight;
			bubblesRef.current = [];
			const c = center();

			for (let i = 0; i < items.length; i += 1) {
				const r = measureBubbleRadius(i);
				const { rx, ry } = ellipseRadii();
				const allowedRx = Math.max(rx - r - 6, 10);
				const allowedRy = Math.max(ry - r - 6, 10);
				let x = c.x;
				let y = c.y;
				let placed = false;

				for (let attempt = 0; attempt < 240; attempt += 1) {
					const angle = randomRange(0, Math.PI * 2);
					const t = Math.sqrt(Math.random());
					const px = c.x + Math.cos(angle) * allowedRx * t;
					const py = c.y + Math.sin(angle) * allowedRy * t;
					if (!collidesWithAny(px, py, r, i)) {
						x = px;
						y = py;
						placed = true;
						break;
					}
				}

				if (!placed) {
					const angle = randomRange(0, Math.PI * 2);
					x = c.x + Math.cos(angle) * allowedRx * 0.45;
					y = c.y + Math.sin(angle) * allowedRy * 0.45;
				}

				bubblesRef.current.push({
					x,
					y,
					vx: randomRange(-0.2, 0.2),
					vy: randomRange(-0.2, 0.2),
					r,
					name: readBubbleName(i),
					wanderX: randomRange(-1, 1),
					wanderY: randomRange(-1, 1),
					wanderTimerMs: randomRange(400, 1400),
					maxSpeed: defaultMaxSpeed + randomRange(-0.06, 0.06),
					drag: defaultDrag + randomRange(-0.003, 0.002),
					pullSpeedMultiplier: pinnedSpeedMultiplier,
				});
			}
		};

		const render = () => {
			for (let i = 0; i < bubblesRef.current.length; i += 1) {
				const el = bubbleRefs.current[i];
				const b = bubblesRef.current[i];
				if (!el || !b) continue;
				el.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0)`;
			}
		};

		const tick = (time: number) => {
			if (!lastTime) lastTime = time;
			const dtMs = Math.min(32, Math.max(8, time - lastTime));
			lastTime = time;
			const dt = dtMs / 16.67;

			const c = center();
			mouseRef.current.x +=
				(mouseRef.current.tx - mouseRef.current.x) * mouseLerp;
			mouseRef.current.y +=
				(mouseRef.current.ty - mouseRef.current.y) * mouseLerp;

			for (let i = 0; i < bubblesRef.current.length; i += 1) {
				const b = bubblesRef.current[i];
				const bubbleKey = b.name.trim().toLowerCase();
				const pinnedTarget = pinnedTargetsRef.current.get(bubbleKey);
				if (pinnedTarget) {
					// Smooth easing (Lerp) to target to avoid "snap" effect
					const strength = 0.12;
					b.x += (pinnedTarget.x - b.x) * strength * dt;
					b.y += (pinnedTarget.y - b.y) * strength * dt;
					b.vx = 0;
					b.vy = 0;
					continue;
				}

				b.wanderTimerMs -= dtMs;
				if (b.wanderTimerMs <= 0) {
					let nx = randomRange(-1, 1);
					let ny = randomRange(-1, 1);
					const nLen = Math.hypot(nx, ny) || 1;
					nx /= nLen;
					ny /= nLen;
					b.wanderX = nx;
					b.wanderY = ny;
					b.wanderTimerMs = randomRange(500, 1800);
				}

				b.vx +=
					(randomRange(-idleJitter, idleJitter) +
						b.wanderX * wanderForce) *
					dt;
				b.vy +=
					(randomRange(-idleJitter, idleJitter) +
						b.wanderY * wanderForce) *
					dt;
				b.wanderX += randomRange(-wanderBlend, wanderBlend) * dt;
				b.wanderY += randomRange(-wanderBlend, wanderBlend) * dt;
				const wLen = Math.hypot(b.wanderX, b.wanderY) || 1;
				b.wanderX /= wLen;
				b.wanderY /= wLen;

				b.vx *= b.drag;
				b.vy *= b.drag;

				const speed = Math.hypot(b.vx, b.vy);
				if (speed > b.maxSpeed) {
					b.vx = (b.vx / speed) * b.maxSpeed;
					b.vy = (b.vy / speed) * b.maxSpeed;
				}

				if (mouseRef.current.active && !pinnedTarget) {
					const dx = b.x - mouseRef.current.x;
					const dy = b.y - mouseRef.current.y;
					const dist = Math.hypot(dx, dy) || 0.0001;
					const hitDist = b.r + mouseRadius;
					if (dist < hitDist) {
						const nx = dx / dist;
						const ny = dy / dist;
						const overlap = hitDist - dist;
						const correction = Math.min(
							maxCorrectionPerFrame,
							overlap * mouseCorrectionFactor,
						);
						const impulse =
							mouseImpulseBase + overlap * mouseImpulseScale;

						b.x += nx * correction;
						b.y += ny * correction;
						b.vx += nx * impulse;
						b.vy += ny * impulse;
					}
				}

				b.x += b.vx * dt;
				b.y += b.vy * dt;
			}

			for (let i = 0; i < bubblesRef.current.length; i += 1) {
				for (let j = i + 1; j < bubblesRef.current.length; j += 1) {
					const a = bubblesRef.current[i];
					const b = bubblesRef.current[j];
					const aPinned = pinnedTargetsRef.current.has(a.name.trim().toLowerCase());
					const bPinned = pinnedTargetsRef.current.has(b.name.trim().toLowerCase());
					if (aPinned || bPinned) continue;
					const dx = b.x - a.x;
					const dy = b.y - a.y;
					const dist = Math.hypot(dx, dy) || 0.0001;
					const minDist = a.r + b.r + bubbleGap * 0.5;

					if (dist < minDist) {
						const nx = dx / dist;
						const ny = dy / dist;
						const overlap = minDist - dist;
						const correction = Math.min(
							maxCorrectionPerFrame,
							overlap * bubbleCorrectionFactor,
						);

						a.x -= nx * correction * 0.5;
						a.y -= ny * correction * 0.5;
						b.x += nx * correction * 0.5;
						b.y += ny * correction * 0.5;

						const rvx = b.vx - a.vx;
						const rvy = b.vy - a.vy;
						const velAlongNormal = rvx * nx + rvy * ny;
						if (velAlongNormal < 0) {
							const impulse =
								-velAlongNormal * velocityDampingOnContact;
							a.vx -= impulse * nx;
							a.vy -= impulse * ny;
							b.vx += impulse * nx;
							b.vy += impulse * ny;
						}
					}
				}
			}

			for (let i = 0; i < bubblesRef.current.length; i += 1) {
				const b = bubblesRef.current[i];
				const dx = b.x - c.x;
				const dy = b.y - c.y;
				const { rx, ry } = ellipseRadii();
				const allowedRx = Math.max(rx - b.r - 3, 1);
				const allowedRy = Math.max(ry - b.r - 3, 1);
				const bubbleKey = b.name.trim().toLowerCase();
				const isPinned = pinnedTargetsRef.current.has(bubbleKey);
				if (isPinned) continue;

				const ellipseFactor =
					(dx * dx) / (allowedRx * allowedRx) +
					(dy * dy) / (allowedRy * allowedRy);
				if (ellipseFactor > 1) {
					const scale = 1 / Math.sqrt(ellipseFactor);
					b.x = c.x + dx * scale;
					b.y = c.y + dy * scale;

					const ndx = b.x - c.x;
					const ndy = b.y - c.y;
					let nx = ndx / (allowedRx * allowedRx);
					let ny = ndy / (allowedRy * allowedRy);
					const nLen = Math.hypot(nx, ny) || 1;
					nx /= nLen;
					ny /= nLen;
					const dot = b.vx * nx + b.vy * ny;
					if (dot > 0) {
						b.vx -= 1.7 * dot * nx;
						b.vy -= 1.7 * dot * ny;
					}
				}
			}

			render();
			rafId = window.requestAnimationFrame(tick);
		};

		const onMove = (e: MouseEvent) => {
			const rect = container.getBoundingClientRect();
			mouseRef.current.tx = e.clientX - rect.left;
			mouseRef.current.ty = e.clientY - rect.top;
			if (!mouseRef.current.active) {
				mouseRef.current.x = mouseRef.current.tx;
				mouseRef.current.y = mouseRef.current.ty;
			}
			mouseRef.current.active = true;
		};

		const onLeave = () => {
			mouseRef.current.active = false;
		};

		const onResize = () => {
			initialize();
			render();
		};

		const resizeObserver = new ResizeObserver(onResize);
		resizeObserver.observe(container);

		container.addEventListener("mousemove", onMove);
		container.addEventListener("mouseleave", onLeave);

		initialize();
		render();
		rafId = window.requestAnimationFrame(tick);

		return () => {
			container.removeEventListener("mousemove", onMove);
			container.removeEventListener("mouseleave", onLeave);
			resizeObserver.disconnect();
			if (rafId) window.cancelAnimationFrame(rafId);
		};
	}, [items.length]);

	return (
		<div
			className={`relative w-100 h-100 rounded-[50%] bg-black/10 overflow-visible ${className || ""}`}
			ref={(el) => {
				containerRef.current = el;
				onContainerReady?.(el);
			}}
		>
			{items.map((child, index) => (
				<div
					className="absolute left-0 top-0 will-change-transform"
					key={index}
					ref={(el) => {
						bubbleRefs.current[index] = el;
					}}
				>
					{child}
				</div>
			))}
		</div>
	);
}

export default BigBubble;
