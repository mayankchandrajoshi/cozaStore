import React, { useEffect } from 'react'
import MetaData from '../Utils/MetaData'

const HelpFAQ = () => {

  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"});
  },[])
  
  return (
    <>
      <MetaData title='Help & FAQ'/>
      <div className="grid place-items-center my-20 p-2 md:p-5">
        <div className="font-bold text-2xl mb-5">You can use one of the following details when paying for product</div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] border-solid border-grey3 border-[1px] w-full max-w-[1195px]">
            <div className="p-2 tablet:p-5 font-medium text-lg md:text-3xl border-solid border-grey3 border-b-[1px]">NetBanking</div>
            <div className="p-2 tablet:p-5 border-solid border-grey3 border-b-[1px] md:border-l-[1px]">
              You can select any of the listed banks. After choosing a bank, it will redirect to a mock page where you can make the payment <span className='font-medium text-base md:text-lg'>success</span> or a <span className='font-medium text-base md:text-lg'>failure</span>. Since this is Test Mode, it will not redirect you to the bank login portals.
            </div>
            <div className="p-2 tablet:p-5 font-medium text-lg md:text-3xl border-solid border-grey3 border-b-[1px]">UPI</div>
            <div className="p-2 tablet:p-5 border-solid border-grey3 border-b-[1px] md:border-l-[1px]">
              <ul>
                <li><span className='font-medium text-base md:text-lg'>success@razorpay:</span> To make the payment successful.</li>
                <li><span className='font-medium text-base md:text-lg'>failure@razorpay:</span> To fail the payment.</li>
              </ul>
            </div>
            <div className="p-2 tablet:p-5 font-medium text-lg md:text-3xl border-solid border-grey3 border-b-[1px]">Wallet</div>
            <div className="p-2 tablet:p-5 border-solid border-grey3 border-b-[1px] md:border-l-[1px]">
              You can select any of the listed wallets. After choosing a wallet, Razorpay will redirect to a mock page where you can make the payment success or a failure. Since this is Test Mode, it will not redirect you to the wallet login portals.
            </div>
            <div className="p-2 tablet:p-5 font-medium text-lg md:text-3xl border-solid border-grey3 border-b-[1px]">Cards</div>
            <div className="p-2 tablet:p-5 border-solid border-grey3 border-b-[1px] md:border-l-[1px]">
              <div className="mb-3">Use any valid expiration date in the future and any random CVV to create a successful payment.Here domestic means Indian region,so if you are out of india use international</div>
              <div className="grid grid-cols-3 border-solid border-grey3 border-[1px]">
                <div className="font-bold p-2 border-solid border-grey3 border-r-[1px] border-b-[1px] break-all">Card Network</div>
                <div className="font-bold p-2 border-solid border-grey3 border-r-[1px] border-b-[1px] break-all">Domestic / International</div>
                <div className="font-bold p-2 border-solid border-grey3 border-b-[1px] break-all">Card Number</div>
                <div className=" p-2 border-solid border-grey3 border-r-[1px] border-b-[1px] break-all">Mastercard</div>
                <div className=" p-2 border-solid border-grey3 border-r-[1px] border-b-[1px] break-all">Domestic</div>
                <div className=" p-2 border-solid border-grey3 border-b-[1px] break-all">5267 3181 8797 5449</div>
                <div className=" p-2 border-solid border-grey3 border-r-[1px] border-b-[1px] break-all">Visa</div>
                <div className=" p-2 border-solid border-grey3 border-r-[1px] border-b-[1px] break-all">Domestic</div>
                <div className=" p-2 border-solid border-grey3 border-b-[1px] break-all">4111 1111 1111 1111</div>
                <div className=" p-2 border-solid border-grey3 border-r-[1px] border-b-[1px] break-all">Mastercard</div>
                <div className=" p-2 border-solid border-grey3 border-r-[1px] border-b-[1px] break-all">International</div>
                <div className=" p-2 border-solid border-grey3 border-r-[1px] border-b-[1px] break-all">
                  <ul className="md:list-disc md:list-inside">
                    <li className=" break-all mb-2">5555 5555 5555 4444</li>
                    <li className=" break-all">5105 1051 0510 5100</li>
                  </ul>
                </div>
                <div className=" p-2 border-solid border-grey3 border-r-[1px] border-b-[1px] break-all">Visa</div>
                <div className=" p-2 border-solid border-grey3 border-r-[1px] border-b-[1px] break-all">International</div>
                <div className=" p-2 border-solid border-grey3 break-all">
                  <ul className="md:list-disc md:list-inside">
                    <li className=" break-all mb-2">4012 8888 8888 1881</li>
                    <li className=" break-all">5104 0600 0000 0008</li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default HelpFAQ