import './index.css'

const SimilarJobDetails = props => {
  const {eachElement} = props
  return (
    <li className="li">
      <div>
        <img
          src={eachElement.company_logo_url}
          alt="similar job company logo"
        />
      </div>
      <h1>{eachElement.title}</h1>
      <p>{eachElement.rating}</p>
      <h1>Description</h1>
      <p>{eachElement.job_description}</p>
      <p>{eachElement.location}</p>
      <p>{eachElement.employment_type}</p>
    </li>
  )
}

export default SimilarJobDetails
