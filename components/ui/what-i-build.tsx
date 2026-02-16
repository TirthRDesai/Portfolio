import React from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { AiOutlineDatabase } from "react-icons/ai";
import { IoIosCloudUpload } from "react-icons/io";

export default function WhatIBuild() {
 const content =  [
                {
                    icon: <IoChatbubbleEllipsesOutline className="w-10 h-10 text-blue-300/80" />,
                    title: "AI Web Apps",
                    description:
                        "AI-powered web applications, Clean UI, Intuitive UX",
                },
                {
                    icon: <AiOutlineDatabase className="w-10 h-10 text-white/80" />,
                    title: "Full Stack Products",
                    description: "Dashboards, APIs, Databases, DevOps",
                },
                {
                    icon: <IoIosCloudUpload className="w-10 h-10 text-yellow-300/80" />,
                    title: "Infra & Development",
                    description: "Vercel, Nginx, VPS, Docker",
                }
            ]
            
            return (
                <div className="flex flex-col items-start justify-center border border-white/40 gap-3 bg-black/80 rounded-sm px-3 py-5 nunito text-white/80 w-full">
                    <h1 className="text-2xl font-bold  w-full">What I Build</h1>
                    <hr className="w-full border-white/40" />
                    {content.map((item, index) => (
                        <div key={item.title} className="flex items-center gap-3 w-full flex-col">
                            <div className="w-full flex items-center gap-4">
                                {item.icon}
                                <p className="text-lg w-full text-left"><span    className="font-semibold">{item.title}</span><br/>{item.description}</p>
                            </div>
                            {index < content.length - 1 && <hr className="w-full border-white/40" />}
                        </div>
                    ))}
                </div>
            )
            
}