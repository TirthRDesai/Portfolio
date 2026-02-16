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
}: {
	children?: React.ReactNode;
	name?: string;
	className?: string;
}) {
	return (
		<div
			className={`${getBubbleSizeClasses(name || "")} rounded-full bg-black/82 border border-white/10 flex items-center justify-center text-center px-3 leading-tight text-white/90 shadow-[0_0_24px_rgba(56,189,248,0.06)] ${className || ""}`}
			data-bubble-name={name}
		>
			{children}
		</div>
	);
}

export default SmallBubble;
