type TextBoxProps = {
    placeholder?: string;
    className?: string;
}

const TextBox = ({placeholder = "aaa", className}: TextBoxProps) => {
    return (
        <input type="text" name="" placeholder={placeholder} id="" className={className ?? ""}  />
    )
}

export default TextBox;

