import ImageContainer from "@/components/ImageContainer";

type MessageItemProps = {
    isMedia: boolean;
    className?: string;
};

const MessageItem = ({ className, isMedia = false }: MessageItemProps) => {
    if (isMedia) {
        return (
            <div className={`${className}`}>
                <ImageContainer />
            </div>
        );
    }
    return (
        <div className={`rounded-2xl bg-gray-700 text-gray-100 p-2 ${className}`}>

        </div>
    );
};

export default MessageItem;
