import * as React from "react";
import {FilePond} from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import {Component} from "react";

class UploadFile extends Component<any, any> {

    render() {
        return (
            <div className="App">
                <FilePond server="./"/>
            </div>
        )
    }
}

export default UploadFile;