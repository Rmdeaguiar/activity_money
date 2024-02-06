import './styles.scss';
import Header from '../../components/Header';
import { FormEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {setItem, getItem} from '../../utils/storage';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signup, setSignup] = useState(false);

  useEffect(() => {
    const token = getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);


  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if(signup) {
      const response = await api.post('/signup', {
        username, 
        password
      });

      setSignup(false);
      return
    }
    const response = await api.post('/login', {
      username, 
      password
    });

    const {token, user} = response.data;
    setItem('token', token);
    setItem('userId', user.id);
    setItem('username', user.username);
    navigate('/home')
  }

  return (
    <>
      <Header />
      <div className="container-login">
        <h1>{signup ? 'Cadastre-se' : 'Login'}</h1>
        <form onSubmit={handleLogin}>
        <label htmlFor='username'>Username</label>
        <input name='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor='password'>Senha</label>
        <input name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='green-btn'>Confirmar</button>
      </form>
      {/* <Link to={'/signup'}>Ainda não tem cadastro? Clique aqui</Link> */}
      <a onClick={()=>setSignup(!signup)}>{signup ? 'Já tem cadastro? Clique aqui' : 'Ainda não tem cadastro? Clique aqui'}</a>

      </div>
    </>

  );
}

export default Login;