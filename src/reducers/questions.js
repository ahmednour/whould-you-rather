import { RECEIVE_QUESTIONS, ADD_QUESTIONS, ADD_QUESTIONS_ANSWER } from "../actions/questions";

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTIONS:
            return {
                ...state,
                [action.question.id]: action.question
            }
        case ADD_QUESTIONS_ANSWER:
            const votes = state[action.info.qid][action.info.answer].votes
            return {
                ...state,
                [action.info.qid]: {
                    ...state[action.info.qid],
                    [action.info.answer]: {
                        ...state[action.info.qid][action.info.answer],
                        votes: votes.concat([action.info.authedUser])
                    }
                }
            }
        default:
            return state
    }
}