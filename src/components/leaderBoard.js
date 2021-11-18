import React from 'react'
import { connect } from 'react-redux'
import LeaderCard from './leaderCard'

 const LeaderBoard = (props) => {
    return (
        <div>
            <LeaderCard/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})



export default connect(mapStateToProps)(LeaderBoard)
