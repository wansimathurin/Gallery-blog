import Image from "next/image";
import styles from './page.module.css'
import Hero from "@/components/Hero/Hero";
import Link from "next/link";


async function getData() {
  const res = await fetch('https://pixabay.com/api/?key=19926008-b9e8fc0039d8af8f8061550dc&per_page=100&q=paris');
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
 
export default async function Home() {
  const data = await getData()
  
  return (
    <>
     <Hero />
     <div className={styles.container}>
      {data.hits.map(item=>(
        <Link href={`/${item.id}`} className={styles.card} key={item.id}>
          <Image src={item.webformatURL}  alt={item.tags} width={300}  height={2} className={styles.image} />
        </Link>
      ))}
  
   </div>
    </>
 
  );
}
