'use client'
import Image from "next/image";
import styles from './page.module.css'
import Hero from "@/components/Hero/Hero";
import Link from "next/link";
import { useEffect,useState } from "react";
import axios from "axios";
 
 function Home() {
  const [data, setData] = useState([])
  //Get data
  // async function getData() {
  //   const res = await fetch('http://localhost:3000/api/posts')
  //   if (!res.ok) {
  //     throw new Error('Failed to fetch data')
  //   }
  //   setData(await res.json())
  // }
   const getAsyncData = async () => {
      await axios.get('http://localhost:3000/api/posts').then(res => {
       setData(res.data);
         console.log(res.data);
     }).catch(error=>console.log(error.message))
     
   
   }
   useEffect(() => {
     getAsyncData();
  // getData()
  }, [])
  return (
    <>
     <Hero />
     <div className={styles.container}>
      {data?.map(item=>(
        <Link href={`/${item._id}`} className={styles.card} key={item.id}>
          <Image src={item.img}  alt={item.title} width={300}  height={2} className={styles.image} />
        </Link>
      ))}
  
   </div>
    </>
 
  );
}
export default Home 