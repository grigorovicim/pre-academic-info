import {Component} from "react";
import * as React from "react";
import './Header.css';
import logo from './logo.png';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import LoginActions from 'src/authentication/Login.actions';

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
      this.logout = this.logout.bind(this);
    }

    public logout(){
      this.props.dispatch(LoginActions.logout(this.props.user));
    }


    render() {
        if(this.props.user.isLoggedIn === false) {
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
                    </div>
                    </header>
                </div>
            )
        }
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
                            <NavLink to={"/catalog"}>CATALOG</NavLink>
                            <div id="catalog" className="catalog" style={{display: this.props.catalog}}/>
                        </div>
                        <div className="p-header-button">
                            <NavLink to={"/myprofile"}>MY PROFILE</NavLink>
                            <div id="myprofile" className="myProfile" style={{display: this.props.myProfile}}/>
                        </div>
                        <div className="p-logout-button" onClick={this.logout}>Log out</div>
                    </div>
                </header>
            </div>
    );
    }
}

const mapStateToProps = (state: any) => {
    return {
      user: Object.assign({}, state.app.user),
    };
  };
  
export default connect(
    mapStateToProps,
)(Header);