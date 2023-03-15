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
      const removeDuplicates = data.relRankStories.filter(story =>{
        return !data.rankStories.find(s => s._id === story._id)
      })
      const results = {
          rankStories: data.rankStories,
          relRankStories: removeDuplicates
      }
      setSearchResults(results)
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

  const rankStoryCards = searchResults.rankStories?.map((story) =>{
    return <StoryCard key={story._id} {...story} />
  })
  
  const relRankStoryCards = searchResults.relRankStories?.map((story) =>{
    return <StoryCard key={story._id} {...story} />
  })

  return (
    <div className={styles.content}>
      {(rankStoryCards && relRankStoryCards) && (rankStoryCards.length === 0 && relRankStoryCards.length === 0) ? <p>That search produced no results! Please try a different search.</p>: null}
      <div className={styles.rank}>
        {rankStoryCards}
      </div>
      <div className={styles.relRank}>
        {relRankStoryCards}
      </div>
    </div>
  )
}

export default Content