import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import { AppBar, Typography, Toolbar, Drawer } from '@material-ui/core';
import OppBar from './components/oppBar'
import Matchup from './components/matchup'
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './components/tabPanel'
import RtgChart from './components/rtgChart'
import About from './components/about'
import { tabProps, theme } from './utils'

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
                    <Tab label="Matchups" {...tabProps(0)}/>
                    <Tab label="Team Ratings" {...tabProps(1)}/>
                    <Tab label="About" {...tabProps(2)}/>
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
                <RtgChart />
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

export default App;
