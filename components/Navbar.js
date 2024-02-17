import React, { useContext, useEffect, useState } from 'react'
import NAVBARSTYLES from '@/styles/Navbar.module.css'
import { ThemeContext } from '@/pages'
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


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
        if (device) {
            const navbar = document.querySelector('nav')
            if (device == "PC") {
                navbar.style.flexDirection = 'row'
                navbar.style.justifyContent = 'space-evenly'
                navbar.style.height = '100%'
                navbar.parentElement.style.maxHeight = "80px"
                navbar.parentElement.style.height = "auto"
                navbar.style.paddingTop = ''
                navbar.style.paddingBottom = ''
                // navbar.style.minHeight = ''
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
            } else {
                const items = navbar.children
                navbar.classList.replace('flex-row', 'flex-col')
                navbar.style.flexDirection = 'column'
                navbar.style.justifyContent = 'center'
                navbar.style.alignItems = 'center'
                navbar.style.height = items[0].getBoundingClientRect().height + 'px'

                // navbar.style.minHeight = '64px'
                navbar.style.paddingTop = '12px'
                navbar.style.paddingBottom = '12px'

                navbar.style.minWidth = '360px'
                navbar.style.padding = "0px"


                for (let i = 0; i < items.length; i++) {
                    if (items[i].tagName.toLowerCase() === 'a') {
                    } else {
                        items[i].style.display = 'block'
                    }
                }
                if (window.scrollY > 0) {
                    navbar.classList.remove(NAVBARSTYLES.NavScrolled)
                }
            }
        }
    }, [device])

    useEffect(() => {
        if (theme) {
            const navbar = document.querySelector('nav')
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

    return (
        <div className='flex flex-col w-[100vw] overflow-x-hidden fixed justify-start items-center z-50 h-12 '>
            <nav className={NAVBARSTYLES.NavbarUnScrolled + ` h-[90%] py-[10px] flex flex-row justify-evenly items-center z-50 transition-all duration-[0.3s] ease-in relative`}>

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
                {
                    //     <a href='#' className='NAVHeadings text-white text-xl mr-4' id='ExperienceNAVHeading'>
                    //     <button className={NAVBARSTYLES.button} data-text="Awesome">
                    //         <span className={NAVBARSTYLES.actualText}>&nbsp;Experience&nbsp;</span>
                    //         <span aria-hidden="true" className={NAVBARSTYLES.hoverText}>&nbsp;Experience&nbsp;</span>
                    //     </button>
                    // </a>
                }
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