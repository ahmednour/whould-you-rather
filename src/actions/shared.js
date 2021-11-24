import { getInitialData, saveQuestionAnswerApi } from '../utils/api'
import { receiveUsers, adduserAnswer } from './users'
import { receiveQuestions, addQuestionsAnswer } from './questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading-bar'



export function handleInitialData(userID) {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData().then(({ users, questions }) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(setAuthedUser(userID ? userID : null))
            dispatch(hideLoading())
        })
    }
}


export function handleAddQuestionAnswer({ authedUser, qid, answer }) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestionAnswerApi({
                authedUser: authedUser,
                qid: qid,
                answer: answer
            })
            .then(() => {
                dispatch(adduserAnswer(authedUser, qid, answer))
                dispatch(addQuestionsAnswer(authedUser, qid, answer))
                dispatch(hideLoading())
            })

    }
}