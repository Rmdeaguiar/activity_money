import './styles.scss';
import Header from '../../components/Header';
import { FormEvent, useState, useEffect } from 'react';
import api from '../../services/api';
import { setItem, getItem } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signup, setSignup] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);


  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if(!username || !password) {
      setError('Todos os campos são obrigatórios');
      return
    }
    try {
      const response = await api.post('/login', {
        username,
        password
      });


      if(response.status == 200){
      const { token, user } = response.data;
      setItem('token', token);
      setItem('userId', user.id);
      setItem('username', user.username);
      navigate('/home')
      return;
      }

    } catch (error: any) {
      setError(error.response.data);
    }
  }

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if(!username || !password) {
      setError('Todos os campos são obrigatórios');
    }

    try {
      const response = await api.post('/signup', {
        username,
        password
      });

      setSignup(false);

    } catch (error: any) {
      console.log(error);
      setError(error.response.data.mensagem);
    }
  }

  return (
    <>
      <Header />
      <div className="container-login">
        <h1>{signup ? 'Cadastre-se' : 'Login'}</h1>
        <form onSubmit={!signup ? handleLogin : handleSignup}>
          <label htmlFor='username'>Username</label>
          <input data-testid="input-username" name='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor='password'>Senha</label>
          <input data-testid="input-password" name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='green-btn'>Confirmar</button>
          {error && <span>{error}</span>}
        </form>
        <a onClick={() => setSignup(!signup)}>{signup ? 'Já tem cadastro? Clique aqui' : 'Ainda não tem cadastro? Clique aqui'}</a>
      </div>
    </>

  );
}

export default Login;