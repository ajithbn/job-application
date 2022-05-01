import React, { useState } from 'react'
import axios from 'axios'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (e) => {
        const attr = e.target.name
        if(attr === 'email') {
            setEmail(e.target.value)
        } else if(attr === 'password') {
            setPassword(e.target.value)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email:email,
            password: password
        }
        //console.log(formData)
        axios.post('https://dct-user-auth.herokuapp.com/users/login', formData)
            .then((res) => {
                const result = res.data
                console.log(result)
                if(result.hasOwnProperty('errors')) {
                    alert(result.errors)
                } else {
                    alert('Successfully Logged In')
                    localStorage.setItem('token', result.token)
                    props.history.push('/')
                    props.handleAuth()
                }
            }).catch((err) => {
                alert(err.message)
            })
    }
    return (
    <div className='container regContr text-white d-flex align-items-center'>
        <form onSubmit={handleSubmit} className='bg-white col-md-4 mx-auto text-center border p-4 rounded my-5' autoComplete="off">
                <img className="mb-4 w-75" src="https://th.bing.com/th/id/R.b9186e2169f9cbc052ee1fdcc9243ae1?rik=T0Tu12WWHMcGYQ&riu=http%3a%2f%2fhrsolutions.net%2fwp-content%2fthemes%2fhrsolutions%2fimages%2flogo-light.png&ehk=dfFw9MVKhAJCfUHf4zQZk5h0ZADuYX0VeFsSdjUdzOE%3d&risl=&pid=ImgRaw&r=0" alt=""  />
                <h1 className=" mb-3 font-weight-normal text-black">Please sign in</h1>
                <p className='mb-3 font-weight-normal text-danger'>Use Bellow credential for Login</p>
                <h6 className='mb-3 font-weight-normal text-primary'>UserName: ajithbn9535@gmail.com</h6>
                <h6 className='mb-3 font-weight-normal text-primary'>Password: ajithbn9535</h6>
                <input type='email' value={email} placeholder="Email address" onChange={handleChange} name='email' className='form-control' required="" autoFocus="" autoComplete="false"/><br/>
                <input type='password' value={password} onChange={handleChange} name='password' className="form-control" placeholder="Password" required="" autoComplete="false"/><br/>
                <input type='submit' className="btn btn-md btn-primary btn-block" value='Sign In' />
            </form>
    </div>)
}

export default Login