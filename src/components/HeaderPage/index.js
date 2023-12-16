import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const deleteUserCookie = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="BgForHeader">
      <ul>
        <Link to="/">
          <li className="liWebSiteLogo">
            <img
              className="webSiteLogo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </li>
        </Link>
      </ul>
      <ul className="HomeAndJobs">
        <Link className="HJ" to="/">
          <li className="HomeAndJobsStyle">Home</li>
        </Link>
        &nbsp;&nbsp;&nbsp;
        <Link className="HJ" to="/jobs">
          <li className="HomeAndJobsStyle">Jobs</li>
        </Link>
      </ul>
      <div>
        <button
          onClick={deleteUserCookie}
          className="LogoutButton"
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
export default withRouter(Header)
