import { ThemeContext } from '@/pages'
import React, { useContext } from 'react'
import { Progress } from './ui/progress'

function About() {
    const { theme, device, showing, scrolled } = useContext(ThemeContext)

    return (
        <div className='w-[100vw] min-h-[100vh] h-full bg-[rgba(232,232,232,0.2)] flex flex-col' id='About'
            style={{
                borderImage: "fill 0 linear-gradient(#fff, rgba(232,232,232,0))"
            }}
        >
            <h1 className=' transition-all duration-400 ease-in-out delay-100 text-5xl font-bold w-full underline underline-offset-8 text-center mt-10' style={{
                color: theme.Projects.TextColor
            }}>About Me</h1>

            <div className='flex flex-wrap w-full h-full justify-between items-stretch pt-10 pl-4'>
                <section className='leading-7 text-justify [&:not(:first-child)]:mt-6 w-[45%] '>
                    I am Tirth Desai, inspired by Computer Science. I am really interested in working as AI Engineer, Web Developer, and Software Developer. I am a quick learner and always ready to learn new things. I am a team player and always ready to help others. I am a good problem solver and always ready to solve problems. I am a good communicator and always ready to communicate with others. I am a good listener and always ready to listen to others. I am a good leader and always ready to lead others. I am a good follower and always ready to follow others. I am a good thinker and always ready to think about new ideas. I am a good planner and always ready to plan new things. I am a good decision maker and always ready to make decisions. I am a good motivator and always ready to motivate others. I am a good teacher and always ready to teach others. I am a good learner and always ready to learn new things. I am a good friend and always ready to make new friends.
                </section>
                <section className='w-[45%] h-full flex flex-wrap items-stretch justify-stretch gap-4 pt-6'>
                    <div className='w-[45%] h-20'>
                        <strong>Education:</strong>
                        <p>Computer Science BS <br /> University at Buffalo</p>
                        <p className='text-sm text-muted-foreground'>2023-Present</p>
                    </div>
                    <div className='w-[45%] h-20'>
                        <strong>Speciality:</strong>
                        <p>
                            <ul >
                                <li>Web Development</li>
                                <li>Python</li>
                                <li>Android Development (using Java)</li>
                            </ul>
                        </p>
                    </div>
                    <div className='w-full h-20 flex flex-col mt-7'>
                        <strong>Strength:</strong>
                        <span className='text-base font-semibold mt-5'>Web Development</span>
                        <div className='  w-4/5 mt-2'>
                            <Progress value={85} className='h-[0.35rem] bg-slate-300' />
                        </div>
                        <span className='text-base font-semibold mt-5'>Python</span>
                        <div className='  w-4/5 mt-2'>
                            <Progress value={100} className='h-[0.35rem] bg-slate-300' />
                        </div>
                        <span className='text-base font-semibold mt-5'>Android Development</span>
                        <div className='  w-4/5 mt-2'>
                            <Progress value={70} className='h-[0.35rem] bg-slate-300' />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default About