import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

 class AddQuestion extends Component {
    state = {
        Option1 : '',
        Option2 :'', 
        toHome : false
    }
    handleChange = (e) =>{
        const text = e.target.value 
        const stateName = e.target.name
        this.setState(() => ({
            [stateName]:text
        }))
    }

    handleSub = (e) =>{
        e.preventDefault()

        const {Option1 , Option2} = this.state
        const {dispatch} = this.props

        if(Option1.length > 0 && Option2.length > 0){
            dispatch(handleAddQuestion(Option1,Option2)).then(()=> this.setState(()=> ({
                toHome : true ,
            }))
            )
         }else{
             alert("you must fill in both option ")
         }
    }
    render() {
        const {Option1 , Option2 , toHome} = this.state

        if(toHome){
            return<Redirect to="/home" />
        }
        return (
            <div className="questioContainer">
                <h2> Create New Would You Rather :</h2>
                <form onSubmit={this.handleSub}>
                    <h3> Would You Rather</h3>
                    <input name="option1" placeholder="option One" onChange={this.handleChange} value={Option1}> </input>
                    <div> OR </div>
                    <input name="option2" placeholder="option Two" onChange={this.handleChange} value={Option2}> </input>
                    <button className="Subutton" type="submit"> Submit Question</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps ({authedUser}) {
    return{
        authedUser
    }
}



export default connect(mapStateToProps)(AddQuestion)
