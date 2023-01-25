import styles from "./Sidebar.module.css"

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>My Writing</li>
        <li>My List</li>
        <li>My Library</li>
        <li>Liked Writing</li>
      </ul>
    </div>
  )
}

export default Sidebar