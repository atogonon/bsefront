import React from 'react'
import { VictoryChart, VictoryGroup, VictoryBar, VictoryLegend, VictoryTooltip, VictoryZoomContainer} from 'victory'
import Paper from '@material-ui/core/Paper'

class PtsChart extends React.Component {

  render() {

    const { nets, league, opponent } = this.props

    const legendData = [
      {name: nets.team, symbol: {fill: 'black'}}, {name: 'League Avg', symbol: {fill: 'pink'}}, {name: opponent.team, symbol: {fill: opponent.color}}
    ]

    const netsData = [
      { x: 1, y: nets.pts, label: `${nets.pts}`},
    ]

    const leagueData = [
      { x: 1, y: league.pts, label: `${league.pts}` },
    ]

    const oppData = [
      { x: 1, y: opponent.pts, label: `${opponent.pts}` },
    ]

    return (
      <div className='barChart'>
        <Paper>
          <VictoryChart containerComponent={<VictoryZoomContainer/>} domainPadding={20}>
            <VictoryLegend x={60} y={0} title='Points Per Game' centerTitle orientation='horizontal' gutter={20} data={legendData} style={{labels: { fontSize: 12},title: { fontSize: 20}}}/>
            <VictoryGroup domain={{x: [0, 2], y:[90, 130]}} offset={70} colorScale={"qualitative"} categories={{x: ['Points Per Game']}}>
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

export default PtsChart
