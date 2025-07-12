import { updateNotif } from "@src/_states/reducers/notif/notif.action";
import { useDispatch, useSelector } from "../GlobalState";

const Notif: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { notif } = useSelector();
  const dispatch = useDispatch();

  return (
    <>
      {children}
      {notif.notifications.map(
        (item: { id: string; title: string; text: string; hide: boolean }, key:number) => (
          <div className={`message ${item.hide ? "is-hidden" : ""}`} key={key}>
            <div className="message-header">
              Info
              <button
                className="delete"
                type="button"
                onClick={() => dispatch(updateNotif({ ...item, hide: true }))}
              ></button>
            </div>
            <div className="message-body">{item.text}</div>
          </div>
        )
      )}
    </>
  );
};

export default Notif;
