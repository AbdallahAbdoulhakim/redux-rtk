import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
} from "../app/features/counter/counterSlice";
const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);
  return (
    <div className="flex justify-between w-11/12 mx-auto border p-2 rounded-md">
      <p>{count}</p>

      <div className="space-x-2">
        <button
          onClick={() => dispatch(increment())}
          className="bg-slate-300 text-slate-700 rounded  px-2 hover:bg-slate-200 active:scale-95"
        >
          +
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="bg-slate-300 text-slate-700 rounded  px-2 hover:bg-slate-200 active:scale-95"
        >
          -
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="bg-slate-300 text-slate-700 rounded  px-2 hover:bg-slate-200 active:scale-95"
        >
          R
        </button>
      </div>
    </div>
  );
};
export default Counter;
