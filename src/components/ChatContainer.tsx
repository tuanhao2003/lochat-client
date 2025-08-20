import TextBox from "@/components/TextBox";
import Button from "@/components/Button";

type ChatContainerProps = {
    className?: string;
};

const ChatContainer = ({ className }: ChatContainerProps) => {
    return (
        <div className={`h-full w-full p-2 rounded-2xl flex flex-col justify-center items-center ${className??""}`}>
            <div className="w-full flex-1/12 border border-gray-300 shadow-md rounded-tl-2xl rounded-tr-2xl bg-blue-500"></div>
            <div className="w-full flex-10/12 bg-gray-100 shadow-inner overflow-hidden overflow-y-scroll scrollbar-hidden border border-t-0 border-b-0 border-gray-300"></div>
            <div className="w-full flex-1/12 border border-gray-300 shadow rounded-bl-2xl rounded-br-2xl bg-blue-500">
            <div className=" flex items-center justify-center gap-4 p-2 h-full overflow-hidden">
                <Button className="bg-gray-100">a</Button>
                <TextBox className="" />
            </div>
            </div>
        </div>
    );
};

export default ChatContainer;
