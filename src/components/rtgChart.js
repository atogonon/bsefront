import React from 'react'
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryTooltip, VictoryContainer,VictoryAxis, VictoryLabel, VictoryLegend} from 'victory'
import Paper from '@material-ui/core/Paper'

class RtgChart extends React.Component {

  render() {

    const { teams } = this.props

    return (
      <div className='scatterChart'>
        <Paper>
          <VictoryChart theme={VictoryTheme.material} height={500} width={500} containerComponent={<VictoryContainer/>} domain={{x: [102,123], y: [123,102]}} labels='ORtg' labelComponent={<VictoryLabel />}>
            {
              teams.slice(1).map(team => {
                return (
                  <VictoryScatter style={{data: {fill: team.color}}} labelComponent={<VictoryTooltip/>} data={[{x: team.ortg, y: team.drtg, label: `${team.team}\nORtg: ${team.ortg}, DRtg: ${team.drtg}`}]} />
                )
              })
            }
            <VictoryLegend x={100} y={10} title='Offensive Rating vs Defensive Rating' centerTitle orientation='horizontal' gutter={20} data={[]} style={{labels: { fontSize: 12},title: { fontSize: 20}}}/>
            <VictoryAxis offsetX={60} axisLabelComponent={<VictoryLabel dy={-30}/>} dependentAxis crossAxis label='Defensive Rating' fixLabelOverlap={true}/>
            <VictoryAxis axisLabelComponent={<VictoryLabel dy={20}/>} label='Offensive Rating' fixLabelOverlap={true}/>
          </VictoryChart>
        </Paper>
      </div>
    )

  }

}

export default RtgChart
