import React from "react";

const cardClass =
	"relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] " +
	"shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl";

// Optional: subtle noise/texture overlay + top sheen
const cardTextureOverlay =
	"pointer-events-none absolute inset-0 opacity-[0.10] " +
	"[background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] " +
	"[background-size:14px_14px]";

const cardTopSheen =
	"pointer-events-none absolute inset-0 " +
	"bg-gradient-to-b from-white/[0.08] via-transparent to-transparent opacity-60";

export function FrostCard({ children }: { children: React.ReactNode }) {
	return (
		<div className={cardClass}>
			<div className={cardTopSheen} />
			<div className={cardTextureOverlay} />
			<div className="relative p-6">{children}</div>
		</div>
	);
}
