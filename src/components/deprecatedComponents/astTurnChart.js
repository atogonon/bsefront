import React from 'react'
import { VictoryChart, VictoryGroup, VictoryBar, VictoryLegend, VictoryTooltip, VictoryZoomContainer} from 'victory'
import Paper from '@material-ui/core/Paper'

class AstTurnChart extends React.Component {

  render() {

    const { nets, league, opponent } = this.props

    const legendData = [
      {name: nets.team, symbol: {fill: 'black'}}, {name: 'League Avg', symbol: {fill: 'pink'}}, {name: opponent.team, symbol: {fill: opponent.color}}
    ]

    const netsData = [
      { x: 1, y: nets.ast, label: `${nets.ast}`},
      { x: 2, y: nets.tov, label: `${nets.tov}` },
    ]

    const leagueData = [
      { x: 1, y: league.ast, label: `${league.ast}` },
      { x: 2, y: league.tov, label: `${league.tov}` },
    ]

    const oppData = [
      { x: 1, y: opponent.ast, label: `${opponent.ast}` },
      { x: 2, y: opponent.tov, label: `${opponent.tov}` },
    ]

    return (
      <div className='barChart'>
        <Paper>
          <VictoryChart containerComponent={<VictoryZoomContainer/>}>
            <VictoryLegend x={60} y={0} title='Assists & Turnovers' centerTitle orientation='horizontal' gutter={20} data={legendData} style={{labels: { fontSize: 12},title: { fontSize: 20}}}/>
            <VictoryGroup domain={{x: [0, 3], y:[0, 40]}} offset={25} colorScale={"qualitative"} categories={{x: ['Assists', 'Turnovers']}}>
              <VictoryBar labelComponent={<VictoryTooltip/>} color='black' data={netsData} />
              <VictoryBar labelComponent={<VictoryTooltip/>} color='pink' data={leagueData} />
              <VictoryBar labelComponent={<VictoryTooltip/>} color={opponent.color} data={oppData} />
            </VictoryGroup>
          </VictoryChart>
        </Paper>
      </div>
    )

  }

}

export default AstTurnChart
