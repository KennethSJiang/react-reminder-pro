import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../Constants'

export const addReminder = (text, due) => {
    const action = {
        type: ADD_REMINDER,
        text,
        due
    }
    console.log("action in addReminder", action)
    return action
}

export const deleteReminder = (id)=>{
    const action = {
        type: DELETE_REMINDER,
        id
    }
    console.log('deleting in actions', action)
    return action
}

export const clearReminders = () => {
    const action = {
        type: CLEAR_REMINDERS,
    }
    console.log('clearing in actions', action)
    return action
}