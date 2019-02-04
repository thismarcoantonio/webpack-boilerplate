import React from 'react'
import { render } from 'react-dom'
import Router from 'containers/router'

import store from 'data/store'
import 'app/styles/main.scss'

const App = () => (
  <div id="app" className="app">
    <Router store={store} />
  </div>
)

render(<App />, document.getElementById('app'))
