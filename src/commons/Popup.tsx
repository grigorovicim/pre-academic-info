// @ts-ignore
import React, {Component} from 'react';

import './Popup.css';
// import Login from 'src/authentication/Login';

class Popup extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: any) {
    this.props.onClose();
  }


  render() {

    const {
      isVisible,
      componentType,
    } = this.props;

    let display;
    
    if (isVisible) {
      display = 'flex';
    } else {
      display = 'none';
    }

    let component;
    if (componentType === "home") {
      return null;
    } else if (componentType === "p-login-button") {
      component = <div>LOGIN HERE SOON!</div>//<Login/>;
    } else {
      component = <span></span>;
    }
    
    return (
      <div className="v-popup" style={{display}} onClick={this.handleClick}>
        <div className="v-popup-core" onClick={e => {e.stopPropagation()}}>
          <div className="v-close-button" onClick={this.handleClick}> X </div>
          {component}
        </div>
      </div>
    );
  }
}

export default Popup;