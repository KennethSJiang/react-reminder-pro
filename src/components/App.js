import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addReminder, deleteReminder, clearReminders} from '../actions'
import moment from 'moment'
// import {bindActionCreators} from 'redux'

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            text: '',
            due: null,
        }
    }

    deleteReminder(id){
        const { deleteReminder } = this.props
        console.log('deleting in application', id)
        console.log('this.props', this.props)
        deleteReminder(id)
    }

    addReminder(){
        const { addReminder } = this.props
        console.log('this.state', this)
        addReminder(this.state.text, this.state.due)
    }

    renderReminders(){
        const {reminders } = this.props
        console.log('renderReminder', reminders)
        return (
            <ul className="list-group col-sm-4">
            {
                reminders.map(reminder =>{
                    return(
                        <li key={reminder.id} className='list-group-item'>
                            <div className='list-item'>
                                <div>{reminder.text}</div>
                                <div><em>{moment(new Date(reminder.due)).fromNow()}</em></div>
                            </div>
                            <div className='list-item delete-button' 
                            onClick={()=>this.deleteReminder(reminder.id)}>&#x2715;</div>
                        </li>
                    )
                })
            }
            </ul>
        )
    }

    render(){
        console.log('this.props', this.props)
        return(
            <div className="app">
                <div className="title">
                    Reminder Pro
                </div>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input className='form-control' placeholder="I have to ... ..."
                            onChange={event => this.setState({text: event.target.value})}
                        />
                        <input className='form-control'
                            type='datetime-local'
                            onChange={event => {
                                console.log('datetime-pick', event.target.value)
                                this.setState({due: event.target.value})
                            }}
                        />
                    </div>
                    <button type="button" className='btn btn-success'
                        onClick={()=>this.addReminder()}
                    >
                        Add Reminder
                    </button>
                    {this.renderReminders()}
                    <div className='btn btn-danger'
                        onClick = {()=> this.props.clearReminders()}
                    >Clear Reminders</div>
                </div>
            </div>
        )
    }
}

//method 1: direct dispatch manually
// const mapDispatchToProps = dispatch => ({
//     addReminder: (text) => dispatch(addReminder(text))
// })
// OR
// function mapDispatchToProps(dispatch){
//     return{
//         addReminder: (text)=>dispatch(addReminder(text))
//     }
// }

// method 2: connect to CONNECT
const mapDispatchToProps = {
    addReminder,
    deleteReminder,
    clearReminders
}

// method 3: use bindActionCreator
// function mapDispatchToProps(dispatch){
//     return bindActionCreators({addReminder}, dispatch)
// }

function mapStateToProps(state){
    console.log('state', state)
    return {
        reminders: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)