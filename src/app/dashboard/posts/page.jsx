'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { initials } from '@/utils/constants'
import moment from 'moment'
import { Notyf } from "notyf";
import 'notyf/notyf.min.css'; 



function Page() {
    const [mainIndex, setMainIndex] = useState(0)
    const [data, setData] = useState([])
       // Create an instance of Notyf
   const notyf = new Notyf({
    duration: 1000,
    position: {
      x: 'right',
      y: 'top',
    },
   });
    //Get data
    async function getData() {
        const res = await fetch('http://localhost:3000/api/posts')
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        setData(await res.json())
      }
     
      useEffect(() => {
      getData()
      }, [])
   
  // Delete data
  const deletePost = async(id)=>{
    const res = await fetch(`http://localhost:3000/api/posts/${id}`,{
      method:'DELETE'
    })
    if (res.status === 200) {
      const result = await res.json();
      console.log(result);
      notyf.success('successfully Deleted');
     
    } else {
      setLoading(false);
      notyf.error('Delete Error');
    }
    setData(data.filter((data,index)=>index!==mainIndex))
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'start',gap:10,marginBottom:10}}>      <h1 className={styles.topic}>All Posts</h1>  
        <Link href={'/dashboard/posts/create'} className={styles.button} style={{width:150}}>Add</Link></div>
        
        {data?.map((data,index) =>(
           <div onClick={()=>setMainIndex(index)} className={styles.card} key={data?.id}>
           <div className={styles.cardImage}>
           <Image 
               src={data.img}
               alt='girl picture'
               className={styles.image}
               fill={true}
               />
           </div>
           <div>
              <h3 className={styles.title}>{data.title}</h3>
              <p className={styles.cardDesc}>{data.description.slice(0,120)}...</p>
              <div className={styles.userArea}>
           <div className={styles.userImage}>
               <p>{initials(data.username)}</p>
           </div>
           <div className={styles.userName}>
              <h3>{data.username}</h3>
           </div>
          </div>
          <p>{moment(data.createdAt).fromNow()}</p>
           </div>
       </div>
        ))}
       
    
      </div>
      <div className={styles.right}>
          <h1>Pre view</h1>
           <div className={styles.imageArea}>
           <Image 
                src={data && data[mainIndex]?.img}
                alt='girl picture'
                className={styles.image}
               fill={true}
                />
           </div>
           <div className={styles.userArea}>
            <div className={styles.userImage}>
            <p>JD</p>
            </div>
            <div className={styles.userName}>
               <h3>{data[mainIndex]?.username}</h3>
            </div>
           </div>
           <h3 className={styles.mainTitle}>{data[mainIndex]?.title}</h3>
           <p className={styles.description}>{data[mainIndex]?.description}</p>
            <div className={styles.btnArea}>
                <button className={styles.button}>Edit</button>
                <button className={styles.button} onClick={()=> {deletePost(data[mainIndex]?._id); setMainIndex(0)}} style={{backgroundColor:'red'}}>Delete</button>
            </div>
     
      </div>
    </div>
  )
}

export default Page
