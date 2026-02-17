
import React from 'react';
import { type Skill } from '@/data/skills';

interface SkillDetailsProps {
    skill: Skill | null;
}

const SkillDetails: React.FC<SkillDetailsProps> = ({ skill }) => {
    // console.log("SkillDetails Rendered with:", skill?.name, "Points:", skill?.bulletPoints);
    return (
        <div className={`mt-8 w-full max-w-2xl text-center transition-all duration-500 ease-in-out ${skill ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {skill && (
                <div className="p-6 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(56,189,248,0.1)]">
                   <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="text-4xl text-sky-400 -ml-9">
                            {skill.icon}
                        </div>
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/70">
                            {skill.name}
                        </h2>
                   </div>
                   
                   <div className="space-y-4">
                        {skill.bulletPoints && skill.bulletPoints.length > 0 ? (
                             <ul className="text-left space-y-2">
                                {skill.bulletPoints.map((point, index) => (
                                    <li key={index} className="flex items-start text-white/80">
                                        <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-sky-400 rounded-full shrink-0" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-white/50 italic">No details available</div>
                        )}
                        
                        {skill.keywords && skill.keywords.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-2 pt-2">
                                {skill.keywords.map((keyword, index) => (
                                    <span key={index} className="px-3 py-1 text-xs font-medium text-sky-300 bg-sky-400/10 rounded-full border border-sky-400/20">
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        )}
                   </div>
                </div>
            )}
        </div>
    );
};

export default SkillDetails;
