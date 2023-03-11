import styles from './Browse.module.css'
import {useState} from 'react'
import { style } from '@mui/system'

function Browse() {


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

    const dateArray = ["Most Recent", "Past Day", "Past Week", "Past Month", "Past Year"]

    const [genres, setGenres] = useState(initialGenreState)
    const [selectedGenres, setSelectedGenres] = useState(["No Genre"])
    const [newTag, setNewTag] = useState("")
    const [tags, setTags] = useState([])
    const [selectedDate, setSelectedDate] = useState("Past Week")


    const dateOptions = dateArray.map((date) =>{
        if (date === "Past Week"){
            return <option key={date} value={date}>{date}</option>
        }
        return <option key={date} value={date}>{date}</option>
    })

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

    const addTag = (e) =>{
        e.preventDefault()
        if (tags.includes(newTag)){
            setNewTag("")
            return
        }
        setTags([...tags, newTag])
        setNewTag("")
    }
    
    const deleteTag = (e) =>{
        const oneLess = tags.filter(tag => tag !== e.target.textContent)
        setTags(oneLess)
    }

    const search = async () =>{
        const searchObj ={
            genre: displayGenre,
            tags: tags,
            date: selectedDate
        }
        const configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(searchObj)
        }
       const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/search", configObj)
       const data = await res.json()
       console.log(data)
    }
    
    const displayGenre= selectedGenres.join("-")
    
    const displayTags = tags.map(tag =>{
        return <span key={tag} onClick={deleteTag} className={styles.tag}>{tag}</span>
    })

    const disableNewTagField = tags.length >= 5 
    const disableNewTagButton = tags.length >= 5 || newTag === ""

  return (
    <div className={styles.browse}>
        <label className={styles.genreLabel}>Select Genre</label>
        <br />
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
        <br/>
        <div className={styles.selectDate}>
            <label>Date Posted</label>
            <br/>
            <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                {dateOptions}
            </select>
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
            <button onClick={search}>Search</button>
        </div>
        
    </div>
  )
}

export default Browse