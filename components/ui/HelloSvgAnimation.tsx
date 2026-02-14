"use client";

import React from "react";

declare global {
	interface Window {
		__navbarAnimationDone?: boolean;
	}
}

type HelloSvgAnimationProps = {
	className?: string;
	width?: number | string;
	height?: number | string;
	onLoaded?: () => void;
};

export default function HelloSvgAnimation({
	className,
	width = "100%",
	height = "100%",
	onLoaded,
}: HelloSvgAnimationProps) {
	const [isReady, setIsReady] = React.useState(false);

	React.useEffect(() => {
		if (typeof window === "undefined") return;
		if (window.__navbarAnimationDone) {
			setIsReady(true);
			return;
		}

		const handleReady = () => setIsReady(true);
		window.addEventListener("navbar-animation-complete", handleReady);
		return () => {
			window.removeEventListener(
				"navbar-animation-complete",
				handleReady,
			);
		};
	}, []);

	if (!isReady) return null;

	return (
		<object
			data="/HelloAnimated.svg"
			type="image/svg+xml"
			width={width}
			height={height}
			className={className}
			aria-label="Hello animated svg"
			role="img"
			onLoad={onLoaded}
		>
			Hello animation
		</object>
	);
}
