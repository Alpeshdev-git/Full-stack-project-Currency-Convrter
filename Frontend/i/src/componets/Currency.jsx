import React, { useEffect, useState } from 'react'
import "./currency.css"
export default function Currency() {

    const [amount,setAmount]=useState('')
    const [from,setfrom]=useState('')
    const [to,setTO]=useState('')
    const [result,setResult]=useState(null)
    // const [rate,setRate]=useState(null)
    const [currencyCodes, setCurrencyCodes] = useState([]);

    const handleconvert=async()=>{
        if(!amount || !from || !to)
        {
            alert("Please fill the empty entry")
            return
        }
        try{
            const response=await fetch('http://localhost:3001/api/convert',{
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                    from: from.toUpperCase(),
                    to: to.toUpperCase(),
                    amount: parseFloat(amount),
                    }),
            })
                    const data = await response.json();

                   if (data.result) {
                    setResult(data.result);
                    // setRate(data.rate);
                    } else if (data.error) {
                    alert(`Error: ${data.error}`);
                    } else {
                    alert('Conversion failed');
                    }} catch (error) {
                    console.error(error);
                    alert('Server error');
                    }

                    
  };

 useEffect(() => {
  fetch(`https://v6.exchangerate-api.com/v6/d8cc8f3a64034e5eb5d694cb/latest/USD`)
    .then(res => res.json())
    .then(data => {
      setCurrencyCodes(Object.keys(data.conversion_rates));
    });
}, []);


  return (
   
     <div className="container-fuild custom-width d-flex justify-content-center align-items-center">
             <div className="container text-center">
                <h1 className='heading1 mt-4'>CURRENCY CONVERTER</h1>

                 <div className="text-start mt-5 mx-5">
                    <p className="heading2">Enter Amount</p>
                    </div>
                 <input className='firstinput form-control mx-5'type='text' placeholder='Amount' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                         
                    <div className="flagcontainer">

                      <div className="row mt-4 justify-content-evenly mx-3 ">

                                               
                                                <div className="col-lg-5">
                                                <p className="fw-bold mb-2 text-start">FROM</p>
                                                 <select
                                                    className="form-control"
                                                    value={from}
                                                    onChange={(e) => setfrom(e.target.value)}
                                                    >
                                                    <option value="">Select currency</option> 

                                                         {currencyCodes.map((code) => (
                                                                <option key={code} value={code}>
                                                                {code}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>

                                        
                                                <div className="col-lg-5 mt-4 mt-lg-0">
                                                <p className="fw-bold mb-2 text-start">TO</p>
                                                <select
                                                    className="form-control"
                                                    value={to}
                                                    onChange={(e) => setTO(e.target.value)}
                                                    >
                                                    <option value="">Select currency</option> 

                                                       {currencyCodes.map((code) => (
                                                                <option key={code} value={code}>
                                                                {code}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>

                          </div>
                    </div>

                 <div className="row ">
                           <div className="colu1 col-lg-12 my-4">
                                    <input
                                        type='text'
                                        className="form-control result  fs-6 text-start"
                                        placeholder=" Output"
                                        value={
                                        result !== null
                                            ? `${amount} ${from.toUpperCase()} = ${result.toFixed(2)} ${to.toUpperCase()}`
                                            : ''
                                        }
                                        readOnly
                                    />
                                    </div>
                                                                

                            <div className="colu2 col-lg-12">
                                                <button className='btn btn-primary 'onClick={handleconvert}>Get Exchange Rate</button>          
                           </div>
                            
                 </div>

                 
             </div>
     </div>
  )
}
