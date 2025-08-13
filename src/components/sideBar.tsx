import TextBox from "@/components/textBox";
import ConversationItem from "@/components/conversationItem";
import type { Conversation } from "@/types/apiConversations";

type SideBarProps = {
    conversations?: Conversation[];
    lastMessage?: string;
    lastSenderName?: string;
};

const SideBar = ({conversations, lastMessage, lastSenderName}: SideBarProps) => {
    return (
        <div className="flex flex-col bg-gray-50 backdrop-blur-lg rounded-2xl shadow-inner-lg w-full h-full justify-between shadow-md border border-gray-300 overflow-hidden">
            <div className="m-4 p-4 border border-gray-300 rounded-2xl shadow-inner">
                <div className="flex justify-between items-center">
                    <div className="font-semibold text-2xl text-gray-700 text-shadow-md">Đoạn chat</div>
                    <button className="px-2 border border-gray-300 shadow-sm rounded-md">a</button>
                </div>
                <br />
                <TextBox className="border border-gray-300 p-2 bg-white rounded-xl outline-0 w-full shadow-sm placeholder-gray-500" />
            </div>
            <div className="flex-1 h-0 m-4 p-2 border border-gray-300 rounded-2xl shadow-inner overflow-hidden overflow-y-scroll scrollbar-hidden">
                {conversations?.map((conversation) => (
                    <ConversationItem
                        key={conversation.id}
                        className="mb-2"
                        conversationName={conversation.title}
                        lastMessage={lastMessage}
                        conversationAvt={conversation.avatar_url}
                        lastSenderName={lastSenderName}
                    />
                ))}
                <ConversationItem key="1" className="mb-2 bg-gray-200 !border-blue-500" conversationName="Sơn Tùng" lastMessage="Khỏe ko bạn ei" conversationAvt="https://i-kinhdoanh.vnecdn.net/2025/08/11/471624585-1163342398481485-573-2751-9750-1754911870.jpg" lastSenderName="Tùng"/>
                <ConversationItem key="2" className="mb-2" conversationName="Trấn Thành" lastMessage="Lô chú" conversationAvt="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/3/28/tran-thanh-3-1679978161164419649988-0-0-960-1536-crop-1679978783808539742892.jpeg" lastSenderName="Thành"/>
                <ConversationItem key="3" className="mb-2" conversationName="Hiếu t2" lastMessage="trình ?" conversationAvt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXHxmwN7Zz6iiJ5RGFiIjtSrpF1gYLJ8rjmQ&s" lastSenderName="Hiếu"/>
            </div>
        </div>
    );
};

export default SideBar;