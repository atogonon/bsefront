import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import { AppBar, Typography, Toolbar, Drawer } from '@material-ui/core';
import OppBar from './components/oppBar'
import Matchup from './components/matchup'
import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './components/tabPanel'
import RtgChart from './components/rtgChart'
import About from './components/about'
import { tabProps, theme } from './utils'

function App() {

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(0)

  const handleChange = (event, val) => { setValue(val) }
  const closeDrawer = () => { setOpen(false) }
  const handleClick = () => { setOpen(!open) }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppBar position='sticky'>
          <Toolbar>
            <div className='appToolbar'>
              <div id='appBarLeft'>
                <div id='logoContainer'>
                  <img src={process.env.PUBLIC_URL + '/logo.svg'} height='60px' alt='netslogo' />
                </div>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                  <Tab label="Matchups" {...tabProps(0)} />
                  <Tab label="Team Ratings" {...tabProps(1)} />
                  <Tab label="About" {...tabProps(2)} />
                </Tabs>
              </div>
              <Typography variant='h5'>Brooklyn Nets Basketball</Typography>
            </div>
          </Toolbar>
          <Drawer variant='persistent' anchor='top' open={open}>
            <OppBar closeDrawer={closeDrawer} />
          </Drawer>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Matchup iconFunc={handleClick} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RtgChart />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <About />
        </TabPanel>
      </ThemeProvider>
    </div>
  );
}

export default App;
