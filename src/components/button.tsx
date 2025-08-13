type ButtonProps = {
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
}

const Button = ({children, className, disabled, onClick}: ButtonProps) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`px-4 py-2 rounded-xl text-center bg-blue-500 border border-blue-700 ${className}`}>{children}</button>
    )
}

export default Button;