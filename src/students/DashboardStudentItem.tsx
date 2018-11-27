import * as React from "react";
import {Component} from "react";

import './DashboardStudents.css';

class DashboardStudentItem extends Component<any, any>{
    private name: any;
    private id: any;
    private group: any;
    private section: any;

    constructor(props: any){
        super(props);
        this.name = props.name;
        this.id = props.id;
        this.group = props.group;
        this.section = props.section;
    }

    render(){
        return(
          <div className="container">

            <div className="container ">
                <div className="col-md-3">{this.name}</div>
                <div className="col-md-3">{this.id}</div>
                <div className="col-md-3">{this.group}</div>
                <div className="col-md-3">{this.section}</div>
            </div>
          </div>  
        );
    }
}

export default DashboardStudentItem;
