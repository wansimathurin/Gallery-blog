"use client";
import React from "react";
import styles from "./page.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import {Moon,Sun,Google} from 'react-feather'
import Image from "next/image";

const page = () => {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <div className={styles.container}>
        {" "}
         <div className={styles.profileImage}>
         <Image
         src={session.user.image}
         alt='girl picture'
         className={styles.image}
        fill={true}
        />
         </div>
        Signed in as {session.user.email} <br />{" "}
        <button className={styles.button} onClick={() => signOut()}>Sign out</button>{" "}
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {" "}
        <div className={styles.signCard}>
        Not signed in <br />{" "}
      <button className={styles.button} onClick={() => signIn("google")}>Sign in </button>{" "}
        </div>
    </div>
  );
};

export default page;
