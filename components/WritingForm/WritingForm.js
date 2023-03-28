import styles from "./WritingForm.module.css";
import { useState } from "react";
import dynamic from "next/dynamic"
const ReactQuill = dynamic(() => import("react-quill"), {ssr:false})
import DOMPurify from 'dompurify'

import 'react-quill/dist/quill.snow.css';

function WritingForm() {
    const [value, setValue] = useState('');

    console.log(value)

    const quillModules = {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image', 'video'],
          ['clean']
        ]
      };
    const quillFormats = [    'header',    'font',    'size',    'bold',    'italic',    'underline',    'strike',    'blockquote',    'list',    'bullet',    'indent',    'link',    'image',    'video'  ];
    
    const handleChange = (e) => {
        const clean = DOMPurify.sanitize(e)
        console.log(clean)
    }

  return (
      <div>
        <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={handleChange} 
        modules={quillModules}
        formats={quillFormats}
        placeholder="Start writing..."
        className={styles.writingForm}
        />
        </div>
  );
}

export default WritingForm