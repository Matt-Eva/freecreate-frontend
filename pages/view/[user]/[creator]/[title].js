import Link from "next/link"
import {MongoClient} from 'mongodb';


export default function View({data}){
    console.log(data)
    return (
        <div>
            <Link href="/">Home</Link>
        </div>
    )
}

export async function getServerSideProps(context){
    const { params } = context
    console.log(params)
    const {user, creator, title} = params
    // const res = await fetch(`/api/story/${user}/${creator}/${title}`)
    // const story = await res.json()
    return{
        props: {},
    }
}