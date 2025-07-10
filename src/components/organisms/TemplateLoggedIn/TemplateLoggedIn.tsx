import Navbar from "../../molecules/Navbar/Navbar"

const TemplateDefault:React.FC<{children:React.ReactNode}> = ({children}) => {
    return <>
    <Navbar />
    {children}
    </>
}

export default TemplateDefault;