import { RootState } from "@src/_states/types";
import Link from "@src/components/atoms/Link/Link";
import { useSelector } from "react-redux";

function About() {
  const auth = useSelector((state:RootState)=>(state.auth));
  return (
    <>
      About
            <Link to="/">go to home <i className="fa-solid fa-circle-notch fa-spin"></i></Link>

            {JSON.stringify(auth)}
    </>
  )
}

export default About
