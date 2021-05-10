import React from 'react'
import ContactsHeader from './ContactsHeader'
import '../css/bootstrap.min.css'
import './css/style.css'
import ContactsSearchBox from './ContactsSearchBox'
import Contacts from './Contacts'

const FilterableContacts = () => {
    return (
        <React.Fragment>
            <ContactsHeader />
            <ContactsSearchBox />
            <Contacts />
        </React.Fragment>
    )
}

export default FilterableContacts