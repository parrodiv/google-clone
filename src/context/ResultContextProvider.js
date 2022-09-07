import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const ResultContext = createContext()
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1'

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const getResults = async (type) => {
    setIsLoading(true)
    try {
      const options = {
        method: 'GET',
        url: `${baseUrl}${type}`,
        headers: {
          'X-User-Agent': 'desktop',
          'X-Proxy-Location': 'EU',
          'X-RapidAPI-Key':
            process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
        },
      }
      const response = await axios.request(options)
      const data = await response.data
      console.log({type, data});

      if(type.includes('/news')){
        setResults(data.entries) 
      } else if(type.includes('/image')){
        setResults(data.image_results) 
      } else {  //for type.includes('/search', o 'videos')
        setResults(data.results) 
      }
    } catch (error) {
      return error.message
    }
    setIsLoading(false)
  }

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  )
}

// con questa funzione evito di inserire useContext in ogni componente in cui voglio usarlo, e senza inserire Result Context ma solo utilizzando questa funzione
export const useResultContext = () => useContext(ResultContext)
