import React from 'react'
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryTooltip, VictoryContainer,VictoryAxis, VictoryLabel, VictoryLegend} from 'victory'
import Paper from '@material-ui/core/Paper'

class RtgChart extends React.Component {

  render() {

    const { teams } = this.props

    return (
      <div className='content'>
        <div className='headerContainer'>
          <Paper>
            <p id='rtgChartHeader'>
              Here you can find out how each team measures up to the rest of the league with respect to offensive and defensive ratings (adjusted for opponent strength).  Moving further right along the x axis means better offense, moving up along the y axis means better defense.  Ideally, any given team would want to move towards the upper right portion of the chart.  Mouse over each data point to identify the team and their individual offensive and defensive ratings.<br/><br/>
              All data from this project was courtesy of <a href='https://www.basketball-reference.com/'>Basketball Reference</a> and based on data collected from the 2020-2021 NBA season up to March 19th 2021.
            </p>
            <p>

            </p>
          </Paper>
        </div>
        <div className='scatterChart'>
          <Paper>
            <VictoryChart theme={VictoryTheme.material} height={500} width={500} containerComponent={<VictoryContainer/>} domain={{x: [102,123], y: [123,102]}} labels='ORtg' labelComponent={<VictoryLabel />}>
              {
                teams.slice(1).map(team => {
                  return (
                    <VictoryScatter key={team.id} style={{data: {fill: team.color}}} labelComponent={<VictoryTooltip/>} data={[{x: team.ortg, y: team.drtg, label: `${team.team}\nORtg: ${team.ortg}, DRtg: ${team.drtg}`}]} />
                  )
                })
              }
              <VictoryLegend x={100} y={10} title='Offensive Rating vs Defensive Rating' centerTitle orientation='horizontal' gutter={20} data={[]} style={{labels: { fontSize: 12},title: { fontSize: 20}}}/>
              <VictoryAxis offsetX={60} axisLabelComponent={<VictoryLabel dy={-30}/>} dependentAxis crossAxis label='Defensive Rating' fixLabelOverlap={true}/>
              <VictoryAxis axisLabelComponent={<VictoryLabel dy={20}/>} label='Offensive Rating' fixLabelOverlap={true}/>
            </VictoryChart>
          </Paper>
        </div>
      </div>
    )

  }

}

export default RtgChart
