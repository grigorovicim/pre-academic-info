// @ts-ignore
import axios from 'axios';
import {FETCH_FORM_OF_EVALUATION} from './types';

export default class FormOfEvaluationActions {
    static createFormOfEvaluationActions = (item: any, sessionId: any) => (dispatch: any) => {

    };

    static fetchFormOfEvaluation = (item: any) => (dispatch: any) => {
        const formOfEvaluationId = item.formOfEvaluationId;

        axios.get('/formOfEvaluation/' + formOfEvaluationId).then((response) => {
            dispatch({
                type: FETCH_FORM_OF_EVALUATION,
                payload: {
                    items: response.data,
                },
            });
        });
    };
}