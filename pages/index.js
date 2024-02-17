import Introduction from '@/components/Introduction'
import ThemeChanger from '@/components/ThemeChanger'
import React, { createContext, useEffect, useState } from 'react'
import { gsap } from "gsap";
import Navbar from '@/components/Navbar';
import { light } from '@/components/Themes';
import NAVBARSTYLES from '@/styles/Navbar.module.css'
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';


export const ThemeContext = createContext(null)

function Home() {
    const [theme, setTheme] = useState(light)
    const [device, setDevice] = useState('PC')
    const [showing, setShowing] = useState("Introduction")

    const [scrolled, setScrolled] = useState(0)

    useEffect(() => {
        if (device === "PC") {
            const windowHeight = window.innerHeight

            const heights = [0, windowHeight / 1.5, windowHeight + (windowHeight / 1.5), 2 * windowHeight + (windowHeight / 1.5), 3 * windowHeight + (windowHeight / 1.5), 4 * windowHeight + (windowHeight / 1.5)]
            window.onscroll = (e) => {
                const navbar = document.querySelector('nav')
                if (window.scrollY > 0) {
                    navbar.classList.add(NAVBARSTYLES.NavScrolled)
                } else {
                    navbar.classList.remove(NAVBARSTYLES.NavScrolled)
                }

                const sections = ["Introduction", "About", "Skills", "Projects", "Contact"]
                for (let i = 0; i < sections.length; i++) {
                    if (window.scrollY > heights[i] && window.scrollY < heights[i + 1]) {
                        setShowing(sections[i])
                    }
                }

                setScrolled(window.scrollY)
            }
        } else {
            window.onscroll = (e) => {
                e.preventDefault()
            }
        }
    }, [device])

    useEffect(() => {
        const allIds = ["IntroductionNAVHeading", "AboutNAVHeading", "SkillsNAVHeading", "ProjectsNAVHeading", "ContactNAVHeading"]

        const a = document.getElementById(showing + "NAVHeading")
        const hoverText = a.children[1]

        hoverText.classList.add(NAVBARSTYLES.clicked)

        for (let i = 0; i < allIds.length; i++) {
            if (allIds[i] != showing + "NAVHeading") {
                const a = document.getElementById(allIds[i])
                const hoverText = a.children[1]
                hoverText.classList.remove(NAVBARSTYLES.clicked)
            }
        }
    }, [showing])


    useEffect(() => {
        setInterval(() => {
            const deviceWidth = window.innerWidth
            if (deviceWidth < 768) {
                setDevice('MOBILE')
            } else {
                setDevice('PC')
            }
        }, 1000)
    }, [])

    useEffect(() => {
        if (showing) {

        }
    }, [showing])

    return (
        <ThemeContext.Provider value={{ theme, device, showing, scrolled }}>
            <div className='w-full h-full overflow-x-hidden relative'>
                <Navbar setShowing={setShowing} />
                <Introduction setShowing={setShowing} />
                <About />
                <Skills />
                <Projects />
                <Contact />
            </div>
            <ThemeChanger Theme={theme} setTheme={setTheme} />
        </ThemeContext.Provider>
    )
}

export default Home