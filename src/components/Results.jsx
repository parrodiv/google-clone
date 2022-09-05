import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player'

import { useResultContext } from '../context/ResultContextProvider'
import Loading from './Loading'

const Results = () => {
  const { results, isLoading, getResults, searchTerm} = useResultContext()
  const location = useLocation()

  if(isLoading) return <Loading />

  // console.log(location.pathname); // /search /news /images /videos

  switch (location.pathname) {
    case '/search':
      return 'SEARCH';
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
