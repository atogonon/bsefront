import { createMuiTheme } from '@material-ui/core/styles';
import { createContainer } from 'victory'

//Function to convert data for polar chart in matchups
export function convertToPolar(teams, nets, opp) {
  let minPts=Infinity, maxPts=-Infinity, minBlk=Infinity, maxBlk=-Infinity, minStl=Infinity, maxStl=-Infinity, minReb=Infinity, maxReb=-Infinity, minAst=Infinity, maxAst=-Infinity

  //iterate through each team to find the max and min of each stat category in the polar chart
  teams.forEach(team => {
    if (team.pts > maxPts) { maxPts=team.pts }
    if (team.pts < minPts) { minPts=team.pts}

    if (team.blk > maxBlk) { maxBlk=team.blk }
    if (team.blk < minBlk) { minBlk=team.blk}

    if (team.stl > maxStl) { maxStl=team.stl }
    if (team.stl < minStl) { minStl=team.stl}

    if (team.trb > maxReb) { maxReb=team.trb }
    if (team.trb < minReb) { minReb=team.trb}

    if (team.ast > maxAst) { maxAst=team.ast }
    if (team.ast < minAst) { minAst=team.ast}
  })

  // Use the max and min of each stat to calculate the range for the polar chart.
  // For the new range I wanted the minValue to represent 10% of the range and maxValue to represent 90% (So original range = 80% of new range)
  function rangeCalc(min, max){
    let origRange=max-min, newRange=(10*origRange)/8
    return [newRange, origRange]
  }
  let ptsRanges=rangeCalc(minPts, maxPts)
  let blkRanges=rangeCalc(minBlk, maxBlk)
  let stlRanges=rangeCalc(minStl, maxStl)
  let rebRanges=rangeCalc(minReb, maxReb)
  let astRanges=rangeCalc(minAst, maxAst)

  // Calculate the value to subtract from the stat so that it falls within the new range
  function calcSub(min, ranges) {
    return min-((ranges[0]-ranges[1])/2)
  }
  let subPts=calcSub(minPts, ptsRanges)
  let subBlk=calcSub(minBlk, blkRanges)
  let subStl=calcSub(minStl, stlRanges)
  let subReb=calcSub(minReb, rebRanges)
  let subAst=calcSub(minAst, astRanges)

  // Calculate the normalized value of the stat by subtracting from the original value and dividing by the new range
  function calcValue(stat, sub, range) {
    return (stat-sub)/range[0]
  }

  let resNets=[
    { x: 1 , y: calcValue(nets.pts, subPts, ptsRanges), label: `${nets.pts} PPG` },
    { x: 2 , y: calcValue(nets.blk, subBlk, blkRanges), label: `${nets.blk} BPG` },
    { x: 3 , y: calcValue(nets.stl, subStl, stlRanges), label: `${nets.stl} SPG` },
    { x: 4 , y: calcValue(nets.trb, subReb, rebRanges), label: `${nets.trb} RPG` },
    { x: 5 , y: calcValue(nets.ast, subAst, astRanges), label: `${nets.ast} APG` },
  ]

  let resOpp=[
    { x: 1 , y: calcValue(opp.pts, subPts, ptsRanges), label: `${opp.pts} PPG` },
    { x: 2 , y: calcValue(opp.blk, subBlk, blkRanges), label: `${opp.blk} BPG` },
    { x: 3 , y: calcValue(opp.stl, subStl, stlRanges), label: `${opp.stl} SPG` },
    { x: 4 , y: calcValue(opp.trb, subReb, rebRanges), label: `${opp.trb} RPG` },
    { x: 5 , y: calcValue(opp.ast, subAst, astRanges), label: `${opp.ast} APG` },
  ]

  return [resNets, resOpp]
}


// Helper function for tabProps
export function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


// Creates theme for the AppBar component
export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#ffffff',
    },
  },
});


// Creates custom victory container component for rtgChart.js
export const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");


// Generate barChart component data objects
export function generateBarData(nets, league, opponent) {

  const legend=[
    {name: nets.team, symbol: {fill: 'black'}}, {name: 'League Avg', symbol: {fill: 'pink'}}, {name: opponent.team, symbol: {fill: opponent.color}}
  ]

  //  Helper function to form data object structure
  function dataObj(title, domain, categories, nets, league, opponent, color, offset, domainPadding) {
    return {
      title,
      domain,
      categories,
      legend,
      nets,
      league,
      opponent,
      color,
      offset,
      domainPadding,
    }
  }

  // Create shooting percentage data object
  const spDomain={x: [0, 8], y:[0.2, 1]}
  const spCat={x: ['FG%', '', '2pt%', ' ', '3pt%', '  ', 'FT%']}
  const spNets=[
    { x: 1, y: nets.fgp, label: `${nets.fgp}`},
    { x: 3, y: nets.twoP, label: `${nets.twoP}` },
    { x: 5, y: nets.thrP, label: `${nets.thrP}` },
    { x: 7, y: nets.ftP, label: `${nets.ftP}` }
  ]
  const spLeague=[
    { x: 1, y: league.fgp, label: `${league.fgp}` },
    { x: 3, y: league.twoP, label: `${league.twoP}` },
    { x: 5, y: league.thrP, label: `${league.thrP}` },
    { x: 7, y: league.ftP, label: `${league.ftP}` }
  ]
  const spOpponent=[
    { x: 1, y: opponent.fgp, label: `${opponent.fgp}` },
    { x: 3, y: opponent.twoP, label: `${opponent.twoP}` },
    { x: 5, y: opponent.thrP, label: `${opponent.thrP}` },
    { x: 7, y: opponent.ftP, label: `${opponent.ftP}` }
  ]
  const spData=dataObj('Shooting %s', spDomain, spCat, spNets, spLeague, spOpponent, opponent.color, 20, 0)

  //Create defensive data object
  const defDomain={x: [0, 4], y:[0, 30]}
  const defCat={x: ['Steals', 'Blocks', 'Personal Fouls']}
  const defNets=[
    { x: 1, y: nets.stl, label: `${nets.stl}`},
    { x: 2, y: nets.blk, label: `${nets.blk}` },
    { x: 3, y: nets.pf, label: `${nets.pf}` },
  ]
  const defLeague=[
    { x: 1, y: league.stl, label: `${league.stl}` },
    { x: 2, y: league.blk, label: `${league.blk}` },
    { x: 3, y: league.pf, label: `${league.pf}` },
  ]
  const defOpponent=[
    { x: 1, y: opponent.stl, label: `${opponent.stl}` },
    { x: 2, y: opponent.blk, label: `${opponent.blk}` },
    { x: 3, y: opponent.pf, label: `${opponent.pf}` },
  ]
  const defData=dataObj('Defensive', defDomain, defCat, defNets, defLeague, defOpponent, opponent.color, 20, 0)

  // Create assist/turnover data object
  const astDomain={x: [0, 3], y:[0, 40]}
  const astCat={x: ['Assists', 'Turnovers']}
  const astNets=[
    { x: 1, y: nets.ast, label: `${nets.ast}`},
    { x: 2, y: nets.tov, label: `${nets.tov}` },
  ]
  const astLeague=[
    { x: 1, y: league.ast, label: `${league.ast}` },
    { x: 2, y: league.tov, label: `${league.tov}` },
  ]
  const astOpponent=[
    { x: 1, y: opponent.ast, label: `${opponent.ast}` },
    { x: 2, y: opponent.tov, label: `${opponent.tov}` },
  ]
  const astTurnData=dataObj('Assists & Turnovers', astDomain, astCat, astNets, astLeague, astOpponent, opponent.color, 25, 0)

  // Create rebounding data object
  const rebDomain={x: [0, 4], y:[0, 60]}
  const rebCat={x: ['Off Reb', 'Def Reb', 'Total Reb']}
  const rebNets=[
    { x: 1, y: nets.orb, label: `${nets.orb}`},
    { x: 2, y: nets.drb, label: `${nets.drb}` },
    { x: 3, y: nets.trb, label: `${nets.trb}` },
  ]
  const rebLeague=[
    { x: 1, y: league.orb, label: `${league.orb}` },
    { x: 2, y: league.drb, label: `${league.drb}` },
    { x: 3, y: league.trb, label: `${league.trb}` },
  ]
  const rebOpponent=[
    { x: 1, y: opponent.orb, label: `${opponent.orb}` },
    { x: 2, y: opponent.drb, label: `${opponent.drb}` },
    { x: 3, y: opponent.trb, label: `${opponent.trb}` },
  ]
  const rebData=dataObj('Rebounding', rebDomain, rebCat, rebNets, rebLeague, rebOpponent, opponent.color, 20, 0)

  // Create ppg data object
  const ptsDomain={x: [0, 2], y:[90, 130]}
  const ptsCat={x: ['Points Per Game']}
  const ptsNets=[
    { x: 1, y: nets.pts, label: `${nets.pts}`},
  ]
  const ptsLeague=[
    { x: 1, y: league.pts, label: `${league.pts}` },
  ]
  const ptsOpponent=[
    { x: 1, y: opponent.pts, label: `${opponent.pts}` },
  ]
  const ptsData=dataObj('Points Per Game', ptsDomain, ptsCat, ptsNets, ptsLeague, ptsOpponent, opponent.color, 70, 20)

  return [spData, defData, astTurnData, rebData, ptsData]
}
