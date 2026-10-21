import { useEffect, useState } from 'react'
import { getApplications } from '../api.js'
import ApplicationList from '../components/ApplicationList.jsx'
import Message from '../components/Message.jsx'
import './ListPage.css'

function ListPage() {
  const [applications, setApplications] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    getApplications({})
      .then((data) => {
        if (!ignore) {
          setApplications(data.items)
          setTotal(data.total)
          setError(null)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  let content
  if (loading) {
    content = <Message type="loading">Loading applications...</Message>
  } else if (error) {
    content = <Message type="error">{error}</Message>
  } else if (applications.length === 0) {
    content = <Message type="empty">No applications found</Message>
  } else {
    content = <ApplicationList applications={applications} />
  }

  return (
    <div className="list-page">
      <div className="list-header">
        <h1 className="page-title">Applications</h1>
        {!loading && !error && <span className="list-count">{total}</span>}
      </div>
      {content}
    </div>
  )
}

export default ListPage
