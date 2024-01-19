import Cookies from 'js-cookie'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import JobCard from '../eachCardJob'

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
    RadioInput: 0,
    EmployList: [],
    stateDeclared: 'initial',
    CheckingProfileData: 'initial',
  }

  componentDidMount() {
    this.FetchingData()
    this.jobsData()
  }

  jobsData = async () => {
    this.setState({stateDeclared: stagesForConditionChecking.load})

    const {inputValue, RadioInput, EmployList} = this.state
    console.log(EmployList)
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
      this.setState({
        totallJobs: jobsDataAll,
        stateDeclared: stagesForConditionChecking.success,
      })
    } else {
      this.setState({stateDeclared: stagesForConditionChecking.failure})
    }
  }

  FetchingData = async () => {
    this.setState({CheckingProfileData: stagesForConditionChecking.load})
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
        CheckingProfileData: stagesForConditionChecking.success,
      })
    } else {
      this.setState({CheckingProfileData: stagesForConditionChecking.failure})
    }
  }

  successViewProfile = () => {
    const {imageUser, name, Description} = this.state

    return (
      <div className="CardOfUser">
        <div>
          <img className="imageOfUser" src={imageUser} alt="profile" />
        </div>
        <h1 className="UserName">{name}</h1>
        <p className="Description">{Description}</p>
      </div>
    )
  }

  loaderViewProfile = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureViewProfile = () => (
    <div>
      <div>
        <button type="button" onClick={this.FetchingData}>
          Retry
        </button>
      </div>
    </div>
  )

  ProfileChecking = () => {
    const {CheckingProfileData} = this.state

    switch (CheckingProfileData) {
      case 'SUCCESS':
        return this.successViewProfile()
      case 'FAILURE':
        return this.failureViewProfile()
      case 'LOADER':
        return this.loaderViewProfile()
      default:
        return null
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
    const {EmployList} = this.state
    const CheckboxNotInLists = EmployList.filter(
      each => each === event.target.id,
    )
    if (CheckboxNotInLists.length === 0) {
      this.setState(
        prevState => ({EmployList: [...prevState.EmployList, event.target.id]}),
        this.jobsData,
      )
    } else {
      const filterData = EmployList.filter(each => each !== event.target.id)
      this.setState(
        {
          EmployList: filterData,
        },
        this.jobsData,
      )
    }
  }

  renderALlData = () => {
    const {totallJobs} = this.state

    return (
      <div className="AllDataOfItems">
        {totallJobs.map(each => (
          <JobCard each={each} key={each.id} />
        ))}
      </div>
    )
  }

  DataNotFound = () => (
    <div className="DataNot">
      <div>
        <img
          className="noJobs"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
        />
      </div>
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderSuccessView = () => {
    const {totallJobs, inputValue} = this.state

    const DataOfAllFetching =
      totallJobs.length > 0 ? this.renderALlData() : this.DataNotFound()

    return (
      <div className="jobsALlBg">
        <div className="flexingData">
          <div className="detailsOfAllJobs">
            <div className="searchBar">
              <input
                className="inputSearch"
                onChange={this.changeInput}
                type="search"
                placeholder="Search"
                value={inputValue}
                onKeyDown={this.searchInputDown}
              />
              <button
                className="ButtonSearch"
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
    return (
      <div>
        <Header />
        <div className="flexingItemsJobs">
          <div className="ProfileSide">
            {this.ProfileChecking()}
            <div>
              <div>
                <hr />
                <h1 className="TypeOfEmploy">Type of Employment</h1>
                <ul className="Ul">
                  {employmentTypesList.map(each => (
                    <li key={each.employmentTypeId}>
                      <input
                        onChange={this.EmployLists}
                        value={each.label}
                        type="checkbox"
                        id={each.employmentTypeId}
                      />
                      <label htmlFor={each.employmentTypeId}>
                        {each.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <hr />
              <div>
                <h1 className="SalaryRange">Salary Range</h1>
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
          </div>
          <div className="ChecksData">{this.coditionChecking()}</div>
        </div>
      </div>
    )
  }
}

export default JobsDetails
