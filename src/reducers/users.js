import { RECEIVE_USERS, ADD_USER_QUESTION, ADD_USER_ANSWER } from "../actions/users";

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_USER_QUESTION:
             const user = action.question.author
             const questionId = action.question.id
            //const { user, questionId } = action
            return {
                ...state,
                [user]: {
                    ...state[user],
                    questions: state[user].questions.concat([questionId])
                }
            }
        case ADD_USER_ANSWER:
            const { qid, authedUser, answer } = action
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer,
                    }
                }
            }
        default:
            return state

    }
}