import {Component} from "react";

class Header extends Component<any,any>{

    render() {
        return (
            <div className="container">
            <div className="container dashboard-course-item">
            <div className="dashboard-course-item-text">{this.name}</div>
        <div className="dashboard-course-item-text">{this.department}</div>
        <div className="div-config-button-wrapper">
        <button className="course-config-button-wrapper">{this.button()}</button>
        </div>
        </div>
        </div>
    );
    }
}

export default Header;