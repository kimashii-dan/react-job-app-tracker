import './Controls.css'

function Controls({ search, status, sort, onSearchChange, onStatusChange, onSortChange }) {
  return (
    <div className="controls">
      <input
        type="search"
        className="controls-search"
        placeholder="Search by company or position"
        aria-label="Search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select aria-label="Filter by status" value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="all">All statuses</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
      <select aria-label="Sort" value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="company">Company A–Z</option>
      </select>
    </div>
  )
}

export default Controls
