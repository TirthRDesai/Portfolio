import React, { use, useContext, useEffect, useState } from 'react'
import NAVBARSTYLES from '@/styles/Navbar.module.css'
import { ThemeContext } from '@/pages'
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { sectionHeights } from './sectionheights';


function MobileNavbar({ setShowing, mobNavOpened, setMobNavOpened }) {

    const { theme, device, showing, scrolled } = useContext(ThemeContext)

    const [nav, setNav] = useState(null)

    const [currentSection, setCurrentSection] = useState('Introduction')

    useEffect(() => {
        setNav(document.querySelector('#mobnav'))
    }, [])

    useEffect(() => {
        if (showing && nav) {
            const buttons = nav.children
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].id.includes(showing)) {
                    buttons[i].children[1].classList.add(NAVBARSTYLES.clicked)
                    buttons[i].style.opacity = "1"
                    buttons[i].style.display = ""

                } else {
                    buttons[i].children[1].classList.remove(NAVBARSTYLES.clicked)
                    buttons[i].style.opacity = "0"
                    buttons[i].style.display = "none"
                }
            }
        }
    }, [showing, nav])

    useEffect(() => {
        if (theme && nav) {
            nav.style.backgroundColor = theme.navbg
        }
    }, [theme, nav])

    useEffect(() => {
        if (showing) {
            setCurrentSection(showing)
        }
    }, [showing])

    useEffect(() => {
        if (nav) {
            const mainLayout = nav.parentElement;
            const buttons = nav.children
            if (mobNavOpened) {
                mainLayout.style.height = "14rem"
                nav.style.justifyContent = 'space-evenly'
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].style.display = "";
                    buttons[i].style.opacity = "1";
                }

            } else {

                mainLayout.style.height = "2.7rem";
                if (currentSection != showing) {
                    for (let i = 0; i < buttons.length; i++) {
                        if (!buttons[i].id.includes(showing)) {
                            buttons[i].style.opacity = "0"
                            buttons[i].style.display = "none"
                        } else {
                            buttons[i].style.opacity = "1"
                            buttons[i].style.display = ""
                        }
                    }
                }
            }
        }
    }, [mobNavOpened, nav, showing, currentSection])

    onscroll = (e) => {
        if (mobNavOpened) {
            setMobNavOpened(false)
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

        const partialHeight = windowHeight * 0.15

        for (let i = 1; i < sectionHeights.length; i++) {
            const tempHeight = cumulative[i - 1] * windowHeight + (sectionHeights[i] - 1) * windowHeight + partialHeight
            heights.push(tempHeight)
        }

        const sections = ["Introduction", "About", "Skills", "Projects", "Contact"]
        for (let i = 1; i < heights.length; i++) {
            if (window.scrollY < heights[i]) {
                setShowing(sections[i - 1])
                break
            }
        }

    }

    const OpenNavbar = (e) => {
        e.preventDefault()
        setMobNavOpened(!mobNavOpened)
    }

    const HeadingClicked = (e, heading) => {
        e.preventDefault()
        setShowing(heading)
        window.scrollTo({
            top: document.querySelector("#" + heading).offsetTop,
            behavior: 'smooth'
        })
    }

    return (
        <div className='flex flex-col w-[100vw] overflow-hidden border-b-4 border-black fixed justify-center transition-all duration-700 items-center z-50'>
            <nav id="mobnav" className={NAVBARSTYLES.NavbarUnScrolled + ' ' + NAVBARSTYLES.mobnav + ` flex gap-4 flex-col justify-evenly h-full items-center overflow-hidden z-50 transition-all duration-300 ease-in relative`} onClick={(e) => OpenNavbar(e)}>


                <button className={NAVBARSTYLES.button} data-text="Awesome" id='IntroductionNAVHeadingMob' onClick={(e) => HeadingClicked(e, "Introduction")}>
                    <span className={NAVBARSTYLES.actualText}>&nbsp;Introduction&nbsp;</span>
                    <span aria-hidden="true" className={NAVBARSTYLES.hoverText}>&nbsp;Introduction&nbsp;</span>
                </button>

                <button className={NAVBARSTYLES.button} data-text="Awesome" id='AboutNAVHeadingMob' onClick={(e) => HeadingClicked(e, "About")}>
                    <span className={NAVBARSTYLES.actualText}>&nbsp;About&nbsp;</span>
                    <span aria-hidden="true" className={NAVBARSTYLES.hoverText}>&nbsp;About&nbsp;</span>
                </button>

                <button className={NAVBARSTYLES.button} data-text="Awesome" id='SkillsNAVHeadingMob' onClick={(e) => HeadingClicked(e, "Skills")}>
                    <span className={NAVBARSTYLES.actualText}>&nbsp;Skills&nbsp;</span>
                    <span aria-hidden="true" className={NAVBARSTYLES.hoverText}>&nbsp;Skills&nbsp;</span>
                </button>
                <button className={NAVBARSTYLES.button} data-text="Awesome"
                    id='ProjectsNAVHeadingMob' onClick={(e) => HeadingClicked(e, "Projects")}>
                    <span className={NAVBARSTYLES.actualText}>&nbsp;Projects&nbsp;</span>
                    <span aria-hidden="true" className={NAVBARSTYLES.hoverText}>&nbsp;Projects&nbsp;</span>
                </button>
                <button className={NAVBARSTYLES.button} data-text="Awesome"
                    id='ContactNAVHeadingMob' onClick={(e) => HeadingClicked(e, "Contact")}>
                    <span className={NAVBARSTYLES.actualText}>&nbsp;Contact&nbsp;</span>
                    <span aria-hidden="true" className={NAVBARSTYLES.hoverText}>&nbsp;Contact&nbsp;</span>
                </button>
            </nav>
        </div>
    )
}

export default MobileNavbar