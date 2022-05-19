import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App'

import './styles/reset.css'
import './styles/styles.scss'
import './styles/modest.scss'

const root = createRoot(document.getElementById('root'))

root.render(<App />)
