import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/reducer'
import thunk from 'redux-thunk';



const RootStore = createStore(reducer, applyMiddleware(thunk))

export default RootStore
