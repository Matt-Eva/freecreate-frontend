import styles from "./ViewWriting.module.css"
import formatContent from "./FormatContent"

function ViewWriting({story}) {
  return (
    <div className={styles.viewWriting}>
      {story.content}
    </div>
  )
}

export default ViewWriting