import Axios from 'axios'

// Action Types:

export const GOT_LEAGUE_FROM_SERVER='GOT_LEAGUE_FROM_SERVER'

//  Action Creators:

export const gotLeague = (league) => {
  return ({
    type: GOT_LEAGUE_FROM_SERVER,
    league
  })
}

//  Thunk Creators

export const getLeague = () => {
  return async (dispatch, getState) => {
    try {
      let league = await Axios.get('https://bballstats-be.onrender.com/api/teams/1')
      dispatch(gotLeague(league.data))
    } catch (error) {
      console.log(error)
    }
  }
}

//  Reducers:

function leagueReducer(league={}, action) {
  switch (action.type) {
    case GOT_LEAGUE_FROM_SERVER:
      return {...action.league}
    default:
      return league
  }
}

export default leagueReducer
