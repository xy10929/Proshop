import { Alert } from 'react-bootstrap'

//variant-color   children-real param
const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProts = {
  variant: 'info',
}

export default Message
