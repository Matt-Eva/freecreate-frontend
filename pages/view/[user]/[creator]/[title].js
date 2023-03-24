import Link from "next/link"
import clientPromise from "../../../../lib/connect"

export default function View({story}){
    console.log("hello")
    console.log(story)
    return (
        <div>
            <Link href="/">Home</Link>
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

