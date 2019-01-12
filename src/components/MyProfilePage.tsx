import {Component} from "react";
import * as React from "react";
import Header from "../commons/header/Header";

class MyProfilePage extends Component<any,any>{

    public render (){
        return (
            <div>
                <Header home="none" courses="none" students="none" catalog="none" myProfile="inline"/>
                <h1>"My profile Page"</h1>
            </div>
        )
    }
}

export default MyProfilePage;