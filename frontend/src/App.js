import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
// <Outlet/> component is used within the parent route element to indicate where a child route element should be rendered
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
