import * as React from "react";
import {FilePond} from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import {Component} from "react";
import {connect} from 'react-redux';

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
        if(this.props.app.user.userDetails == null) {
            return (<div className="App"></div>)
        }
        return (
            <div className="App">
                <FilePond server={
                    {
                        url: "/spreadsheet",
                        process: {
                            headers: {
                                'email': this.props.app.user.userDetails.username
                            },
                        }
                    }
                }
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
        app: Object.assign({}, state.app),
    };
};

export default connect(
    mapStateToProps,
)(UploadFile);