import React from 'react'
import '../css/bootstrap.min.css'
import './css/style.css'

const ContactsSearchBox = ()=> {
    return (
        <div className={`row searchBox`}>
          <div className={`col-sm-12 searchBox-inner`}>
            <div className={`form-group has-feedback`}>
              <input id="searchText" type="text" className={`form-control`} name="searchText" placeholder="Search" />
              <span className={`glyphicon glyphicon-search form-control-feedback`}></span>
            </div>
          </div>
        </div>
    )
}

export default ContactsSearchBox