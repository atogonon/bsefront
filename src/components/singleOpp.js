import React from 'react'
import { connect } from 'react-redux'
import { getOpp } from '../reducers/opponentReducer'

class SingleOpp extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick=this.handleClick.bind(this)
  }

  render() {

    return (
      <div onClick={this.handleClick} key={this.props.ind} className='oneTeam'>
          <img src={this.props.imgURL} height={100} alt={this.props.team}/>
      </div>
    )
  }

  handleClick(event) {
    this.props.getOpp(this.props.id)
    this.props.closeDrawer()
  }
}

const mapDispatch = (dispatch) => {
  return {
    getOpp: (id) => dispatch(getOpp(id))
  }
}

export default connect(null, mapDispatch)(SingleOpp)
