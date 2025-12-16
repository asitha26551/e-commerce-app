import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AdminDashboardPage } from './pages/AdminDashboardPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}
