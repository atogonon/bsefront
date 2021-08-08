import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getTeams } from '../reducers/teamsReducer'
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryTooltip, VictoryAxis, VictoryLabel, VictoryLegend } from 'victory'
import Paper from '@material-ui/core/Paper'
import LogoPoint from './logoPoint'
import { VictoryZoomVoronoiContainer } from '../utils'

function RtgChart(props) {

  const { teams, getTeams } = props

  useEffect(() => {
    if (!teams.length) { getTeams() }
  }, [teams.length, getTeams])

  return (
    <div>
      {
        !teams.length ? (
          <div className='loadingScreen'>
            <h1 className='loading'>LOADING DATA</h1>
          </div>
        ) : (
          <div className='content'>
            <div className='headerContainer'>
              <Paper>
                <p id='rtgChartHeader'>
                  Here you can find out how each team measures up to the rest of the league with respect to offensive and defensive ratings (adjusted for opponent strength).  Moving further right along the x axis correlates to better offense.  However, unlike most stats, having a lower value for defensive rating is indicative of better defensive performance.  Therefore moving DOWN along the y axis correlates to better defense.  Ideally, any given team would want to move towards the lower right portion of this chart.  Mouse over each data point to identify the team and their individual offensive and defensive ratings.  You can also zoom in to better view the separation between teams that are clustered together.<br /><br />
                  All data from this project was courtesy of <a href='https://www.basketball-reference.com/'>Basketball Reference</a> and based on data collected from the 2020-2021 NBA season up to March 19th 2021.
                </p>
              </Paper>
            </div>
            <div className='scatterChart'>
              <Paper>
                <VictoryChart theme={VictoryTheme.material} height={500} width={500} containerComponent={<VictoryZoomVoronoiContainer />} domain={{ x: [102, 123], y: [102, 123] }} labelComponent={<VictoryLabel />}>
                  {
                    teams.slice(1).map(team => {
                      return (
                        <VictoryScatter key={team.id} style={{ data: { fill: team.color } }} labelComponent={<VictoryTooltip />} data={[{ x: team.ortg, y: team.drtg, label: `${team.team}\nORtg: ${team.ortg}, DRtg: ${team.drtg}` }]} dataComponent={<LogoPoint imgURL={team.imgURL} />} />
                      )
                    })
                  }
                  <VictoryLegend x={100} y={10} title='Offensive Rating vs Defensive Rating' centerTitle orientation='horizontal' gutter={20} data={[]} style={{ labels: { fontSize: 12 }, title: { fontSize: 20 } }} />
                  <VictoryAxis offsetX={60} axisLabelComponent={<VictoryLabel dy={-30} />} dependentAxis crossAxis label='Defensive Rating' fixLabelOverlap={true} />
                  <VictoryAxis axisLabelComponent={<VictoryLabel dy={20} />} label='Offensive Rating' fixLabelOverlap={true} />
                </VictoryChart>
              </Paper>
            </div>
          </div>
        )
      }
    </div>
  )

}

const mapState = (state) => {
  return {
    teams: state.teams
  }
}

const mapDispatch = (dispatch) => {
  return {
    getTeams: () => dispatch(getTeams()),
  }
}

export default connect(mapState, mapDispatch)(RtgChart)
