"use client";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function Navbar() {
	const ref = React.useRef<HTMLDivElement>(null);
	const textFillRef = React.useRef<HTMLSpanElement>(null);
	const hrRef = React.useRef<HTMLHRElement>(null);
	const hrWrapperRef = React.useRef<HTMLDivElement>(null);
	const textDivRef = React.useRef<HTMLDivElement>(null);
	const textRef = React.useRef<HTMLSpanElement>(null);
	const initialContentRef = React.useRef<HTMLDivElement>(null);
	const menuItemsRef = React.useRef<HTMLDivElement>(null);
	const menuVisibleRef = React.useRef(false);
	const introDoneRef = React.useRef(false);
	const SHOW_MENU_SCROLL_Y = 280;
	const HIDE_MENU_SCROLL_Y = 180;

	const showMenu = React.useCallback(() => {
		if (
			!menuItemsRef.current ||
			!textDivRef.current ||
			menuVisibleRef.current
		)
			return;
		menuVisibleRef.current = true;
		const menuNodes =
			menuItemsRef.current.querySelectorAll<HTMLElement>(".menu-item");
		const slideX = -Math.min(window.innerWidth * 0.28, 420);
		gsap.to(textDivRef.current, {
			x: slideX,
			duration: 0.72,
			ease: "power3.out",
			force3D: true,
			overwrite: "auto",
		});
		gsap.set(menuItemsRef.current, {
			autoAlpha: 1,
			pointerEvents: "auto",
		});
		gsap.fromTo(
			menuNodes,
			{
				autoAlpha: 0,
				y: (index: number) => (index % 2 === 0 ? -24 : 24),
			},
			{
				autoAlpha: 1,
				y: 0,
				duration: 0.55,
				ease: "power2.out",
				stagger: 0.12,
				overwrite: "auto",
			},
		);
	}, []);

	const hideMenu = React.useCallback(() => {
		if (
			!menuItemsRef.current ||
			!textDivRef.current ||
			!menuVisibleRef.current
		)
			return;
		menuVisibleRef.current = false;
		const menuNodes =
			menuItemsRef.current.querySelectorAll<HTMLElement>(".menu-item");
		gsap.to(textDivRef.current, {
			x: 0,
			duration: 0.72,
			ease: "power3.out",
			force3D: true,
			overwrite: "auto",
		});
		gsap.to(menuNodes, {
			autoAlpha: 0,
			y: (index: number) => (index % 2 === 0 ? -16 : 16),
			duration: 0.25,
			stagger: 0.05,
			ease: "power2.in",
			overwrite: "auto",
			onComplete: () => {
				if (!menuItemsRef.current) return;
				gsap.set(menuItemsRef.current, {
					autoAlpha: 0,
					pointerEvents: "none",
				});
			},
		});
	}, []);

	React.useEffect(() => {
		const onScroll = () => {
			if (!introDoneRef.current) return;
			const y = window.scrollY;
			if (!menuVisibleRef.current && y >= SHOW_MENU_SCROLL_Y) {
				showMenu();
			} else if (menuVisibleRef.current && y <= HIDE_MENU_SCROLL_Y) {
				hideMenu();
			}
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [hideMenu, showMenu]);

	useGSAP(
		() => {
			if (
				!ref.current ||
				!textFillRef.current ||
				!hrRef.current ||
				!hrWrapperRef.current ||
				!textDivRef.current ||
				!textRef.current ||
				!initialContentRef.current ||
				!menuItemsRef.current
			)
				return;
			if (typeof window !== "undefined") {
				window.__navbarAnimationDone = false;
				window.dispatchEvent(new CustomEvent("navbar-animation-start"));
			}
			const tl = gsap.timeline();
			const menuNodes =
				menuItemsRef.current.querySelectorAll<HTMLElement>(
					".menu-item",
				);
			gsap.set(menuItemsRef.current, {
				autoAlpha: 0,
				pointerEvents: "none",
			});
			gsap.set(menuNodes, { autoAlpha: 0 });
			gsap.set(textDivRef.current, { x: 0, willChange: "transform" });

			tl.fromTo(
				textFillRef.current,
				{ width: "0%" },
				{ width: "35%", duration: 1.5, ease: "power2.inOut" },
				0,
			).fromTo(
				hrRef.current,
				{ width: "0%" },
				{ width: "35%", duration: 1.5, ease: "power2.inOut" },
				0,
			);

			tl.to(textFillRef.current, {
				width: "33%",
				duration: 0.5,
				ease: "power2.inOut",
			}).to(
				hrRef.current,
				{
					width: "33%",
					duration: 0.5,
					ease: "power2.inOut",
				},
				"<",
			);

			tl.to(textFillRef.current, {
				width: "70%",
				duration: 1.5,
				ease: "power2.inOut",
			}).to(
				hrRef.current,
				{
					width: "70%",
					duration: 1.5,
					ease: "power2.inOut",
				},
				"<",
			);

			tl.to(textFillRef.current, {
				width: "67%",
				duration: 0.5,
				ease: "power2.inOut",
			}).to(
				hrRef.current,
				{
					width: "67%",
					duration: 0.5,
					ease: "power2.inOut",
				},
				"<",
			);

			tl.to(textFillRef.current, {
				width: "100%",
				duration: 1,
				ease: "power2.inOut",
			}).to(
				hrRef.current,
				{
					width: "100%",
					duration: 1,
					ease: "power2.inOut",
				},
				"<",
			);

			tl.add("collapseStart");

			tl.fromTo(
				ref.current,
				{ height: "100vh" },
				{
					height: "10vh",
					duration: 1.5,
					ease: "power2.inOut",
				},
				"collapseStart",
			);

			tl.fromTo(
				ref.current,
				{ borderBottomColor: "transparent" },
				{
					borderBottomColor: "#ffffff",
					duration: 0.2,
					ease: "power2.inOut",
				},
				"collapseStart",
			);

			tl.to(
				[textRef.current, textFillRef.current],
				{
					fontSize: "5vh",
					duration: 1.5,
					ease: "power2.inOut",
				},
				"collapseStart",
			);

			tl.to(
				hrWrapperRef.current,
				{
					autoAlpha: 0,
					height: 0,
					marginTop: 0,
					duration: 0.2,
					ease: "power2.inOut",
				},
				"collapseStart",
			);

			tl.add(() => {
				introDoneRef.current = true;
				menuVisibleRef.current = false;
				if (typeof window !== "undefined") {
					window.__navbarAnimationDone = true;
					window.dispatchEvent(
						new CustomEvent("navbar-animation-complete"),
					);
				}
			});
		},
		{ scope: ref },
	);
	const menuItems = [
		{ name: "Home", href: "#" },
		{ name: "About", href: "#" },
		{ name: "Skills", href: "#" },
		{ name: "Projects", href: "#" },
		{ name: "Contact", href: "#" },
	];

	return (
		<div
			className="initial-box fixed top-0 left-0 w-full h-screen overflow-hidden bg-[#0a0a0a] flex border-b-2 border-transparent z-50"
			ref={ref}
		>
			<div
				className="initial-content flex flex-col justify-center items-center w-full"
				ref={initialContentRef}
			>
				<span
					className="initial-name-wrapper jaini-regular "
					ref={textDivRef}
				>
					<span
						className="initial-name-text select-none"
						ref={textRef}
					>
						TIRTH DESAI
					</span>
					<span
						className="initial-name-fill select-none"
						ref={textFillRef}
					>
						TIRTH DESAI
					</span>
				</span>
				<div
					className="hr-wrapper w-1/4 flex"
					ref={hrWrapperRef}
				>
					<hr
						className="border-t-3 border-white mt-4 underline-hr "
						ref={hrRef}
					/>
				</div>
			</div>
			<div
				className="menu-items absolute top-1/2 right-6 -translate-y-1/2 flex flex-row items-center justify-center gap-8 opacity-0 pointer-events-none menu-items-wrapper"
				ref={menuItemsRef}
			>
				{menuItems.map((item) => (
					<a
						key={item.name}
						href={item.href}
						className="menu-item  text-white hover:text-gray-500 transition-colors duration-300 jaini-regular text-3xl"
					>
						{item.name}
					</a>
				))}
			</div>
		</div>
	);
}

export default Navbar;
