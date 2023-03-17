import Link from "next/link"
import clientPromise from "../../../../lib/connect"

export default function View({data}){

    console.log("hello")
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
    try {
        await clientPromise
    } catch (error){
        console.error(error)
    }
    
    return{
        props: {},
    }
}

