import Link from '@src/components/atoms/Link/Link';
import { useDispatch, useSelector } from '../../components/atoms/GlobalState';

function Home() {

  const {counter, auth} = useSelector();
  
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={"/vite.svg"} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={"/react.svg"} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch({ type: "counter/INCREMENT", payload: null })}>
          count is {counter.count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Link to="/about">go to about</Link>
      {JSON.stringify(auth)}
    </>
  )
}

export default Home
