import {createStore} from 'redux'

import reducer from './reducers/combineReducers'

export default createStore(reducer)