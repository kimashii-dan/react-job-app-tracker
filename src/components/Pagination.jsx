import './Pagination.css'

function Pagination({ page, total, pageSize, onPageChange }) {
  const totalPages = Math.ceil(total / pageSize)

  if (totalPages <= 1) {
    return null
  }

  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return (
    <div className="pagination">
      <button className="button button-secondary" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>
      <div className="pagination-info">
        <span className="pagination-range">
          {from}–{to} of {total}
        </span>
        <span>
          Page {page} of {totalPages}
        </span>
      </div>
      <button
        className="button button-secondary"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
