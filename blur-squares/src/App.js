import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  static getRgb(value) {
    return `rgb(${value}, ${value}, ${value})`;
  }

  static getDerivedStateFromProps(props, state) {
    let color = (Math.random() * 255);

    if (state.c !== undefined) {
      color = ((color - state.c) / 3) + state.c;
    }

    return {
      viewport: props.viewport,
      x: props.item.x,
      y: props.item.y,
      c: color,
      style: {
        position: "absolute",
        left: props.viewport.width / 12 * props.item.x,
        top: props.viewport.height / 12 * props.item.y,
        width: props.viewport.width / 14 + 'px',
        height: props.viewport.height / 14+ 'px',
        backgroundColor: Square.getRgb(color)
      }
    };
  }

  render() {
    return (
      <div className="circle" style={ this.state.style }></div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 0,
        height: 0
      },
      ticks: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    this.handler = setInterval(() => {
      this.setState({
        ticks: this.state.ticks + 1
      });
    }, 80);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({  viewport: { width: window.innerWidth, height: window.innerHeight }});
  }

  componentWillMount() {
    let items = [];

    for (let y=0; y < 12; y++) {
      for (let x=0; x < 12; x++) {
        items.push({
          key: y * 12 + x,
          x: x,
          y: y
        });
      }
    }

    this.setState({
      items: items
    });
  }

  render() {
    return (
      <div className="blur">
        { this.state.items.map(item => {
          return (
            <Square key={ item.key } item={ item } viewport={ this.state.viewport } ticks={ this.state.ticks }></Square>
          )}
        )}
      </div>
    );
  }
}

export default App;
