import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { AppBar, Typography, Toolbar, Drawer } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import OppBar from './components/oppBar'
import Content from './components/content'
import React from 'react';

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

    this.state={ open: false }

    this.handleClick=this.handleClick.bind(this)
    this.closeDrawer=this.closeDrawer.bind(this)
  }

  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <AppBar position='sticky'>
            <Toolbar>
              <div className='appToolbar'>
                <div id='appBarLeft'>
                <IconButton color="inherit" aria-label="open drawer" onClick={this.handleClick} edge="start">
                  <MenuIcon />
                </IconButton>
                <Typography variant='h4'>Brooklyn Nets Basketball</Typography></div>
                <img src={process.env.PUBLIC_URL + '/logo.svg'} height='60px' alt='netslogo'/>
              </div>
            </Toolbar>
            <Drawer variant='persistent' anchor='top' open={this.state.open}>
              <div>
                <OppBar closeDrawer={this.closeDrawer}/>
              </div>
            </Drawer>
          </AppBar>
          <div className='content'>
            <Content />
          </div>
        </ThemeProvider>
      </div>
    );
  }

  closeDrawer() {
    this.setState({ open: false })
  }

  handleClick() {
    this.setState({ open: !this.state.open})
  }

}

export default App;
