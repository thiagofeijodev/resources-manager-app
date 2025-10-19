import { Provider } from 'react-redux';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

import { store } from './data';
import Home from './scenes/Home';
import './index.css';

const engine = new Styletron();

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Provider store={store}>
          <Home />
        </Provider>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
