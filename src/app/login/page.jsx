"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Notyf } from "notyf";
import 'notyf/notyf.min.css'; 
import Link from "next/link";

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useRouter()
   // Create an instance of Notyf
   const notyf = new Notyf({
    duration: 1000,
    position: {
      x: 'right',
      y: 'top',
    },
   });
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <div className={styles.container}>
       
        <div className={styles.profileImage}>
          <Image
            src={session.user.image}
            alt="girl picture"
            className={styles.image}
            fill={true}
          />
        </div>
        Signed in as {session.user.email} <br />
        <button className={styles.button} onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/authentication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 200) {
          console.log(res);
          navigation.push("/");
          notyf.success('User successfully Logged In');
          
      }else{
        notyf.error('User not found');
      }
    } catch (error) {
      console.log(error);
      
    }

  }
  return (
    <div className={styles.container}>
      <div className={styles.signCard}>
        <h1>Sign in</h1> <br />
        <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email" 
          className={styles.input}
          required
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          required
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button className={styles.button}>Login</button>
        </form>
        -or-
        <button className={styles.button} onClick={() => signIn("google")}>
          Sign in with
          <FcGoogle size={30} />
        </button>
      </div>
      <Link href="/register" style={{marginTop:20,color:'#0EC093'}}>Do not  have an account ? Register</Link>
    </div>
  );
};

export default Page;
