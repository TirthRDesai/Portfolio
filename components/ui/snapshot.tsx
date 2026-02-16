import React from "react";
import { US } from 'country-flag-icons/react/3x2'
import { PiCubeFocusFill } from "react-icons/pi";
import { IoIosFlash } from "react-icons/io";

export default function Snapshot() {

    const content = [
                    {
                        icon: <US className="w-10 h-10" />,
                        title: "Based in",
                        description: "USA (ET)",
                    },
                    {
                        icon: <PiCubeFocusFill className="w-10 h-10 text-white/80" />,
                        title: "Focus",
                        description: "Full-Stack + AI/ML",
                    },
                    {
                        icon: <IoIosFlash className="w-10 h-10 text-yellow-300/80" />,
                        title: "Strength",
                        description: "Fast UI, reliable backend",
                    },
                ];
	return (
		<div className="flex flex-col items-start justify-center border border-white/40 gap-3 bg-black/80 rounded-sm px-3 py-5 nunito text-white/80 w-full">
			<h1 className="text-2xl font-bold  w-full">Snapshot</h1>
            <hr className="w-full border-white/40" />
			{content.map((item, index) => (
				<div key={item.title} className="flex items-center gap-3 w-full flex-col">
                    <div className="w-full flex items-center gap-4">
					{item.icon}
					<p className="text-lg w-full text-left"><span    className="font-semibold">{item.title}: </span>{item.description}</p>
                    </div>
                    {index < content.length - 1 && <hr className="w-full border-white/40" />}
				</div>
			))}
		</div>
	);
}