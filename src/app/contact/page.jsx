'use client'
import React, { useContext, useRef, useState } from 'react'
import styles from './page.module.css'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'; 
import emailjs from '@emailjs/browser';

function Contact() {
  const [name, setName] = useState('');

  // declare notifications variable


// Display an error notification 
const form = useRef();

const handleEmail=(e)=>{
      e.preventDefault();
      // Create an instance of Notyf
     const notyf = new Notyf({
      duration: 1000,
      position: {
        x: 'right',
        y: 'top',
      },
     });

       emailjs.sendForm('service_7nhrxaa', 'template_g2vcr85', form.current, {
        publicKey: 'qJUA8oq9BoDPnbB9Z',
      }).then(result=>{
        console.log(result);
        notyf.success('Email sent successfully!!');
      }).catch(error=>{
        console.log(error);
        notyf.error('Please fill out the form');
      })
 }
  return (
    <div className={styles.container}>
       <form ref={form} onSubmit={handleEmail}  action="" method="post">
           <h1>contact us</h1>
          <div  className={styles.formGet}>
          <input onChange={value=> setName(value)} type="text"  name="name" placeholder='Enter your name' />
          <input type="text" name="email" placeholder='Enter your email' />
          <input type="tel" name="phone" placeholder='Enter your phone' />
          <textarea name="message" id="" placeholder='Enter your message'></textarea>
          <button className={styles.btn} type="submit">Send email</button>
          </div>

       </form>
    </div>
  )
}

export default Contact