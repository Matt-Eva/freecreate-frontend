import styles from "../styles/CreateWriting.module.css"
import Header from "../components/Header/Header"
import Sidebar from "../components/Sidebar/Sidebar"
import WritingForm from "../components/WritingForm/WritingForm"

function CreateWriting() {
  return (
    <div className={styles.createWriting}>
        <Header />
        <div className={styles.main}>
            <Sidebar />
            <WritingForm />
        </div>
    </div>
  )
}

export default CreateWriting