import styles from "./Sidebar.module.css"
import Link from "next/link"

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li><Link href="/create-writing">Create</Link></li>
        <li>My Writing</li>
        <li>My List</li>
        <li>My Library</li>
        <li>Liked Writing</li>
      </ul>
    </div>
  )
}

export default Sidebar