import React from 'react'
import PropTypes from 'prop-types'
import '../css/bootstrap.min.css'
import './css/style.css'

const Message = (props) => {
    const deliveryType = props.isSent ?
        'sender' :
        'receiver';

    return (
        <div className={`row message-body`}>
            <div className={`col-sm-12 message-main-` + deliveryType}>
                <div className={deliveryType}>
                    <div className={`message-text`}>
                        {props.content}
              </div>
                    <span className={`message-time pull-right`}>
                        {props.time}
              </span>
                </div>
            </div>
        </div>
    )
}

Message.propTypes = {
    isSent: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
}

export default Message