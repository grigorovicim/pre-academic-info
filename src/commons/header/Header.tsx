import {Component} from "react";
import * as React from "react";
import './Header.css';
import logo from './logo.png';
import {NavLink} from "react-router-dom";

class Header extends Component<any,any>{

    constructor(props: any){
      super(props);
      this.state = {
          login: 'none',
          courses: 'none',
          students: 'none',
          catalog: 'none',
          myProfile: 'none'

      };
    }


    render() {
        return (
            <div>
                <header className="p-app-header">
                    <div className="p-img-div">
                        <img src={logo} className="p-app-logo"/>
                    </div>

                    <div className="p-menu-buttons-div">
                        <div className="p-header-button" >
                            <NavLink to={"/"}>HOME</NavLink>
                            <div id="login" className="login" style={{display: this.props.home}}/>
                        </div>
                        <div className="p-header-button">
                            <NavLink to={"/courses"}>COURSES</NavLink>
                            <div id="courses" className="courses" style={{display: this.props.courses}}/>
                        </div>
                        <div className="p-header-button">
                            <NavLink to={"/students"}>STUDENTS</NavLink>
                            <div id="student" className="students" style={{display: this.props.students}}/>
                        </div>
                        <div className="p-header-button">
                            <NavLink to={"/catalog"}>CATALOG</NavLink>
                            <div id="catalog" className="catalog" style={{display: this.props.catalog}}/>
                        </div>
                        <div className="p-header-button">
                            <NavLink to={"/myprofile"}>MY PROFILE</NavLink>
                            <div id="myprofile" className="myProfile" style={{display: this.props.myProfile}}/>
                        </div>
                    </div>
                </header>
            </div>
    );
    }
}

export default Header;