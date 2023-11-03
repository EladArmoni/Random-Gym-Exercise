
const Button = ({text,handleFunction}) => {
    return (
        <button className="btn btn-primary p-2" onClick={handleFunction}>{text}</button>
    );
}
export default Button
