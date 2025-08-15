type TextBoxProps = {
    placeholder?: string;
    className?: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextBox = ({placeholder = "Nhập dữ liệu", className, type, onChange}: TextBoxProps) => {
    return (
        <input type={type} onChange={onChange} name="" placeholder={placeholder} id="" className={`px-4 py-2 rounded-xl outline-0 bg-gray-100 ${className}`}  />
    )
}

export default TextBox;

