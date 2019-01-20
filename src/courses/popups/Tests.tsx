import * as React from "react";
import { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Tests extends Component<any,any> {
  
    columns: any = [] 
    data: any = []
    percentages: any = []
    weeks: any = []

    constructor(props: any) {
        super(props);  
        this.state = {isError : false}
        this.weeks = this.props.weeks;
        if (props.percentages === undefined){
            let value = 100/props.tests;
            value = parseFloat(value.toFixed(2));
            const nr: number = parseInt(this.props.tests, 10);
            this.percentages = Array.apply(null, new Array(nr)).map(Number.prototype.valueOf,value);
                    this.props.sendToParent(this.percentages);
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
    percentagesCheck(){

        let s = 0;
        for (const p of this.percentages){
            s = s + p;
        }
        if (s > 100){
            return false;
        } else {
            return true;
        }
    }
    createTable = () => {
    this.data = []
   // this.columns = []
    this.columns= [{
        Header: "Activity number",
        accessor: "test_number",
          },{
        Header: "Week",
        accessor: "test_week",
        },{
        Header: "Activity percentage",
        accessor: "test_percentage",
        }
    ]
    
    const onChangeFct = (e: any, i: number) => {
        if (e.key === "Enter"){
            this.percentages[i] = parseInt(e.target.value,10);
            if (this.percentagesCheck()) {
                this.setState({isError: false})
                this.props.sendToParent(this.percentages);
            }
            else
            {
                this.setState({isError: true})
            }
        }
    };
    for (let i = 0; i < this.props.tests; i++){
        this.data.push({
          test_number : i+1,
          test_week: <input type="number" style={{width: "7em"}} defaultValue={this.weeks[i]}></input>,
          test_percentage: <input type="number" style={{width: "7em"}} defaultValue={this.percentages[i]} onKeyPress={(e)=>onChangeFct(e, i)} />
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
    <div>
     {this.state.isError === true &&
    <div className="alert alert-danger">The percentages exceed 100.</div>}
    <ReactTable
    resizable = {true}
    data={this.data}
    columns={this.columns}
    showPagination={ false }
    getTdProps={this.getTrProps}
    />
   </div>
    )
  }
 
}
export default Tests;