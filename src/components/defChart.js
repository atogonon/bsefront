import React from 'react'
import { VictoryChart, VictoryGroup, VictoryBar, VictoryLegend, VictoryTooltip, VictoryZoomContainer} from 'victory'
import Paper from '@material-ui/core/Paper'

class DefChart extends React.Component {

  render() {

    const { nets, league, opponent } = this.props

    const legendData = [
      {name: nets.team, symbol: {fill: 'black'}}, {name: 'League Avg', symbol: {fill: 'pink'}}, {name: opponent.team, symbol: {fill: opponent.color}}
    ]

    const netsData = [
      { x: 1, y: nets.stl, label: `${nets.stl}`},
      { x: 2, y: nets.blk, label: `${nets.blk}` },
      { x: 3, y: nets.pf, label: `${nets.pf}` },
    ]

    const leagueData = [
      { x: 1, y: league.stl, label: `${league.stl}` },
      { x: 2, y: league.blk, label: `${league.blk}` },
      { x: 3, y: league.pf, label: `${league.pf}` },
    ]

    const oppData = [
      { x: 1, y: opponent.stl, label: `${opponent.stl}` },
      { x: 2, y: opponent.blk, label: `${opponent.blk}` },
      { x: 3, y: opponent.pf, label: `${opponent.pf}` },
    ]

    return (
      <div className='barChart'>
        <Paper>
          <VictoryChart containerComponent={<VictoryZoomContainer/>}>
            <VictoryLegend x={60} y={0} title='Defensive' centerTitle orientation='horizontal' gutter={20} data={legendData} style={{title: { fontSize: 20}}}/>
            <VictoryGroup domain={{x: [0, 4], y:[0, 30]}} offset={20} colorScale={"qualitative"} categories={{x: ['Steals', 'Blocks', 'Personal Fouls']}}>
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

export default DefChart
