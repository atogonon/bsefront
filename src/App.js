import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import OppBar from './components/oppBar'
import Comparison from './components/comparison'

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

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h4'>Brooklyn Nets Basketball</Typography>
          </Toolbar>
        </AppBar>
        <div className='content'>
          <OppBar />
          <Comparison />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
