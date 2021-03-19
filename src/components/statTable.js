import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class StatTable extends React.Component {

  render() {

    const { nets, league, opponent } = this.props
    const netsKeys=Object.keys(nets), oppKeys=Object.keys(opponent), leagueKeys=Object.keys(league)

    return (
      <div id='statTable'>
      <TableContainer component={Paper}>
        <Table >
          <TableHead style={{ color: 'grey'}}>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">Games Played</TableCell>
              <TableCell align="right">Minutes Played</TableCell>
              <TableCell align="right">FGM</TableCell>
              <TableCell align="right">FGA</TableCell>
              <TableCell align="right">FG%</TableCell>
              <TableCell align="right">3pt FGM</TableCell>
              <TableCell align="right">3pt FGA</TableCell>
              <TableCell align="right">3pt FG%</TableCell>
              <TableCell align="right">2pt FGM</TableCell>
              <TableCell align="right">2pt FGA</TableCell>
              <TableCell align="right">2pt FG%</TableCell>
              <TableCell align="right">FTM</TableCell>
              <TableCell align="right">FTA</TableCell>
              <TableCell align="right">FT%</TableCell>
              <TableCell align="right">OReb</TableCell>
              <TableCell align="right">DReb</TableCell>
              <TableCell align="right">Total Reb</TableCell>
              <TableCell align="right">AST</TableCell>
              <TableCell align="right">STL</TableCell>
              <TableCell align="right">BLK</TableCell>
              <TableCell align="right">TOV</TableCell>
              <TableCell align="right">PF</TableCell>
              <TableCell align="right">PTS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">{nets.team}</TableCell>
              {
                netsKeys.slice(2, 25).map(key => {
                  return (<TableCell key={key} align="right">{nets[key]}</TableCell>)
                })
              }
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">{opponent.team}</TableCell>
              {
                oppKeys.slice(2, 25).map(key => {
                  return (<TableCell key={key} align="right">{opponent[key]}</TableCell>)
                })
              }
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">{league.team}</TableCell>
              {
                leagueKeys.slice(2, 25).map(key => {
                  return (<TableCell key={key} align="right">{league[key]}</TableCell>)
                })
              }
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    )
  }
}

export default StatTable
