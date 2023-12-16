import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', message: ''}

  ChangeToHome = Token => {
    const {history} = this.props
    Cookies.set('jwt_token', Token, {expires: 30})
    history.replace('/')
  }

  SubmitDetailsOfUser = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const Url = 'https://apis.ccbp.in/login'
    const sendingDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(sendingDetails),
    }
    const fetching = await fetch(Url, options)
    const waitingForData = await fetching.json()
    console.log(fetching.ok)
    console.log(waitingForData)
    console.log(waitingForData.jwt_token)
    this.setState({
      username: '',
      password: '',
    })
    if (fetching.ok) {
      this.ChangeToHome(waitingForData.jwt_token)
    }
    this.setState({message: waitingForData.error_msg})
  }

  UserName = event => {
    this.setState({username: event.target.value})
  }

  Password = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, message} = this.state
    console.log(username)
    console.log(password)
    const JwtTokenUser = Cookies.get('jwt_token')
    if (JwtTokenUser !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bgLogin">
        <div className="flexingLogin">
          <div className="CenterLogo">
            <div className="LogoOfWebSiteLogin">
              <img
                className="webSiteLogoForLoginPage"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </div>
          </div>

          <form onSubmit={this.SubmitDetailsOfUser}>
            <div>
              <label htmlFor="UserName">USERNAME</label>
              <br />
              <input
                className="Input"
                id="UserName"
                type="text"
                placeholder="Username"
                onChange={this.UserName}
                value={username}
              />
            </div>

            <br />

            <div>
              <label htmlFor="PassWord">PASSWORD</label>
              <br />
              <input
                className="Input"
                type="password"
                id="PassWord"
                placeholder="Password"
                onChange={this.Password}
                value={password}
              />
            </div>

            <div>
              <button className="LoginButton" type="submit">
                Login
              </button>
            </div>
            <p className="message">{message}</p>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
