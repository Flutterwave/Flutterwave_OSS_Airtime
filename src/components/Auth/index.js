import React, { useState, useEffect } from 'react'
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import request from "../../request";
import {COUNTRIES} from '../../utils'





const Home = (props) => {
    const [showing, setShowing] = useState("login")
    const [showRegister, setShowRegister] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        customer: "",
        amount: ""
    })
    
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        f_name: "",
        l_name: "",
        country: "",
        phone: "",
    })

const handleChangeLogin = (e) => {
    setLoginData({
        ...loginData,
        [e.target.name]: e.target.value
    })
}

const handleChangeRegister = (e) => {
    setRegisterData({
        ...registerData,
        [e.target.name]: e.target.value
    })
}


    const handleLogin = async(e) => {
        try {
            e.preventDefault()
            setLoading(true)

        const res = await request({
            url: `/auth/signin`,
            method: "POST",
            data: loginData,
          });

          sessionStorage.setItem(
            "userData",
            JSON.stringify({
             ...res.data.data,
            }))
            setLoading(false)

            props.history.push("/dashboard");
            
            
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                progress: 0,
            });
        }
    }

    const handleRegister = async (e) => {
        try {
            e.preventDefault()
        setLoading(true)

        const res = await request({
            url: `/auth/signup`,
            method: "POST",
            data: registerData,
          });
          console.log(res.data.data.token)

          sessionStorage.setItem(
            "userData",
            JSON.stringify({
              ...res.data.data,
            }))
            setLoading(false)

            props.history.push("/dashboard");
            
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                progress: 0,
            });
          
            
        }
    }

  

    return (
        <div className="App-header">

            <div className="App" >

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    // closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <ToastContainer />

                <div className="modal-content-wrapper">
                    <div className="d-flex">
                    <svg width="35" height="35" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5622 0.351978C52.8407 -2.64809 39.8625 14.3817 33.5536 19.1465C37.8797 22.4113 42.2959 26.9996 44.1886 32.2056C47.7035 41.7352 39.0513 43.147 32.5622 40.7646C25.4423 38.294 19.1334 32.9997 14.9876 26.8231C13.8159 26.8231 12.5542 26.6467 11.3825 26.2937C13.7258 32.8233 14.7172 39.5293 14.0863 45C14.0863 33.9704 8.76886 23.0289 1.10812 13.9405C-1.59568 10.764 1.19824 8.38156 3.63166 11.4699C5.26976 13.7065 6.77438 16.0339 8.13798 18.4406C10.7516 9.44041 23.7299 1.5873 32.5622 0.351978ZM29.6782 16.5881C33.6438 14.2057 45.7207 1.41131 34.4549 2.55839C27.9658 3.26429 20.1248 9.17618 16.8803 12.9704C21.3866 12.441 25.9831 14.3822 29.6782 16.5881ZM16.79 15.7933C19.8543 15.5286 23.189 17.1169 25.7125 18.7052C23.2791 19.8522 20.5753 20.5581 17.7814 20.7346C13.6356 20.7346 12.8245 16.1463 16.79 15.7933ZM18.5025 26.4694C22.1076 30.44 27.0645 34.3225 32.382 35.7343C35.4463 36.5284 38.8711 36.1755 37.6093 31.8518C36.3476 27.8812 33.103 24.3517 29.9486 21.7046C29.0473 22.3222 28.0559 22.9399 27.0645 23.3811C24.3607 24.8811 21.4767 25.9399 18.5025 26.4694Z" fill="#F5A623"/>
                        </svg>

                        <h2 className="app-header-text">TopIt</h2>

                    </div>

                    {{
                        register: (
                            <form onSubmit={handleRegister}>
                                <div className="form-wrapper">
                            <div className="input-row">
                                <label className="input-label"> First name</label>
                                <input type="text" name="f_name" value={registerData.f_name} required onChange={handleChangeRegister} placeholder="first name" />
    
                            </div>
                            <div className="input-row">
                                <label className="input-label"> Last name</label>
                                <input type="text" name="l_name" required value={registerData.l_name} onChange={handleChangeRegister} placeholder="last name" />
    
                            </div>
                            <div className="input-row">
                                <label className="input-label"> Email address</label>
                                <input type="email" name="email" required value={registerData.email} onChange={handleChangeRegister} placeholder="user@gmail.com" />
    
                            </div>
                            <div className="input-row">
                                <label className="input-label"> Phone number</label>
                                <input type="text" name="phone" required value={registerData.phone} onChange={handleChangeRegister} placeholder="(xxx)-(xxx)-(xxx)-(xxxx)" />
    
                            </div>
    
                            <div className="input-row">
                                <label className="input-label"> Country</label>
                                <select value={registerData.country} onChange={handleChangeRegister}  required name="country" >
                                    {
                                        COUNTRIES.map(item => <option key={item.name} value={item.name}> {item.name}</option>)
                                    }
                                    
                                </select>
                            </div>
                            <div className="input-row">
                                <label className="input-label">Password</label>
                                <input type="text" required name="password" value={registerData.password} onChange={handleChangeRegister} placeholder="Enter Password" />
    
                            </div>
    
    
                        {
    
                            loading ? <ClipLoader   color={"#F5A623"}/> : <button  className="cursor fwbtn-bg"
                            >Create Account</button>
                        }
                        <div className="d-flex">
                        <p className="account-req">Already have an account?</p>
                         <div className="link-login cursor" onClick={() => {
                                setLoading(false)
                                setShowing("login")

                         }}>Login</div>
                        </div>
                        </div>
                            </form>

                        ),
                        login: (
                            <form onSubmit={handleLogin}>
                            <div className="form-wrapper">
                          
                            <div className="input-row">
                                <label className="input-label"> Email address</label>
                                <input type="email" required name="email" value={loginData.email} onChange={handleChangeLogin} placeholder="user@gmail.com" />
    
                            </div>
                            
                            <div className="input-row">
                                <label className="input-label">Password</label>
                                <input type="text" required name="password" value={loginData.password} onChange={handleChangeLogin} placeholder="Enter Password" />
    
                            </div>
                            <div className="input-row">
                             <div className="link-login cursor" onClick={() => setShowing("forgotPassword")}> Forgot your Password?</div>


                            </div>
                            
    
    
                        {
    
                            loading ? <ClipLoader color={"#F5A623"} /> : <button  type="submit" className="cursor fwbtn-bg"
                            >Login</button>
                        }
                          
                        <div className="d-flex">
                        <p className="account-req">Don't have an account?</p>
                         <div className="link-login cursor" onClick={() => {
                             setLoading(false)
                             setShowing("register")}}>Sign up</div>
                        </div>
                        </div>
                        </form>
                    
                        ),
                        forgotPassword: (
                            <div className="form-wrapper">
                           
                            <div className="input-row">
                                <label className="input-label"> Email address</label>
                                <input type="email" name="email"  placeholder="user@gmail.com" />
    
                            </div>
    
                        {
    
                            loading ? <ClipLoader color={"#F5A623"}/> : <button className="cursor fwbtn-bg"
                            >Reset Password</button>
                        }
                        <div className="d-flex">
                         
                        <p className="account-req">Remember your Password?</p>
                         <div className="link-login cursor" onClick={() => {
                             setLoading(false)
                             setShowing("login")}}>Login</div>
                        </div>
                        </div>
                    
                        )

                    }[showing]}

                </div>
            </div>
        </div>
    );
}

export default Home;