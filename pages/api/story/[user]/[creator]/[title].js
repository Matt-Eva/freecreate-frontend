// import clientPromise from "../../../../lib/conn.js";

export default async function handler(req, res){
    try {
        const { pid } = req.query
        const { user, creator, title } = pid
        const client = await clientPromise;
        const stories = client.db("short_stories").collection("short_story_content")
        const story = await stories.findOne({username: user, creator_name: creator, title: title})
        res.status(200).send(story)
    } catch(e){
        console.error(e)
        return res.status(500).send({error: e})
    }
}