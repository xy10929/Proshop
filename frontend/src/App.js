import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
// <Outlet/> component is used within the parent route element to indicate where a child route element should be rendered
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//main app component, return a JSX(for putting html directly into JS)
const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
          {/* mains child route elements of App should be rendered */}
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
