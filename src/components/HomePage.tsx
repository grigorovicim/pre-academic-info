import {Component} from "react";
import * as React from "react";
import Header from "../commons/header/Header";

class HomePage extends Component<any,any>{

    public render (){
        return (
            <div>
                <Header login="inline" courses="none" students="none" catalog="none" myProfile="none"/>
                <h1>"Home Page"</h1>
            </div>
        )
    }
}

export default HomePage;