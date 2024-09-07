import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Read from './components/Read'

const App = () => {
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<Read/>}></Route>
      </Routes>

    </div>
  )
}

export default App