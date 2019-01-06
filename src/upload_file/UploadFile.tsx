import * as React from "react";
import {FilePond} from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import {Component} from "react";
import { connect } from 'react-redux';

class UploadFile extends Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            files: []
        };
    }


    handlePondFile(error, file) {
        if (error) {
            console.log('Oh no');
            return;
        }
        console.log('File added', file.filename);
    }

    render() {
        return (
            <div className="App">
                <FilePond server="/spreadsheet"
                          name="file"
                          allowMultiple={false}
                          onprocessfile={this.handlePondFile}
                          onupdatefiles={(fileItems) => {
                              // Set current file objects to this.state
                              this.setState({
                                  files: fileItems.map(fileItem => fileItem.file)
                              });
                          }}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: Object.assign({}, state.app.user),
    };
};

export default connect(
    mapStateToProps,
)(UploadFile);