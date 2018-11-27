import {Component} from "react";
import * as React from "react";
import './Header.css';
import logo from './logo.png';

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
      const activeMenuItem = this.props.activeMenuItem;
      console.log(this.props);
      this.setState({ [activeMenuItem]: 'inline'})
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        console.log("It's working!")
    }



    render() {
        return (
            <div>
                <header className="p-app-header">
                    <div className="p-img-div">
                        <img src={logo} className="p-app-logo"/>
                    </div>

                    <div className="p-menu-buttons-div">
                        <div className="p-header-button" onClick={this.handleClick}>
                            <div>LOGIN</div>
                            <div id="login" className="hero" style={{display: this.state.login}}/>
                        </div>
                        <div className="p-header-button">
                            <div>COURSES</div>
                            <div id="courses" className="hero" style={{display: this.state.courses}}/>
                        </div>
                        <div className="p-header-button">
                            <div>STUDENTS</div>
                            <div id="student" className="hero" style={{display: this.state.students}}/>
                        </div>
                        <div className="p-header-button">
                            <div>CATALOG</div>
                            <div id="catalog" className="hero" style={{display: this.state.catalog}}/>
                        </div>
                        <div className="p-header-button">
                            <div>MY PROFILE</div>
                            <div id="myprofile" className="hero" style={{display: this.state.myProfile}}/>
                        </div>
                    </div>
                </header>
            </div>
    );
    }
}

export default Header;