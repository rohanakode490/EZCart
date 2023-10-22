import { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import WebFont from 'webfontloader'
import Footer from './components/Footer';

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

      <Footer/>
    </>
  )
}

export default App
