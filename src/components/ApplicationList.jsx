import ApplicationCard from './ApplicationCard.jsx'
import './ApplicationList.css'

function ApplicationList({ applications }) {
  return (
    <div className="application-list">
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  )
}

export default ApplicationList
