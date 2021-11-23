import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveQuestionApi } from "../utils/api";
import { adduserQuestion } from './users'

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTIONS = "ADD_QUESTIONS";
export const ADD_QUESTIONS_ANSWER = "ADD_QUESTIONS_ANSWER";


export function receiveQuestions(questions) {
    return {
        type: "RECEIVE_QUESTIONS",
        questions,
    }
}
export function addQuestions(question) {
    return {
        type: "ADD_QUESTIONS",
        question,
    }
}
export function addQuestionsAnswer(authedUser, qid, answer) {
    return {
        type: "ADD_QUESTIONS_ANSWER",
        authedUser,
        qid,
        answer,
    }
}

export function handleAddQuestion(option1, option2) {

    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading())
        return saveQuestionApi({
            optionOneText: option1,
            optionTwoText: option2,
            author: authedUser,
        }).then((q) => {
            dispatch(addQuestions(q))
            dispatch(adduserQuestion(q))
            dispatch(hideLoading())
        })
    }
}