'use client'
import React from 'react'
import styles from  './Navbar.module.css'
import Link from 'next/link';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

const Navbar = () => {
    const links = [
        {name: 'Home', href: '/'},
        {name: 'About', href: '/about'},
        {name: 'Contact', href: '/contact'},
        {name: 'Blog', href: '/blog'},
        {name: 'Login', href: '/login'},
        {name: 'Register', href: '/register'}
    ];
  return (
    <div className={styles.container}>
        <Link href="/">
           <h1 style={{color:'#0EC093',marginLeft:50}}> logo</h1>
        </Link>
       <div className={styles.linksContainer}>
             <DarkModeToggle />
            {links.map((link,index) => (
                <Link href={link.href} className={styles.link} key={index}>{link.name}</Link>
            ))}
            <Link href={'/login'} className={styles.linkSpecial}>Login</Link>
       </div>
    </div>
  )
}

export default Navbar
