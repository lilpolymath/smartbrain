import React from 'react';

const FaceRecgnition = ({ imageUrl }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img alt="To Detect" src={imageUrl} width="500px" height="500px" />
      </div>
    </div>
  );
};

export default FaceRecgnition;
