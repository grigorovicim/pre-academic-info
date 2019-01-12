import {Component} from "react";
import * as React from "react";
import Header from "../commons/header/Header";

class StudentsPage extends Component<any,any>{

    public render (){
        return (
            <div>
                <Header home="none" courses="none" students="inline" catalog="none" myProfile="none"/>
                <h1>"Students Page"</h1>
            </div>
        )
    }
}

export default StudentsPage;