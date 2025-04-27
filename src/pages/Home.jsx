import React from 'react';
import DropOrer from '../components/DropOrer'
import shippingTrack from '../assets/shippingTrack.jpg'
// import stepOne from '../assets/stepOne.png';
// import stepTwo from '../assets/stepTwo.png'
// import stepThree from '../assets/stepThree.png'
import { MdOutlineBusinessCenter } from "react-icons/md";
import { TbBrandPaypay } from "react-icons/tb";
import { FiPackage } from "react-icons/fi";
import { GrStepsOption } from "react-icons/gr";

export default function Home() {

  return (
    <div className='dark:bg-gray-700'>
        <div className='p-1 dark:text-white'>Provide order details</div>
        <DropOrer />
        <div className='2xl:flex md:flex p-5 mt-[10em] ml-3 gap-5 mr-3 dark:text-white '>
          <img src={shippingTrack} alt="Shipping Tracker" className='mt-2 w-[700px] xl:max-w-[600px] 2xl:xl:max-w-[600px] md:max-w-[500px] sm:max-w-[300px] rounded-lg' />
          <p className='mt-10 w-[60em] mr-auto'>
            With DromMate’s smart tracking system, stay updated on your package’s journey in real-time.
            Know exactly where your delivery is and when it’ll arrive — from the warehouse to your doorstep.
          </p>
        </div>
        <div className='flex flex-col p-5 mt-[5em] '>
          <div className='p-1 font-bold text-xl self-center dark:text-white'>Our Impact</div>
          <div className='flex justify-between ml-[10em] mr-[10em] mt-7 mb-5 bg-blue-300 p-5'>
            <div className='flex flex-col'><span className='font-bold text-2xl'>72</span><span>Businesses Partnered</span></div>
            <div className='flex flex-col'><span className='font-bold text-2xl'>98%</span><span>On-Time Delivery Rate</span></div>
            <div className='flex flex-col'><span className='font-bold text-2xl'>6,010,040</span><span>goods delivered</span></div>
            <div className='flex flex-col'><span className='font-bold text-2xl'>24/7</span><span>Real-Time Tracking Access</span></div>
          </div>
        </div>

        <div className='flex flex-col p-1 mb-[10em] mt-[10em] dark:text-white '>
          <div className='p-1 font-bold text-xl self-center'>How it Works</div>
          <div className='flex justify-between gap-2 ml-[1em] mr-[1em] mt-5 mb-6'>
            <div className='flex flex-col border-2 w-[30em] border-gray-600 p-10'>
              <div className='flex border-2 rounded-full pl-3 pt-1 pr-2'><span>Step 1</span><span className='text-xl ml-1'><GrStepsOption /></span></div>
              <span>DropMate leverages cutting-edge lo. Built to handle real-world road conditions, variable connectivity, and high-volume demand.</span>
            </div>
            <div className='flex flex-col border-2 w-[40em] border-gray-600 p-10'>
              <div className='flex border-2 rounded-full pl-3 pt-1 pr-2'><span>Step 2</span><span className='text-xl ml-1'><GrStepsOption /></span></div>
              <span>DropMate leverages cutting-edge lo. Built to handle real-world road conditions, variable connectivity, and high-volume demand.</span>
            </div>
            <div className='flex flex-col border-2 w-[30em] border-gray-600 p-10'>
              <div className='flex border-2 rounded-full pl-3 pt-1 pr-2'><span>Step 3</span><span className='text-xl ml-1'><GrStepsOption /></span></div>
              <span>DropMate leverages cutting-edge lo. Built to handle real-world road conditions, variable connectivity, and high-volume demand.</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col p-5 mt-[5em] dark:text-white'>
          <div className='p-1 font-bold text-xl self-center'>A Complete Delivery Intelligence Solution</div>
          <div className='flex justify-between ml-[10em] mr-[10em] mt-5 mb-6'>
            <div className='flex flex-col'><span className='text-7xl'><MdOutlineBusinessCenter /></span><span className='font-bold text-lg mt-1 mb-2'>Logistics Technology Built for Africa</span><span>DropMate leverages cutting-edge logistics infrastructure
               and tracking systems, tailored specifically for the challenges and opportunities of African cities and last-mile delivery routes.
                Built to handle real-world road conditions, variable connectivity, and high-volume demand.</span></div>
            <div className='flex flex-col'><span className='text-7xl'><TbBrandPaypay /></span><span className='font-bold text-lg mt-1 mb-2'>Pay-As-You-Deliver Model</span><span>Our tech-enabled logistics network empowers businesses with flexible,
               usage-based pricing. No need for heavy upfront investment — scale your deliveries affordably as your business grows. Rate</span></div>
            <div className='flex flex-col'><span className='text-7xl'><FiPackage /></span><span className='font-bold text-lg mt-1 mb-2'>Real-Time Package Intelligence</span><span>Track every package with precision — from warehouse to doorstep. 
              DropMate’s platform gives you live updates, delivery performance analytics, and proactive issue resolution.</span></div>
          </div>
        </div>

    </div>
  )
}
