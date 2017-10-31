import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'

class PostIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts()
    }

    render () {
        return (
            <div>
                Post Index
            </div>
        ) 
    }
}

// wiring up an action creator with this syntax instead of using mapDispatchToProps is identical in nature
// we still have access to this.props.fetchPosts

export default connect(null, { fetchPosts })(PostIndex)