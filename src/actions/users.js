import {_saveQuestionAnswer} from '../utils/_DATA'
import {addQuestionsAnswer} from './questions'

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";
export const ADD_USER_ANSWER = "ADD_USER_ANSWER";

export function receiveUsers(users){
    return{
        type: RECEIVE_USERS,
        users,
    }
}

export function adduserQuestion(user,qid){
    return{
        type: ADD_USER_QUESTION,
        user,
        qid
    }
}
export function adduserAnswer(user,qid,answer){
    return{
        type: ADD_USER_QUESTION,
        user,
        qid, 
        answer
    }
}

export function handleAddQuestionAnswer(user,qid,answer){
    return (dispatch)=>{
        dispatch(adduserQuestion(user,qid,answer))
        dispatch(addQuestionsAnswer(user,qid,answer))
        return _saveQuestionAnswer({user,qid,answer})
    }
}