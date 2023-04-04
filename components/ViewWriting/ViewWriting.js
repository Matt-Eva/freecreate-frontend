import styles from "./ViewWriting.module.css"
import formatContent from "./FormatContent"

function ViewWriting({story}) {
  const formattedContent = formatContent(story.content)
  return (
    <div className={styles.viewWriting}>
      {formattedContent}
    </div>
  )
}

export default ViewWriting