import React from 'react'
import reactCSS from 'reactcss'
import { CirclePicker } from 'react-color'
import { hex2rgb, rgb2hex } from './get';

class ColorPicker extends React.Component {
    constructor(props) {
		super(props);
    }    
    state = {
        displayColorPicker: false,
        color: hex2rgb(this.props.color),
    }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
    this.context.ChangeColor(this.props.id, rgb2hex(`rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`));
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '32px',
          height: '32px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
          position: 'relative',
          bottom: '9px'
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          marginLeft: '-54px',
          backgroundColor: '#124571',
          borderRadius: '5px'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <CirclePicker color={ this.state.color } 
                width="152px"
                colors={["#d02020", "#ee6060", "#ff6020", "#ffc0b0", "#fff040", "#fff080", "#05d00d", "#7ad080", "#03b0f0", "#80d0f0", "#0040ff", "#4060ff", "#7020ff", "#a080ff", "#ff30ff", "#ffb0ff", "#707070", "#e0e0e0", "#705040", "#10ffff"]}
                circleSize={28} circleSpacing={0}
                onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

export default ColorPicker