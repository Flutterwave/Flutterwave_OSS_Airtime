import React, { useState, useEffect } from 'react'
import TopUp from '../UsingComponent'
import Modal from 'react-animated-modal'
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import request from "../../request";
import { Link } from 'react-router-dom'






const Home = (props) => {
    const [showing, setShowing] = useState("deposit")
    const [showModal, setShowModal] = useState(false)
    const [depositAmount, setDepositAmount] = useState("")
    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(true)
    const [balance, setBalance] = useState(0)
    const [historyData, setHistoryData] = useState([])
    const [error, setError] = useState({
        customer: "",
        amount: ""
    })

    const [airtimeData, setAirtimeData] = useState({
        country: "NG", // change this to your country
        customer: "",
        amount: "",
        recurrence: "ONCE",
        type: "AIRTIME",
        reference: Date.now(),
        package_data: "AIRTIME",
        biller_name: "AIRTIME"

    })

const handleChange = (e) => {
    setError({
        customer: "",
        amount: ""
    })
    setAirtimeData({
        ...airtimeData,
        [e.target.name]: e.target.value
    })
}

const PurchaseAirtime = async() => {
    try {
     
            setLoading(true)
            const reqBody = {
                ...airtimeData,
            }
            const { token } = JSON.parse(sessionStorage.getItem('userData'));

    
            const res = await request({
                url: `/bills`,
                method: "POST",
                headers: {
                    'Authorization': `${token}`
                },
                data: reqBody,
              });
            setLoading(false)
            toast.success('Airtime Purchase was successful', {
                position: "top-right",
                autoClose: 3000,
                onClose: () => {
                    window.location.reload();
                  },
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                progress: 0,
            });
        
    } catch (err) {
        console.log(err.response)
        setLoading(false)
        toast.error('Sorry something went wrong', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            progress: 0,
        });

        
    }
    

}


    useEffect(() => {
     if (sessionStorage.getItem("userData")){
        const { token } = JSON.parse(sessionStorage.getItem('userData'));
        
        const getBalance = async () => {
            const res = await request({
                url: `/balance`,
                headers: {
                    'Authorization': `${token}`
                },
                method: "GET",

            });
            const history = await request({
                url: `/bills`,
                headers: {
                    'Authorization': `${token}`
                },
                method: "GET",

            });
            if (res.data.data) {

                setBalance(res.data.data.wallet_amount)
                setHistoryData(history.data.data)
                setLoadingData(false)
            }
        }
        getBalance()

     }else{
        sessionStorage.clear();
        props.history.push("/");

     }  

    }, [])

    const handleAirtime = () => {
        if (Number(balance)) {
            setShowModal(true)
            setShowing("airtime")

        } else {
            toast.error('You do not have money enough money to buy airtime', {
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
        <div>

            <Modal
                visible={showModal}
                closemodal={() =>
                    setShowModal(false)
                }
                type="zoomIn"
            >
                <div className="d-flex-center">
                    <svg width="35" height="35" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5622 0.351978C52.8407 -2.64809 39.8625 14.3817 33.5536 19.1465C37.8797 22.4113 42.2959 26.9996 44.1886 32.2056C47.7035 41.7352 39.0513 43.147 32.5622 40.7646C25.4423 38.294 19.1334 32.9997 14.9876 26.8231C13.8159 26.8231 12.5542 26.6467 11.3825 26.2937C13.7258 32.8233 14.7172 39.5293 14.0863 45C14.0863 33.9704 8.76886 23.0289 1.10812 13.9405C-1.59568 10.764 1.19824 8.38156 3.63166 11.4699C5.26976 13.7065 6.77438 16.0339 8.13798 18.4406C10.7516 9.44041 23.7299 1.5873 32.5622 0.351978ZM29.6782 16.5881C33.6438 14.2057 45.7207 1.41131 34.4549 2.55839C27.9658 3.26429 20.1248 9.17618 16.8803 12.9704C21.3866 12.441 25.9831 14.3822 29.6782 16.5881ZM16.79 15.7933C19.8543 15.5286 23.189 17.1169 25.7125 18.7052C23.2791 19.8522 20.5753 20.5581 17.7814 20.7346C13.6356 20.7346 12.8245 16.1463 16.79 15.7933ZM18.5025 26.4694C22.1076 30.44 27.0645 34.3225 32.382 35.7343C35.4463 36.5284 38.8711 36.1755 37.6093 31.8518C36.3476 27.8812 33.103 24.3517 29.9486 21.7046C29.0473 22.3222 28.0559 22.9399 27.0645 23.3811C24.3607 24.8811 21.4767 25.9399 18.5025 26.4694Z" fill="#F5A623"/>
                        </svg>

                        <h2 className="app-header-text">TopIt</h2>

                    </div>
                    {{
                        deposit: (
                            <div className="airtime-modal-content-wrapper">

                            
                            <input type="number" className="mt-3" name="depositAmount" value={depositAmount} onChange={(e) => {
                    
                                setDepositAmount(e.target.value)
                            }} placeholder="Enter amount" />
                            {
                                Number(depositAmount)? <TopUp setShowModal={setShowModal} amount={depositAmount} />: (<div className="mt-3">
                                    <p className="error-text">Amount</p>
                                </div>)
                            }
                           
                            
                        </div>
           

                        ),
                        airtime: (
                            <div className="airtime-modal-content-wrapper">

                                <input type="text" className="mt-3" name="customer" value={airtimeData.customer} onChange={handleChange} placeholder="Enter Phone number" />
                                <div>
                                    <p className="error-text">{error.customer}</p>
                                </div>
                                <select className="mt-3" value={airtimeData.recurrence} onChange={handleChange}  name="recurrence" >
                                   <option  value="ONCE"> ONCE</option>
                                   <option  value="HOURLY">HOURLY </option>
                                   <option  value="DAILY"> DAILY</option>
                                   <option  value="WEEKLY"> WEEKLY</option>
                                   <option  value="MONTHLY"> MONTHLY</option>
                                </select>
                                <input className="mt-3" type="number" name="amount" value={airtimeData.amount} onChange={handleChange} placeholder="Enter amount" />
                                <div>
                                    <p className="error-text">{error.amount}</p>
                                </div>
                                {

                                    loading ? <ClipLoader color={"#F5A623"} /> : <button className="cursor fwbtn-link mt-3" onClick={PurchaseAirtime}
                                    >Buy</button>
                                }
                            </div>
           
                        )

                    }[showing]}
                
            </Modal>
            <div className="App" >

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <ToastContainer />

                <div className="d-flex-row">
                    <Link
                    to="/"
                    >
                    
                    <div className="d-flex">
                    <svg width="35" height="35" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5622 0.351978C52.8407 -2.64809 39.8625 14.3817 33.5536 19.1465C37.8797 22.4113 42.2959 26.9996 44.1886 32.2056C47.7035 41.7352 39.0513 43.147 32.5622 40.7646C25.4423 38.294 19.1334 32.9997 14.9876 26.8231C13.8159 26.8231 12.5542 26.6467 11.3825 26.2937C13.7258 32.8233 14.7172 39.5293 14.0863 45C14.0863 33.9704 8.76886 23.0289 1.10812 13.9405C-1.59568 10.764 1.19824 8.38156 3.63166 11.4699C5.26976 13.7065 6.77438 16.0339 8.13798 18.4406C10.7516 9.44041 23.7299 1.5873 32.5622 0.351978ZM29.6782 16.5881C33.6438 14.2057 45.7207 1.41131 34.4549 2.55839C27.9658 3.26429 20.1248 9.17618 16.8803 12.9704C21.3866 12.441 25.9831 14.3822 29.6782 16.5881ZM16.79 15.7933C19.8543 15.5286 23.189 17.1169 25.7125 18.7052C23.2791 19.8522 20.5753 20.5581 17.7814 20.7346C13.6356 20.7346 12.8245 16.1463 16.79 15.7933ZM18.5025 26.4694C22.1076 30.44 27.0645 34.3225 32.382 35.7343C35.4463 36.5284 38.8711 36.1755 37.6093 31.8518C36.3476 27.8812 33.103 24.3517 29.9486 21.7046C29.0473 22.3222 28.0559 22.9399 27.0645 23.3811C24.3607 24.8811 21.4767 25.9399 18.5025 26.4694Z" fill="#F5A623"/>
                        </svg>

                        <h2 className="app-header-text">TopIt</h2>

                    </div>
                    </Link>

                    <div className="d-flex">

                    <h4> Balance {"\u20A6"} {balance}</h4>
                    <span className="logout-btn cursor" onClick={() => {
                        sessionStorage.clear()
                        props.history.push('/');
                    }}> Logout</span>
                   
                    </div>


                </div>
                <div className="container">
               
                    <div className="d-flex-row">
                        <div>
                        <h1 className="intro">Welcome {JSON.parse(sessionStorage.getItem('userData')).f_name}</h1>
                        <p>Recharge your phone at ease</p>
                        </div>
                        <div>
                            <button className="cursor flt_button" onClick={() => {
                                 setShowModal(true)
                                 setShowing("deposit")
                            }}>Deposit</button>

                        </div>
                    </div>

                    <div className="history-wrapper">
                        <div className="history-header">
                            <h1 className="intro">History </h1>
                            <button className="cursor flt_button" onClick={handleAirtime}>Buy Airtime</button>
                        </div>
                       {
                           loadingData? <div className="d-flex-center">
                               <ClipLoader color={"#F5A623"} />
                           </div>: (
                            <div className="table-wrapper">
                            
                            {
                                historyData.length? (
                                    <table >
                            
                            <tr>
                                <th>Customer</th>
                                <th>recurrence</th>
                                <th>amount</th>
                                <th>Date</th>
                            </tr>
                                   {
                                        historyData.map((item, i) => (<tr key={i}>
                                            <td>{item.customer}</td>
                                            <td>{item.recurrence}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.created_at.slice(0,10)}</td>
                                        </tr>) )
                                   }
                                </table>
                                ): (
                                    <div className="d-flex-center">
                                        <div>
                                            <h1 className="intro text-center">No Airtime record</h1>
                                            <p className="text-center">Click on buy airtime button to purchase airtime</p>
                                        </div>
                                    </div>
                                )
                            }
                            
                           
                        
    
    
                            </div>
                           
                           )
                       }
                    </div>

                </div>

                
            </div>
        </div>
    );
}

export default Home;