import SideBar from "@/components/sideBar"
import { useState, useEffect } from "react";
import { LoadAccountConversations } from "@/services/conversationsService";
import type { UserConversationsResponse } from "@/types/apiConversations";

const ConversationsPage = () => {
    const [conversations, setConversations] = useState<UserConversationsResponse["data"]>(null);

    useEffect(() => {
        LoadAccountConversations("your-token-here")
            .then(response => {
                if (response) {
                    setConversations(response.data.data);
                } else {
                    console.error("Failed to load conversations");
                }
            })
            .catch(error => {
                console.error("Error loading conversations:", error);
            });
    }, []);

    return (
        <div className="h-screen w-screen p-0 m-0 bg-gray-100 flex items-center justify-center">
            <div className="h-[90%] w-[90%] bg-transparent grid grid-cols-4 gap-4">
                <SideBar conversations={conversations?.page_content} />
                <div className="col-span-3 bg-gray-50 backdrop-blur-lg rounded-2xl shadow-inner-lg w-full h-full justify-between shadow-md border border-gray-300 overflow-hidden"></div>
            </div>
        </div>
    )
}

export default ConversationsPage;