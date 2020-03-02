const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case "VOTE":
      const id = action.data.id
      const anecToChange = state.find(n => n.id === id)
      const changedAnec = {
        ...anecToChange,
        votes: anecToChange.votes + 1
      }
      return state.map(anec =>
        anec.id !== id ? anec : changedAnec
      )
    default:
      return state
  }
}

export const voteOnAnec = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default reducer