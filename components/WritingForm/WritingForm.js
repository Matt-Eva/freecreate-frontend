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
            while(splitArray[d] !== '</h1>'){
                subArray.push(splitArray[d])
                d++
            }
            subArray.push('</h1>')
            contentObj.content = subArray
            structuredArray.push(contentObj)
        } else if (splitArray[i] === '<h2>'){
            let d = i
            const contentObj = {
                type: "h2",
                content: []
            }
            const subArray = []
            while(splitArray[d] !== '</h2>'){
                subArray.push(splitArray[d])
                d++
            }
            subArray.push('</h2>')
            contentObj.content = subArray
            structuredArray.push(contentObj)
        } else if (splitArray[i] === '<blockquote>'){
            let d = i
            const contentObj = {
                type: "blockquote",
                content: []
            }
            const subArray = []
            while(splitArray[d] !== '</blockquote>'){
                subArray.push(splitArray[d])
                d++
            }
            subArray.push('</blockquote>')
            contentObj.content = subArray
            structuredArray.push(contentObj)
        } else if (splitArray[i] === '<ol>'){
            let d = i
            const contentObj = {
                type: "ol",
                content: []
            }
            const subArray = []
            while(splitArray[d] !== '</ol>'){
                subArray.push(splitArray[d])
                d++
            }
            subArray.push('</ol>')
            contentObj.content = subArray
            structuredArray.push(contentObj)
        }else if (splitArray[i] === '<ul>'){
            let d = i
            const contentObj = {
                type: "ul",
                content: []
            }
            const subArray = []
            while(splitArray[d] !== '</ul>'){
                subArray.push(splitArray[d])
                d++
            }
            subArray.push('</ul>')
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

  const submissionContent = submission.map(el =>{
     if (el.type === "p"){
         let contentArray = []
         let i = 0
         while (i < el.content.length){
            i++
             if (el.content[i] === "<br>"){
                 contentArray.push(<br/>)
             }
            else if (el.content[i] === "<strong>"){
                let d = i
                let strongArray = []
                while (el.content[d + 1] !== "</strong>"){
                    d++
                    if (el.content[d] === "<em>"){
                        let q = d
                        let emArray = []
                        while(el.content[q + 1] !== "</em>"){
                            q++
                            if (el.content[q] === "<s>"){
                                let z = q
                                let sArray = []
                                while (el.content[z + 1] !== "</s>"){
                                    z++
                                    if (el.content[z] === "<u>"){
                                        let w = z
                                        let uArray = []
                                        while(el.content[w + 1] !=="</u>"){
                                            w++
                                            uArray.push(el.content[w])
                                        }
                                        const uString = <u>{uArray}</u>
                                        sArray.push(uString)
                                        z = w + 1
                                    } else{
                                        sArray.push(el.content[z])
                                    }
                                }
                                const sString = <u>{sArray}</u>
                                emArray.push(sString)
                                q = z + 1
                            } else if (el.content[q] === "<u>"){
                                let s = q
                                let uArray = []
                                while(el.content[s+1] !=="</u>"){
                                    s++
                                    uArray.push(el.content[s])
                                }
                                const uString = <u>{uArray}</u>
                                emArray.push(uString)
                                q = s + 1
                            } else {
                                emArray.push(el.content[q])
                            }
                        }
                        d = q + 1
                        const emString = <em>{emArray}</em>
                        strongArray.push(emString)
                    } else if (el.content[d] === "<u>"){
                        let u = d
                        let uArray = []
                        while (el.content[u + 1] !== "</u>"){
                            u++
                            if (el.content[u] === "<s>"){
                                let w = u
                                let sArray = []
                                while(el.content[w + 1] !=="</s>"){
                                    w++
                                    sArray.push(el.content[w])
                                }
                                const sString = <s>{sArray}</s>
                                uArray.push(sString)
                                u = w + 1
                            } else{
                                uArray.push(el.content[u])
                            }
                        }
                        const uString = <u>{uArray}</u>
                        strongArray.push(uString)
                        d = u + 1
                    } else if (el.content[d] === "<s>"){
                        let w = d
                        let sArray = []
                        while(el.content[w + 1] !=="</s>"){
                            w++
                            sArray.push(el.content[w])
                        }
                        const sString = <s>{sArray}</s>
                        strongArray.push(sString)
                        d = w + 1
                    } else {
                        strongArray.push(el.content[d])
                    }
                }
                const strongEl = <strong>{strongArray}</strong>
                contentArray.push(strongEl)
            }
        }
        const pTag = <p>{contentArray}</p>
        return pTag
    }
  })
    const jsxArray = [<em>I have content</em>, "I also have content"]

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