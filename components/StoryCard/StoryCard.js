import styles from "./StoryCard.module.css"

function StoryCard({thumbnail, title, creatorName}) {
  return (
    <div className={styles.storyCard}>
        <img src={thumbnail} className={styles.thumbnail}/>
        <h2 className={styles.title}>{title}</h2>
        <h4>{creatorName}</h4>
    </div>
  )
}

export default StoryCard