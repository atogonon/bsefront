import React from 'react'
import { useDispatch } from 'react-redux'
import { getOpp } from '../reducers/opponentReducer'

function SingleOpp(props) {

  const { closeDrawer, id } = props
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(getOpp(id))
    closeDrawer()
  }

  return (
    <div onClick={handleClick} key={props.ind} className='oneTeam'>
      <img src={props.imgURL} height={100} alt={props.team} />
    </div>
  )

}

export default SingleOpp
