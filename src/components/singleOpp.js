import React from 'react'
import { connect } from 'react-redux'
import { getOpp } from '../reducers/opponentReducer'

function SingleOpp(props) {

  const { closeDrawer, getOpp, id } = props
  const handleClick = () => {
    getOpp(id)
    closeDrawer()
  }

  return (
    <div onClick={handleClick} key={props.ind} className='oneTeam'>
      <img src={props.imgURL} height={100} alt={props.team} />
    </div>
  )

}

const mapDispatch = (dispatch) => {
  return {
    getOpp: (id) => dispatch(getOpp(id))
  }
}

export default connect(null, mapDispatch)(SingleOpp)
