import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
// use debounce ci permette di effettuare una richiesta dopo uno specifico lasso di tempo, invece che fare una richiesta ogni lettera che inseriamo

import { useResultContext } from '../context/ResultContextProvider'

import Links from './Links'

const Search = () => {
  const [text, setText] = useState('Elon Musk')
  const { setSearchTerm } = useResultContext()
  const [debouncedValue] = useDebounce(text, 800)

  console.log(debouncedValue)
  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue)
  }, [debouncedValue])

  return (
    <div className='relative md:ml-40 lg: mt-3 md:-mt-10'>
      <input
        value={text}
        type='text'
        className='sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg'
        placeholder='Search Googgl or type URL'
        onChange={(e) => setText(e.target.value)}
      />
      {text && (
        <button
          type='button'
          className='absolute top-1.5 right-4 text-2xl text-gray-500'
          onClick={() => setText('')}
        >
          X
        </button>
      )}
      <Links />
    </div>
  )
}

export default Search
