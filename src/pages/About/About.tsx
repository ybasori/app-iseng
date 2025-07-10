import Link from "@src/components/atoms/Link/Link";
import { useSelector } from "@src/components/atoms/GlobalState";

function About() {
  const {auth} = useSelector();
  return (
    <>
      About
            <Link to="/">go to home <i className="fa-solid fa-circle-notch fa-spin"></i></Link>

            {JSON.stringify(auth)}
    </>
  )
}

export default About
