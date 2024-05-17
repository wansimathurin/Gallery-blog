import React from 'react'
import styles from './page.module.css'
import Image from 'next/image';
import Link from 'next/link';


async function getData(id) {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }
   
 async function page({params}) {
    const id = params.id;
    const data = await getData(id);
    const item =data
  return (
    <div className={styles.container}>
      <Image src={item.img}  
      alt={item.title} width={700}  
      height={520} 
      className={styles.image} />
      <div>
        <h1>Welcome</h1>
        <p>Type: Post</p>
         <p className={styles.desc}>{item.description}</p>

         <button className={styles.button}>Contact Photographer</button>
      </div>
    </div>
  )
}

export default page
