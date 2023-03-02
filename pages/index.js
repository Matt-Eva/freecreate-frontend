import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
// import { TestContext } from '../context/test_context'
import {useContext, useEffect} from 'react'

import Header from "../components/Header/Header"
import Sidebar from '../components/Sidebar/Sidebar'
import Content from '../components/Content/Content'
import Browse from '../components/Browse/Browse'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  return (
    <>
      <Head>
        <title>FreeCreate</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.home}>
        <Header />
        <div className={styles.main}>
          <Sidebar />
          <Browse />
          <Content />
        </div>
      </div>
    </>
  )
}
