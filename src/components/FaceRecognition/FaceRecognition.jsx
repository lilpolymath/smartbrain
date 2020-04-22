import React from 'react';

const FaceRecgnition = ({ imageUrl }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img
          id='inputImage'
          alt='To Detect'
          src={imageUrl}
          width='500px'
          height='400px'
        />
      </div>
    </div>
  );
};

export default FaceRecgnition;
