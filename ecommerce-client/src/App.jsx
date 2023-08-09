
import Header from './components/Header'
import { RecoilRoot } from 'recoil'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'


const App = () => {
  return (
    <RecoilRoot>
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </RecoilRoot>
  )
}

export default App
