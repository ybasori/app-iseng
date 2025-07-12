import { navigate } from "@src/helper/helper";


const Link:React.FC<{to: string; children: React.ReactNode; className?:string}> = ({to, children, className}) => {
    return <a className={className} href={to} onClick={(e)=>{e.preventDefault(); navigate(to);}}>{children}</a>
}

export default Link;