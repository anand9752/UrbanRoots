import './App.css'
import { useState } from 'react' // Add this import
import { Hero } from './components/Hero.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Services } from './components/Services.jsx'
import { ConsultantList } from './components/ConsultantList.jsx'
import { Ourmission } from './components/Ourmission.jsx'
import { ProductList } from './components/ProductList.jsx'
import CustomerReviews from './components/CustomerReviews.jsx'
import { ContactUs } from './components/ContactUs.jsx'
import { Footer } from './components/Footer.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Hero />
      <ConsultantList />
      <Services />
      <ProductList/>
      <CustomerReviews/>
      <Ourmission/>
      <ContactUs/>
      <Footer/>

    </>
  )
}

export default App
