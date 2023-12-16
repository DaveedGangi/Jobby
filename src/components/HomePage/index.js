import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../HeaderPage'

import './index.css'

const Home = () => {
  const JwtToken = Cookies.get('jwt_token')

  if (JwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="bgHomePage">
      <Header />
      <div className="HeadingPosition">
        <div className="HomePageHeading">
          <h1 className="FindJobsHeading">Find The Job That Fits Your Life</h1>
          <p>
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <div>
            <Link to="/jobs">
              <button className="FindJobsButton" type="button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
