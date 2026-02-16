import React from "react";
import { US } from 'country-flag-icons/react/3x2'
import { PiBrain, PiCloud, PiCubeFocusFill, PiGlobe, PiRobot, PiUser } from "react-icons/pi";
import { IoIosFlash } from "react-icons/io";
import Snapshot from "./ui/snapshot";
import Toolbox from "./ui/toolbox";
import WhatIBuild from "./ui/what-i-build";
import { BsLightningChargeFill } from "react-icons/bs";
import { CgPerformance } from "react-icons/cg";
import { MdOutlineSecurity } from "react-icons/md";
import { IoShieldHalf } from "react-icons/io5";


function About() {
	const tags = ["Frontend", "Backend", "Fullstack", "AI/ML"];
	const focusAreas = [
		{
			icon: <BsLightningChargeFill className="w-8 h-8 text-white/80" />,
			title: "AI Integration",
		},
		{
			icon: <CgPerformance className="w-8 h-8 text-white/80" />,
			title: "Performance",
		},
		{
			icon: <IoShieldHalf className="w-8 h-8 text-white/80" />,
			title: "Security",
		}
	];
	return (
		<div className="">
			<div className="flex flex-col gap-6 items-center justify-center">
				<h1 className="text-8xl font-bold text-left mt-20 ml-20 jaini-regular">
					About Me
				</h1>
				<p className="text-4xl ml-20 jaini-regular">
					I build clean web apps + practical AI tools.
				</p>
			</div>

			<div className="flex flex-col gap-6 items-center justify-center  mt-6">
				<div className="flex gap-4 ml-20 items-center justify-center">
					{tags.map((tag) => (
						<div
							key={tag}
							className="px-4 py-2  rounded-lg text-xl nunito text-center bg-black border-2 border-[rgba(255,255,255,0.2)] text-white hover:border-gray-300 transition-colors duration-300 "
						>
							{tag}
						</div>
					))}
				</div>
			</div>

			<div className="flex w-full px-30 items-start gap-10 justify-evenly mt-20">
				<Snapshot />
				<Toolbox />
				<WhatIBuild />
			</div>

			<div className="flex flex-col gap-6 items-center justify-center mt-12">
				<div className="flex items-center justify-center w-full max-w-xl">
					<hr className=" w-2/3  border-white/40" />
					<h1 className="text-4xl nunito text-center w-full">Focus Areas</h1>
					<hr className="w-2/3  border-white/40" />
				</div>
				<div className="flex flex-row items-center justify-center w-full max-w-2xl gap-6">
				{
					focusAreas.map((focusArea, index) => (
						<div className="flex flex-col items-center justify-center border border-white/40 gap-3 bg-black/80 rounded-sm px-3 py-5 nunito text-white/80 w-full">
							{focusArea.icon}
							<h1 className="text-2xl font-bold text-center w-full">{focusArea.title}</h1>
						</div>
					))
				}
				</div>
			</div>
		</div>
	);
}

export default About;
