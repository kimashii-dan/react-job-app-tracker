import { useEffect, useState } from 'react'
import { getApplications, PAGE_SIZE } from '../api.js'
import ApplicationList from '../components/ApplicationList.jsx'
import Controls from '../components/Controls.jsx'
import Message from '../components/Message.jsx'
import Pagination from '../components/Pagination.jsx'
import './ListPage.css'

function ListPage() {
  const [applications, setApplications] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState({ search: '', status: 'all', sort: 'newest', page: 1 })

  useEffect(() => {
    let ignore = false

    getApplications(query)
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
  }, [query])

  function updateQuery(changes) {
    setQuery({ ...query, ...changes, page: 1 })
    setLoading(true)
  }

  function handlePageChange(newPage) {
    setQuery({ ...query, page: newPage })
    setLoading(true)
  }

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
      <Controls
        search={query.search}
        status={query.status}
        sort={query.sort}
        onSearchChange={(value) => updateQuery({ search: value })}
        onStatusChange={(value) => updateQuery({ status: value })}
        onSortChange={(value) => updateQuery({ sort: value })}
      />
      {content}
      {!loading && !error && (
        <Pagination
          page={query.page}
          total={total}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default ListPage
