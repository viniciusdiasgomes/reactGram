import './auth.css'

// components
import { Link } from 'react-router-dom';
import message from '../../components/message';

//Hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Redux




const login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword ] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault()
  }


  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">Faça o login para ver o que há de novo.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="email"/>
        <input type="password" placeholder="senha"/>
        <input type="submit" value="Entrar"/>
        <p>Nao tem uma conta? <Link to="/register">Clque aqui</Link></p>
      </form>
  
  
  
  </div>
  )
}

export default login