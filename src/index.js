import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import stores from './stores'
import App from './components/App'
import './styles.css'
import 'babel-polyfill'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffdd2d'
    }
  }
})

render(
  <Provider {...stores}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
