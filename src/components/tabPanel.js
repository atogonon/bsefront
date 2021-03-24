import React from "react";
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

class TabPanel extends React.Component {

  render() {

    const { children, value, index, ...other } = this.props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other} >
        {
          value === index && (
            <Box p={3}>
              {children}
            </Box>
          )
        }
      </div>
    );

  }

}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel