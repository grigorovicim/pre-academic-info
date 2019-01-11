// @ts-ignore
import React, {Component} from 'react';

import './Popup.css';
import { connect } from 'react-redux';

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
      popupContent,
    } = this.props;

    let display;
    let setWidth = "640px";
    let setHeight = "650px";
    
    if (isVisible) {
      display = 'flex';
    } else {
      display = 'none';
    } 

    if(this.props.isAlert) {
      setWidth = "640px";
      setHeight = "220px";
    }

    let component;
    if (this.props.popupContent !== undefined) {
      component = popupContent
    } else {
      component = <span></span>;
    }
    
    return (
      <div className="p-popup" style={{display}} onClick={this.handleClick}>
        <div className="p-popup-core" style={{width: setWidth, height: setHeight}} onClick={e => {e.stopPropagation()}}>
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
    isAlert: state.app.isAlert,
  };
};

export default connect(
  mapStateToProps,
)(Popup);