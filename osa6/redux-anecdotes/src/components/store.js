import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecReducer from '../reducers/anecdoteReducer'
import notReducer from '../reducers/notificationReducer'
import filtReducer from '../reducers/filterReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers ({
    anecdotes: anecReducer,
    notification: notReducer,
    filter : filtReducer
})

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(thunk)))
export default store