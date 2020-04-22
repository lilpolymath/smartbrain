import React from 'react';
import './styles.css';

const FaceRecgnition = ({ imageUrl, boxes }) => {
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
        {boxes.map(box => {
          return (
            <div
              className='bounding_box'
              style={{
                top: box.topRow,
                left: box.leftCol,
                right: box.rightCol,
                bottom: box.bottomRow,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecgnition;
