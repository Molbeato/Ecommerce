import { Outlet } from 'react-router-dom'
import NavBar from './components/common/NavBar/NavBar'
import './App.css'
import Cart from './components/common/Cart/Cart'
import { useState } from 'react'

function App() {
  const [isCartVisible, setIsCartVisible] = useState(false)

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible)
  }
  return (
    <>
      <NavBar updateCartVisible ={toggleCartVisibility}/>
      
      <main>
        <Outlet />
        <Cart isVisible={isCartVisible}/>
      </main>

      
    </>
  )
}

export default App
