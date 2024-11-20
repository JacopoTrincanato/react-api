//importo useState e useEffect
import { useState, useEffect } from 'react'

import './App.css'

//importo i componenti
import AppHeader from './src/components/AppHeader'
import AppMain from './src/components/AppMain'
import AppFooter from './src/components/AppFooter'


function App() {

  const [postsData, setPostsData] = useState({})

  //creo la funzione handleClick
  function handleClick() {
    fetchData()
  }

  //creo la funzione fetchData
  function fetchData(url = 'http://localhost:3002/') {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setPostsData(data)
      })
  }

  return (
    <>

      <AppHeader />
      <AppMain />
      <AppFooter />


    </>
  )
}

export default App
