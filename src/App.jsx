import { login } from './utils';
import './index.css';
import { useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// Desabilite o botão de Login equanto você está executando o login.
// Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {

  const [email, setEmail] = useState ('')
  const [password, setPassword] = useState ('')
  const [error, setError] = useState (null)
  const [success, setSuccess] = useState (null)
  const [isRequesting, setIsRequesting] = useState (false)

  const handleEmail = (event) => {
    //const value = event.target.value;
    const {value} = event.target
    setEmail(value)
  }

  const handlePassword = (event) => {
    //const value = event.target.value;
    const {value} = event.target
    setPassword(value)
  }

  const handleSubmit = () => {

    setError(null)
    setSuccess(null)
    setIsRequesting(true)

    console.log('submitted')

    let values = {email: email, password: password}
    login(values)
      .then((success) => {
        setSuccess(success)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        //sucesso ou erro retorna o que foi passado aqui
        setIsRequesting(false)
      })
  }

  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        {error && <div className='errorMessage'>{error.message}</div>}
        {success && <div className='successMessage'>{success.message}</div>}
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input id={'email'} type={'email'} autoComplete='off' 
          value={email} onChange={handleEmail} />
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input id={'password'} type={'password'} 
          value={password} onChange={handlePassword}/>
        </div>

        <div className='button'>
          <button disabled={email === '' || password.length < 6 || isRequesting} onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  );
}
