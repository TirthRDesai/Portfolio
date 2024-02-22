import React, { useContext, useEffect, useState } from 'react'
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import { dark, light } from './Themes';
import { ThemeContext } from '@/pages';

function ThemeChanger({ Theme, setTheme }) {
    const { device } = useContext(ThemeContext)

    const [hoverColor, setHoverColor] = useState('#ccc')

    useEffect(() => {
        if (Theme.type == "light") {
            setHoverColor('#ccc')
        } else {
            setHoverColor('#fff')
        }

    }, [Theme])

    return (
        <span className=' bottom-4 right-4 border-2 rounded-full border-collapse z-40 fixed'
            style={{
                scale: device == 'PC' ? '1' : '0.6'
            }}
        >


            <label className="bb8-toggle" onClick={(e) => {
                if (e.target.checked) {
                    setTheme(dark)
                } else {
                    setTheme(light)
                }
            }}>
                <input className="bb8-toggle__checkbox" type="checkbox" onClick={(e) => {
                    if (e.target.checked) {
                        setTheme(dark)
                    } else {
                        setTheme(light)
                    }
                }} />
                <div className="bb8-toggle__container">
                    <div className="bb8-toggle__scenery">
                        <div className="bb8-toggle__star"></div>
                        <div className="bb8-toggle__star"></div>
                        <div className="bb8-toggle__star"></div>
                        <div className="bb8-toggle__star"></div>
                        <div className="bb8-toggle__star"></div>
                        <div className="bb8-toggle__star"></div>
                        <div className="bb8-toggle__star"></div>
                        <div className="tatto-1"></div>
                        <div className="tatto-2"></div>
                        <div className="gomrassen"></div>
                        <div className="hermes"></div>
                        <div className="chenini"></div>
                        <div className="bb8-toggle__cloud"></div>
                        <div className="bb8-toggle__cloud"></div>
                        <div className="bb8-toggle__cloud"></div>
                    </div>
                    <div className="bb8">
                        <div className="bb8__head-container">
                            <div className="bb8__antenna"></div>
                            <div className="bb8__antenna"></div>
                            <div className="bb8__head"></div>
                        </div>
                        <div className="bb8__body"></div>
                    </div>
                    <div className="artificial__hidden">
                        <div className="bb8__shadow"></div>
                    </div>
                </div>
            </label>
        </span>
    )
}

export default ThemeChanger