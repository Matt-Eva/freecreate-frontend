import styles from './Content.module.css'
import {useEffect, useState} from 'react'
import StoryCard from '../StoryCard/StoryCard'

function Content() {
  const [stories, setStories] = useState([])
  console.log(stories)
  const fetchStories = async () =>{
    try {
      const res = await fetch("http://localhost:4000/stories")
      const data = await res.json()
      setStories(data)
    } catch (error){
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchStories()
  }, [])

  const storyCards = stories.map((story) =>{
    return <StoryCard key={story._id} {...story} />
  })

  return (
    <div className={styles.content}>
      {storyCards}
    </div>
  )
}

export default Content