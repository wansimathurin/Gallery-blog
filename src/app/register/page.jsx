"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'; 

export default function Page() {
  // navigate user to login page
  const navigation = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Create an instance of Notyf
      const notyf = new Notyf({
        duration: 1000,
        position: {
          x: 'right',
          y: 'top',
        },
       });
  
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      if (res.status === 201) {
        navigation.push("/login?success=Account has been created");
      }else if (res.status === 400){
        notyf.error('User already');
      }else{
        notyf.error('Please fill out the form');
      }
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <div className={styles.container}> <h1>Signed Up</h1> <br />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="name"
          className={styles.input}
          required
          onChange={(e)=>setUsername(e.target.value)}
        />
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
        <button className={styles.button}>Register</button>
      </form>
      <Link href="/login" style={{marginTop:20,color:'#0EC093'}}>Already have an account ? Login</Link>
    </div>
  );
}
