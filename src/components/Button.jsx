export const Button = ({type, children, onClick}) => {
  return (
    <button type={type} className="btn btn-primary w-full mt-4" onClick={onClick}>{children}</button>
  )
}
