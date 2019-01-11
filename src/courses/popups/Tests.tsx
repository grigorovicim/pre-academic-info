import * as React from "react";
import { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Tests extends Component<any,any> {
  
    columns: any = [] 
    data: any = []
    percentages: any = []

    constructor(props: any) {
        super(props);  
        console.log("constructor called");
        if (props.percentages === undefined){
            let value = 100/props.tests;
            value = parseFloat(value.toFixed(2));
            this.percentages = Array.apply(null, new Array(props.tests)).map(Number.prototype.valueOf,value);
        }
        else {
            this.percentages = props.percentages;
        }
        this.createTable(); 
        
    }
    componentWillReceiveProps(){
        if (isNaN(parseInt(this.props.tests,10))){
            return;
        } else if (this.props.percentages === undefined){
            this.percentages = []
            
            let value = 100/this.props.tests;
            value = parseFloat(value.toFixed(2));
            console.log(this.props.tests)
            const nr: number = parseInt(this.props.tests, 10);
            this.percentages = Array.apply(null, new Array(nr)).map(Number.prototype.valueOf,value);
            console.log(this.percentages);
        }
        else {
            this.percentages = this.props.percentages;
        }
        this.createTable();
        this.forceUpdate();
 
    }

    createTable = () => {
    this.data = []
    this.columns = []
   
    
    const onChangeFct = (e: any, i: number) => {
        if (e.key === 'Enter') {
            this.percentages[i] = e.target.value;
        }
    };

    for (let i = 0; i < this.props.tests; i++){
    this.columns.push({
          Header: "Test "+(i+1)+" (%)",
          accessor: "test",
          Cell: (props: any) => (<input type="number" value={this.percentages[i]} onKeyPress={(e)=>onChangeFct(e, i)} />)
        });
    }

    this.data.push({
        test: this.percentages,
    })
  }

  render() {
    return(
      
  <ReactTable
  data={this.data}
  columns={this.columns}
  showPagination={ false }
/>
    )
  }
 
}
export default Tests;