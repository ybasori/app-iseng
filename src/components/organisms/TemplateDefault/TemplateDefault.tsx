import Navbar from "../../molecules/Navbar/Navbar"

const TemplateLoggedIn:React.FC<{children:React.ReactNode}> = ({children}) => {
    return <>
    <Navbar />
    {children}
    </>
}

export default TemplateLoggedIn;