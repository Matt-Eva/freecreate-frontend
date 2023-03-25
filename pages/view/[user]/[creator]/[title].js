import styles from "../../../../styles/View.module.css"
import Header from "../../../../components/Header/Header"
import Sidebar from "../../../../components/Sidebar/Sidebar"
import ViewWriting from "../../../../components/ViewWriting/ViewWriting"
import Link from "next/link"
import clientPromise from "../../../../lib/connect"

export default function View({story}){
    console.log("hello")
    console.log(story)
    return (
        <div className={styles.view}>
            <Header />
            <div className={styles.main}>
                <Sidebar />
                <ViewWriting story={story}/>
            </div>
        </div>
    )
}

export async function getServerSideProps(context){
    const { params } = context
    const {user, creator, title} = params
    // console.log(user, creator, title)
    let data;
    try {
        const client = await clientPromise
        const db = client.db("short_stories")
        const collection = db.collection("short_story_content")
        const story = await collection.findOne({username: user, creator_name: creator, title: title})
        data = story
        // console.log(story)
    } catch (error){
        console.error(error)
        data = {error: "There was an error when fetching this story."}
    }
    
    return{
        props: {story: JSON.parse(JSON.stringify(data))},
    }
}

