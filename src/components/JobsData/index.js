import Cookies from 'js-cookie'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import Header from '../HeaderPage'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const stagesForConditionChecking = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  load: 'LOADER',
}

class JobsDetails extends Component {
  state = {
    name: '',
    imageUser: '',
    Description: '',
    totallJobs: [],
    inputValue: '',
    RadioInput: '',
    EmployList: '',
    stateDeclared: 'initial',
  }

  componentDidMount() {
    this.FetchingData()
    this.jobsData()
  }

  jobsData = async () => {
    this.setState({stateDeclared: stagesForConditionChecking.load})

    const {inputValue, RadioInput, EmployList} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const fetchingJobs = `https://apis.ccbp.in/jobs?employment_type=${EmployList}&minimum_package=${RadioInput}&search=${inputValue}`
    const optionsJobs = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const FetchingJobsDetails = await fetch(fetchingJobs, optionsJobs)
    console.log(FetchingJobsDetails)
    const DetailsOfJobs = await FetchingJobsDetails.json()
    console.log(DetailsOfJobs)

    if (FetchingJobsDetails.ok) {
      const jobsDataAll = DetailsOfJobs.jobs.map(each => ({
        packagePerAnnum: each.package_per_annum,
        companyLogo: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({totallJobs: jobsDataAll})
      this.setState({stateDeclared: stagesForConditionChecking.success})
    } else {
      this.setState({stateDeclared: stagesForConditionChecking.failure})
    }
  }

  FetchingData = async () => {
    this.setState({stateDeclared: stagesForConditionChecking.load})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const DataFetching = await fetch(url, options)
    const DetailsOfUser = await DataFetching.json()
    console.log(DetailsOfUser)

    if (DataFetching.ok) {
      this.setState({
        name: DetailsOfUser.profile_details.name,
        Description: DetailsOfUser.profile_details.short_bio,
        imageUser: DetailsOfUser.profile_details.profile_image_url,
      })
      this.setState({stateDeclared: stagesForConditionChecking.success})
    } else {
      this.setState({stateDeclared: stagesForConditionChecking.failure})
    }
  }

  changeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  searchInputDown = event => {
    if (event.key === 'Enter') {
      this.jobsData()
    }
  }

  buttonSearch = () => {
    this.jobsData()
  }

  RadioChange = event => {
    this.setState({RadioInput: event.target.id}, this.jobsData)
  }

  EmployLists = event => {
    this.setState({EmployList: event.target.id})
  }

  renderingALlData = () => {
    const {totallJobs} = this.state

    return (
      <div className="AllDataOfItems">
        {totallJobs.map(each => (
          <Link
            to={`/jobs/${each.id}`}
            className="BgForDetailsOfJobs"
            key={each.id}
          >
            <img src={each.companyLogo} alt="company logo" />
            <h1>{each.title}</h1>
            <p>{each.rating}</p>
            <p>{each.location}</p>
            <p>{each.employmentType}</p>
            <p>{each.packagePerAnnum}</p>
            <hr />
            <h1>Description</h1>

            <p>{each.jobDescription}</p>
          </Link>
        ))}
      </div>
    )
  }

  DataNotFound = () => (
    <div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
        />
      </div>
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderSuccessView = () => {
    const {name, imageUser, Description, totallJobs, inputValue} = this.state

    const DataOfAllFetching =
      totallJobs.length > 0 ? this.renderingALlData() : this.DataNotFound()

    return (
      <div className="jobsALlBg">
        <Header />

        <div className="flexingData">
          <div>
            <div className="CardOfUser">
              <div>
                <img src={imageUser} alt="profile" />
              </div>
              <h1 className="UserName">{name}</h1>
              <p className="Description">{Description}</p>
            </div>
            <div>
              <h1>Type of Employment</h1>
              <ul className="Ul">
                {employmentTypesList.map(each => (
                  <li key={each.employmentTypeId}>
                    <input
                      onChange={this.EmployLists}
                      value={each.label}
                      type="checkbox"
                      id={each.employmentTypeId}
                    />
                    <label htmlFor={each.employmentTypeId}>{each.label}</label>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div>
              <h1>Salary Range</h1>
              <ul className="Ul">
                {salaryRangesList.map(each => (
                  <li key={each.salaryRangeId}>
                    <input
                      id={each.salaryRangeId}
                      value={each.label}
                      type="radio"
                      onChange={this.RadioChange}
                    />
                    <label htmlFor={each.salaryRangeId}> {each.label} </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="detailsOfAllJobs">
            <div>
              <input
                onChange={this.changeInput}
                type="search"
                placeholder="Search"
                value={inputValue}
                onKeyDown={this.searchInputDown}
              />
              <button
                onClick={this.buttonSearch}
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
                {/* */}
              </button>
            </div>

            {DataOfAllFetching}
          </div>
        </div>
      </div>
    )
  }

  failureView = () => (
    <div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
      </div>
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.jobsData} type="button">
        Retry
      </button>
    </div>
  )

  loaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  coditionChecking = () => {
    const {stateDeclared} = this.state
    switch (stateDeclared) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.failureView()
      case 'LOADER':
        return this.loaderView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.coditionChecking()}</div>
  }
}

export default JobsDetails