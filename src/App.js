import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { AppBar, Typography, Toolbar, Drawer } from '@material-ui/core';
import OppBar from './components/oppBar'
import Matchup from './components/matchup'
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RtgChart from './components/rtgChart'
import { connect } from 'react-redux'
import About from './components/about'
import { TabPanel, a11yProps } from './utils'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#ffffff',
    },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      open: false,
      value: 0
     }

    this.handleClick=this.handleClick.bind(this)
    this.closeDrawer=this.closeDrawer.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }

  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <AppBar position='sticky'>
            <Toolbar>
              <div className='appToolbar'>
                <div id='appBarLeft'>
                  <div id='logoContainer'>
                    <img src={process.env.PUBLIC_URL + '/logo.svg'} height='60px' alt='netslogo'/>
                  </div>
                  <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
                    <Tab label="Matchups" {...a11yProps(0)}/>
                    <Tab label="Team Ratings" {...a11yProps(1)}/>
                    <Tab label="About" {...a11yProps(2)}/>
                  </Tabs>
                </div>
                <Typography variant='h5'>Brooklyn Nets Basketball</Typography>
              </div>
            </Toolbar>
            <Drawer variant='persistent' anchor='top' open={this.state.open}>
                <OppBar closeDrawer={this.closeDrawer}/>
            </Drawer>
          </AppBar>
            <TabPanel value={this.state.value} index={0}>
                <Matchup iconFunc={this.handleClick}/>
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
                <RtgChart teams={this.props.teams}/>
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
              <About/>
            </TabPanel>
        </ThemeProvider>
      </div>
    );
  }

  handleChange(event, newValue) {
    this.setState({...this.state, value: newValue})
  }

  closeDrawer() {
    this.setState({ ...this.state, open: false })
  }

  handleClick() {
    this.setState({ ...this.state, open: !this.state.open})
  }

}

const mapState = (state) => {
  return {
    teams: state.teams,
  }
}

export default connect(mapState, null)(App);
