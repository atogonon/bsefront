import React from 'react'
import { VictoryChart, VictoryGroup, VictoryBar, VictoryLegend, VictoryTooltip, VictoryZoomContainer} from 'victory'
import Paper from '@material-ui/core/Paper'

class ShotPercentChart extends React.Component {

  render() {

    const { nets, league, opponent } = this.props

    const legendData = [
      {name: nets.team, symbol: {fill: 'black'}}, {name: 'League Avg', symbol: {fill: 'pink'}}, {name: opponent.team, symbol: {fill: opponent.color}}
    ]

    const netsData = [
      { x: 1, y: nets.fgp, label: `${nets.fgp}`},
      { x: 3, y: nets.twoP, label: `${nets.twoP}` },
      { x: 5, y: nets.thrP, label: `${nets.thrP}` },
      { x: 7, y: nets.ftP, label: `${nets.ftP}` }
    ]

    const leagueData = [
      { x: 1, y: league.fgp, label: `${league.fgp}` },
      { x: 3, y: league.twoP, label: `${league.twoP}` },
      { x: 5, y: league.thrP, label: `${league.thrP}` },
      { x: 7, y: league.ftP, label: `${league.ftP}` }
    ]

    const oppData = [
      { x: 1, y: opponent.fgp, label: `${opponent.fgp}` },
      { x: 3, y: opponent.twoP, label: `${opponent.twoP}` },
      { x: 5, y: opponent.thrP, label: `${opponent.thrP}` },
      { x: 7, y: opponent.ftP, label: `${opponent.ftP}` }
    ]

    return (
      <div className='barChart'>
        <Paper>
          <VictoryChart containerComponent={<VictoryZoomContainer/>}>
            <VictoryLegend x={60} y={0} title='Shooting %s' centerTitle orientation='horizontal' gutter={20} data={legendData} style={{labels: { fontSize: 12},title: { fontSize: 20}}}/>
            <VictoryGroup domain={{x: [0, 7], y:[0.2, 1]}} offset={20} colorScale={"qualitative"} categories={{x: ['FG%', '', '2pt%', ' ', '3pt%', '  ', 'FT%']}} >
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

export default ShotPercentChart
