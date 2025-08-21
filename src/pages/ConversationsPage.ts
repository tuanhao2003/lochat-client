import SideBar from "@/components/SideBar"
import { useState, useEffect } from "react";
import { getAccountConversations } from "@/services/conversationsService";
import { getLastMessageInConversation } from "@/services/messagesService";
import useTokenProcessing from "@/hooks/useTokenProcessing";
import type { Conversation } from "@/types/apiConversations";
import type { Message } from "@/types/apiMessages";
import type { User } from "@/types/apiUsers";
import { getUserByID } from "@/services/usersService";
import ChatContainer from "@/components/ChatContainer";

const ConversationsPage = () => {
    const tokenProcessing = useTokenProcessing();
    const [conversationsInfor, setConversationsInfor] = useState<{ conversation?: Conversation, message?: Message, sender?: User }[]>([]);
    const [ chattingId, setChattingId ] = useState("");
    // const [lastAccessedConversation, setLastAccessedConversation] = useState("");

    useEffect(() => {
        const fetchConversationsInfor = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) return;

                let conversations: Conversation[] | undefined;
                await tokenProcessing(() => getAccountConversations())
                    .then((conversationsResponse) => {
                        if (conversationsResponse) {
                            conversations = conversationsResponse.data?.page_content;
                        }
                    })
                    .catch(error => {
                        console.error(error.message)
                    })

                if (conversations) {
                    const listConversationsInfor = await Promise.all(
                        conversations.map(async (conv) => {
                            const conversationsInfor: { conversation?: Conversation, message?: Message, sender?: User } = {};
                            conversationsInfor.conversation = conv;
                            await tokenProcessing(() => getLastMessageInConversation(conv.id))
                                .then(async (messageResponse) => {
                                    console.log(messageResponse?.data)
                                    if (messageResponse) {
                                        conversationsInfor.message = messageResponse.data;
                                        await tokenProcessing(() => getUserByID(messageResponse.data.sender_relation))
                                            .then((userResponse) => {
                                                conversationsInfor.sender = userResponse?.data;
                                            })
                                            .catch((error) => {
                                                console.error(error.message)
                                            })
                                    }
                                })
                                .catch((error) => {
                                    console.error(error.message)
                                })
                            
                            return conversationsInfor;
                        })
                    );

                    setConversationsInfor(listConversationsInfor);

                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchConversationsInfor();
    }, []);

    useEffect(() => {
        
    }, [chattingId])

    return (
        <div className="h-screen w-screen p-0 m-0 bg-gray-100 flex items-center justify-center">
            <div className="h-[90%] w-[90%] bg-transparent grid grid-cols-4 gap-4">
                <SideBar chatting={setChattingId} conversationsInfor={conversationsInfor} />
                <div className="col-span-3 bg-gray-50 backdrop-blur-lg rounded-2xl shadow-inner-lg w-full h-full shadow-md border border-gray-300 overflow-hidden">
                    <ChatContainer />
                </div>
            </div>
        </div>
    )
}

export default ConversationsPage;