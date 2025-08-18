import ImageContainer from "@/components/ImageContainer";

type ConversationItemProps = {
    className?: string;
    conversationName?: string;
    lastMessage?: string;
    conversationAvt?: string;
    conversationId?: string;
    lastSenderName?: string;
    onClick?: () => void;
}

const ConversationItem = ({ className, lastSenderName, conversationName, lastMessage, conversationAvt, conversationId, onClick }: ConversationItemProps) => {
    return (
        <div onClick={onClick} id={conversationId} className={`w-full p-2 border border-gray-300 rounded-2xl grid grid-cols-4 gap-2 ${className}`}>
            <div className="overflow-hidden rounded-4xl aspect-square object-cover">
                <ImageContainer src={conversationAvt} />
            </div>
            <div className="col-span-3 flex flex-col justify-evenly items-start overflow-hidden">
                <div className="font-semibold text-xl text-nowrap">{conversationName}</div>
                <div className="text-nowrap">{lastSenderName}: {lastMessage}</div>
            </div>
        </div>
    )
}

export default ConversationItem;