import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getTeams } from '../reducers/teamsReducer'
import SingleOpp from './singleOpp'
import CloseIcon from '@material-ui/icons/Close';

function OppBar(props) {

  const { teams, getTeams } = props
  const closeDrawer = props.closeDrawer
  const handleClick = () => { closeDrawer() }

  useEffect(() => {
    getTeams()
  }, [getTeams])

  return (
    <div className='oppBar'>
      <div className='closeButton'>
        <CloseIcon onClick={handleClick} />
      </div>
      <div className='teams'>
        <div>
          <h3 id='oppBarHeader'>Select An Opponent:</h3>
        </div>
        <div id='oppList'>
          {teams.slice(2).sort((a, b) => a.id - b.id).map((team, ind) => {
            return (
              <SingleOpp key={team.id} team={team.team} id={team.id} ind={ind} imgURL={team.imgURL} closeDrawer={closeDrawer} />
            )
          })}
        </div>
      </div>
    </div>
  )

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

export default connect(mapState, mapDispatch)(OppBar)
