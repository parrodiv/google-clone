import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player'

import { useResultContext } from '../context/ResultContextProvider'
import Loading from './Loading'

const Results = () => {
  const { results, isLoading, getResults, searchTerm} = useResultContext()
  const location = useLocation()

  useEffect(() => {
    getResults('/search/q=Alessandro Parrilla&num=40')
  }, [])

  if(isLoading) return <Loading />

  // console.log(location.pathname); // /search /news /images /videos

  switch (location.pathname) {
    case '/search':
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {/* link e title sono destrutturati dal object results.results che sono le due cose che ci servono */}
          {results?.results?.map(({link, title}, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      )
      break;
    case '/images':
      return 'IMAGES';
      break;
    case '/news':
      return 'NEWS';
      break;
    case '/videos':
      return 'VIDEO';
      break;
    default: 
      return 'ERROR!';
  }
}

export default Results
