import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'

function page() {
  return (
    <div className={styles.container}>
      <Link href={'/dashboard/posts'} style={{marginTop:20,color:'#0EC093'}}>Posts</Link>
    </div>
  )
}

export default page
