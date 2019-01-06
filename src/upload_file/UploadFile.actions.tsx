// @ts-ignore
import axios from 'axios';

export default class UploadFileActions {
    static upload = (file: any) => (dispatch: any, /*getState: any*/) => {
        axios.post('/spreadsheet', {file: file})
            .then((response) => {
                // if (response.data !== null) {
                //     if (response.data.type === 'admin') {
                //         dispatch({
                //             type: 'SET_USER_DETAILS',
                //             payload: {
                //                 user: {
                //                     userDetails: response.data,
                //                     isAdmin: true,
                //                 }
                //             },
                //         });
                //     } else {
                //         dispatch({
                //             type: 'SET_USER_DETAILS',
                //             payload: {
                //                 user: {
                //                     userDetails: response.data,
                //                     isAdmin: false,
                //                 }
                //             },
                //         });
                //     }
                // }
            })
            .catch((error) => {
                throw error;
            })
            .then(() => {
            });
    };
}
