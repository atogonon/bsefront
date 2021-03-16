import Axios from 'axios'

// Action Types:

export const GOT_NETS_FROM_SERVER='GOT_NETS_FROM_SERVER'

//  Action Creators:

export const gotNets = (nets) => {
  return ({
    type: GOT_NETS_FROM_SERVER,
    nets
  })
}

//  Thunk Creators

export const getNets = () => {
  return async (dispatch, getState) => {
    try {
      let nets = await Axios.get('https://bseback.herokuapp.com/api/teams/2')
      dispatch(gotNets(nets.data))
    } catch (error) {
      console.log(error)
    }
  }
}

//  Reducers:

function netsReducer(nets={}, action) {
  switch (action.type) {
    case GOT_NETS_FROM_SERVER:
      return {...action.nets}
    default:
      return nets
  }
}

export default netsReducer
