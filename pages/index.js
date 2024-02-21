import Introduction from '@/components/Introduction'
import ThemeChanger from '@/components/ThemeChanger'
import React, { createContext, useEffect, useState } from 'react'
import Navbar from '@/components/Navbar';
import { light } from '@/components/Themes';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import MobileNavbar from '@/components/MobileNavbar';


export const ThemeContext = createContext(null)

function Home() {
    const [theme, setTheme] = useState(light)
    const [device, setDevice] = useState()
    const [showing, setShowing] = useState("Introduction")

    const [scrolled, setScrolled] = useState(0)

    const [mobNavOpened, setMobNavOpened] = useState(false)

    useEffect(() => {
        const deviceWidth = window.innerWidth
        if (deviceWidth < 768) {
            setDevice('MOBILE')
        } else {
            setDevice('PC')
        }

        window.addEventListener('resize', (e) => {
            const deviceWidth = window.innerWidth
            if (deviceWidth < 768) {
                setDevice('MOBILE')
            } else {
                setDevice('PC')
            }
        })
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, device, showing, scrolled }}>
            <div className='w-full h-full overflow-x-hidden relative' onClick={(e) => {
                if (device == "MOBILE" && mobNavOpened) {
                    setMobNavOpened(false)
                }
            }}>
                {
                    device == "MOBILE" ?
                        <MobileNavbar setShowing={setShowing} mobNavOpened={mobNavOpened} setMobNavOpened={setMobNavOpened} /> : device == "PC" ?
                            <Navbar setShowing={setShowing} /> : ""
                }
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