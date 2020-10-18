import React from 'react';
import { FlutterWaveButton } from 'flutterwave-react-v3';
 
export default function App({amount}) {
   const config = {
    public_key: process.env.REACT_APP_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phonenumber: '07064586146',
      name: 'joel ugwumadu',
    },
    customizations: {
      title: 'Pay Joel',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    
    },
  };
 
  const fwConfig = {
    ...config,
    text: `Top up ${amount}`,
    callback: (response) => {
      console.log(response);
    },
    onClose: () => {},
  };
 
  return (
    
      <FlutterWaveButton className="cursor" {...fwConfig} />
   
  );
}