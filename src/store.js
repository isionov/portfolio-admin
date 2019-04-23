import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./modules";
import { rootSaga } from "./modules";
import createSagaMiddleware from "redux-saga";

const sagaMiddleWare = createSagaMiddleware();

const getStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleWare),
      process.env.NODE_ENV === "development" &&
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  sagaMiddleWare.run(rootSaga);
  return store;
};
export default getStore;
