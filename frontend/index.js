import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './src/App'

render(<App />, document.getElementById('app'))








// update the questions every 2 seconds, backend should let frontend know when to update
// run eslint
// decide on nav bar
// Figure out how if a question can have multiple answers and present that
// add cancellation button to modal
// stylization
