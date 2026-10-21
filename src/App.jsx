import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import ListPage from './pages/ListPage.jsx'
import DetailPage from './pages/DetailPage.jsx'
import AddPage from './pages/AddPage.jsx'

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/applications/:id" element={<DetailPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="*" element={<h1 className="page-title">Page not found</h1>} />
        </Routes>
      </main>
    </>
  )
}

export default App
