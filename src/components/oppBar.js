import React from 'react'
import { connect } from 'react-redux'
import { getTeams } from '../reducers/teamsReducer'
import SingleOpp from './singleOpp'

class Test extends React.Component {

  render() {

    const { teams } = this.props

    return (
      <div className='test'>
        <div className='teams'>
          <div>
            <h2>Select A Team:</h2>
          </div>
          <div id='oppList'>
            {teams.slice(2).map((team, ind) => {
              return (
                <SingleOpp key={team.id} team={team.team} id={team.id} ind={ind}/>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.getTeams()
  }

}

const mapState = (state) => {
  return {
    teams: state.teams
  }
}

const mapDispatch = (dispatch) => {
  return {
    getTeams: () => dispatch(getTeams()),
  }
}

export default connect(mapState, mapDispatch)(Test)
