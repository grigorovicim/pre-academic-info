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

        if (props.percentages === undefined){
            let value = 100/props.tests;
            value = parseFloat(value.toFixed(2));
            const nr: number = parseInt(this.props.tests, 10);
            this.percentages = Array.apply(null, new Array(nr)).map(Number.prototype.valueOf,value);

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
            const nr: number = parseInt(this.props.tests, 10);
            this.percentages = Array.apply(null, new Array(nr)).map(Number.prototype.valueOf,value);
        }
        else {
            this.percentages = this.props.percentages;
        }
        this.createTable();
        this.forceUpdate();
 
    }

    createTable = () => {
    this.data = []
   // this.columns = []
    this.columns= [{
        Header: "Test number",
        accessor: "test_number",
          },{
        Header: "Test percentage",
        accessor: "test_percentage",
    }]
    
    const onChangeFct = (e: any, i: number) => {
        if (e.key === 'Enter') {
            this.percentages[i] = parseInt(e.target.value,10);
            console.log(this.percentages)
        }
    };
    for (let i = 0; i < this.props.tests; i++){
        this.data.push({
          test_number : i+1,
          test_percentage: <input type="number" defaultValue={this.percentages[i]} onKeyPress={(e)=>onChangeFct(e, i)} />
        });
    }
  }

  getTrProps = (state: any, rowInfo: any, instance: any) => {
      return {
        style: {
            display: 'flex',
            flexDirection: 'test_number',
            justifyContent: 'center',
            fontWeight: 600,
            color: 'gray'
        }
      
    }

  }
  render() {
    return(
      
  <ReactTable
  resizable = {true}
  data={this.data}
  columns={this.columns}
  showPagination={ false }
  getTdProps={this.getTrProps}
  />

    )
  }
 
}
export default Tests;