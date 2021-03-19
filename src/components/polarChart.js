import React from 'react'
import { convertToPolar } from '../utils'
import { VictoryChart, VictoryLegend, VictoryTooltip, VictoryPolarAxis, VictoryTheme, VictoryVoronoiContainer, VictoryArea} from 'victory'

class PolarChart extends React.Component {

  render() {

    const { teams, nets, opponent } = this.props
    let [netsPolar, oppPolar] = convertToPolar(teams, nets, opponent)

    return (
      <div id='polarChart'>
        <VictoryChart polar domain={{ y: [0, 1]}} theme={VictoryTheme.material} categories={['Pts', 'Blk', 'Stl', 'Reb', 'Ast']} containerComponent={<VictoryVoronoiContainer />}>
          <VictoryLegend x={50} y={-30} title='Matchup At A Glance' centerTitle orientation='horizontal' gutter={20} data={[{name: nets.team, symbol: {fill: 'black'}}, {name: opponent.team, symbol: {fill: opponent.color}}]} style={{ title: {fontSize: 20, fontWeight: 'bold'}}}/>
          <VictoryPolarAxis dependentAxis style={{ axis: { stroke: "solid" } }} tickFormat={() => null} />
          <VictoryPolarAxis/>
          <VictoryArea theme={VictoryTheme.material} style={{data: { fill: `${nets.color}`, fillOpacity: 0.25, stroke: `${nets.color}`, strokeWidth: 3}}} labelComponent={<VictoryTooltip/>} data={netsPolar}/>
          <VictoryArea theme={VictoryTheme.material} style={{data: { fill: `${opponent.color}`, fillOpacity: 0.25, stroke: `${opponent.color}`, strokeWidth: 3}}} labelComponent={<VictoryTooltip/>} data={oppPolar}/>
        </VictoryChart>
      </div>
    )
  }

}

export default PolarChart
