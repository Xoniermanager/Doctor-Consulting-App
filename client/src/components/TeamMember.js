import React from 'react'

const TeamMember = ({memberData}) => {
  return (
    <>
        <div className="col-lg-4 col-sm-6">
            <div className="team-member mb-30">
                <div className="team-media">
                <img src={memberData.profileImg} alt="" />
                </div>
                <div className="team-info">
                    <div className="team-info-comntent">
                        <h4 className="title">{memberData.name}</h4>
                        <span className="text-secondary">{memberData.name}</span>
                    </div>
                    <ul className="social-media">
                        <li><a target="_blank" href={memberData.twitterLink}><i className="fab fa-twitter"></i></a></li>
                        <li><a target="_blank" href={memberData.linkedInLink}><i className="fab fa-linkedin"></i></a></li>
                        <li><a target="_blank" href={memberData.instaLink}><i className="fab fa-instagram"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default TeamMember