import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';

import './App.css';

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_API_KEY,
});

const particlesOptions = {
  particles: {
    number: {
      value: 140,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boundingBox: [],
    };
  }

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.calculateBoxLocation(response))
      .catch(err => console.log(err));
  };

  calculateBoxLocation = data => {
    const facialData = data.outputs[0].data.regions.map(region => {
      return region.region_info.bounding_box;
    });

    const box = facialData.map(face => this.convertPercentToDimensions(face));
    this.setState({ boundingBox: box });
  };

  convertPercentToDimensions = data => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    const leftCol = data.left_col * width;
    const topRow = data.top_row * height;
    const rightCol = width - data.right_col * width;
    const bottomRow = height - data.bottom_row * height;

    return { leftCol, topRow, rightCol, bottomRow };
  };

  displayBox = () => {};

  render() {
    return (
      <div className='App'>
        <Particles className='particles' params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLink
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition
          boxes={this.state.boundingBox}
          imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}

export default App;
