import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/LoginPage'
import Home from './components/HomePage'
import NotFound from './components/NotFound'
import ProtectRoute from './components/ProtectedRoute'

import JobItemDetails from './components/jobItemDetails'

import './App.css'
import JobsDetails from './components/JobsData'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <ProtectRoute exact path="/jobs" component={JobsDetails} />
    <ProtectRoute exact path="/jobs/:id" component={JobItemDetails} />

    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
