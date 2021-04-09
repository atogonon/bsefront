import React from 'react'
import { VictoryChart, VictoryGroup, VictoryBar, VictoryLegend, VictoryTooltip, VictoryZoomContainer} from 'victory'
import Paper from '@material-ui/core/Paper'

class BarChart extends React.Component {

  render() {

    const { title, domain, categories, legend, nets, league, opponent, color, offset, domainPadding } = this.props.data

    return (
      <div className='barChart'>
        <Paper>
          <VictoryChart containerComponent={<VictoryZoomContainer/>} domainPadding={domainPadding}>
            <VictoryLegend x={60} y={0} title={title} centerTitle orientation='horizontal' gutter={20} data={legend} style={{labels: { fontSize: 12},title: { fontSize: 20}}}/>
            <VictoryGroup domain={domain} offset={offset} colorScale={"qualitative"} categories={categories} >
              <VictoryBar labelComponent={<VictoryTooltip/>} color='black' data={nets} />
              <VictoryBar labelComponent={<VictoryTooltip/>} color='pink' data={league} />
              <VictoryBar labelComponent={<VictoryTooltip/>} color={color} data={opponent} />
            </VictoryGroup>
          </VictoryChart>
        </Paper>
      </div>
    )

  }

}

export default BarChart
