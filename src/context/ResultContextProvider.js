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
            '4cc5dd7f70msh079b7808c701255p1540adjsn34fb7913cf64',
          'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
        },
      }
      const response = await axios.request(options)
      const data = await response.data

      setResults(data)
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
