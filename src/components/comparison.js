import React from 'react'
import { connect } from 'react-redux'
import { getNets } from '../reducers/netsReducer'
import { getLeague } from '../reducers/leagueReducer'
import { VictoryChart, VictoryGroup, VictoryBar, VictoryLegend, VictoryTooltip, VictoryZoomContainer} from 'victory'
import MenuIcon from '@material-ui/icons/Menu'

class Comparison extends React.Component {

  render() {

    const { nets, league, opponent } = this.props

    return (
      <div className='statComps'>
        <div id='appHeader'>
            Welcome to my app! Here you can view the stats of the Brooklyn Nets and see how they compare to a given opponent.<br/>
            To select an opponent, click on the <MenuIcon /> button on the top left of your screen above.
        </div>
        <div className='atAGlance'>
          <div className='netsStats'>
            <img src={nets.imgURL}  height={400} alt={nets.team}/><br/>
            {nets.team} Stats
          </div>
          <div>
            Comparison Graph Here
          </div>
          { opponent.team ? (
            <div className='oppStats'>
              <img src={opponent.imgURL}  height={400} alt={opponent.team}/><br/>
              {opponent.team} Stats
            </div>
          ) : (
            <div>
              <h1>Select an Opponent</h1>
            </div>
          ) }
        </div>
        <div className='charts'>
          <VictoryChart containerComponent={<VictoryZoomContainer/>}>
            <VictoryLegend x={120} y={0} title='Shooting %s' centerTitle orientation='horizontal' gutter={20} data={[{name: nets.team, symbol: {fill: 'black'}}, {name: 'League Avg', symbol: {fill: 'pink'}}, {name: opponent.team, symbol: {fill: opponent.color}}]}/>
            <VictoryGroup domain={{x: [0, 5], y:[0.3, 1]}} offset={20} colorScale={"qualitative"} categories={{x: ['FG%', '2pt%', '3pt%', 'FT%']}}>
              <VictoryBar labelComponent={<VictoryTooltip/>} color='black' data={[{ x: 1, y: nets.fgp, label: `${nets.fgp}`}, { x: 2, y: nets.twoP, label: `${nets.twoP}` }, { x: 3, y: nets.thrP, label: `${nets.thrP}` }, { x: 4, y: nets.ftP, label: `${nets.ftP}` }]} />
              <VictoryBar labelComponent={<VictoryTooltip/>} color='pink' data={[{ x: 1, y: league.fgp, label: `${league.fgp}` }, { x: 2, y: league.twoP, label: `${league.twoP}` }, { x: 3, y: league.thrP, label: `${league.thrP}` }, { x: 4, y: league.ftP, label: `${league.ftP}` }]} />
              <VictoryBar labelComponent={<VictoryTooltip/>} color={opponent.color} data={[{ x: 1, y: opponent.fgp, label: `${opponent.fgp}` }, { x: 2, y: opponent.twoP, label: `${opponent.twoP}` }, { x: 3, y: opponent.thrP, label: `${opponent.thrP}` }, { x: 4, y: opponent.ftP, label: `${opponent.ftP}` }]} />
            </VictoryGroup>
          </VictoryChart>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.getNets()
    this.props.getLeague()
  }

}

const mapState = (state) => {
  return {
    nets: state.nets,
    league: state.league,
    opponent: state.opponent
  }
}

const mapDispatch = (dispatch) => {
  return {
    getNets: () => dispatch(getNets()),
    getLeague: () => dispatch(getLeague())
  }
}

export default connect(mapState, mapDispatch)(Comparison)
