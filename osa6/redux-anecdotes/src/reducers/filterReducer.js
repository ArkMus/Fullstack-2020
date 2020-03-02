let initialState = ""

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.data.filter.toLowerCase()
        default:
            return state
    }
}

export const filterChange = (filter) => {
    return {
        type: 'SET_FILTER',
        data: {filter}
    }
}

export default reducer