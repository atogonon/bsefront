import React from 'react'
import { connect } from 'react-redux'
import { getNets } from '../reducers/netsReducer'
import { getLeague } from '../reducers/leagueReducer'
import { VictoryChart, VictoryGroup, VictoryBar, VictoryLegend, VictoryTooltip} from 'victory'

class Comparison extends React.Component {

  render() {

    const { nets, league, opponent } = this.props

    return (
      <div className='statComps'>
        <div className='netsStats'>
          {nets.team} Stats
        </div>
        <div>
          Comparison Graph Here
        </div>
        <div className='oppStats'>
          {opponent.team} Stats
        </div>
        <div>
          <VictoryChart>
            <VictoryLegend x={50} y={30} title='Shooting %s' centerTitle orientation='horizontal' gutter={20} data={[{name: nets.team, symbol: {fill: 'black'}}, {name: 'League Avg', symbol: {fill: 'pink'}}, {name: opponent.team, symbol: {fill: 'blue'}}]}/>
            <VictoryGroup domain={{x: [0, 4], y:[0.3, 0.7]}} offset={20} colorScale={"qualitative"} categories={{x: ['FG%', '2pt%', '3pt%']}}>
              <VictoryBar labelComponent={<VictoryTooltip/>} color='black' data={[{ x: 1, y: nets.fgp, label: `${nets.fgp}`}, { x: 2, y: nets.twoP, label: `${nets.twoP}` }, { x: 3, y: nets.thrP, label: `${nets.thrP}` }]} />
              <VictoryBar labelComponent={<VictoryTooltip/>} color='pink' data={[{ x: 1, y: league.fgp, label: `${league.fgp}` }, { x: 2, y: league.twoP, label: `${league.twoP}` }, { x: 3, y: league.thrP, label: `${league.thrP}` }]} />
              <VictoryBar labelComponent={<VictoryTooltip/>} color='blue'data={[{ x: 1, y: opponent.fgp, label: `${opponent.fgp}` }, { x: 2, y: opponent.twoP, label: `${opponent.twoP}` }, { x: 3, y: opponent.thrP, label: `${opponent.thrP}` }]} />
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
