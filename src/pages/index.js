import React, { useState } from "react"

import Layout from "../components/layout"
import { TextField } from '@material-ui/core';
// import Image from "../components/image"

const initialValues = {
  price: 0,
  sellPrice: 0,
  discount: 0,
  tax: 0.0925,
  mercari: 0.1000,
  paypalPercent: 0.029,
  paypalFlat: 0.30
}


const IndexPage = () => {
  
  const [values, setValues] = useState(initialValues);

  function handleChanges(e){
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  function handleChangesPercent(e){
    setValues({
      ...values,
      [e.target.name]: e.target.value / 100
    })
  }

  return (
    <Layout>
      <div className="container">

        <div className="input-group">
          <div className="inputs" id='input'>
            <span className="input"><span className="icon">$</span><TextField id="outlined-basic" label="Gymshark Price:" name="price" variant="outlined" type="number" onChange={e => {handleChanges(e)}}/></span>
            <span className="input"><span className="icon">$</span><TextField id="outlined-basic" label="Mercari Price:" name="sellPrice" variant="outlined" type="number" onChange={e => {handleChanges(e)}}/></span>
          </div>

          <div className="inputs" id='fees'>
            <span className="input"><TextField id="outlined-basic" label="Discount:" name="discount" variant="outlined" type="number" defaultValue={(values["discount"] * 100).toFixed(2)} onChange={e => {handleChangesPercent(e)}}/></span>
            <span className="input"><TextField id="outlined-basic" label="Tax:" name="tax" variant="outlined" type="number" defaultValue={values["tax"] * 100} onChange={e => {handleChangesPercent(e)}}/></span>
            <span className="input"><TextField id="outlined-basic" label="Mercari Fees" name="mercari" variant="outlined" type="number" defaultValue={(values["mercari"] * 100).toFixed(2)} onChange={e => {handleChangesPercent(e)}}/></span>
            <div>
              <span className="input"><TextField id="outlined-basic" label="PayPal Fee" name="paypalPercent" variant="outlined" type="number" defaultValue={(values["paypalPercent"] * 100).toFixed(2)} onChange={e => {handleChangesPercent(e)}}/></span> + 
              $<span className="input"><TextField id="outlined-basic" label="PayPal Fee" name="paypalFlat" variant="outlined" type="number" defaultValue={values["paypalFlat"]} onChange={e => {handleChanges(e)}}/></span>
            </div>
          </div>
        </div>

        <div className="output-group">

          <p>Breakeven: ${(values["price"] * (1 - values["discount"]) * (1 + values["tax"]) / (1 - values["mercari"] - values["paypalPercent"]) + values["paypalFlat"]).toFixed(2)}</p>
          {/* values["sellPrice"] */}
          <p>Profit: {Math.max(0, values["sellPrice"] * (1- values["mercari"] - values["paypalPercent"]) - values["paypalFlat"] - values["price"]).toFixed(2) }</p>
        </div>
      </div>

    </Layout>
  )
}

export default IndexPage
