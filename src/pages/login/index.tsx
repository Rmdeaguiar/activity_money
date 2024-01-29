import './styles.scss';
import Header from '../../components/Header';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

  }

  return (
    <>
      <Header />
      <div className="container-login">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
        <label htmlFor='username'>Username</label>
        <input name='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor='password'>Senha</label>
        <input name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='green-btn'>Confirmar</button>
      </form>
      <Link to={'/signup'}>Ainda não tem cadastro? Clique aqui</Link>
      </div>
    </>

  );
}

export default Login;