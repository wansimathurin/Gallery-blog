"use client";
import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
    { name: "Login", href: "/login" },
    { name: "Dashboard", href: "/dashboard" },
  ];
  const authLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];
  return (
    <div className={styles.container}>
      <Link href="/">
        <h1 style={{ color: "#0EC093", marginLeft: 50 }}> logo</h1>
      </Link>
      <div className={styles.linksContainer}>
        <DarkModeToggle />
        {!session
          ? links.map((link, index) => (
              <Link href={link.href} className={styles.link} key={index}>
                {link.name}
              </Link>
            ))
          : authLinks.map((link, index) => (
              <Link href={link.href} className={styles.link} key={index}>
                {link.name}
              </Link>
            ))}
        
        {session && (
          <div className={styles.profileImage}>
            <Image
              src={session.user.image}
              alt="girl picture"
              className={styles.image}
              fill={true}
            />
          </div>
        )}
        <Link href={"/login"} className={styles.linkSpecial}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
