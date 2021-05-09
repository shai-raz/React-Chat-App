// Get the username from an email address (the part before the @)
export const getUserNameFromEmail = (email) => {
    return email.split('@')[0]
}

/*
Comapre function that is used for sorting arrays
Compares 2 dates (timestamps)
Returns 1 if firstElement is smaller, -1 if it's smaller, 0 if both are equal
*/
export const comapreDateBySeconds = (firstElement, secondElement) => {
    if (firstElement.date.seconds < secondElement.date.seconds) {
        return -1
    }
    if (firstElement.date.seconds > secondElement.date.seconds) {
        return 1
    }
    return 0
}