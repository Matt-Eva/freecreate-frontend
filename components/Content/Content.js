import styles from './Content.module.css'
import {useEffect, useState, useContext} from 'react'
import { SearchResultContext } from '../../context/search_results_context'
import StoryCard from '../StoryCard/StoryCard'

function Content() {
  // const [stories, setStories] = useState([])
  const {searchResults,setSearchResults} = useContext(SearchResultContext)

  const fetchStories = async () =>{
    try {
      const res = await fetch("http://localhost:4000/stories")
      const data = await res.json()
      setSearchResults(data)
    } catch (error){
      console.error(error)
    }
  }

  useEffect(()=>{
    if (searchResults.length === 0){
      console.log("fetching")
      fetchStories()
    }
  }, [])

  const storyCards = searchResults.map((story) =>{
    return <StoryCard key={story._id} {...story} />
  })

  return (
    <div className={styles.content}>
      {storyCards}
    </div>
  )
}

export default Content