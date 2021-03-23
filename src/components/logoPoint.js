import React from 'react'

class LogoPoint extends React.Component {
  render() {
    const {x, y , imgURL} = this.props;
    return (
      <image x={x-25} y={y-25} href={imgURL} height={50}/>
    );
  }
}

export default LogoPoint
