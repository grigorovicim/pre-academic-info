// @ts-ignore
import React, {Component} from 'react';

import './Popup.css';
import {connect} from "react-redux";
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
      isPopupVisible,
        popupContent,
    } = this.props;

    let display;
    
    if (isPopupVisible) {
      display = 'flex';
    } else {
      display = 'none';
    }

    let component;
    if (popupContent !== undefined) {
      component = popupContent
    } else {
      component = <span></span>;
    }
    
    return (
      <div className="p-popup" style={{display}} onClick={this.handleClick}>
        <div className="p-popup-core" onClick={e => {e.stopPropagation()}}>
          <div className="p-close-button" onClick={this.handleClick}> X </div>
          {component}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
    return {
        isPopupVisible: state.app.isPopupVisible,
        popupContent: state.app.popupContent,
    };
};

export default connect(
    mapStateToProps,
)(Popup);