import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player'

import { useResultContext } from '../context/ResultContextProvider'
import Loading from './Loading'

const Results = () => {
  const { results, isLoading, getResults, searchTerm} = useResultContext()
  const location = useLocation()

  useEffect(() => {
    if(searchTerm){
      if(location.pathname === '/videos'){
        getResults(`/search/q=${searchTerm} videos`)
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=40`)
      }
    }
  }, [searchTerm, location.pathname])

  if(isLoading) return <Loading />

  // console.log(location.pathname); // /search /news /image /videos

  switch (location.pathname) {
    case '/search':
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-48">
          {results?.map(({link, title}, index) => (
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
    case '/image':
      return (
        <div className="flex flex-wrap gap-1 justify-center items-center">
          {results?.map(({image, link: {href, title}}, index) => (
            <a className='sm:p-3 p-5 w-2/5 md:w-1/5 hover:shadow-lg hover:scale-105 transition ease-in-out' href={href} key={index} target="_blank" rel="noreferrer">
              <img src={image?.src} alt={title} loading="laxy" className='mx-auto' />
              <p className='w-36 break-words text-sm mt-2 text-center mx-auto'>
                {title}
              </p>
            </a>
          ))}  
        </div>
      )
      break;
    case '/news':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-28 items-center'>
          {results?.map(({ links, id, source, title }) => (
            <div key={id} className='md:w-2/5 w-full'>
              <a
                href={links?.[0].href}
                target='_blank'
                rel='noreferrer'
                className='hover:underline'
              >
                <p className='text-lg dark:text-blue-300 text-blue-700'>
                  {title}
                </p>
              </a>
              <div className='flex gap-4'>
                <a href={source?.href} target='_blank' rel='noreferrer'>
                  {source?.href}
                </a>
              </div>
            </div>
          ))}
        </div>
      )
      break;
    case '/videos':
      return (
        <div className='flex flex-wrap justify-center min-h-auto'>
          {results?.map((video, index) => (
            <div key={index} className='p-2'>
              <ReactPlayer url={video?.additional_links?.[0].href} controls width="355px" height="200px" />
            </div>
          ))}
        </div>
      )
      break;
    default: 
      return 'ERROR!';
  }
}

export default Results
