"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notyf } from "notyf";
import 'notyf/notyf.min.css'; 
import Link from "next/link";



const Page = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const [content, setContent] = useState('');

  const [loading, setLoading] = useState(false)
  



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
 

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = async() => {
        const base64Image = reader.result;
        console.log('Base64 representation:', base64Image);
        try {
          const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              description,
              img:base64Image,
              content,
              username: session?.user?.name,
            }),
          });
          if (response.status === 201) {
            const result = await response.json();
            console.log(result);
            setLoading(false);
            notyf.success('successfully Created');
            navigation.push('/dashboard/posts')
          } else {
            setLoading(false);
            notyf.error('Creation Error');
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
    };
  
  };
  

  const handleImageDisplay = () => {
    console.log('image uploaded: ',img);
    if (img) {
      return (
        <div className={styles.selectedImage}>
          <Image className={styles.image} fill={true} src={URL?.createObjectURL(img)} alt="Selected Image" />
        </div>
      );
    } else {
      return <div>No image selected</div>;
    }
  };
  return (
    <div className={styles.container}>
      {/* <LoadingOverlay fullPage loading={loading} /> */}
      <div className={styles.signCard}>
        <h1>Create Post</h1> <br />
        <form className={styles.form} onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="title" 
          className={styles.input}
          required
          onChange={(e)=>setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className={styles.input}
          required
          onChange={(e)=>setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content"
          className={styles.input}
          required
          onChange={(e)=>setContent(e.target.value)}
        />
        <input
          type="file"
          className={styles.input}
          required
          accept="image/png, image/jpg, image/jpeg"
          onChange={(e) => setImg(e.target.files[0])}
        />
       {handleImageDisplay()}
        <button className={styles.button}>Create</button>
        </form>
      
       
      </div>
    </div>
  );
};

export default Page;
