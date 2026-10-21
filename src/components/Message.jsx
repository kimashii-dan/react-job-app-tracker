import './Message.css'

function Message({ type, children }) {
  return <div className={`message message-${type}`}>{children}</div>
}

export default Message
