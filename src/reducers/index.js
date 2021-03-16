import {combineReducers} from 'redux'
import teamsReducer from './teamsReducer'
import netsReducer from './netsReducer'
import leagueReducer from './leagueReducer'
import opponentReducer from './opponentReducer'

const rootReducer = combineReducers({
  teams: teamsReducer,
  nets: netsReducer,
  league: leagueReducer,
  opponent: opponentReducer,
})

export default rootReducer
