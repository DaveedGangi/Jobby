import {Link} from 'react-router-dom'

const JobCard = props => {
  const {each} = props

  return (
    <div>
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
    </div>
  )
}
export default JobCard
