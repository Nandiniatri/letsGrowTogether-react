export const Button = ({ children, type, className, onClick }) => (
    <button className={className} type={type} onClick={onClick}>{children}</button>
)

