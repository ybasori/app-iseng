import { useDispatch } from "@src/components/atoms/GlobalState"
import { navigate } from "@src/_states/reducers/route/route.action";
import { useEffect } from "react"

const Redirect:React.FC<{to: string}> = ({to}) =>{

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(navigate(to))
    },[])
    return <></>
}

export default Redirect;