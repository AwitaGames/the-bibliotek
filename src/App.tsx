import HomePage from '@/pages/home'
import YoutubePage from '@/pages/youtube'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/youtube" element={<YoutubePage />} />
            </Routes>
        </BrowserRouter>
    )
}
