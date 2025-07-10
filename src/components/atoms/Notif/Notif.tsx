import { updateNotif } from "@src/_states/reducers/notif/notif.action";
import { useDispatch, useSelector } from "../GlobalState";

const Notif: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const {notif} = useSelector();
  const dispatch = useDispatch();

  return <>{children}{notif.notifications.map((item:{id:string;title: string; text:string;hide:boolean})=><div className={`notification ${item.hide?"is-hidden":""}`}>
    <button className="delete" type="button" onClick={()=>dispatch(updateNotif({...item, hide: true}))}></button>
    {item.text}
  </div>)}</>
}

export default Notif;