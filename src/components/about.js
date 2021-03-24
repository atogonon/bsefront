import React from 'react'
import Paper from '@material-ui/core/Paper'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

class About extends React.Component {

  render() {

    return (
      <div className='content'>
        <div id='abtContainer'>
        <Paper>
            <p id='abtContent'>
              Thanks for checking out my basketball stats project!  As a big basketball fan, and Nets fan specifically, I had a lot of fun with this one.  For this project I wanted to be able to demonstrate my skills on both the front and back end.  This was also a good way for me to learn and work with data visualization tools, which in this case was Victory.  All data from this project was courtesy of <a href='https://www.basketball-reference.com/'>Basketball Reference</a> and are per-game averages (with some advanced stats like adjusted offensive & defensive rating) based on data collected from the 2020-2021 NBA season up to March 19th 2021.  All team logos are from <a href='https://www.nba.com/'>NBA.com</a>.  I hope to continue to update this project in the future as I dive deeper into the stats and tinker more with Victory.<br/><br/>
              <b>Back End</b><br/>
              <a href='https://github.com/atogonon/bseback'>Click here to view the repo</a><br/>
              Technology: Node, Express, Postgres<br/><br/>
              <b>Front End</b><br/>
              <a href='https://github.com/atogonon/bsefront'>Click here to view the repo</a><br/>
              Technology: React, Redux, Victory, Material-UI<br/><br/>
              <b>My Links</b><br/>
              <a href='https://github.com/atogonon'><GitHubIcon/></a>&nbsp;&nbsp;&nbsp;
              <a href='https://www.linkedin.com/in/atogonon/'><LinkedInIcon/></a>
            </p>
          </Paper></div>
      </div>
    )
  }

}

export default About
