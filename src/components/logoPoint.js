import React from 'react'

function LogoPoint(props) {

  const { x, y, imgURL } = props;

  return (
    <image x={x - 25} y={y - 25} href={imgURL} height={50} />
  );

}

export default LogoPoint
