"use client";

import React, { lazy } from "react";
import Navbar from "@/components/Navbar";
import { DotPattern } from "@/components/ui/dot-pattern";

import Home from "@/components/Home";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

// const Home = lazy(() => import("@/components/Home"));
// const About = lazy(() => import("@/components/About"));
// const Skills = lazy(() => import("@/components/Skills"));
// const Projects = lazy(() => import("@/components/Projects"));
// const Contact = lazy(() => import("@/components/Contact"));

export default function Page() {
	const [isNavbarDone, setIsNavbarDone] = React.useState(false);
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (typeof window === "undefined") return;

		const onNavbarStart = () => setIsNavbarDone(false);
		const onNavbarComplete = () => setIsNavbarDone(true);
		window.addEventListener("navbar-animation-start", onNavbarStart);
		window.addEventListener("navbar-animation-complete", onNavbarComplete);
		return () => {
			window.removeEventListener("navbar-animation-start", onNavbarStart);
			window.removeEventListener(
				"navbar-animation-complete",
				onNavbarComplete,
			);
		};
	}, []);

	// React.useEffect(() => {
	// 	if (!isNavbarDone || !contentRef.current) return;
	// 	gsap.fromTo(
	// 		contentRef.current,
	// 		{ y: "16vh", opacity: 0 },
	// 		{ y: "0vh", opacity: 1, duration: 0.9, ease: "power3.out" },
	// 	);
	// }, [isNavbarDone]);

	React.useEffect(() => {
		if (typeof document === "undefined") return;
		const previousHtmlOverflow = document.documentElement.style.overflow;
		const previousBodyOverflow = document.body.style.overflow;
		const overflowValue = isNavbarDone ? "" : "hidden";

		document.documentElement.style.overflow = overflowValue;
		document.body.style.overflow = overflowValue;

		return () => {
			document.documentElement.style.overflow = previousHtmlOverflow;
			document.body.style.overflow = previousBodyOverflow;
		};
	}, [isNavbarDone]);

	return (
		<div className="w-full overflow-x-hidden">
			<Navbar />
			{isNavbarDone && (
				<DotPattern
					proximity={170}
					glowIntensity={2}
					className="w-full"
				>
					<div
						className="w-full flex flex-col"
						id="content-wrapper"
						ref={contentRef}
					>
						<Home />
						<About />
						<Skills />
						<Projects />
						<Contact />
					</div>
				</DotPattern>
			)}
		</div>
	);
}
