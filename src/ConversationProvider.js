import React, { useState } from "react";

export const ConversationContext = React.createContext();

export const ConversationProvider = ({ children }) => {
    const [currentConversation, setcurrentConversation] = useState(null);

    return (
        <ConversationContext.Provider
            value={[currentConversation, setcurrentConversation]}>
            {children}
        </ConversationContext.Provider>
    );
};