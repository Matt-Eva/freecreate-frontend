import styles from "./WritingForm.module.css"
import { useState } from "react"

function WritingForm() {
    const [formInput, setFormInput] = useState()

    const handleSelection = (e) =>{
        console.log(document.getSelection().anchorNode)
    }

    const handleChange = (e) =>{
        console.log(e.target.childNodes)
        console.log(e.target.innerHTML)
       
    }

  return (
    <div>
        <div contentEditable={true} className={styles.writingForm} onInput={handleChange} onSelect={handleSelection}>
        </div>
    </div>
  )
}

export default WritingForm