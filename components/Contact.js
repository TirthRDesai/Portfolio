import { ThemeContext } from '@/pages'
import React, { useContext, useEffect, useState } from 'react'
import { light } from './Themes'
import { FiPhoneCall } from 'react-icons/fi'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import styles from '@/styles/Contact.module.css'


// const createFormField = (control, name, label, )

function Contact() {
    const ThemeCon = useContext(ThemeContext)
    const [theme, setTheme] = useState(light)
    const [device, setDevice] = useState('PC')


    useEffect(() => {
        if (ThemeCon) {
            setTheme(ThemeCon.theme)
            setDevice(ThemeCon.device)
        }
    }, [ThemeCon])

    useEffect(() => {
        if (theme) {
            const labels = document.getElementsByClassName(styles.formlabel)
            let textColor = theme.text
            if (theme.type == "dark") {
                textColor = "#E2DFD2"
            }
            for (let i = 0; i < labels.length; i++) {
                labels[i].style.color = textColor
            }

            const heading = document.getElementsByClassName(styles.formHeading)
            for (let i = 0; i < heading.length; i++) {
                heading[i].style.color = textColor
            }

            // console.log(heading[0].children)

            const icon = heading[0].children[0]
            if (theme.type == "dark") {
                icon.color = "#E2DFD2"
            } else {
                icon.color = theme.text
            }

            const submitBtn = document.getElementById("submitBtn")
            if (theme.type == "dark") {
                submitBtn.style.backgroundColor = theme.primary
                submitBtn.style.color = theme.accent

            } else {
                submitBtn.style.backgroundColor = "#0b1623"
                submitBtn.style.color = "#E2DFD2"
            }

            submitBtn.addEventListener("mouseenter", () => {
                submitBtn.animate([{
                    opacity: 1
                }, {
                    opacity: 0.8
                }], {
                    duration: 300,
                    iterations: 1,
                    fill: 'forwards'
                })
            })

            submitBtn.addEventListener("mouseleave", () => {
                submitBtn.animate([{
                    opacity: 0.8
                }, {
                    opacity: 1
                }], {
                    duration: 300,
                    iterations: 1,
                    fill: 'forwards'
                })
            })

        }
    }, [theme])


    // useEffect(() => {
    //     if (theme.type === light) {
    //         setClassNameForButton('light')
    //     } else {
    //         setClassNameForButton('dark')
    //     }
    // }, [theme])


    const [details, setDetails] = useState({
        fname: '',
        lname: '',
        email: '',
        company: '',
        message: ''
    })

    const formSubmitted = (e) => {
        e.preventDefault()


        const data = {
            fname: details.fname.trim(),
            lname: details.lname.trim(),
            email: details.email.trim(),
            company: details.company.trim(),
            message: details.message.trim()
        }

        if (data.fname !== '' && data.email !== '' && data.message !== '') {
            console.log(data)
        } else {

        }

    }

    return (
        <div className={`w-[100vw] h-[100vh] flex flex-col items-center justify-evenly transition-all duration-700`} style={{
            backgroundColor: theme.body,
        }} id='Contact'>

            <form onSubmit={(e) => formSubmitted(e)} className='mt-[5%] overflow-hidden w-full flex items-center justify-center' autoComplete='none'>
                <fieldset className='flex flex-col gap-3 items-center justify-center max-w-full w-[700px] px-4 max-h-full'>

                    <span className={styles.formHeading + ` text-[#E2DFD2] text-[1.8em] font-bold flex flex-row justify-center pr-[1em] items-center w-full transition-all duration-700`}>
                        <FiPhoneCall className='inline-block transition-all duration-700 mr-5 size-[1em]' color={theme.iconColor} />{device == 'PC' ? "Let's work together!" : "Contact Me!"}
                    </span>

                    <div className='flex flex-row gap-4 w-full items-center mt-2 justify-center'>
                        <div className='flex flex-col flex-grow-1 gap-2 w-full'>
                            <Label className={styles.formlabel + ' text-white'}>First Name<span className={styles.required}>*</span></Label>
                            <Input type='text' label='First Name' autoComplete="none" value={details.fname} onChange={(e) => setDetails({ ...details, fname: e.target.value })} placeholder="First Name" />

                        </div>
                        <div className='flex flex-col flex-grow-1 gap-2 w-full'>
                            <Label className={styles.formlabel + ' text-white'}>Last Name</Label>
                            <Input autoComplete="none" type='text' label='Last Name' value={details.lname} onChange={(e) => setDetails({ ...details, lname: e.target.value })} placeholder="Last Name" />
                        </div>
                    </div>

                    <Label className={styles.formlabel + ' text-white w-full text-start'}>Email<span className={styles.required}>*</span></Label>
                    <Input type='text' label='Email' autoComplete="none" placeholder="Email" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} />

                    <Label className={styles.formlabel + ' text-white w-full text-start'}>Company</Label>
                    <Input type='text' label='Company' autoComplete="none" placeholder="Company" value={details.company} onChange={(e) => setDetails({ ...details, company: e.target.value })} />

                    <Label className={styles.formlabel + ' text-white w-full text-start'}>Message<span className={styles.required}>*</span></Label>
                    <Textarea type='textarea' placeholder="Type your message here...." label='Message' autoComplete="none" value={details.message} onChange={(e) => setDetails({ ...details, message: e.target.value })} className='resize-none text-base ' />
                    <Button type='submit' id="submitBtn" label='Submit' className={styles.sendButton + " w-[70%]"}>Connect</Button>
                </fieldset>
            </form>
        </div>
    )
}

export default Contact