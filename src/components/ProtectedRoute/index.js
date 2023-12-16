import {Route, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

const ProtectRoute = props => {
  const JwtToken = Cookies.get('jwt_token')
  if (JwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectRoute
