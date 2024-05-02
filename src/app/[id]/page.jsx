import React from 'react'
import styles from './page.module.css'
import Image from 'next/image';
import Link from 'next/link';


async function getData(id) {
    const res = await fetch(`https://pixabay.com/api/?key=19926008-b9e8fc0039d8af8f8061550dc&id=${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }
   
 async function page({params}) {
    const id = params.id;
    const data = await getData(id);
    const item =data.hits[0]
  return (
    <div className={styles.container}>
      <Image src={item.webformatURL}  
      alt={item.tags} width={700}  
      height={520} 
      className={styles.image} />
      <div>
        <h1>Welcome</h1>
        <p>Type: {item.type}</p>
         <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nihil repellat neque commodi culpa in quia quo nisi fuga soluta!</p>
         <div>
            {item.tags.split(',').map((tag,index)=>(
                <Link href='#' className={styles.tag} key={index}>{tag}</Link>
            ))}
         </div>
         <button className={styles.button}>Contact Photographer</button>
      </div>
    </div>
  )
}

export default page
