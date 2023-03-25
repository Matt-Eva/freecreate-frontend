import styles from "./StoryCard.module.css"
import Link from "next/link"

function StoryCard({thumbnail, title, creator_name, username}) {
  return (
    <div className={styles.storyCard}>
        <img src={thumbnail} className={styles.thumbnail}/>
        <h2 className={styles.title}><Link href={`/view/${username}/${creator_name}/${title}`}>{title}</Link></h2>
        <h4>{creator_name}</h4>
    </div>
  )
}

export default StoryCard