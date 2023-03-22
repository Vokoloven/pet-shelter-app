import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'redux/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter basename="pet-shelter-app">
                <App />
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
