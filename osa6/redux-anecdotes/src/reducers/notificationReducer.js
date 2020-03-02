const initialState = ""

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.data.message
        case 'CLEAR':
            return initialState
        default:
            return state
    }
}

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            data: { message }
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR'
            })
        }, time * 1000)
    }
}

export default reducer