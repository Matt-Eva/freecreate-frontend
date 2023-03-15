import Link from "next/link"
import { useRouter } from 'next/router'

export default function View({data}){
    return (
        <div>
            <Link href="/">Home</Link>
        </div>
    )
}

export async function getServerSideProps(context){
    return{
        props: {},
    }
}