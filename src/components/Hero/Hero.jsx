import React from 'react'
import styles from './Hero.module.css'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className={styles.container}>
       <div className={styles.leftContent} >
       <h1 className={styles.title}>
        Welcome to our best experience designs.
      </h1>
      <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit velit, earum eveniet eaque voluptate ipsa.</p>
      <button className={styles.button}>Learn More</button>
       </div>

      <div className={styles.imageContainer}>
        <Image 
         src='/man.png'
         alt='girl picture'
         className={styles.image}
        fill={true}
        />
      </div>
    </div>
  )
}

export default Hero
