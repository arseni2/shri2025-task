import {createRoot} from 'react-dom/client'
import './index.css'
import Header from './Header'
import Home from './Home'

createRoot(document.getElementById('root')).render(
    <>
        <Header />
        <Home />
    </>
)
