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
