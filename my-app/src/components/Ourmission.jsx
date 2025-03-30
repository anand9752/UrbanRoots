import React from 'react'
import '../styles/Ourmission.css'

import logo1 from '../components/Rectangle2573.png'; // Replace with actual logo path
export const Ourmission = () => {
  return (
    <div className="mission-container">
      <div className="mission-content">
        <div className="mission-title">Our Journey to Green Urban Living</div>
        <div className="mission-subtitle">Transforming urban spaces into sustainable gardens since 2025</div>
      </div>
      <div className="mission-details-container">
        <div className="mission-left-content">
          <div className="mission-details-left">
            <h3>Our Vision</h3>
            <p>We're on a mission to make urban farming accessible to everyone. Our expert consultants provide personalized guidance and premium supplies to help you create your dream farm, no matter the space..</p>
          </div>
          
          <div className='mission-count'>
            <div className='m-left'>
                <div className="stat-number">5000+</div>
                <div className="stat-label">UrbanFarm Created</div>
            </div>
            <div className='m-right'>
                <div className="stat-number">200+</div>
                <div className="stat-label">Expert Consultants</div>
            </div>
          </div>
        </div>

        <div className="mission-details-right">
          <img src={logo1} alt="" />
        </div>
      </div>
    </div>
  )
}
