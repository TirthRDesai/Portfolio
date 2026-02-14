"use client";
import React from "react";
import HelloSvgAnimation from "./ui/HelloSvgAnimation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShineBorder } from "./ui/shine-border";

gsap.registerPlugin(useGSAP);
let hasHomeIntroPlayed = false;

function Home() {
	const ref = React.useRef<HTMLDivElement>(null);
	const svgRef = React.useRef<HTMLDivElement>(null);
	const textRef = React.useRef<HTMLHeadingElement>(null);
	const imageRef = React.useRef<HTMLDivElement>(null);
	const imageClipRef = React.useRef<HTMLDivElement>(null);
	const casualOverlayRef = React.useRef<HTMLDivElement>(null);
	const professionalOverlayRef = React.useRef<HTMLDivElement>(null);
	const ringOverlayRef = React.useRef<HTMLDivElement>(null);
	const menuRef = React.useRef<HTMLDivElement>(null);
	const [isSvgLoaded, setIsSvgLoaded] = React.useState(false);
	const [isCasualLoaded, setIsCasualLoaded] = React.useState(false);
	const isCasualLoadedRef = React.useRef(false);
	const isCasualLoadingRef = React.useRef(false);

	React.useEffect(() => {
		isCasualLoadedRef.current = isCasualLoaded;
	}, [isCasualLoaded]);

	React.useEffect(() => {
		if (
			!imageClipRef.current ||
			!casualOverlayRef.current ||
			!professionalOverlayRef.current ||
			!ringOverlayRef.current
		)
			return;

		const container = imageClipRef.current;
		const casual = casualOverlayRef.current;
		const professional = professionalOverlayRef.current;
		const ring = ringOverlayRef.current;
		const revealRadius = 210;

		let rafId = 0;
		let mouseX = 0;
		let mouseY = 0;
		let isActive = false;

		const applyClip = () => {
			rafId = 0;
			if (isActive && isCasualLoadedRef.current) {
				casual.style.opacity = "1";
				casual.style.clipPath = `circle(${revealRadius}px at ${mouseX}px ${mouseY}px)`;
				const mask = `radial-gradient(circle ${revealRadius}px at ${mouseX}px ${mouseY}px, transparent 99%, black 100%)`;
				professional.style.maskImage = mask;
				professional.style.webkitMaskImage = mask;
			} else {
				casual.style.opacity = "0";
				casual.style.clipPath = "circle(0px at 50% 50%)";
				professional.style.maskImage = "none";
				professional.style.webkitMaskImage = "none";
			}
			ring.style.opacity = isActive ? "1" : "0";
			ring.style.left = `${mouseX}px`;
			ring.style.top = `${mouseY}px`;
			ring.style.width = `${revealRadius * 2}px`;
			ring.style.height = `${revealRadius * 2}px`;
		};

		const preloadCasual = () => {
			if (isCasualLoadedRef.current || isCasualLoadingRef.current) return;
			isCasualLoadingRef.current = true;
			const img = new Image();
			img.src = "/casual-no-bg.png";
			img.onload = () => {
				isCasualLoadingRef.current = false;
				setIsCasualLoaded(true);
			};
			img.onerror = () => {
				isCasualLoadingRef.current = false;
			};
		};

		const requestUpdate = () => {
			if (!rafId) rafId = window.requestAnimationFrame(applyClip);
		};

		const handleMouseEnter = (e: MouseEvent) => {
			preloadCasual();
			const rect = container.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
			isActive = true;
			requestUpdate();
		};

		const handleMouseMove = (e: MouseEvent) => {
			const rect = container.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
			isActive = true;
			requestUpdate();
		};

		const handleMouseLeave = () => {
			isActive = false;
			requestUpdate();
		};

		casual.style.opacity = "0";
		casual.style.clipPath = "circle(0px at 50% 50%)";
		professional.style.maskImage = "none";
		professional.style.webkitMaskImage = "none";
		ring.style.opacity = "0";
		container.addEventListener("mouseenter", handleMouseEnter);
		container.addEventListener("mousemove", handleMouseMove);
		container.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			container.removeEventListener("mouseenter", handleMouseEnter);
			container.removeEventListener("mousemove", handleMouseMove);
			container.removeEventListener("mouseleave", handleMouseLeave);
			if (rafId) window.cancelAnimationFrame(rafId);
		};
	}, []);

	useGSAP(
		() => {
			if (
				!isSvgLoaded ||
				!ref.current ||
				!svgRef.current ||
				!textRef.current ||
				!imageRef.current ||
				!menuRef.current
			)
				return;

			const menuItems =
				menuRef.current.querySelectorAll<HTMLElement>(".menu-item");

			if (hasHomeIntroPlayed) {
				gsap.set([textRef.current, imageRef.current, menuItems], {
					opacity: 1,
					x: 0,
					y: 0,
					scale: 1,
				});
				return;
			}

			hasHomeIntroPlayed = true;
			const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

			tl.set([textRef.current, imageRef.current, menuItems], {
				opacity: 0,
			});
			tl.fromTo(
				textRef.current,
				{ y: 24 },
				{ opacity: 1, y: 0, duration: 0.55 },
			)

				.fromTo(
					menuItems,
					{
						y: (index: number) => (index % 2 === 0 ? -18 : 18),
					},
					{
						opacity: 1,
						y: 0,
						duration: 0.45,
						stagger: 0.1,
					},
				)
				.fromTo(
					imageRef.current,
					{ scale: 1.1, opacity: 0 },
					{ scale: 1, opacity: 1, duration: 0.8 },
				);
		},
		{ scope: ref, dependencies: [isSvgLoaded] },
	);

	const menuItems = [
		{ name: "About", href: "#about" },
		{ name: "Skills", href: "#skills" },
		{ name: "Projects", href: "#projects" },
		{ name: "Contact", href: "#contact" },
	];
	return (
		<div
			className="h-screen pt-20  w-full text-white flex items-center justify-evenly px-10"
			ref={ref}
		>
			<div className="flex flex-col gap-6 items-center justify-center w-full h-full">
				<div
					className="w-full h-80"
					ref={svgRef}
				>
					<HelloSvgAnimation
						className="mb-4 block h-full w-full"
						width="100%"
						height="100%"
						onLoaded={() => setIsSvgLoaded((prev) => prev || true)}
					/>
				</div>
				<h1
					className="text-5xl font-bold w-full text-center opacity-0"
					ref={textRef}
				>
					{"I'm"} <span className="text-blue-400">Tirth Desai</span>
				</h1>
			</div>
			<div
				className="relative w-full h-full hidden lg:block opacity-0 overflow-visible"
				ref={imageRef}
			>
				<div className="absolute inset-0 rounded-md overflow-hidden" ref={imageClipRef}>
					<div
						className="absolute inset-0 bg-[url('/professional-image-no-bg.png')] bg-cover bg-center"
						ref={professionalOverlayRef}
					/>
					<div
						className="absolute inset-0 bg-cover bg-center pointer-events-none"
						style={{
							backgroundImage: isCasualLoaded
								? "url('/casual-no-bg.png')"
								: "none",
						}}
						ref={casualOverlayRef}
					/>
				</div>
				<div
					className="absolute pointer-events-none rounded-full border-2 border-[#ff7f11]/85 transition-opacity duration-150"
					style={{ transform: "translate(-50%, -50%)" }}
					ref={ringOverlayRef}
				/>
			</div>
			<div
				className=" text-2xl  w-full h-full lg:flex"
				id="home-menu"
			>
				<div
					className="w-full px-20 flex flex-col gap-6 items-center justify-center"
					ref={menuRef}
				>
					{menuItems.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className="menu-item relative block w-full overflow-hidden rounded-md bg-transparent py-12 text-center text-4xl text-[#fafeff] transition-colors duration-300 nunito opacity-0"
						>
							<ShineBorder
								borderWidth={1.5}
								duration={10}
								shineColor={["#ffffff", "#60a5fa", "#ffffff"]}
							/>
							<span className="relative z-10">{item.name}</span>
						</a>
					))}
				</div>
			</div>
		</div>
	);
}

export default Home;
