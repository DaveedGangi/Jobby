import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../HeaderPage'

import SimilarJobDetails from '../SimilarJobs'

import './index.css'

const statusForJobs = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADER',
}

class JobItemDetails extends Component {
  state = {
    statusForJobsSession: 'initial',
    jobCard: [],
    skill: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.dataForEachJobFinding()
  }

  dataForEachJobFinding = async () => {
    this.setState({statusForJobsSession: statusForJobs.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const urlData = `https://apis.ccbp.in/jobs/${id}`

    console.log(urlData)
    const optionsJobs = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetchingJobs = await fetch(urlData, optionsJobs)
    console.log(fetchingJobs)
    const fetchingInJson = await fetchingJobs.json()
    console.log(fetchingInJson)

    if (fetchingJobs.ok) {
      this.setState({
        statusForJobsSession: statusForJobs.success,
      })
      const dataCollecting = {
        description: fetchingInJson.job_details.job_description,
        companyLogo: fetchingInJson.job_details.company_logo_url,
        title: fetchingInJson.job_details.title,
        rating: fetchingInJson.job_details.rating,
        location: fetchingInJson.job_details.location,
        employType: fetchingInJson.job_details.employment_type,
        package: fetchingInJson.job_details.package_per_annum,
        lifeAt: fetchingInJson.job_details.life_at_company.description,
        imageLifeAt: fetchingInJson.job_details.life_at_company.image_url,
        companyWebSite: fetchingInJson.job_details.company_website_url,
      }

      const skillForJob = fetchingInJson.job_details.skills.map(each => ({
        name: each.name,
        imageSkill: each.image_url,
        id: each.name,
      }))

      this.setState({
        jobCard: dataCollecting,
        skill: skillForJob,
        similarJobs: fetchingInJson.similar_jobs,
      })
    } else {
      this.setState({statusForJobsSession: statusForJobs.failure})
    }
  }

  loaderViewJobs = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  successViewJobs = () => {
    const {jobCard, skill, similarJobs} = this.state

    return (
      <div>
        <div>
          <img src={jobCard.companyLogo} alt="job details company logo" />
        </div>
        <h1>{jobCard.title}</h1>
        <p>{jobCard.rating}</p>
        <p>{jobCard.location}</p>
        <p>{jobCard.employType}</p>
        <p>{jobCard.package}</p>
        <hr />
        <h1>Description</h1>
        <p>{jobCard.description}</p>
        <a href={jobCard.companyWebSite}>Visit</a>
        <h1>Skills</h1>
        <div className="flexingJobsSkills">
          {skill.map(each => (
            <div className="eachSkill" key={each.id}>
              <img src={each.imageSkill} alt={each.name} />
              <p>{each.name}</p>
            </div>
          ))}
        </div>
        <h1>Life at Company</h1>
        <p>{jobCard.lifeAt}</p>
        <div>
          <img src={jobCard.imageLifeAt} alt="life at company" />
        </div>

        <h1>Similar Jobs</h1>
        <ul className="ul">
          {similarJobs.map(each => (
            <SimilarJobDetails eachElement={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  failureViewJobs = () => (
    <div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
      </div>
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.dataForEachJobFinding} type="button">
        Retry
      </button>
    </div>
  )

  conditionCheckingForJobs = () => {
    const {statusForJobsSession} = this.state

    switch (statusForJobsSession) {
      case 'SUCCESS':
        return this.successViewJobs()
      case 'FAILURE':
        return this.failureViewJobs()
      case 'LOADER':
        return this.loaderViewJobs()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />

        {this.conditionCheckingForJobs()}
      </div>
    )
  }
}
export default JobItemDetails
