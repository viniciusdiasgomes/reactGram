import './message.css'


const message = ({msg, type}) => {
  return (
    <div className={'message ${type}'}>
        <p>{msg}</p>   
    </div>
  )
}

export default message