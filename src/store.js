import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./modules";
import { rootSaga } from "./modules";
import createSagaMiddleware from "redux-saga";

const sagaMiddleWare = createSagaMiddleware();
let getStore;
console.log(window);
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  getStore = () => {
    const store = createStore(
      rootReducer,
      compose(
        applyMiddleware(sagaMiddleWare),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    );
    sagaMiddleWare.run(rootSaga);
    return store;
  };
} else {
  getStore = () => {
    const store = createStore(
      rootReducer,
      compose(applyMiddleware(sagaMiddleWare))
    );
    sagaMiddleWare.run(rootSaga);
    return store;
  };
}

export default getStore;
