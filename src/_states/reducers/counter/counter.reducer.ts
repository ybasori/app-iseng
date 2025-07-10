import type { IAction } from "../../types";
import type { CounterState } from "./counter.type";


const initialState:CounterState={
    count: 0
}
const counter = (state=initialState, action?:IAction) => {
  const name = "counter";
    switch (action?.type) {
      case `${name}/INCREMENT`:
        return { count: state.count + 1 };
      case `${name}/DECREMENT`:
        return { count: state.count - 1 };
      default:
        return state;
    }
  };

  export default counter;