import {useContext} from 'react'
import {TestContext} from '../context/test_context'

export default function PageTest(){
    const {testState} = useContext(TestContext)
    return(
        <div>
            Testing page and context
            <p>current state: {testState}</p>
        </div>
    )
}