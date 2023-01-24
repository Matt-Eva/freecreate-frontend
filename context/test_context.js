import {createContext, useContext, useState} from 'react'

export const TestContext = createContext(null)

export default function TestContextProvider({children}){
    const [testState, setTestState] = useState(0)
    return (
        <TestContext.Provider value={{testState, setTestState}}>
            {children}
        </TestContext.Provider>
    )
}