import {Component} from "react";
import * as React from "react";
import Header from "../commons/header/Header";

class StudentsPage extends Component<any,any>{

    public render (){
        return (
            <div>
                <Header login="none" courses="none" students="inline" catalog="none" myProfile="none"/>
            </div>
        )
    }
}

export default StudentsPage;