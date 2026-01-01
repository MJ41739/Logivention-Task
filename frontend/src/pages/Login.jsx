import React from 'react'
import "../styles/Login.css"

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const login = async()=>{
        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {  'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        });
        const data = await res.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        window.location.href = data.role === 'admin' ? '/admin' : '/user';
    }

  return (
    <>
    <div className='login-container'>
      <h2 className='login-header'>Login here</h2>
      <input className='input-field' onChange={e => setEmail(e.target.value)}
    placeholder='Email' />
    <input className='pass' type='password' onChange={e => setPassword(e.target.value)}
    placeholder='Password' />
    <button className='loginbtn' onClick={login}>Login</button>
    </div>
    </>
  )
}

export default Login