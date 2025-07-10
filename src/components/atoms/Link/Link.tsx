import { useDispatch } from "@src/components/atoms/GlobalState";
import { navigate } from "@src/_states/reducers/route/route.action";

const Link:React.FC<{to: string; children: React.ReactNode; className?:string}> = ({to, children, className}) => {
    const dispatch = useDispatch();
    return <a className={className} href={to} onClick={(e)=>{e.preventDefault(); dispatch(navigate(to));}}>{children}</a>
}

export default Link;