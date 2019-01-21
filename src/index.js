import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import App from './app/layout/App';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/common/util/scroll-to-top';

const store = configureStore();

const rootEl = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <ReduxToastr
            timeOut={6000}
            position="bottom-right"
            transitionIn="bounceIn"
            transitionOut="fadeOut"
            progressBar={true}
            closeOnToastrClick={true}
          />
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>,
    rootEl
  );
};

store.firebaseAuthIsReady.then(() => {
  render();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
