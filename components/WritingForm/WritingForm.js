import styles from "./WritingForm.module.css";
import { useState } from "react";
import dynamic from "next/dynamic"
import DOMPurify from 'dompurify'
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import("react-quill"), {ssr:false})


function WritingForm() {

  const initialGenreState = {
    noGenre: true,
    comedy: [false, "Comedy"],
    drama: [false, "Drama"],
    erotica: [false, "Erotica"],
    fantasy: [false, "Fantasy"],
    historicalFiction: [false,"Historical Fiction"],
    horror: [false, "Horror"],
    literaryFiction: [false, "Literary Fiction"],
    magicalRealism: [false, "Magical Realism"],
    mystery: [false, "Mystery"],
    romance: [false, "Romance"],
    sciFi: [false, "Science Fiction"],
    socialFiction: [false, "Social Fiction"],
    specFiction: [false, "Speculative Fiction"],
    thriller: [false, "Thriller"],
}

  const quillModules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
    ]
  };
  const quillFormats = [    'header',    'font',    'size',    'bold',    'italic',    'underline',    'strike',    'blockquote',    'list',    'bullet',    'indent',    'link',    'image'  ];


  const [content, setContent] = useState('');
  const [genres, setGenres] = useState(initialGenreState);
  const [selectedGenres, setSelectedGenres] = useState(["No Genre"]);
  const [newTag, setNewTag] = useState("")
  const [tags, setTags] = useState([])
  const [submission, setSubmission] = useState([])

  const displayGenre = [...selectedGenres].join("-")

  const displayTags = tags.map(tag =>{
    return <span key={tag} onClick={deleteTag} className={styles.tag}>{tag}</span>
})

  const disableNewTagField = tags.length >= 5 
  const disableNewTagButton = tags.length >= 5 || newTag === ""
  
  const handleChange = (e) => {
    const clean = DOMPurify.sanitize(e)
    setContent(clean)
  }

  const handleGenreSelection = (e) =>{
    if(e.target.id === "noGenre"){
      setGenres(initialGenreState)
      setSelectedGenres(["No Genre"])
  } else {
      setGenres({...genres,
          [e.target.id]: [!genres[e.target.id][0], genres[e.target.id][1]],
          noGenre: false
      })
      let newGenres = [...selectedGenres]
      if(selectedGenres[0]==="No Genre"){  
          newGenres = [genres[e.target.id][1]]
      }else if (genres[e.target.id][0] && selectedGenres.length === 1){
          newGenres = ["No Genre"]
          setGenres(initialGenreState)
      }
      else if (!genres[e.target.id][0]){
          newGenres.push(genres[e.target.id][1])
      } else {
          newGenres = selectedGenres.filter(genre => genre !== genres[e.target.id][1])
      }
      newGenres.sort()
      setSelectedGenres(newGenres)
    }
  }

  function deleteTag (e) {
    const oneLess = tags.filter(tag => tag !== e.target.textContent)
    setTags(oneLess)
  }

  function addTag (e) {
    e.preventDefault()
    if (tags.includes(newTag)){
        setNewTag("")
        return
    }
    setTags([...tags, newTag])
    setNewTag("")
  }

  function cleanContent(content){
    console.log(typeof content)
    console.log(content)
    
  }

  async function post() {

    const splitArray = content.split(/(<.*?>)/)
    const structuredArray = []
    let i = 0
    while(i < splitArray.length){
        if (splitArray[i] === ''){
            i++
            continue
        } else if (splitArray[i] === '<p>'){
            let d = i
            const contentObj = {
                type: "p",
                content: []
            }
            const subArray = []
            while(splitArray[d + 1] !== '</p>'){
                d++
                subArray.push(splitArray[d])
            }
            contentObj.content = subArray
            structuredArray.push(contentObj)
        } else if (splitArray[i] === '<h1>'){
            let d = i
            const contentObj = {
                type: "h1",
                content: []
            }
            const subArray = []
            while(splitArray[d + 1] !== '</h1>'){
                d++
                subArray.push(splitArray[d])
            }
            contentObj.content = subArray
            structuredArray.push(contentObj)
        } else if (splitArray[i] === '<h2>'){
            let d = i
            const contentObj = {
                type: "h2",
                content: []
            }
            const subArray = []
            while(splitArray[d + 1] !== '</h2>'){
                d++
                subArray.push(splitArray[d])
            }
            contentObj.content = subArray
            structuredArray.push(contentObj)
        } else if (splitArray[i] === '<blockquote>'){
            let d = i
            const contentObj = {
                type: "blockquote",
                content: []
            }
            const subArray = []
            while(splitArray[d + 1] !== '</blockquote>'){
                d++
                subArray.push(splitArray[d])
            }
            contentObj.content = subArray
            structuredArray.push(contentObj)
        } else if (splitArray[i] === '<ol>'){
            let d = i
            const contentObj = {
                type: "ol",
                content: []
            }
            const subArray = []
            while(splitArray[d + 1] !== '</ol>'){
                subArray.push(splitArray[d])
                d++
            }
            contentObj.content = subArray
            structuredArray.push(contentObj)
        }else if (splitArray[i] === '<ul>'){
            let d = i
            const contentObj = {
                type: "ul",
                content: []
            }
            const subArray = []
            while(splitArray[d + 1] !== '</ul>'){
                subArray.push(splitArray[d])
                d++
            }
            contentObj.content = subArray
            structuredArray.push(contentObj)
        }
        i++
    }
    console.log(structuredArray)
    setSubmission(structuredArray)
      
      const clean = cleanContent(content)
    // const newWriting = {
    //   content: content,
    //   genre: displayGenre,
    //   tags: tags
    // }
    // const configObj = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(newWriting)
    // }
    // fetch(process.env.NEXT_PUBLIC_BASE_URL + "/stories", configObj)
  }

  function formatContent(content){
    let contentArray = []
    let i = 0
    while (i < content.length){
        
        if (content[i] === "<br>"){
            contentArray.push(<br/>)
        }
        else if (content[i] === "<strong>"){
            let d = i
            let strongArray = []
            while (content[d + 1] !== "</strong>"){
                d++
                if (content[d] === "<em>"){
                    let q = d
                    let emArray = []
                    while(content[q + 1] !== "</em>"){
                        q++
                        if (content[q] === "<s>"){
                            let z = q
                            let sArray = []
                            while (content[z + 1] !== "</s>"){
                                z++
                                if (content[z] === "<u>"){
                                    let w = z
                                    let uArray = []
                                    while(content[w + 1] !=="</u>"){
                                        w++
                                        uArray.push(content[w])
                                    }
                                    const uString = <u>{uArray}</u>
                                    sArray.push(uString)
                                    z = w + 1
                                } else{
                                    sArray.push(content[z])
                                }
                            }
                            const sString = <s>{sArray}</s>
                            emArray.push(sString)
                            q = z + 1
                        } else if (content[q] === "<u>"){
                            let s = q
                            let uArray = []
                            while(content[s+1] !=="</u>"){
                                s++
                                uArray.push(content[s])
                            }
                            const uString = <u>{uArray}</u>
                            emArray.push(uString)
                            q = s + 1
                        } else {
                            emArray.push(content[q])
                        }
                    }
                    d = q + 1
                    const emString = <em>{emArray}</em>
                    strongArray.push(emString)
                } else if (content[d] === "<s>"){
                    let s = d
                    let sArray = []
                    while (content[s + 1] !== "</s>"){
                        s++
                        if (content[s] === "<u>"){
                            let w = s
                            let uArray = []
                            while(content[w + 1] !=="</u>"){
                                w++
                                uArray.push(content[w])
                            }
                            const uString = <s>{uArray}</s>
                            sArray.push(uString)
                            s = w + 1
                        } else{
                            sArray.push(content[s])
                        }
                    }
                    const sString = <u>{sArray}</u>
                    strongArray.push(sString)
                    d = s + 1
                } else if (content[d] === "<u>"){
                    let w = d
                    let uArray = []
                    while(content[w + 1] !=="</u>"){
                        w++
                        uArray.push(content[w])
                    }
                    const uString = <s>{uArray}</s>
                    strongArray.push(uString)
                    d = w + 1
                } else {
                    strongArray.push(content[d])
                }
            }
            i = d + 1
            const strongEl = <strong>{strongArray}</strong>
            contentArray.push(strongEl)
        } else if (content[i] === "<em>"){
            let q = i
            let emArray = []
            while(content[q + 1] !== "</em>"){
                q++
                if (content[q] === "<s>"){
                    let z = q
                    let sArray = []
                    while (content[z + 1] !== "</s>"){
                        z++
                        if (content[z] === "<u>"){
                            let w = z
                            let uArray = []
                            while(content[w + 1] !=="</u>"){
                                w++
                                uArray.push(content[w])
                            }
                            const uString = <u>{uArray}</u>
                            sArray.push(uString)
                            z = w + 1
                        } else{
                            sArray.push(content[z])
                        }
                    }
                    const sString = <s>{sArray}</s>
                    emArray.push(sString)
                    q = z + 1
                } else if (content[q] === "<u>"){
                    let s = q
                    let uArray = []
                    while(content[s+1] !=="</u>"){
                        s++
                        uArray.push(content[s])
                    }
                    const uString = <u>{uArray}</u>
                    emArray.push(uString)
                    q = s + 1
                } else {
                    emArray.push(content[q])
                }
            }
            i = q + 1
            const emString = <em>{emArray}</em>
            contentArray.push(emString)
        } else if (content[i] === "<s>"){
            let s = i
            const sArray = []
            while (content[s + 1] !== "</s>"){
                s++
                if (content[s] === "<u>"){
                    let w = s
                    let uArray = []
                    while(content[w + 1] !=="</u>"){
                        w++
                        uArray.push(content[w])
                    }
                    const uString = <u>{uArray}</u>
                    sArray.push(uString)
                    s = w + 1
                } else{
                    sArray.push(content[s])
                }
            }
            const sString = <s>{sArray}</s>
            contentArray.push(sString)
            i = s + 1
        } else if (content[i] === "<u>"){
            let w = i
            let uArray = []
            while(content[w + 1] !=="</u>"){
                w++
                uArray.push(content[w])
            }
            const uString = <u>{uArray}</u>
            contentArray.push(uString)
            i = w + 1
        } 
        i++
    }
    console.log(contentArray)
    return contentArray
  }

  function formatListContent(content){

  }

  const submissionContent = submission.map(el =>{
     if (el.type === "p"){
        const contentArray = formatContent(el.content)    
        const pTag = <p>{contentArray}</p>
        return pTag
    } else if (el.type === "h1"){
        const contentArray = formatContent(el.content)
        const hTag = <h1>{contentArray}</h1>
        return hTag
    } else if (el.type === "h2"){
        const contentArray = formatContent(el.content)
        const hTag = <h2>{contentArray}</h2>
        return hTag
    } else if (el.type === "blockquote"){
        const contentArray = formatContent(el.content)
        const blockTag = <blockquote>{contentArray}</blockquote>
        return blockTag
    } else if (el.type === "ol"){
        const contentArray = formatListContent(el.content)
        const olist = <ol>{contentArray}</ol>
        return olist
    } else if (el.type === "ul"){
        const contentArray = formatListContent(el.content)
        const uList = <ul>{contentArray}</ul>
        return uList
    }
  })


  return (
      <div>
        <ReactQuill 
        theme="snow" 
        value={content} 
        onChange={handleChange} 
        modules={quillModules}
        formats={quillFormats}
        placeholder="Start writing..."
        className={styles.writingForm}
        />
        {submissionContent}
         <div className={styles.genres}>
            <div>
                <input type="checkbox" id="noGenre" checked={genres.noGenre} onChange={handleGenreSelection}/>
                <label htmlFor="noGenre">No Genre - General Fiction</label>
            </div>
            <div>
                <input type="checkbox" id="comedy" checked={genres.comedy[0]} onChange={handleGenreSelection}/>
                <label htmlFor="comedy">Comedy</label>
            </div> 
            <div>
                <input type="checkbox" id="drama" checked={genres.drama[0]} onChange={handleGenreSelection}/>
                <label htmlFor="drama">Drama</label>
            </div> 
            <div>
                <input type="checkbox" id="erotica" checked={genres.erotica[0]} onChange={handleGenreSelection}/>
                <label htmlFor="erotica">Erotica</label>
            </div> 
            <div>
                <input type="checkbox" id="fantasy" checked={genres.fantasy[0]} onChange={handleGenreSelection}/>
                <label htmlFor="fantasy">Fantasy</label>
            </div> 
            <div>
                <input type="checkbox" id="historicalFiction" checked={genres.historicalFiction[0]} onChange={handleGenreSelection}/>
                <label htmlFor="historicalFiction">Historical Fiction</label>
            </div> 
            <div>
                <input type="checkbox" id="horror" checked={genres.horror[0]} onChange={handleGenreSelection}/>
                <label htmlFor="horror">Horror</label>
            </div> 
            <div>
                <input type="checkbox" id="literaryFiction" checked={genres.literaryFiction[0]} onChange={handleGenreSelection}/>
                <label htmlFor="literaryFiction">Literary Fiction</label>
            </div> 
            <div>
                <input type="checkbox" id="magicalRealism" checked={genres.magicalRealism[0]} onChange={handleGenreSelection}/>
                <label htmlFor="magicalRealism">Magical Realism</label>
            </div> 
            <div>
                <input type="checkbox" id="mystery" checked={genres.mystery[0]} onChange={handleGenreSelection}/>
                <label htmlFor="mystery">Mystery</label>
            </div> 
            <div>
                <input type="checkbox" id="romance" checked={genres.romance[0]} onChange={handleGenreSelection}/>
                <label htmlFor="romance">Romance</label>
            </div> 
            <div>
                <input type="checkbox" id="sciFi" checked={genres.sciFi[0]} onChange={handleGenreSelection}/>
                <label htmlFor="sciFi">Science Fiction</label>
            </div> 
            <div>
                <input type="checkbox" id="socialFiction" checked={genres.socialFiction[0]} onChange={handleGenreSelection}/>
                <label htmlFor="socialFiction">Social Fiction</label>
            </div> 
            <div>
                <input type="checkbox" id="specFiction" checked={genres.specFiction[0]} onChange={handleGenreSelection}/>
                <label htmlFor="specFiction">Speculative Fiction</label>
            </div> 
            <div>
                <input type="checkbox" id="thriller" checked={genres.thriller[0]} onChange={handleGenreSelection}/>
                <label htmlFor="thriller">Thriller</label>
            </div> 
        </div>
        <div className={styles.displayGenre}>
            {displayGenre}
        </div>
        <div className={styles.tagSearch}>
            <form className={styles.tagForm} onSubmit={addTag}>
                <input type="text" value={newTag} onChange={(e) =>{setNewTag(e.target.value.toLowerCase())}} disabled={disableNewTagField}/>
                <input type="submit"  value="Add Tag" disabled={disableNewTagButton}/>
            </form>
            <div className={styles.addedTags}>
                {displayTags}
            </div>
            <br/>
            <br />
        </div>
        <button onClick={post}>Create</button>
      </div>
  );
}

export default WritingForm