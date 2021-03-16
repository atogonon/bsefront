import Axios from 'axios'

// Action Types:

export const GOT_OPP_FROM_SERVER='GOT_OPP_FROM_SERVER'

//  Action Creators:

export const gotOpp = (opp) => {
  return ({
    type: GOT_OPP_FROM_SERVER,
    opp
  })
}

//  Thunk Creators

export const getOpp = (id) => {
  return async (dispatch, getState) => {
    try {
      let opp = await Axios.get(`https://bseback.herokuapp.com/api/teams/${id}`)
      dispatch(gotOpp(opp.data))
    } catch (error) {
      console.log(error)
    }
  }
}

//  Reducers:

function opponentReducer(opponent={}, action) {
  switch (action.type) {
    case GOT_OPP_FROM_SERVER:
      return {...action.opp}
    default:
      return opponent
  }
}

export default opponentReducer
