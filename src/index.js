import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './index.css'
import * as serviceWorker from './renderer/serviceWorker'
import App from './renderer/components/App'
import Login from "./renderer/components/login"
import Register from "./renderer/components/register"
import { Home, Login as lgn, Register as rgstr } from './shared/constants/Routes'
// import Sidebar from './components/navigation/sidebar'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './shared/reducers/index'

import thunk from 'redux-thunk'
import Tasks from './renderer/components/Tasks'
import ProjectPage from './renderer/components/Projects'
import ProjectDetails from './renderer/components/ProjectDetails'
import Files from './renderer/components/Files'
import Clients from './renderer/components/Clients'


import ClientDetails from './renderer/components/ClientDetails'
import Users from './renderer/components/Users'
import Roles from './renderer/components/Roles'
import tasks from './renderer/containers/details/tasks'
import Reports from './renderer/components/Reports'
const{ persistState } =require('redux-devtools');



library.add(fas, far)

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)



ReactDOM.render(
    <Provider store = {createStoreWithMiddleware(rootReducer)}>
        <Router>
            <Switch>
                {/* <Route path="/dashboard"  component={Main}></Route> */}
                <Route path={rgstr} component={Register}></Route>
                <Route path={lgn} component={Login}></Route>
                {/* <Route path={Home} component={App}></Route> */}
                <App>

								<Route exact path='/clients/:id' component={ClientDetails} />
								<Route exact path='/tasks/:id' component={tasks} />
								<Route exact path='/' component={Tasks} />
								<Route exact path='/projects/:id' component={ProjectDetails} />
								<Route exact path='/projects' component={ProjectPage} />
								<Route exact path='/files' component={Files} />
								<Route exact path='/clients' component={Clients} />
								<Route exact path='/users' component={Users} />
								<Route exact path='/roles' component={Roles} />
								<Route exact path='/reports' component={Reports} />
                </App>
            </Switch>
        </Router>
    </Provider>
    ,
	document.getElementById('root'))
	
	

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
