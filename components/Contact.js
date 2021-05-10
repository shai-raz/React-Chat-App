import React from 'react'
import ProfilePicture from './ProfilePicture'
import PropTypes from 'prop-types'
import '../css/bootstrap.min.css'
import './css/style.css'
import { useContext } from 'react'
import { ConversationContext } from '../ConversationProvider'
import {getUserNameFromEmail} from '../HelperFunctions';

const Contact = (props) => {
  const [currentConversation, setCurrentConversation] = useContext(ConversationContext)
  const user = props.user
  const emailUserName = getUserNameFromEmail(user.email)

  const handleClick = () => {
    setCurrentConversation(user)
  }

  return (
    <div className={`row sideBar-body`} onClick={() => { handleClick() }}>
      <div className={`col-sm-3 col-xs-3 sideBar-avatar`}>
        <div className={`avatar-icon`}>
          <ProfilePicture />
        </div>
      </div>
      <div className={`col-sm-9 col-xs-9 sideBar-main`}>
        <div className={`row`}>
          <div className={`col-sm-8 col-xs-8 sideBar-name`}>
            <span className={`name-meta`}>{emailUserName}
            </span>
          </div>
          <div className={`col-sm-4 col-xs-4 pull-right sideBar-time`}>
            <span className={`time-meta pull-right`}>18:18
                </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact