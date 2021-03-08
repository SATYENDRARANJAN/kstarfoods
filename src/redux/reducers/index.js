import {combineReducers} from 'redux'
import CartReducer from './reducer'

const RootReducer = combineReducers(CartReducer)
export default RootReducer