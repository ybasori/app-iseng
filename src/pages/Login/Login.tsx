import { useDispatch } from "@src/components/atoms/GlobalState";
import { useState } from "react";
import { notify } from "@src/_states/reducers/notif/notif.action";
import { navigate } from "@src/helper/helper";

const Login = () => {
    // const {auth} = useSelector();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        username:"",
        password:""
    })
    return (<>
        <form className="box" onSubmit={(e)=>{
            e.preventDefault();

            fetch("/api/login",{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
              })
              .then(res => {
                    return res.json();
                })
              .then(data => {
                    dispatch(notify("", data.message, 5000))
                if(data.statusCode === 200){
                    dispatch({
                        type: "auth/LOGIN",
                        payload: data.result
                    });
                    navigate("/");

                }
              })
              .catch(error => {
                console.error('Error:', error);
              });
        }}>

            <div className="field">
                <label className="label">Username</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Username" name={"username"} value={form.username} onChange={(e)=>setForm({...form, [e.currentTarget.name]:e.currentTarget.value})} />
                </div>
            </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input className="input" type="password" placeholder="Password" name={"password"} value={form.password} onChange={(e)=>setForm({...form, [e.currentTarget.name]:e.currentTarget.value})} />
                </div>
            </div>


            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" type={"submit"}>Login</button>
                </div>
            </div>
        </form>
    </>)
}

export default Login