import styles from "./StoryCard.module.css"
import Link from "next/link"

function StoryCard({thumbnail, title, creatorName, username}) {
  return (
    <div className={styles.storyCard}>
        <img src={thumbnail} className={styles.thumbnail}/>
        <h2 className={styles.title}><Link href={`/view/${username}/${creatorName}/${title}`}>{title}</Link></h2>
        <h4>{creatorName}</h4>
    </div>
  )
}

export default StoryCard