// import App from './App';
import { useDispatch } from "react-redux";
import { setCurrentMode,setIsOpenModal } from "@/slices/jobscheduling";

const Filter: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="px-4 py-4 flex items-center justify-between ">
        <div>
          <h3 className="font-semibold border border-gray-400 px-3 p-1 rounded-md hover:cursor-pointer hover:bg-gray-700 hover:border-white">
            Filter
          </h3>
          {/* <p className="text-slate-300">Show Jobschedule </p> */}
        </div>
        <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
          <button
          onClick={() => {
            dispatch(setCurrentMode("add"))
            dispatch(setIsOpenModal(true));
          }
          }
            className="flex select-none items-center gap-2 rounded bg-slate-600 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900 transition-all hover:shadow-lg hover:border hover:border-gray-300 border border-gray-800 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Add Task Schedule
          </button>
        </div>
      </div>
    </>
  );
};

export default Filter;
