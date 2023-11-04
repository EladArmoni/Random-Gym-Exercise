
const Button = ({ text, handleFunction,classCss,disabled}) => {
    return (
        <button className={classCss} onClick={handleFunction} disabled={disabled}>{text}</button>
    );
}
export default Button
