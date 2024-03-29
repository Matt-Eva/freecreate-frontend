import styles from "./Header.module.css"
import Modal from "@mui/material/Modal"
import {useState, useContext} from "react"
import { UserContext } from '../../context/user_context'
import LoginModal from "../LoginModal/LoginModal"
import Link from "next/link"

function Header() {


  return (
    <div className={styles.header}>
      <h1><Link href="/">FreeCreate</Link></h1>
      <div className={styles.links}>
        <p>Donate</p>
        <p>About</p>
        <p>FAQs</p>
      </div>
      <LoginModal />
    </div>
  )
}

export default Header