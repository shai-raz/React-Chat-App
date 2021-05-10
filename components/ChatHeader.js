import React from 'react'
import '../css/bootstrap.min.css'
import './css/style.css'
import ProfilePicture from './ProfilePicture'
import {useContext} from 'react';
import {ConversationContext} from '../ConversationProvider';
import {getUserNameFromEmail} from '../HelperFunctions';

const ChatHeader = () => {
    const [currentConversation, setCurrentConversation] = useContext(ConversationContext)

    let emailUserName = null
    if (currentConversation) {
        emailUserName = getUserNameFromEmail(currentConversation.email)
    }

    return (
        <div className={`row heading`}>
            <div className={`col-sm-2 col-md-1 col-xs-3 heading-avatar`}>
                <div className={`heading-avatar-icon`}>
                    <ProfilePicture />
                </div>
            </div>
            <div className={`col-sm-8 col-xs-7 heading-name`}>
                <span className={`heading-name-meta`}>{emailUserName}</span>
                <span className={`heading-online`}>Online</span>
            </div>
            <div className={`col-sm-1 col-xs-1 heading-dot pull-right`}>
                <i className={`fa fa-ellipsis-v fa-2x pull-right`} aria-hidden="true"></i>
            </div>
        </div>
    )
}

export default ChatHeader