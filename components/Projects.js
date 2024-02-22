import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from '@/styles/Project.module.css'
import BlogSiteImage from '@/public/IMAGES/BlogSite.png'
import { Button } from './ui/button'
import { FaLink } from 'react-icons/fa'
import { MdOpenInNew } from 'react-icons/md'
import { ThemeContext } from '@/pages'
import { motion, useInView, useMotionValueEvent, useScroll } from 'framer-motion'

const Card = ({ title, description, image, link = 'Visit', website }) => {
    const { device } = useContext(ThemeContext)
    const cardRef = useRef(null)
    const [prevScroll, setPrevScroll] = useState(0)

    const isInView = useInView(cardRef, {
        triggerOnce: true,
        threshold: 0.5
    })

    const { scrollY } = useScroll()

    const [isScrollinUp, setIsScrollinUp] = useState(false)

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (latest > prevScroll) {
            setIsScrollinUp(false)
        } else {
            setIsScrollinUp(true)
        }
        setPrevScroll(latest)

    })

    // useEffect(() => {
    //     if (isInView) {
    //         cardRef.current.style.opacity = '1'
    //         cardRef.current.style.transform = 'translateY(0)'
    //     } else {
    //         cardRef.current.style.opacity = '0'
    //         cardRef.current.style.transform = 'translateY(50px)'
    //     }
    // }, [isInView, cardRef, isScrollinUp])

    return (
        <motion.div ref={cardRef} className=' bg-[#F1FAFF] border-2 border-black rounded-lg m-4 w-full flex flex-col items-center justify-center gap-3 p-4 cursor-pointer opacity-0 translate-y-[50px] '

            initial={{
                opacity: 0,
                y: 50
            }}

            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.8,
                    ease: 'easeOut',
                    delay: device == 'PC' ? 0.3 : 0.1
                }
            }}

            style={{
                scale: 0.8
            }}

            whileHover={{
                scale: device == "PC" ? 0.9 : 0.8,
                transition: {
                    duration: 0.4,
                    ease: 'easeInOut'
                }
            }}
        >
            <div className={styles.cardContainer} onClick={(e) => {
                e.preventDefault()
                if (link != "Visit") {
                    window.open(`https://${link}`, '_blank')
                }
            }}>
                <div className={styles.card}>
                    <div className={styles.imgContent}>
                        {image != '' ? <Image src={image} alt={title} priority className=' object-fill h-full w-full' height={200} width={200} /> : ""}
                    </div>
                    <div className={styles.content}>
                        <p className={styles.heading}>{title}</p>
                        <p>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
            <Button className={styles.visitbtn + " text-center bg-[hsla(0,0%,100%,.9)] border-[1px] rounded-full hover:bg-[hsla(0,0%,100%,.9)] transition-all hover:scale-105 duration-200 ease-out w-fit border-black  text-black mt-4"} onClick={(e) => {
                e.preventDefault()
                window.open(`https://${link}`, '_blank')
            }}>{device == 'PC' ? link : title} <MdOpenInNew className='ml-3' /></Button>

        </motion.div>
    )
}

function Projects() {

    const { theme, device, showing, scrolled } = useContext(ThemeContext)

    return (
        <div className={styles.boxes + ' w-[100vw] h-[200vh] flex flex-col gap-10 transition-all duration-700'} id='Projects' style={{
            background: theme.Projects.Background,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center'
        }}>
            <h1 className=' transition-all duration-400 ease-in-out delay-100 text-5xl font-bold w-full underline underline-offset-8 text-center mt-20' style={{
                color: theme.Projects.TextColor
            }}>Projects</h1>
            <div className={styles.gridContainer}>
                <Card title='Blog Site' description='People can share blog over here' image={BlogSiteImage} link={'blog-site-gamma-umber.vercel.app'} />
                <Card title='Coming Soon...' description='' image='' />
                <Card title='Coming Soon...' description='' image='' />
                <Card title='Coming Soon...' description='' image='' />
                <Card title='Coming Soon...' description='' image='' />
                <Card title='Coming Soon...' description='' image='' />
            </div>
        </div>
    )
}

export default Projects