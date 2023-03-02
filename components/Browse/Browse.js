import styles from './Browse.module.css'
import {useState} from 'react'

function Browse() {
    const genreArray = ["Comedy", "Fantasy", "Horror", "Sci-Fi", "Social Fiction", "Drama", "Thriller", "Magical Realism", "Action/Adventure", "Romance", "Erotica", "Mystery", "Speculative Fiction", "Historical Fiction", "Literary Fiction"].sort()
    const dateArray = ["Most Recent", "Past Day", "Past Week", "Past Month", "Past Year"]

    const genreOptions= genreArray.map((genre)=>{
        return <option key={genre} value={genre}>{genre}</option>
    })
    const dateOptions = dateArray.map((date) =>{
        if (date === "Past Week"){
            return <option key={date} value={date} selected="selected">{date}</option>

        }
        return <option key={date} value={date}>{date}</option>
    })
  return (
    <div className={styles.browse}>
        <label>Select Genre</label>
        <br/>
        <select className={styles.selectGenre}>
            <option >No Genre - General Fiction</option>
            {genreOptions}
        </select>
        <br/>
        <label>Data Posted</label>
        <br/>
        <select className={styles.selectDate}>
            {dateOptions}
        </select>
    </div>
  )
}

export default Browse