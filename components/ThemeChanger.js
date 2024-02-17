import React, { useContext, useEffect, useState } from 'react'
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import { dark, light } from './Themes';
import { ThemeContext } from '@/pages';

function ThemeChanger({ Theme, setTheme }) {
    const ThemeCon = useContext(ThemeContext)

    const [hoverColor, setHoverColor] = useState('#ccc')

    useEffect(() => {
        if (Theme.type == "light") {
            setHoverColor('#ccc')
        } else {
            setHoverColor('#fff')
        }

    }, [Theme])

    return (
        <span className=' bottom-4 right-4 border-2 rounded-full border-collapse z-40 fixed'>


            <label class="bb8-toggle" onClick={(e) => {
                if (e.target.checked) {
                    setTheme(dark)
                } else {
                    setTheme(light)
                }
            }}>
                <input class="bb8-toggle__checkbox" type="checkbox" onClick={(e) => {
                    if (e.target.checked) {
                        setTheme(dark)
                    } else {
                        setTheme(light)
                    }
                }} />
                <div class="bb8-toggle__container">
                    <div class="bb8-toggle__scenery">
                        <div class="bb8-toggle__star"></div>
                        <div class="bb8-toggle__star"></div>
                        <div class="bb8-toggle__star"></div>
                        <div class="bb8-toggle__star"></div>
                        <div class="bb8-toggle__star"></div>
                        <div class="bb8-toggle__star"></div>
                        <div class="bb8-toggle__star"></div>
                        <div class="tatto-1"></div>
                        <div class="tatto-2"></div>
                        <div class="gomrassen"></div>
                        <div class="hermes"></div>
                        <div class="chenini"></div>
                        <div class="bb8-toggle__cloud"></div>
                        <div class="bb8-toggle__cloud"></div>
                        <div class="bb8-toggle__cloud"></div>
                    </div>
                    <div class="bb8">
                        <div class="bb8__head-container">
                            <div class="bb8__antenna"></div>
                            <div class="bb8__antenna"></div>
                            <div class="bb8__head"></div>
                        </div>
                        <div class="bb8__body"></div>
                    </div>
                    <div class="artificial__hidden">
                        <div class="bb8__shadow"></div>
                    </div>
                </div>
            </label>
        </span>
    )
}

export default ThemeChanger