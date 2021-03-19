import Axios from 'axios'

// Action Types:

export const GOT_TEAMS_FROM_SERVER='GOT_TEAMS_FROM_SERVER'

//  Action Creators:

export const gotTeams = (teams) => {
  return ({
    type: GOT_TEAMS_FROM_SERVER,
    teams
  })
}

//  Thunk Creators

export const getTeams = () => {
  return async (dispatch, getState) => {
    try {
      let teamsList = await Axios.get('https://bseback.herokuapp.com/api/teams/')
      dispatch(gotTeams(teamsList.data))
    } catch (error) {
      console.log(error)
    }
  }
}

//  Reducers:

function teamsReducer(teams=[], action) {
  switch (action.type) {
    case GOT_TEAMS_FROM_SERVER:
      return action.teams
    default:
      return teams
  }
}

export default teamsReducer
