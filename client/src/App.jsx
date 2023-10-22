import { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import WebFont from 'webfontloader'

function App() {
  useEffect(() => {
    //load the fonts first
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <>
      <Header />
    </>
  )
}

export default App
