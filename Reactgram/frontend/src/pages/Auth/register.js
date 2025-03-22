import "./auth.css"

// components
import { Link } from 'react-router-dom';
import Message from "../../components/message"; // Corrigido nome do componente
// hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//redux
import { register, reset } from "../../slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificando se as senhas coincidem
    if (password !== confirmPassword) {
      return alert("As senhas não coincidem!");
    }

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(user));
  };

  // Limpar os estados de autenticação
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitlte">Cadastra-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
          autoComplete="name"
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
          autoComplete="new-password"
        />
        <input
          type="password"
          placeholder="Confirme a senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword || ""}
          autoComplete="new-password"
        />
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />} {/* Corrigido nome do componente */}
      </form>
      <p>
        Já tem cadastro? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
