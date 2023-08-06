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
      </main>

      <Cart isVisible={isCartVisible}/>
    </>
  )
}

export default App
