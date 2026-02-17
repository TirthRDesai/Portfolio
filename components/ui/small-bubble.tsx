
import React from "react";

function getBubbleSizeClasses(label: string) {
	const text = label.trim();
	const words = text.split(/\s+/).filter(Boolean).length;
	const len = text.length;

	if (len >= 16 || words >= 3) {
		return "w-[142px] h-[142px] text-[1rem]";
	}
	if (len >= 11 || words === 2) {
		return "w-[124px] h-[124px] text-[0.95rem]";
	}
	return "w-[104px] h-[104px] text-[0.92rem]";
}

function SmallBubble({
	children,
	name,
	className,
	icon,
	progress,
	isSelected,
    onClick,
}: {
	children?: React.ReactNode;
	name?: string;
	className?: string;
	icon?: React.ReactNode;
	progress?: number;
	isSelected?: boolean;
    onClick?: () => void;
}) {
	const sizeClass = getBubbleSizeClasses(name || "");
	// Extract width from class (approximate for SVG sizing)
	const size = sizeClass.includes("w-[142px]")
		? 142
		: sizeClass.includes("w-[124px]")
			? 124
			: 104;
	const strokeWidth = 3;
	const radius = size / 2 - strokeWidth;
	const circumference = 2 * Math.PI * radius;
	const offset = isSelected
		? circumference - (progress || 0) * circumference
		: circumference;

	return (
		<div
			className={`${sizeClass} relative rounded-full bg-black/82 border border-white/10 flex items-center justify-center text-center leading-tight text-white/90 shadow-[0_0_24px_rgba(56,189,248,0.06)] overflow-hidden ${className || ""}`}
			data-bubble-name={name}
            onClick={onClick}
		>
			{/* Progress Ring */}
			<div className="absolute inset-0 pointer-events-none">
				<svg
					className="w-full h-full -rotate-90 transform"
					viewBox={`0 0 ${size} ${size}`}
				>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill="none"
						stroke="rgba(255, 255, 255, 0.1)"
						strokeWidth={strokeWidth}
					/>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill="none"
						stroke="#38bdf8" // Sky-400 color
						strokeWidth={strokeWidth}
						strokeDasharray={circumference}
						strokeDashoffset={offset}
						strokeLinecap="round"
						className={`transition-all duration-1000 ${
							(progress || 0) >= 1
								? "ease-out"
								: "ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
						} ${isSelected ? "delay-500" : "delay-0"}`}
						style={{
							opacity: isSelected ? 1 : 0,
						}}
					/>
				</svg>
			</div>

			{/* Icon and Text Container */}
			<div
				className={`relative flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
					isSelected ? "translate-y-1 delay-500" : "translate-y-0 delay-0"
				}`}
			>
				{/* Icon */}
				<div
					className={`mb-1 text-3xl transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
						isSelected
							? "opacity-100 translate-y-0 scale-100 delay-500"
							: "opacity-0 -translate-y-8 scale-50 absolute delay-0"
					}`}
				>
					{icon}
				</div>

				{/* Text */}
				<span
					className={`transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] px-3 ${
						isSelected
							? "text-sm translate-y-0 delay-500"
							: "text-base translate-y-0 delay-0"
					}`}
				>
					{children}
				</span>
			</div>
		</div>
	);
}

export default SmallBubble;
