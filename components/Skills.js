import { ThemeContext } from '@/pages'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaBootstrap, FaCss3Alt, FaDocker, FaGitAlt, FaHtml5, FaJava, FaNodeJs, FaPython, FaReact } from 'react-icons/fa'
import { SiCplusplus, SiNextdotjs, SiTailwindcss, SiC, SiFlask, SiSupabase, SiSelenium } from "react-icons/si";
import { RiJavascriptFill } from "react-icons/ri";
import { IoLogoAndroid } from "react-icons/io";
import { BiLogoPostgresql } from "react-icons/bi";
import styles from '@/styles/Skills.module.css'
import { animate, inView, motion, useInView } from 'framer-motion'
import links from './Links'


const CreateElement = (skill, icon, index) => {
    const { theme, device } = useContext(ThemeContext)

    const divRef = useRef(null)
    // const isInView = useInView(divRef, { once: true })

    const [isInView, setIsInView] = useState(false)

    const [duration, setDuration] = useState(0.7)
    const [delay, setDelay] = useState(index * 0.08)


    return (
        <motion.div key={skill} style={{
            display: (skill == "" && device == "PC") ? "none" : 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: device == 'MOBILE' ? '0' : '0 2rem',
            padding: device == 'MOBILE' ? '0' : '1rem',
            border: "none",
            color: theme.Projects.TextColor,
        }}

            ref={divRef}

            initial={{
                opacity: 0,
            }}

            animate={{
                opacity: isInView ? 1 : 0,
                transition: {
                    duration: duration,
                    ease: 'easeInOut',
                    delay: delay
                }
            }}

            whileHover={{
                y: skill != "" ? -20 : 0,
                cursor: 'pointer',
                transition: {
                    duration: 0.2,
                    ease: 'easeInOut'
                }
            }}

            onViewportEnter={() => {
                if (!isInView) {
                    setDuration(0.7)
                    setDelay(index * 0.08)
                    setIsInView(true)
                }
            }}

            onClick={() => {
                if (skill != "") {
                    window.open(links[skill], "_blank")
                }
            }}
        >
            <span style={{
                fontSize: device == 'PC' ? '3rem' : '2rem'
            }}>{icon}</span>
            <p style={{
                fontSize: device == 'PC' ? '1rem' : '0.7rem',
                fontWeight: 'bold',
                color: theme.Projects.TextColor,
                width: "100%",
                marginTop: "1rem",
                textAlign: "center",
                transition: "all 0.7s ease-in-out"
            }}>{skill}</p>
        </motion.div>
    )
}

function Skills() {

    const { theme, device } = useContext(ThemeContext)

    const [skills, setSkills] = useState({
        "Node": <FaNodeJs className={styles.icons} />,
        "React": <FaReact className={styles.icons} />,
        "Next.JS": <SiNextdotjs className={styles.icons} />,
        "Javascript": <RiJavascriptFill className={styles.icons} />,
        "HTML5": <FaHtml5 className={styles.icons} />,
        "CSS3": <FaCss3Alt className={styles.icons} />,
        "Bootstrap": <FaBootstrap className={styles.icons} />,
        "Tailwind": <SiTailwindcss className={styles.icons} />,
        "C": <SiC className={styles.icons} />,
        "C++": <SiCplusplus className={styles.icons} />,
        "Java": <FaJava className={styles.icons} />,
        "Python": <FaPython className={styles.icons} />,
        "Android": <IoLogoAndroid className={styles.icons} />,
        "Supabase": <SiSupabase className={styles.icons} />,
        "Git": <FaGitAlt className={styles.icons} />,
        "Flask": <SiFlask className={styles.icons} />,
        "": "",
        "Docker": <FaDocker className={styles.icons} />,
        "Selenium": <SiSelenium className={styles.icons} />
    })

    return (
        <div className='w-[100vw] h-[140vh]' id='Skills' style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            padding: device == 'PC' ? "10vh 0" : "0",
            transition: 'all 0.7s ease-in-out',
            alignItems: 'center',
            backgroundColor: theme.type == "dark" ? "black" : "white"

        }}>
            <h1 style={{
                fontSize: device == 'PC' ? '3rem' : '2.6rem',
                fontWeight: 'bold',
                color: theme.Projects.TextColor,
                textDecoration: 'underline',
                textUnderlineOffset: '8px',
                width: "100%",
                transition: "all 0.7s ease-in-out",
                textAlign: "center",
            }}>Skills</h1>
            <div className="w-fit h-full" style={{
                display: 'grid',
                gridTemplateAreas: device == 'MOBILE' ? 'auto auto auto auto' : window.innerWidth < 960 ? 'repeat(4, 1fr)' : 'repeat(6, auto)',
                gridTemplateColumns: device == 'MOBILE' ? 'auto auto auto auto' : window.innerWidth < 960 ? 'repeat(4, 1fr)' : 'repeat(6, auto)',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '3rem',
                fontWeight: 'bold',
                marginTop: '2rem',
                padding: "3rem 20px auto 20px",
                overflow: 'hidden',
                color: theme.Projects.TextColor,
                gap: device == 'MOBILE' ? '2rem' : '0rem',
            }}>
                {
                    Object.keys(skills).map((skill, index) => {
                        return CreateElement(skill, skills[skill], index)
                    })
                }

            </div>
        </div>
    )
}

export default Skills