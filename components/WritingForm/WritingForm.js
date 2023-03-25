import styles from "./WritingForm.module.css"

function WritingForm() {

    const handleSelection = (e) =>{
        console.log(document.getSelection().anchorNode.parentNode)
    }
  return (
    <div>
        <div contentEditable={true} className={styles.writingForm} onSelect={handleSelection}>

        </div>
    </div>
  )
}

export default WritingForm