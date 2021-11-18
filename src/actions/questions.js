import { _saveQuestion } from "../utils/_DATA";
import {adduserQuestion} from './users'

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTIONS = "ADD_QUESTIONS";
export const ADD_QUESTIONS_ANSWER = "ADD_QUESTIONS_ANSWER";


export function receiveQuestions(questions){
    return {
        type: "RECEIVE_QUESTIONS",
        questions,
    }
}
export function addQuestions(question){
    return {
        type: "ADD_QUESTIONS",
        question,
    }
}
export function addQuestionsAnswer(authedUser, qid, answer){
    return {
        type: "ADD_QUESTIONS_ANSWER",
        authedUser,
        qid,
        answer
    }
}

export function handleAddQuestion(optionOneText, optionTwoText, author){
    return (dispatch) => {
        return _saveQuestion({optionOneText, optionTwoText, author}).then((question)=>{
            dispatch(addQuestions(question))
            dispatch(adduserQuestion({author , id:question.id}))
        })
    }
}