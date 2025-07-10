import Link from "@src/components/atoms/Link/Link";
import { useSelector } from "@src/components/atoms/GlobalState";

function Dashboard() {
  const { auth } = useSelector();
  return (
    <>

      Dashboard

    </>
  )
}

export default Dashboard
