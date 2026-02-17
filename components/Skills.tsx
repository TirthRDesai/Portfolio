"use client";

import React from "react";
import BigBubble from "./ui/big-bubble";
import SmallBubble from "./ui/small-bubble";
import SkillDetails from "./ui/skill-details"; // Import the new component
import { TECHNOLOGIES, SOFT_SKILLS, type Skill } from "@/data/skills";


type Point = { x: number; y: number };
type BubbleTarget = { center: Point; radius: number };
type LineState = {
	start: Point;
	end: Point;
	name: string;
	seq: number;
	kind: "left" | "center" | "right";
	lane: number;
	referenceY: number;
	attachMode: "classic" | "facing";
};
type MatchedTarget = {
	name: string;
	center: Point;
	radius: number;
};

function getLineKey(line: LineState) {
	return `${line.kind}-${line.name}-${line.seq}`;
}

function normalize(value: string) {
	return value.trim().toLowerCase();
}

function getAttachPoint(
	target: MatchedTarget,
	kind: "left" | "center" | "right",
	mode: "classic" | "facing",
): Point {
	if (kind === "left") {
		return mode === "facing"
			? { x: target.center.x + target.radius, y: target.center.y }
			: { x: target.center.x - target.radius, y: target.center.y };
	}
	if (kind === "right") {
		return mode === "facing"
			? { x: target.center.x - target.radius, y: target.center.y }
			: { x: target.center.x + target.radius, y: target.center.y };
	}
	return { x: target.center.x, y: target.center.y - target.radius };
}

function buildConnectorPath(line: LineState) {
	const dx = line.end.x - line.start.x;
	const dy = line.end.y - line.start.y;
	const laneOffset = line.lane * 22;
	const lift = Math.max(30, Math.min(90, Math.abs(dy) * 0.24));

	// For pulled results (<=3), keep strict anchor geometry so paths do not cross.
	if (line.attachMode === "classic") {
		if (line.kind === "left") {
			const c1 = {
				x: line.start.x - 44 + laneOffset * 0.35,
				y: line.start.y + lift,
			};
			const c2 = {
				x: line.end.x - 36 + laneOffset * 0.2,
				y: line.end.y - Math.max(24, Math.abs(dy) * 0.18),
			};
			return `M ${line.start.x} ${line.start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${line.end.x} ${line.end.y}`;
		}

		if (line.kind === "right") {
			const c1 = {
				x: line.start.x + 44 + laneOffset * 0.35,
				y: line.start.y + lift,
			};
			const c2 = {
				x: line.end.x + 36 + laneOffset * 0.2,
				y: line.end.y - Math.max(24, Math.abs(dy) * 0.18),
			};
			return `M ${line.start.x} ${line.start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${line.end.x} ${line.end.y}`;
		}

		const c1 = {
			x: line.start.x + laneOffset * 0.2,
			y: line.start.y + Math.max(40, Math.abs(dy) * 0.3),
		};
		const c2 = {
			x: line.end.x + laneOffset * 0.15,
			y: line.end.y - Math.max(28, Math.abs(dy) * 0.2),
		};
		return `M ${line.start.x} ${line.start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${line.end.x} ${line.end.y}`;
	}

	const kindOffset =
		line.kind === "left" ? -12 : line.kind === "right" ? 12 : 0;
	const inwardDir =
		line.kind === "left" ? 1 : line.kind === "right" ? -1 : 0;
	// Smoothly transitions around search-bar midline:
	// above => inward bend, below => outward bend.
	const yDelta = line.end.y - line.referenceY;
	const bendPhase = Math.tanh(yDelta / 90);
	const physicsBend = -bendPhase * inwardDir * 46;
	const c1 = {
		x: line.start.x + dx * 0.3 + laneOffset + kindOffset + physicsBend,
		y: line.start.y + lift,
	};
	const c2 = {
		x:
			line.start.x +
			dx * 0.74 +
			laneOffset * 0.5 +
			kindOffset +
			physicsBend * 0.55,
		y: line.end.y - Math.max(28, Math.abs(dy) * 0.2),
	};
	return `M ${line.start.x} ${line.start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${line.end.x} ${line.end.y}`;
}



function Skills() {
	const rootRef = React.useRef<HTMLDivElement>(null);
	const inputRef = React.useRef<HTMLInputElement>(null);
	const leftBubbleRef = React.useRef<HTMLDivElement>(null);
	const rightBubbleRef = React.useRef<HTMLDivElement>(null);
	const resultsRef = React.useRef<HTMLDivElement>(null);
	const pathRefs = React.useRef<Record<string, SVGPathElement | null>>({});

	const [query, setQuery] = React.useState("");
	const [pausedQuery, setPausedQuery] = React.useState("");
	const [lines, setLines] = React.useState<LineState[]>([]);
	const [lineSeq, setLineSeq] = React.useState(0);
	const [leftPinnedTargets, setLeftPinnedTargets] = React.useState<
		Record<string, Point>
	>({});
	const [rightPinnedTargets, setRightPinnedTargets] = React.useState<
		Record<string, Point>
	>({});
    
    // State to track the currently selected skill for the details box
    const [selectedSkill, setSelectedSkill] = React.useState<Skill | null>(null);
    


	React.useEffect(() => {
		const timer = window.setTimeout(() => {
			setPausedQuery(query);
		}, 420);
		return () => window.clearTimeout(timer);
	}, [query]);

	const normalizedQuery = normalize(pausedQuery);
	// First pass: find all partial matches
	const rawLeft = React.useMemo(() => {
		if (!normalizedQuery) return [];
		return TECHNOLOGIES.filter((item) =>
			normalize(item.name).includes(normalizedQuery),
		);
	}, [normalizedQuery]);

	const rawRight = React.useMemo(() => {
		if (!normalizedQuery) return [];
		return SOFT_SKILLS.filter((item) =>
			normalize(item.name).includes(normalizedQuery),
		);
	}, [normalizedQuery]);

	// Sort matches: Exact match first, then others
	const { leftMatches, rightMatches, exactMatchName } = React.useMemo(() => {
		let leftNames = rawLeft.map((t) => t.name);
		let rightNames = rawRight.map((s) => s.name);

		const exactTech = rawLeft.find(
			(t) => normalize(t.name) === normalizedQuery,
		);
		const exactSoft = rawRight.find(
			(s) => normalize(s.name) === normalizedQuery,
		);
		const exactName = exactTech?.name || exactSoft?.name || null;

		const sortFn = (a: string, b: string) => {
			const normA = normalize(a);
			const normB = normalize(b);
			if (normA === normalizedQuery) return -1;
			if (normB === normalizedQuery) return 1;
			return 0;
		};

		return {
			leftMatches: leftNames.sort(sortFn),
			rightMatches: rightNames.sort(sortFn),
			exactMatchName: exactName,
		};
	}, [rawLeft, rawRight, normalizedQuery]);

	React.useEffect(() => {
		setLineSeq((prev) => prev + 1);
	}, [pausedQuery]);

	const hasAnyMatches = leftMatches.length > 0 || rightMatches.length > 0;
	const connectedCount = leftMatches.length + rightMatches.length;
	
	// Determine what to pull to the results center:
	// 1. If few matches (<=3), pull everything.
	// 2. If many matches but we have an exact match (e.g. "C"), PULL ONLY THE EXACT MATCH.
	// 3. Otherwise pull nothing (lines connected to cloud).
	const itemsToPull: { name: string; side: "Technology" | "Soft Skill" }[] = React.useMemo(() => {
		if (connectedCount > 0 && connectedCount <= 3) {
			return [
				...leftMatches.map((name) => ({ name, side: "Technology" } as const)),
				...rightMatches.map((name) => ({ name, side: "Soft Skill" } as const)),
			];
		}
		if (connectedCount > 3 && exactMatchName) {
			// Find which side it belongs to
			const isTech = leftMatches.includes(exactMatchName);
			return [{ name: exactMatchName, side: isTech ? "Technology" : "Soft Skill" }];
		}
		return [];
	}, [connectedCount, leftMatches, rightMatches, exactMatchName]);

	const shouldPullToResults = itemsToPull.length > 0;
	const resultItems = itemsToPull;

    // Effect: deeply update selected skill when resultItems change
    React.useEffect(() => {
        // console.log("Effect: Checking default selection", { shouldPullToResults, resultCount: resultItems.length });
        if (shouldPullToResults && resultItems.length > 0) {
            // Check if current selected is in new results.
            if (selectedSkill) {
                const stillExists = resultItems.some(item => item.name === selectedSkill.name);
                if (stillExists) return; // Keep current selection
            }
            
            // If not found or nothing selected, clear it (don't default select)
            setSelectedSkill(null);
        } else {
            // console.log("Clearing selected skill");
            setSelectedSkill(null);
        }
    }, [shouldPullToResults, resultItems, selectedSkill]);

    const handleBubbleClick = (skillName: string) => {
        console.log("Bubble clicked:", skillName, "shouldPullToResults:", shouldPullToResults);
        if (!shouldPullToResults) return; // Only allow clicking when in results mode
        const skillObj = [...TECHNOLOGIES, ...SOFT_SKILLS].find(s => s.name === skillName);
        if (skillObj) {
            console.log("Setting selected skill via click:", skillObj.name);
            setSelectedSkill(skillObj);
        }
    };



	React.useEffect(() => {
		if (!shouldPullToResults) {
			setLeftPinnedTargets({});
			setRightPinnedTargets({});
			return;
		}

		const updateTargets = () => {
			const results = resultsRef.current;
			const leftContainer = leftBubbleRef.current;
			const rightContainer = rightBubbleRef.current;
			if (!results || !leftContainer || !rightContainer) return;

			const resultsRect = results.getBoundingClientRect();
			const leftRect = leftContainer.getBoundingClientRect();
			const rightRect = rightContainer.getBoundingClientRect();

			const rx = resultsRect.left + resultsRect.width / 2;
			const ry = resultsRect.top + resultsRect.height / 2 - 10;
			const gap = Math.min(180, Math.max(120, resultsRect.width / 3.2));
			const startX = rx - ((resultItems.length - 1) * gap) / 2;

			const nextLeft: Record<string, Point> = {};
			const nextRight: Record<string, Point> = {};

			for (let i = 0; i < resultItems.length; i += 1) {
				const item = resultItems[i];
				const slotX = startX + i * gap;
				const slotY = ry;
				if (item.side === "Technology") {
					nextLeft[item.name] = {
						x: slotX - leftRect.left,
						y: slotY - leftRect.top,
					};
				} else {
					nextRight[item.name] = {
						x: slotX - rightRect.left,
						y: slotY - rightRect.top,
					};
				}
			}

			setLeftPinnedTargets(nextLeft);
			setRightPinnedTargets(nextRight);
		};

		updateTargets();
		window.addEventListener("resize", updateTargets);
		window.addEventListener("scroll", updateTargets, { passive: true });

		return () => {
			window.removeEventListener("resize", updateTargets);
			window.removeEventListener("scroll", updateTargets);
		};
	}, [resultItems, shouldPullToResults, selectedSkill]);

	const findBubbleTarget = React.useCallback(
		(
			container: HTMLDivElement | null,
			targetName: string,
		): BubbleTarget | null => {
			if (!container || !targetName) return null;
			const targets =
				container.querySelectorAll<HTMLElement>("[data-bubble-name]");
			for (const el of targets) {
				if (
					normalize(el.dataset.bubbleName || "") !==
					normalize(targetName)
				)
					continue;
				const rect = el.getBoundingClientRect();
				return {
					center: {
						x: rect.left + rect.width / 2,
						y: rect.top + rect.height / 2,
					},
					radius: Math.min(rect.width, rect.height) / 2,
				};
			}
			return null;
		},
		[],
	);

	React.useEffect(() => {
		const root = rootRef.current;
		const input = inputRef.current;
		if (!root || !input) return;
		if (!hasAnyMatches) {
			setLines([]);
			return;
		}

		const updateLines = () => {
			const overlayRect = root.getBoundingClientRect();
			const inputRect = input.getBoundingClientRect();
			const startYMid = inputRect.top - overlayRect.top + inputRect.height / 2;
			const startYBottom = inputRect.bottom - overlayRect.top + 1;
			const startLeft = {
				x: inputRect.left - overlayRect.left,
				y: startYMid,
			};
			const startCenter = {
				x: inputRect.left - overlayRect.left + inputRect.width / 2,
				y: startYBottom,
			};
			const startRight = {
				x: inputRect.right - overlayRect.left,
				y: startYMid,
			};

			const matches: MatchedTarget[] = [];
			for (const match of leftMatches) {
				const target = findBubbleTarget(leftBubbleRef.current, match);
				if (!target) continue;
				const mapped = {
					name: match,
					center: {
						x: target.center.x - overlayRect.left,
						y: target.center.y - overlayRect.top,
					},
					radius: target.radius,
				};
				matches.push(mapped);
			}
			for (const match of rightMatches) {
				const target = findBubbleTarget(rightBubbleRef.current, match);
				if (!target) continue;
				const mapped = {
					name: match,
					center: {
						x: target.center.x - overlayRect.left,
						y: target.center.y - overlayRect.top,
					},
					radius: target.radius,
				};
				matches.push(mapped);
			}
			matches.sort((a, b) => a.center.x - b.center.x);

			const nextLines: LineState[] = [];
			if (shouldPullToResults && resultItems.length > 0) {
				const resolvePulledTarget = (
					item: { name: string; side: string },
					fallbackX: number,
				): MatchedTarget => {
					const preferredContainer =
						item.side === "Technology"
							? leftBubbleRef.current
							: rightBubbleRef.current;
					const direct = findBubbleTarget(preferredContainer, item.name);
					if (direct) {
						return {
							name: item.name,
							center: {
								x: direct.center.x - overlayRect.left,
								y: direct.center.y - overlayRect.top,
							},
							radius: direct.radius,
						};
					}

					const sidePinned =
						item.side === "Technology"
							? leftPinnedTargets[item.name]
							: rightPinnedTargets[item.name];
					const sideRect =
						item.side === "Technology"
							? leftBubbleRef.current?.getBoundingClientRect()
							: rightBubbleRef.current?.getBoundingClientRect();
					if (sidePinned && sideRect) {
						return {
							name: item.name,
							center: {
								x: sideRect.left + sidePinned.x - overlayRect.left,
								y: sideRect.top + sidePinned.y - overlayRect.top,
							},
							radius: 56,
						};
					}

					const genericPinned =
						leftPinnedTargets[item.name] || rightPinnedTargets[item.name];
					const genericRect = leftPinnedTargets[item.name]
						? leftBubbleRef.current?.getBoundingClientRect()
						: rightBubbleRef.current?.getBoundingClientRect();
					if (genericPinned && genericRect) {
						return {
							name: item.name,
							center: {
								x: genericRect.left + genericPinned.x - overlayRect.left,
								y: genericRect.top + genericPinned.y - overlayRect.top,
							},
							radius: 56,
						};
					}

					return {
						name: item.name,
						center: { x: fallbackX, y: startYBottom + 130 },
						radius: 56,
					};
				};

				const slotItems = resultItems.slice(0, 3);
				const orderedPulledTargets = slotItems.map((item, index) => {
					const fallbackX =
						index === 0
							? startLeft.x
							: index === 1
								? startCenter.x
								: startRight.x;
					return resolvePulledTarget(item, fallbackX);
				});
				if (slotItems.length === 1) {
					const target = orderedPulledTargets[0];
					nextLines.push({
						start: startCenter,
						end: getAttachPoint(target, "center", "classic"),
						name: target.name,
						seq: lineSeq,
						kind: "center",
						lane: 0,
						referenceY: startYMid,
						attachMode: "classic",
					});
				} else if (slotItems.length === 2) {
					const leftTarget = orderedPulledTargets[0];
					const rightTarget = orderedPulledTargets[1];
					nextLines.push({
						start: startLeft,
						end: getAttachPoint(leftTarget, "left", "classic"),
						name: leftTarget.name,
						seq: lineSeq,
						kind: "left",
						lane: -0.7,
						referenceY: startYMid,
						attachMode: "classic",
					});
					nextLines.push({
						start: startRight,
						end: getAttachPoint(rightTarget, "right", "classic"),
						name: rightTarget.name,
						seq: lineSeq,
						kind: "right",
						lane: 0.7,
						referenceY: startYMid,
						attachMode: "classic",
					});
				} else if (slotItems.length >= 3) {
					const leftTarget = orderedPulledTargets[0];
					const centerTarget = orderedPulledTargets[1];
					const rightTarget = orderedPulledTargets[2];
					nextLines.push({
						start: startLeft,
						end: getAttachPoint(leftTarget, "left", "classic"),
						name: leftTarget.name,
						seq: lineSeq,
						kind: "left",
						lane: -1,
						referenceY: startYMid,
						attachMode: "classic",
					});
					nextLines.push({
						start: startCenter,
						end: getAttachPoint(centerTarget, "center", "classic"),
						name: centerTarget.name,
						seq: lineSeq,
						kind: "center",
						lane: 0,
						referenceY: startYMid,
						attachMode: "classic",
					});
					nextLines.push({
						start: startRight,
						end: getAttachPoint(rightTarget, "right", "classic"),
						name: rightTarget.name,
						seq: lineSeq,
						kind: "right",
						lane: 1,
						referenceY: startYMid,
						attachMode: "classic",
					});
				}

				// --- NEW: Generate lines for the matches that remain in the cloud ---
				// Identify which matches were pulled
				const pulledNames = new Set(slotItems.map((item) => item.name));
				const remainingMatches = matches.filter(
					(m) => !pulledNames.has(m.name),
				);

				if (remainingMatches.length > 0) {
					// Use a logic similar to the "cloud" state for these remaining items
					const assignments = remainingMatches.map((target, index) => {
						let kind: LineState["kind"];
						const distLeft = Math.abs(target.center.x - startLeft.x);
						const distCenter = Math.abs(target.center.x - startCenter.x);
						const distRight = Math.abs(target.center.x - startRight.x);
						if (distCenter <= distLeft && distCenter <= distRight) {
							kind = "center";
						} else if (distLeft <= distRight) {
							kind = "left";
						} else {
							kind = "right";
						}
						return { target, kind };
					});

					const laneByName = new Map<string, number>();
					(["left", "center", "right"] as const).forEach((kind) => {
						const group = assignments
							.filter((item) => item.kind === kind)
							.sort((a, b) => a.target.center.y - b.target.center.y);
						const middle = (group.length - 1) / 2;
						group.forEach((item, idx) => {
							laneByName.set(item.target.name, idx - middle);
						});
					});

					assignments.forEach(({ target, kind }) => {
						nextLines.push({
							start:
								kind === "left"
									? startLeft
									: kind === "right"
										? startRight
										: startCenter,
							end: getAttachPoint(target, kind, "facing"), // Use facing mode for cloud bubbles
							name: target.name,
							seq: lineSeq,
							kind,
							lane: laneByName.get(target.name) ?? 0,
							referenceY: startYMid,
							attachMode: "facing",
						});
					});
				}
			} else if (matches.length >= 3) {
				const attachMode: LineState["attachMode"] =
					matches.length <= 3 ? "classic" : "facing";
				const assignments = matches.map((target, index) => {
					let kind: LineState["kind"];
					if (index === 0) {
						kind = "left";
					} else if (index === matches.length - 1) {
						kind = "right";
					} else {
						const distLeft = Math.abs(target.center.x - startLeft.x);
						const distCenter = Math.abs(target.center.x - startCenter.x);
						const distRight = Math.abs(target.center.x - startRight.x);
						if (distCenter <= distLeft && distCenter <= distRight) {
							kind = "center";
						} else if (distLeft <= distRight) {
							kind = "left";
						} else {
							kind = "right";
						}
					}
					return { target, kind };
				});

				const laneByName = new Map<string, number>();
				(["left", "center", "right"] as const).forEach((kind) => {
					const group = assignments
						.filter((item) => item.kind === kind)
						.sort((a, b) => a.target.center.y - b.target.center.y);
					const middle = (group.length - 1) / 2;
					group.forEach((item, idx) => {
						laneByName.set(item.target.name, idx - middle);
					});
				});

				assignments.forEach(({ target, kind }) => {
					nextLines.push({
						start:
							kind === "left"
								? startLeft
								: kind === "right"
									? startRight
									: startCenter,
						end: getAttachPoint(target, kind, attachMode),
						name: target.name,
						seq: lineSeq,
						kind,
						lane: laneByName.get(target.name) ?? 0,
						referenceY: startYMid,
						attachMode,
					});
				});
			}
			setLines(nextLines);
		};

		updateLines();
	}, [
		findBubbleTarget,
		hasAnyMatches,
		leftPinnedTargets,
		leftMatches,
		lineSeq,
		rightMatches,
		rightPinnedTargets,
		resultItems,
		shouldPullToResults,
	]);

		const cachedLayoutRef = React.useRef<{
			overlayRect: DOMRect | null;
			inputRect: DOMRect | null;
			startLeft: Point;
			startCenter: Point;
			startRight: Point;
			startYMid: number;
			startYBottom: number;
		}>({
			overlayRect: null,
			inputRect: null,
			startLeft: { x: 0, y: 0 },
			startCenter: { x: 0, y: 0 },
			startRight: { x: 0, y: 0 },
			startYMid: 0,
			startYBottom: 0,
		});

		const updateLayoutCache = React.useCallback(() => {
			const root = rootRef.current;
			const input = inputRef.current;
			if (!root || !input) return;

			const overlayRect = root.getBoundingClientRect();
			const inputRect = input.getBoundingClientRect();
			const startYMid = inputRect.top - overlayRect.top + inputRect.height / 2;
			const startYBottom = inputRect.bottom - overlayRect.top + 1;

			cachedLayoutRef.current = {
				overlayRect,
				inputRect,
				startLeft: { x: inputRect.left - overlayRect.left, y: startYMid },
				startCenter: {
					x: inputRect.left - overlayRect.left + inputRect.width / 2,
					y: startYBottom,
				},
				startRight: { x: inputRect.right - overlayRect.left, y: startYMid },
				startYMid,
				startYBottom,
			};
		}, []);

		React.useEffect(() => {
			updateLayoutCache();
			window.addEventListener("resize", updateLayoutCache);
			window.addEventListener("scroll", updateLayoutCache, { passive: true });
			return () => {
				window.removeEventListener("resize", updateLayoutCache);
				window.removeEventListener("scroll", updateLayoutCache);
			};
		}, [updateLayoutCache]);

		React.useEffect(() => {
			if (lines.length === 0) return;
			// Initial layout update in case it hasn't run
			updateLayoutCache();

			let rafId = 0;
			const updatePathPositions = () => {
				// We need dynamic rects for the input because it animates (slides up/down).
				// Caching it strictly caused lines to detach during animation.
				// However, we can still cache the overlay root if it doesn't move relative to viewport,
				// but for safety and smoothness during scroll/resize/animation, we'll read them here.
				// Performance note: 2 DOM reads per frame is acceptable for this visual fidelity.
				const root = rootRef.current;
				const input = inputRef.current;
				if (!root || !input) return;

				const overlayRect = root.getBoundingClientRect();
				const inputRect = input.getBoundingClientRect();
				
				const startYMid = inputRect.top - overlayRect.top + inputRect.height / 2;
				const startYBottom = inputRect.bottom - overlayRect.top + 1;

				const startLeft = {
					x: inputRect.left - overlayRect.left,
					y: startYMid,
				};
				const startCenter = {
					x: inputRect.left - overlayRect.left + inputRect.width / 2,
					y: startYBottom,
				};
				const startRight = {
					x: inputRect.right - overlayRect.left,
					y: startYMid,
				};

				for (const line of lines) {
				const target =
					findBubbleTarget(leftBubbleRef.current, line.name) ||
					findBubbleTarget(rightBubbleRef.current, line.name);
				if (!target) continue;

				const mappedTarget: MatchedTarget = {
					name: line.name,
					center: {
						x: target.center.x - overlayRect.left,
						y: target.center.y - overlayRect.top,
					},
					radius: target.radius,
				};
				const nextLine: LineState = {
					...line,
					start:
						line.kind === "left"
							? startLeft
							: line.kind === "right"
								? startRight
								: startCenter,
					end: getAttachPoint(mappedTarget, line.kind, line.attachMode),
					referenceY: startYMid,
				};

				const pathEl = pathRefs.current[getLineKey(line)];
				if (!pathEl) continue;
				pathEl.setAttribute("d", buildConnectorPath(nextLine));
			}

			rafId = window.requestAnimationFrame(updatePathPositions);
		};

		rafId = window.requestAnimationFrame(updatePathPositions);
		return () => {
			if (rafId) window.cancelAnimationFrame(rafId);
		};
	}, [findBubbleTarget, lines, updateLayoutCache]);

	return (
		<div
			className="relative flex flex-col gap-6 items-center justify-center"
			ref={rootRef}
		>
			<h1 className="text-8xl font-bold text-left mt-20 ml-20 jaini-regular">
				Skills
			</h1>
			<p className="text-4xl ml-20 jaini-regular">
				Here are some of the technologies and tools I work with
			</p>

			<div className="w-full px-8 mt-8 flex items-center justify-center gap-3">
				<div className="mx-auto w-full max-w-6xl h-[78vh] min-h-130">
					<BigBubble
						className="w-full h-full"
						onContainerReady={(el) => {
							leftBubbleRef.current = el;
						}}
						pinnedTargets={
							shouldPullToResults ? leftPinnedTargets : {}
						}
					>
						{TECHNOLOGIES.map((tech) => {
							const isSelected =
								shouldPullToResults &&
								resultItems.some((r) => r.name === tech.name);
                            const isClickable = !shouldPullToResults || isSelected;
							return (
								<SmallBubble
									key={tech.name}
									name={tech.name}
									icon={tech.icon}
                                    progress={tech.confidence}
									isSelected={isSelected}
                                    className={isClickable ? "cursor-pointer" : "pointer-events-none opacity-20"} 
                                    onClick={() => isClickable && handleBubbleClick(tech.name)} 
								>
									{tech.name}
								</SmallBubble>
							);
						})}
					</BigBubble>
				</div>
				<div
					className={`mx-auto w-3/4 max-w-6xl h-[78vh] min-h-130 flex items-center flex-col pointer-events-none transition-all duration-500 ease-in-out ${selectedSkill ? "justify-evenly gap-0" : "justify-center gap-6"}`}
					id="search-area"
				>
					<div
						className={`w-full transition-transform duration-500 ease-out pointer-events-auto ${
							shouldPullToResults
								? "-translate-y-8"
								: "translate-y-0"
						}`}
					>
						<input
							type="text"
							placeholder="Search skills..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							ref={inputRef}
							className="w-full h-12 rounded-md bg-black border border-white/40 px-4 text-white/80 focus:outline-none focus:ring-2 focus:ring-white/60"
						/>
					</div>
					<div
						className={`results w-full rounded-lg bg-transparent transition-all duration-500 ease-out ${
							shouldPullToResults
								? "min-h-24 p-3 opacity-100 translate-y-0"
								: "min-h-0 p-0 opacity-0 translate-y-3 overflow-hidden"
						}`}
						ref={resultsRef}
					>
						<div className="h-24 w-full" />
					</div>

                    {/* Skill Details positioned below the bubbles */}
                    {selectedSkill && (
                        <div className="w-full flex justify-center pointer-events-auto z-30 animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <SkillDetails skill={selectedSkill} />
                        </div>
                    )}
				</div>
				<div className="mx-auto w-full max-w-6xl h-[78vh] min-h-130">
					<BigBubble
						className="w-full h-full"
						onContainerReady={(el) => {
							rightBubbleRef.current = el;
						}}
						pinnedTargets={
							shouldPullToResults ? rightPinnedTargets : {}
						}
					>
						{SOFT_SKILLS.map((skill) => {
							const isSelected =
								shouldPullToResults &&
								resultItems.some((r) => r.name === skill.name);
                            const isClickable = !shouldPullToResults || isSelected;
							return (
								<SmallBubble
									key={skill.name}
									name={skill.name}
									icon={skill.icon}
									progress={skill.confidence}
									isSelected={isSelected}
                                    className={isClickable ? "cursor-pointer" : "pointer-events-none opacity-20"}
                                    onClick={() => isClickable && handleBubbleClick(skill.name)}
								>
									{skill.name}
								</SmallBubble>
							);
						})}
					</BigBubble>
				</div>
			</div>


			<svg className="pointer-events-none absolute inset-0 z-20 overflow-visible">
				<defs>
					<linearGradient
						id="skills-connector-gradient"
						gradientUnits="userSpaceOnUse"
						x1="0"
						y1="0"
						x2="0"
						y2="800"
					>
						<stop
							offset="0%"
							stopColor="rgba(186, 230, 253, 0.92)"
						/>
						<stop
							offset="52%"
							stopColor="rgba(147, 197, 253, 0.95)"
						/>
						<stop
							offset="100%"
							stopColor="rgba(125, 211, 252, 0.9)"
						/>
					</linearGradient>
				</defs>
				{lines.map((line) => (
					<path
						key={getLineKey(line)}
						d={buildConnectorPath(line)}
						className="connector-path"
						ref={(el) => {
							pathRefs.current[getLineKey(line)] = el;
						}}
					/>
				))}
			</svg>
			<style jsx>{`
				.connector-path {
					stroke: url(#skills-connector-gradient);
					stroke-width: 2.5px;
					stroke-linecap: round;
					stroke-linejoin: round;
					fill: none;
					opacity: 1;
					filter: drop-shadow(0 0 4px rgba(56, 189, 248, 0.6));
					animation: fadeInLine 400ms ease-out forwards;
				}

				@keyframes fadeInLine {
					0% {
						opacity: 0;
					}
					100% {
						opacity: 0.96;
					}
				}
			`}</style>
		</div>
	);
}

export default Skills;
