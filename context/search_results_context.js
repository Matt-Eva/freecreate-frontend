import {createContext, useContext, useState} from 'react'

export const SearchResultContext = createContext(null)

export default function SearchResultContextProvider({children}){
    const [searchResults, setSearchResults] = useState([])
    return (
        <SearchResultContext.Provider value={{searchResults, setSearchResults}}>
            {children}
        </SearchResultContext.Provider>
    )
}