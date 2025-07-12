import { navigate } from "@src/helper/helper"
import { useEffect } from "react"

const Redirect:React.FC<{to: string}> = ({to}) =>{

    useEffect(()=>{
        navigate(to)
    },[to])
    return <></>
}

export default Redirect;