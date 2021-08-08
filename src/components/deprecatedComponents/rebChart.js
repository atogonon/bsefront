import React from 'react'
import { VictoryChart, VictoryGroup, VictoryBar, VictoryLegend, VictoryTooltip, VictoryZoomContainer} from 'victory'
import Paper from '@material-ui/core/Paper'

class RebChart extends React.Component {

  render() {

    const { nets, league, opponent } = this.props

    const legendData = [
      {name: nets.team, symbol: {fill: 'black'}}, {name: 'League Avg', symbol: {fill: 'pink'}}, {name: opponent.team, symbol: {fill: opponent.color}}
    ]

    const netsData = [
      { x: 1, y: nets.orb, label: `${nets.orb}`},
      { x: 2, y: nets.drb, label: `${nets.drb}` },
      { x: 3, y: nets.trb, label: `${nets.trb}` },
    ]

    const leagueData = [
      { x: 1, y: league.orb, label: `${league.orb}` },
      { x: 2, y: league.drb, label: `${league.drb}` },
      { x: 3, y: league.trb, label: `${league.trb}` },
    ]

    const oppData = [
      { x: 1, y: opponent.orb, label: `${opponent.orb}` },
      { x: 2, y: opponent.drb, label: `${opponent.drb}` },
      { x: 3, y: opponent.trb, label: `${opponent.trb}` },
    ]

    return (
      <div className='barChart'>
        <Paper>
          <VictoryChart containerComponent={<VictoryZoomContainer/>}>
            <VictoryLegend x={60} y={0} title='Rebounding' centerTitle orientation='horizontal' gutter={20} data={legendData} style={{labels: { fontSize: 12},title: { fontSize: 20}}}/>
            <VictoryGroup domain={{x: [0, 4], y:[0, 60]}} offset={20} colorScale={"qualitative"} categories={{x: ['Off Reb', 'Def Reb', 'Total Reb']}}>
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

export default RebChart
