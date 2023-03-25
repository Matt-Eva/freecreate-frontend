import styles from "./ViewWriting.module.css"

function ViewWriting({story}) {
  return (
    <div className={styles.viewWriting}>
      {story.content}
    </div>
  )
}

export default ViewWriting