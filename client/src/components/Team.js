import React from 'react'
import PageTitle from './Layout/PageTitle';
import TeamMember from './TeamMember';
import Header from './Layout/Header';
import Footer from './Layout/Footer';

const Team = () => {
  return (
    <>
      <Header />
      <PageTitle details={{ pTitle : 'Our team' }} />
      <section className="section-area section-sp1 team-wraper">
		   	<div className="container">
				   <div className="row">
              <TeamMember memberData={{ name:'Dr. Addition Smith', specialization:'Dentist', profileImg:'https://comphealth.com/resources/wp-content/uploads/2014/12/Doctor_blogs_300.jpg', twitterLink:'https://twitter.com', instaLink:'https://www.linkedin.com', linkedInLink:'https://www.instagram.com' }} />

              <TeamMember memberData={{ name:'Dr. Mahfuz Riad', specialization:'Chiropractor', profileImg:'https://comphealth.com/resources/wp-content/uploads/2014/12/Doctor_blogs_300.jpg', twitterLink:'https://twitter.com', instaLink:'https://www.linkedin.com', linkedInLink:'https://www.instagram.com' }} />

              <TeamMember memberData={{ name:'Dr. David Benjamin', specialization:'Cardiologist', profileImg:'https://comphealth.com/resources/wp-content/uploads/2014/12/Doctor_blogs_300.jpg', twitterLink:'https://twitter.com', instaLink:'https://www.linkedin.com', linkedInLink:'https://www.instagram.com' }} />

              <TeamMember memberData={{ name:'Dr. Addition Smith', specialization:'Dentist', profileImg:'https://comphealth.com/resources/wp-content/uploads/2014/12/Doctor_blogs_300.jpg', twitterLink:'https://twitter.com', instaLink:'https://www.linkedin.com', linkedInLink:'https://www.instagram.com' }} />

              <TeamMember memberData={{ name:'Dr. Mahfuz Riad', specialization:'Chiropractor', profileImg:'https://comphealth.com/resources/wp-content/uploads/2014/12/Doctor_blogs_300.jpg', twitterLink:'https://twitter.com', instaLink:'https://www.linkedin.com', linkedInLink:'https://www.instagram.com' }} />

              <TeamMember memberData={{ name:'Dr. David Benjamin', specialization:'Cardiologist', profileImg:'https://comphealth.com/resources/wp-content/uploads/2014/12/Doctor_blogs_300.jpg', twitterLink:'https://twitter.com', instaLink:'https://www.linkedin.com', linkedInLink:'https://www.instagram.com' }} />

              
           </div>
         </div>
        </section>
        <Footer />
    </>
  )
}

export default Team