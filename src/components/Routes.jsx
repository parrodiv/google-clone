import React from 'react'
import { Routes as Routess, Route, Navigate } from 'react-router-dom'
//ho dovuto rinominare Routes con Routess perchè il nome sarebbe uguale al nome del component Routes, pertanto ho aggiunto una s

import Results from './Results'

const Routes = () => {
  return (
    <div className='p-4'>
      <Routess>
        <Route exact path='/' element={<Navigate replace to='/search' />} />
        <Route exact path='/search' element={<Results />} />
        <Route exact path='/images' element={<Results />} />
        <Route exact path='/news' element={<Results />} />
        <Route exact path='/videos' element={<Results />} />
      </Routess>
    </div>
  )
}

export default Routes
