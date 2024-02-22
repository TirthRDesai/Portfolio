import React, { useContext, useEffect, useState } from 'react'
import NAVBARSTYLES from '@/styles/Navbar.module.css'
import { ThemeContext } from '@/pages'
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { sectionHeights } from './sectionheights';


function Navbar({ setShowing }) {

    const ThemeCon = useContext(ThemeContext)
    const [theme, setTheme] = useState({})
    const [device, setDevice] = useState('PC')
    const [currentSection, setCurrentSection] = useState('Introduction')

    const [NavHeadings, setNavHeadings] = useState(null)

    const [scrolled, setScrolled] = useState(0)

    useEffect(() => {
        setNavHeadings(document.querySelectorAll('.NAVHeadings'))
    }, [])

    useEffect(() => {
        if (ThemeCon) {
            setTheme(ThemeCon.theme)
            setDevice(ThemeCon.device)
            setCurrentSection(ThemeCon.showing)
            setScrolled(ThemeCon.scrolled)
        }
    }, [ThemeCon])

    useEffect(() => {
        if (device == "PC") {
            const navbar = document.querySelector('#pcnav')
            navbar.style.flexDirection = 'row'
            navbar.style.justifyContent = 'space-evenly'
            navbar.style.height = '100%'
            navbar.parentElement.style.maxHeight = "80px"
            navbar.parentElement.style.height = "auto"
            navbar.style.paddingTop = ''
            navbar.style.paddingBottom = ''
            navbar.style.minWidth = '360px'
            const items = navbar.children
            for (let i = 0; i < items.length; i++) {
                if (items[i].tagName.toLowerCase() === 'button') {
                } else {
                    items[i].style.display = 'none'
                }
            }

            if (window.scrollY > 0) {
                navbar.classList.add(NAVBARSTYLES.NavScrolled)
            } else {
                navbar.classList.remove(NAVBARSTYLES.NavScrolled)
            }

            const windowHeight = window.innerHeight

            const heights = [0]

            const cumulative = []
            for (let i = 0; i < sectionHeights.length; i++) {
                if (i == 0) {
                    cumulative.push(sectionHeights[i])
                } else {
                    cumulative.push(cumulative[i - 1] + sectionHeights[i])
                }
            }

            const partialHeight = windowHeight / 3

            for (let i = 1; i < sectionHeights.length; i++) {
                const tempHeight = cumulative[i - 1] * windowHeight + (sectionHeights[i] - 1) * windowHeight + partialHeight
                heights.push(tempHeight)
            }

            window.onscroll = (e) => {
                const navbar = document.querySelector('#pcnav')
                if (window.scrollY > 0) {
                    navbar.classList.add(NAVBARSTYLES.NavScrolled)
                } else {
                    navbar.classList.remove(NAVBARSTYLES.NavScrolled)
                }

                const sections = ["Introduction", "About", "Skills", "Projects", "Contact"]
                for (let i = 1; i < heights.length; i++) {
                    if (window.scrollY < heights[i]) {
                        setShowing(sections[i - 1])
                        break
                    }
                }

                setScrolled(window.scrollY)
            }
        }
    }, [setShowing, device])

    useEffect(() => {
        if (theme) {
            const navbar = document.querySelector('#pcnav')
            navbar.style.backgroundColor = theme.navbg
        }
    }, [theme])

    const HeadingClicked = (e, heading) => {
        e.preventDefault()
        window.scrollTo({
            top: document.querySelector("#" + heading).offsetTop,
            behavior: 'smooth'
        })
        setShowing(heading)
    }

    useEffect(() => {
        const allIds = ["IntroductionNAVHeading", "AboutNAVHeading", "SkillsNAVHeading", "ProjectsNAVHeading", "ContactNAVHeading"]

        const a = document.getElementById(currentSection + "NAVHeading")
        const hoverText = a.children[1]

        hoverText.classList.add(NAVBARSTYLES.clicked)

        for (let i = 0; i < allIds.length; i++) {
            if (allIds[i] != currentSection + "NAVHeading") {
                const a = document.getElementById(allIds[i])
                const hoverText = a.children[1]
                hoverText.classList.remove(NAVBARSTYLES.clicked)
            }
        }

    }, [currentSection])

    return (
        <div className='flex flex-col w-[100vw] overflow-x-hidden fixed justify-start items-center z-50' style={{
            height: '100%'
        }}>
            <nav id='pcnav' className={NAVBARSTYLES.NavbarUnScrolled + ` py-[10px] flex flex-row justify-evenly items-center z-50 transition-all duration-300 ease-in relative`}>

                <button className={NAVBARSTYLES.button} data-text="Awesome" id='IntroductionNAVHeading' onClick={(e) => HeadingClicked(e, "Introduction")}>
                    <span className={NAVBARSTYLES.actualText}>&nbsp;Introduction&nbsp;</span>
                    <span aria-hidden="true" className={NAVBARSTYLES.hoverText}>&nbsp;Introduction&nbsp;</span>
                </button>

                <button className={NAVBARSTYLES.button} data-text="Awesome" id='AboutNAVHeading' onClick={(e) => HeadingClicked(e, "About")}>
                    <span className={NAVBARSTYLES.actualText}>&nbsp;About&nbsp;</span>
                    <span aria-hidden="true" className={NAVBARSTYLES.hoverText}>&nbsp;About&nbsp;</span>
                </button>

                <button className={NAVBARSTYLES.button} data-text="Awesome" id='SkillsNAVHeading' onClick={(e) => HeadingClicked(e, "Skills")}>
                    <span className={NAVBARSTYLES.actualText}>&nbsp;Skills&nbsp;</span>
                    <span aria-hidden="true" className={NAVBARSTYLES.hoverText}>&nbsp;Skills&nbsp;</span>
                </button>
                <button className={NAVBARSTYLES.button} data-text="Awesome"
                    id='ProjectsNAVHeading' onClick={(e) => HeadingClicked(e, "Projects")}>
                    <span className={NAVBARSTYLES.actualText}>&nbsp;Projects&nbsp;</span>
                    <span aria-hidden="true" className={NAVBARSTYLES.hoverText}>&nbsp;Projects&nbsp;</span>
                </button>

                <button className={NAVBARSTYLES.button} data-text="Awesome"
                    id='ContactNAVHeading' onClick={(e) => HeadingClicked(e, "Contact")}>
                    <span className={NAVBARSTYLES.actualText}>&nbsp;Contact&nbsp;</span>
                    <span aria-hidden="true" className={NAVBARSTYLES.hoverText}>&nbsp;Contact&nbsp;</span>
                </button>


                <span className='absolute hidden right-4 top-4 max-w-[24px] h-fit'><MdKeyboardDoubleArrowDown color='white' className='w-[24px] h-[24px]' /></span>

            </nav>
        </div>
    )
}

export default Navbar