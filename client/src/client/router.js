import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class CustomRouter extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <Route path="/" component={() => <h1>Fresh Start</h1>} />
        </Router>
      </Provider>
    )
  }
}

export default CustomRouter
