import React from 'react'
import { connect } from 'react-redux'
import { getNets } from '../reducers/netsReducer'
import { getLeague } from '../reducers/leagueReducer'
import { getOpp } from '../reducers/opponentReducer'
import MenuIcon from '@material-ui/icons/Menu'
import StatTable from './statTable'
import PolarChart from './polarChart'
import BarChart from './barChart'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import { generateBarData } from '../utils'

class Matchup extends React.Component {

  render() {

    const { teams, nets, league, opponent } = this.props

    const [spData, defData, astTurnData, rebData, ptsData] = generateBarData(nets, league, opponent)

    return (
      <div className='content'>
        {
          (!teams.length || !nets.team || !league.team || !opponent.team) ? (
            <div className='loadingScreen'>
              <h1 className='loading'>LOADING DATA</h1>
            </div>
          ) : (
            <div className='statComps'>
              <div id='fabButton'>
                <Fab color='primary' style={{position: 'fixed'}} onClick={this.props.iconFunc}>
                  <MenuIcon />
                </Fab>
              </div>
              <div id='appHeader'>
                <Paper>
                  <p id='headerContent'>
                    Welcome to my app! Here you can view the stats of the Brooklyn Nets and see how they compare to a given opponent. You can hover over each data point in each chart to view the exact value for that stat.<br/><br/>
                    All data from this project is courtesy of <a href='https://www.basketball-reference.com/'>Basketball Reference</a> and are per-game averages (with some advanced stats like adjusted offensive & defensive rating) based on data collected from the 2020-2021 NBA season up to March 19th 2021.<br/><br/>
                      To select an opponent, click on the <MenuIcon /> button on the top left of your screen above.
                  </p>
                </Paper>
              </div>
              <div className='atAGlance'>
                <Paper>
                  <div id='atAGlanceContainer'>
                    <div className='netsStats'>
                      <h1 className='teamName'>{nets.team}</h1>
                      <img src={nets.imgURL}  height={400} alt={nets.team}/><br/>
                    </div>
                    <PolarChart nets={nets} opponent={opponent} teams={teams}/>
                    <div className='oppStats'>
                      <h1 className='teamName'>{opponent.team}</h1>
                      <img src={opponent.imgURL}  height={400} alt={opponent.team}/><br/>
                    </div>
                  </div>
                </Paper>
              </div>
              <StatTable nets={nets} opponent={opponent} league={league} />
              <div className='charts'>
                  <BarChart data={spData} />
                  <BarChart data={rebData} />
                  <BarChart data={astTurnData} />
                  <BarChart data={defData} />
                  <BarChart data={ptsData} />
              </div>
            </div>
          )
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.getNets()
    this.props.getLeague()
    if (!this.props.opponent.team) { this.props.getOpp(3) }
  }

}

const mapState = (state) => {
  return {
    teams: state.teams,
    nets: state.nets,
    league: state.league,
    opponent: state.opponent
  }
}

const mapDispatch = (dispatch) => {
  return {
    getNets: () => dispatch(getNets()),
    getLeague: () => dispatch(getLeague()),
    getOpp: (id) => dispatch(getOpp(id))
  }
}

export default connect(mapState, mapDispatch)(Matchup)
