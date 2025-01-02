import React from 'react'
import './about.css'
import about from '../../../assets/about.webp'
import DoctorLandingPage from '../LandingPage/DoctorLandingPage'

const About = () => {
  return (
    <div className='aboutus'>
        <div className='about-header'>
             <p>ABOUT <span className='about-us-highlight'>US</span></p>
        </div>
        <div className='about-content'>
            <img className='about-image' src={about} alt='/' />
            <div className='about-text'>
                <p>Welcome to Fitnesso, a dynamic online yoga platform that brings the serenity and strength of yoga to your home. Whether you're just starting your yoga journey or are a seasoned practitioner, we are here to provide you with the tools, guidance, and community to deepen your practice.</p>
                
                <p>At Fitnesso, we offer a seamless blend of yoga classes for all levels, led by expert trainers, along with a platform where certified yoga instructors can join, share their knowledge, and build their own virtual yoga community.</p> 
               
                <b className='vision-title'>Our Vision</b>
                <p>Our mission is to make fitness accessible, flexible, and enjoyable for everyone—anytime, anywhere. or yoga trainers, we aim to create an empowering platform where they can connect with students, manage their schedules, and grow their online presence.</p>  
            </div>
        </div>
        <div className='section-header'>
            <p>WHY <span className='choose-us-highlight'>CHOOSE US</span> </p>
        </div>

        <div className='features-container'>
            <div className='feature-card'>
                <b>Support for Trainers:</b>
                <p>Our platform is built to empower yoga trainers to run their business smoothly while focusing on what they do best-teaching yoga.</p>
            </div>
            <div className='feature-card'>
                <b>Convenience:</b>
                <p>Join classes at your convenience-live or on-demand. The choice is yours.</p>
            </div>
            <div className='feature-card'>
                <b>All-Inclusive:</b>
                <p>We offer a wide range of yoga classes for all levels, from beginners to advanced practitioners, as well as wellness resources for a holistic approach to health.</p>
            </div>
        </div>
        <div>
        {/* <DoctorLandingPage/> */}
        </div>
    </div>
  )
}

export default About