import React from "react";
import { IoIosFlash } from "react-icons/io";
import { CiServer } from "react-icons/ci";
import { PiBrain } from "react-icons/pi";
import { PiCubeFocusFill } from "react-icons/pi";
import { PiCloud } from "react-icons/pi";
import { PiUser } from "react-icons/pi";
import { FaReact } from "react-icons/fa";
import { GrDeploy } from "react-icons/gr";
import { RiRobot2Line } from "react-icons/ri";



export default function Toolbox() {
    const content= [
                    {
                        icon: <FaReact className="w-10 h-10 text-blue-300" />,
                        frameworks: ["React", "Next.js", "Tailwind CSS"],
                    },
                    {
                        icon: <PiBrain className="w-10 h-10 text-orange-500/80" />,
                        frameworks: ["TensorFlow", "PyTorch", "Scikit-Learn"],
                    },
                    {
                        icon: <CiServer className="w-10 h-10 text-green-500/80" />,
                        frameworks: ["Node", "FastAPI", "PostgreSQL"],
                    },
                    {
                        icon: <GrDeploy className="w-9 h-9 text-yellow-500/80" />,
                        frameworks: ["Docker", "Nginx", "Cloudflare"],
                    },
                    {
                        icon: <RiRobot2Line className="w-9 h-9 text-blue-500/80" />,
                        frameworks: ["HuggingFace", "CivitAI", "Embeddings"],
                    },
                ]



	return (
		<div className="flex flex-col items-start justify-center border border-white/40 gap-3 bg-black/80 rounded-sm px-3 py-5 nunito text-white/80 w-full">
			<h1 className="text-2xl font-bold  w-full">Toolbox</h1>
            <hr className="w-full border-white/40" />
            {content.map((item, index) => (
                <div key={item.frameworks.join('  ')} className="flex items-center gap-3 w-full flex-col">
                    <div className="w-full flex items-center gap-4">
                        {item.icon}
                        <p className="text-lg w-full text-left">{item.frameworks.join(' | ')}</p>
                    </div>
                    {index < content.length - 1 && <hr className="w-full border-white/40" />}
                </div>
            ))}
    		</div>
	);
}