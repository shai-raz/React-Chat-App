import React from 'react'
import ContactsHeader from './ContactsHeader'
import '../css/bootstrap.min.css'
import './css/style.css'
import ContactsSearchBox from './ContactsSearchBox'
import Contacts from './Contacts'

const FilterableContacts = () => {
    return (
        <>
            <ContactsHeader />
            <ContactsSearchBox />
            <Contacts />
        </>
    )
}

export default FilterableContacts