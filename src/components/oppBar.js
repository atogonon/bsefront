import React from 'react'
import { connect } from 'react-redux'
import { getTeams } from '../reducers/teamsReducer'
import SingleOpp from './singleOpp'
import CloseIcon from '@material-ui/icons/Close';

class OppBar extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick=this.handleClick.bind(this)
  }

  render() {

    const { teams } = this.props
    const closeDrawer = this.props.closeDrawer

    return (
      <div className='oppBar'>
        <div className='closeButton'>
          <CloseIcon onClick={this.handleClick}/>
        </div>
        <div className='teams'>
          <div>
            <h3 id='oppBarHeader'>Select An Opponent:</h3>
          </div>
          <div id='oppList'>
            {teams.slice(2).sort((a, b) => a.id - b.id).map((team, ind) => {
              return (
                <SingleOpp key={team.id} team={team.team} id={team.id} ind={ind} imgURL={team.imgURL} closeDrawer={closeDrawer}/>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  handleClick() {
    this.props.closeDrawer()
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

export default connect(mapState, mapDispatch)(OppBar)
