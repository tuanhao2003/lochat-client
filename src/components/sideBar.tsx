import TextBox from "@/components/TextBox";
import ConversationItem from "@/components/conversationItem";
import type { Conversation } from "@/types/apiConversations";
import type { Message } from "@/types/apiMessages";
import type { User } from "@/types/apiUsers";

type SideBarProps = {
    conversationsInfor?: {conversation?: Conversation, message?: Message, sender?: User }[];
    className?: string;
    chatting?: (id:string) => void;
};


const SideBar = ({conversationsInfor, className, chatting}: SideBarProps) => {
    return (
        <div className={`flex flex-col bg-gray-50 backdrop-blur-lg rounded-2xl shadow-inner-lg w-full h-full justify-between shadow-md border border-gray-300 overflow-hidden ${className}`}>
            <div className="m-4 p-4 border border-gray-300 rounded-2xl shadow-inner">
                <div className="flex justify-between items-center">
                    <div className="font-semibold text-2xl text-gray-700 text-shadow-md">Đoạn chat</div>
                    <button className="px-2 border border-gray-300 shadow-sm rounded-md">a</button>
                </div>
                <br />
                <TextBox className="border border-gray-300 p-2 bg-white rounded-xl outline-0 w-full shadow-sm placeholder-gray-500" />
            </div>
            <div className="flex-1 h-0 m-4 p-2 border border-gray-300 rounded-2xl shadow-inner overflow-hidden overflow-y-scroll scrollbar-hidden">
                {conversationsInfor?.map((infor) => (                    
                    <ConversationItem
                        onClick={() => chatting?chatting(infor.conversation?.id || ""):function(){}}
                        conversationId={infor.conversation?.id}
                        className="mb-2"
                        conversationName={infor.conversation?.title}
                        lastMessage={infor.message?.content}
                        conversationAvt={infor.conversation?.avatar_url}
                        lastSenderName={infor.sender?.nickname}
                    />
                ))}
            </div>
        </div>
    );
};

export default SideBar;