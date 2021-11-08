import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'

import { store } from './data'
import * as serviceWorker from './serviceWorker'
import Root from './scenes'
import './index.css'

const engine = new Styletron();

ReactDOM.render(
  <BrowserRouter>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Provider store={store}>
          <Root />
        </Provider>
      </BaseProvider>
    </StyletronProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.register()
