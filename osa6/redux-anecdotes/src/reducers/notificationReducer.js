let initialState = ""

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.data.message
        default:
            return state
    }
}

export const setNotification = (message) => {
    return {
        type: 'NOTIFICATION',
        data: { message }
    }
}

export default reducer