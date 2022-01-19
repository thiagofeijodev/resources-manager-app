import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'

import * as serviceWorker from './serviceWorker'
import { store } from './data'
import Root from './scenes'
import './index.css'

const engine = new Styletron();

ReactDOM.render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Provider store={store}>
          <Root />
        </Provider>
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
