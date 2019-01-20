import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../Constants'
import { bake_cookie, read_cookie } from 'sfcookies'

const reminder = (action) => {
    return {
        id: Math.random(),
        due: action.due,
        text: action.text
    }
}

const removeById = (state=[], id) => {
    const reminders = state.filter(reminder => {
        return reminder.id !== id
    })
    console.log('new reduced reminders', reminders)
    return reminders
}

const reminders = (state=[], action)=>{
    console.log('reducer.index', 'reducer is called with action ' + action)
    let reminders = null
    state = read_cookie('reminders')
    switch(action.type) {
        case ADD_REMINDER:
            reminders = [...state, reminder(action)]
            console.log('Reminders as state', reminders)
            bake_cookie('reminders', reminders)
            return reminders
        case DELETE_REMINDER:
            reminders = removeById(state, action.id)
            bake_cookie('reminders', reminders)
            return reminders
        case CLEAR_REMINDERS:
            reminders =[]
            bake_cookie('reminders', reminders)
            return reminders
        default:
            return state
    }
}

export default reminders