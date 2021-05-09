import React from 'react'
import app from '../firebase'
import ProfilePicture from './ProfilePicture'
import '../css/bootstrap.min.css'
import './css/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { AuthContext } from '../Auth'
import { getUserNameFromEmail } from '../HelperFunctions'

const ContactsHeader = () => {
  const { currentUser } = useContext(AuthContext)
  const userEmail = currentUser.email
  const userEmailUserName = getUserNameFromEmail(userEmail)

  const signOut = () => {
    app.auth().signOut();
  }

  return (
    <div className={`row heading`}>
      <div className={`col-sm-2 col-xs-2 heading-avatar`}>
        <div className={`heading-avatar-icon`}>
          <ProfilePicture />
        </div>
      </div>
      <div className={`col-sm-4 col-xs-4 heading-name-meta`}>
        {userEmailUserName}
      </div>
      {/*<div className={`col-sm-1 col-xs-1 centered-icon-end heading-dot pull-right`}>
          <FontAwesomeIcon icon={faEllipsisV} size="2x" />
        </div>
        <div className={`col-sm-2 col-xs-2 centered-icon-end heading-compose pull-right`}>
          <FontAwesomeIcon icon={faComments} size="2x" />
        </div>*/}
      <div className={`col-sm-1 col-xs-1 centered-icon heading-compose pull-right`}>
        <FontAwesomeIcon icon={faSignOutAlt} size="2x"
          onClick={signOut}
          role={`button`}
        />
      </div>
    </div>
  )
}

export default ContactsHeader