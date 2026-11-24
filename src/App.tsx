import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { ExhibitsPage } from './pages/ExhibitsPage'
import { ExhibitDetailPage } from './pages/ExhibitDetailPage'
import { GuestbookPage } from './pages/GuestbookPage'

export const App: React.FC = () => {
  return(
    <BrowserRouter>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px', fontFamily: 'sans-serif' }}>
        <nav style={{ display: 'flex', gap: '16px', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <Link to="/">Експонати</Link>
          <Link to="/guestbook">Книга відвідувачів</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ExhibitsPage />} />
          <Route path="/exhibit/:id" element={<ExhibitDetailPage />} />
          <Route path="/guestbook" element={<GuestbookPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;