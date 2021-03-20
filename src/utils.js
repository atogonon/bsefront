import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

export function convertToPolar(teams, nets, opp) {
  let minPts=Infinity, maxPts=-Infinity, minBlk=Infinity, maxBlk=-Infinity, minStl=Infinity, maxStl=-Infinity, minReb=Infinity, maxReb=-Infinity, minAst=Infinity, maxAst=-Infinity

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

  let ptsRange=maxPts-minPts, blkRange=maxBlk-minBlk, stlRange=maxStl-minStl, rebRange=maxReb-minReb, astRange=maxAst-minAst
  let newPtsRange=(10*ptsRange)/8
  let newBlkRange=(10*blkRange)/8
  let newStlRange=(10*stlRange)/8
  let newRebRange=(10*rebRange)/8
  let newAstRange=(10*astRange)/8

  let subPts=minPts-((newPtsRange-ptsRange)/2)
  let subBlk=minBlk-((newBlkRange-blkRange)/2)
  let subStl=minStl-((newStlRange-stlRange)/2)
  let subReb=minReb-((newRebRange-rebRange)/2)
  let subAst=minAst-((newAstRange-astRange)/2)

  let resNets=[
    { x: 1 , y: (nets.pts-subPts)/newPtsRange, label: `${nets.pts} PPG` },
    { x: 2 , y: (nets.blk-subBlk)/newBlkRange, label: `${nets.blk} BPG` },
    { x: 3 , y: (nets.stl-subStl)/newStlRange, label: `${nets.stl} SPG` },
    { x: 4 , y: (nets.trb-subReb)/newRebRange, label: `${nets.trb} RPG` },
    { x: 5 , y: (nets.ast-subAst)/newAstRange, label: `${nets.ast} APG` },
  ]

  let resOpp=[
    { x: 1 , y: (opp.pts-subPts)/newPtsRange, label: `${opp.pts} PPG` },
    { x: 2 , y: (opp.blk-subBlk)/newBlkRange, label: `${opp.blk} BPG` },
    { x: 3 , y: (opp.stl-subStl)/newStlRange, label: `${opp.stl} SPG` },
    { x: 4 , y: (opp.trb-subReb)/newRebRange, label: `${opp.trb} RPG` },
    { x: 5 , y: (opp.ast-subAst)/newAstRange, label: `${opp.ast} APG` },
  ]

  return [resNets, resOpp]
}

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
