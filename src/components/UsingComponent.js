import React from 'react';
import { FlutterWaveButton } from 'flutterwave-react-v3';
import request from "../request";

 
export default function App({amount, setShowModal}) {
  const userData = JSON.parse(sessionStorage.getItem('userData'))

   const config = {
    public_key: process.env.REACT_APP_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: userData.email,
      phonenumber: userData.phone,
      name: `${userData.f_name} ${userData.l_name}`,
    },
    customizations: {
      title: 'Top wallet',
      description: 'Updating TopIt balance',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    
    },
  };
 
  const fwConfig = {
    ...config,
    text: `Deposit ${amount}`,
    callback: async(response) => {
      try {
        const res = await request({
          url: `/balance`,
          method: "POST",
          headers: {
            'Authorization': `${userData.token}`
        },
          data: {amount: response.amount},
        });
        console.log(res)
        setShowModal(false)
        window.location.reload();
        
      } catch (error) {
        console.log(error.response)
        
      }
    },
    onClose: () => {},
  };
 
  return (
    
      <FlutterWaveButton className="cursor fwbtn-link mt-3" {...fwConfig} />
   
  );
}