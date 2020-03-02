import { createStore, combineReducers } from 'redux'
import anecReducer from '../reducers/anecdoteReducer'
import notReducer from '../reducers/notificationReducer'
import filtReducer from '../reducers/filterReducer'

const reducer = combineReducers ({
    anecdotes: anecReducer,
    notification: notReducer,
    filter : filtReducer
})

const store = createStore(reducer)
export default store