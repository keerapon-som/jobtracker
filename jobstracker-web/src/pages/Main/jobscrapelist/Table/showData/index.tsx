// import App from './App';
import "./index.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentMode,
  setIsOpenModal,
  setCurrentSelection,
  setConfirmEditData,
  setQueryData,
} from "@/slices/jobscrapelist";
import { RootState } from "@/store";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { jsonToQueryString } from "@/function/jsonToQueryString";

type TableData = {
  index: number;
  uuid: string;
  id: number;
  jobname: string;
  getjobsCount: boolean;
  getjobsDetails: boolean;
  created_at: string;
};

type ShowingDataProps = {
  TableData: TableData[];
};

const ShowingData: React.FC<ShowingDataProps> = ({ TableData }) => {
  const dispatch = useDispatch();
  const queryData = useSelector((state: RootState) => state.jobscheduling.queryData);
  const navigate = useNavigate();
  const location = useLocation();
  const currentSortDesc = new URLSearchParams(location.search).get("sorting")?.split("+")[1] === "desc";
  const currentSortBy = new URLSearchParams(location.search).get("sorting")?.split("+")[0];

  const handleclickheader = (header: string) => {
    const newsorting = { ...queryData.sorting };

    // Ensure newsorting.sorting is initialized
    const currentSortOrderByParams = new URLSearchParams(location.search).get("sorting")?.split("+")[1];

    newsorting.sortBy = header;
    newsorting.sortOrder = currentSortOrderByParams === "asc" ? "desc" : "asc";

    dispatch(setQueryData({ ...queryData, sorting: newsorting }));
    // Update location
    navigate(`${location.pathname}?${jsonToQueryString({ ...queryData, sorting: newsorting })}`);

  };

  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const [editData, setEditData] = useState<TableData>({
    index: 0,
    uuid: "",
    id: 0,
    jobname: "",
    getjobsCount: false,
    getjobsDetails: false,
    created_at: "",
  });

  const handleConfirmEdit = (data: TableData) => {
    dispatch(setIsOpenModal(true));
    dispatch(setCurrentMode("edit"));
    dispatch(setConfirmEditData(data));
    setEditMode({ ...editMode, [data.id]: false });
  };

  const handleDelete = (data: TableData) => {
    dispatch(setIsOpenModal(true));
    dispatch(setCurrentMode("delete"));
    dispatch(setCurrentSelection(data));
  };

  const handleEdit = (data: TableData) => {
    dispatch(setCurrentSelection(data));
    setEditData(data);
    setEditMode({ [data.id]: true });
  };

  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="w-2 px-6 py-3 border-gray-500 border hover:cursor-pointer hover:bg-slate-600 hover:text-white"
            >
              <div className="flex place-items-center ">
                Index
              </div>
            </th>
            <th
              scope="col"
              className="hover:text-white hover:cursor-pointer hover:bg-slate-600 w-2 px-6 py-3 border-gray-500 border"
              onClick={() => handleclickheader("id")}
            >
              <div className="flex place-items-center ">
                {(currentSortBy == "id" && currentSortDesc) ? <svg aria-labelledby="sortDownIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortDownIconTitle"/><path d="M11 9H17"/><path d="M11 5H19"/><path d="M11 13H15"/><path d="M10 17L7 20L4 17"/><path d="M7 5V19"/></svg> : null}
                {(currentSortBy == "id" && !currentSortDesc) ? <svg aria-labelledby="sortUpIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortUpIconTitle"/><path d="M11 16H17"/><path d="M11 20H19"/><path d="M11 12H15"/><path d="M4 8L7 5L10 8"/><path d="M7 20L7 6"/></svg> : null}
                ID
              </div>
            </th>
            <th
              scope="col"
              className="hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-32 px-2 py-3 border-gray-500 border"
              onClick={() => handleclickheader("jobname")}
            >
              <div className="flex place-items-center ">
                {(currentSortBy == "jobname" && currentSortDesc) ? <svg aria-labelledby="sortDownIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortDownIconTitle"/><path d="M11 9H17"/><path d="M11 5H19"/><path d="M11 13H15"/><path d="M10 17L7 20L4 17"/><path d="M7 5V19"/></svg> : null}
                {(currentSortBy == "jobname" && !currentSortDesc) ? <svg aria-labelledby="sortUpIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortUpIconTitle"/><path d="M11 16H17"/><path d="M11 20H19"/><path d="M11 12H15"/><path d="M4 8L7 5L10 8"/><path d="M7 20L7 6"/></svg> : null}
                Job Name
              </div>
            </th>
            <th
              scope="col"
              className="hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-10 py-2 border-gray-500 border"
              onClick={() => handleclickheader("getjobsCount")}
            >
              <div className="flex place-items-center ">
                {(currentSortBy == "getjobsCount" && currentSortDesc) ? <svg aria-labelledby="sortDownIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortDownIconTitle"/><path d="M11 9H17"/><path d="M11 5H19"/><path d="M11 13H15"/><path d="M10 17L7 20L4 17"/><path d="M7 5V19"/></svg> : null}
                {(currentSortBy == "getjobsCount" && !currentSortDesc) ? <svg aria-labelledby="sortUpIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortUpIconTitle"/><path d="M11 16H17"/><path d="M11 20H19"/><path d="M11 12H15"/><path d="M4 8L7 5L10 8"/><path d="M7 20L7 6"/></svg> : null}
                Get Jobs Count
              </div>
            </th>
            <th
              scope="col"
              className="hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-10 px-2 py-3 border-gray-500 border"
              onClick={() => handleclickheader("getjobsDetails")}
            >
              <div className="flex place-items-center ">
                {(currentSortBy == "getjobsDetails" && currentSortDesc) ? <svg aria-labelledby="sortDownIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortDownIconTitle"/><path d="M11 9H17"/><path d="M11 5H19"/><path d="M11 13H15"/><path d="M10 17L7 20L4 17"/><path d="M7 5V19"/></svg> : null}
                {(currentSortBy == "getjobsDetails" && !currentSortDesc) ? <svg aria-labelledby="sortUpIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortUpIconTitle"/><path d="M11 16H17"/><path d="M11 20H19"/><path d="M11 12H15"/><path d="M4 8L7 5L10 8"/><path d="M7 20L7 6"/></svg> : null}
                Get Jobs Details
              </div>
            </th>
            <th
              scope="col"
              className="hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-40 px-2 py-3 border-gray-500 border"
              onClick={() => handleclickheader("created_at")}
            >
              <div className="flex place-items-center ">
                {(currentSortBy == "created_at" && currentSortDesc) ? <svg aria-labelledby="sortDownIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortDownIconTitle"/><path d="M11 9H17"/><path d="M11 5H19"/><path d="M11 13H15"/><path d="M10 17L7 20L4 17"/><path d="M7 5V19"/></svg> : null}
                {(currentSortBy == "created_at" && !currentSortDesc) ? <svg aria-labelledby="sortUpIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortUpIconTitle"/><path d="M11 16H17"/><path d="M11 20H19"/><path d="M11 12H15"/><path d="M4 8L7 5L10 8"/><path d="M7 20L7 6"/></svg> : null}
                Created at
              </div>
            </th>
            <th scope="col" className="  px-2 py-3 border-gray-500 border">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {TableData.map((task) => (
            <tr
              key={task.id}
              className="border-b bg-gray-800 border-gray-500 hover:bg-slate-700 hover:text-gray-200"
            >
              <td className="px-6 py-4 border-gray-500 border">{task.index}</td>
              <td className="px-2 py-4 border-gray-500 border">{task.id}</td>
              <td className="min-w-24 px-2 py-4 border-gray-500 border">
                {editMode[task.id] ? (
                  <input
                    type="text"
                    value={editData.jobname}
                    onChange={(e) =>
                      setEditData({ ...editData, jobname: e.target.value })
                    }
                    className="text-black w-full px-2 py-1 border rounded-md"
                  />
                ) : (
                  task.jobname
                )}
              </td>
              <td
                className={`min-w-20 px-2 py-4 border-gray-500 border ${
                  task.getjobsCount ? "text-green-400" : "text-red-500"
                }`}
              >
                {editMode[task.id] ? (
                  <input
                    type="checkbox"
                    checked={editData.getjobsCount}
                    onChange={(e) =>
                      setEditData({ ...editData, getjobsCount: !editData.getjobsCount })
                    }
                    className="text-black w-full px-2 py-1 border rounded-md"
                  />
                ) : task.getjobsCount ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </td>
              
              <td
                className={`min-w-20 px-2 py-4 border-gray-500 border  ${
                  task.getjobsDetails ? "text-green-400" : "text-red-500"
                }`}
              >
                {editMode[task.id] ? (
                  <input
                    type="checkbox"
                    checked={editData.getjobsDetails}
                    onChange={(e) =>
                      setEditData({ ...editData, getjobsDetails: !editData.getjobsDetails })
                    }
                    className="text-black w-full px-2 py-1 border rounded-md"
                  />
                ) : task.getjobsDetails ? "Yes" : "No"}
              </td>
              <td className="px-2 py-4 border-gray-500 border ">
                {task.created_at}
              </td>
              <td className="min-w-20 px-2 py-2  flex items-center">
                {!editMode[task.id] ? (
                  <>
                    <button
                      onClick={() => handleEdit(task)}
                      className="hover:text-blue-400 border border-blue-400 hover:cursor-pointer hover:bg-slate-600 mr-2 rounded-md px-4 py-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task)}
                      className="hover:text-red-400 border border-red-400 hover:cursor-pointer hover:bg-slate-600 rounded-md px-4 py-2"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditMode({});
                        setEditData({
                          index: 0,
                          uuid: "",
                          id: 0,
                          jobname: "",
                          getjobsCount: false,
                          getjobsDetails: false,
                          created_at: "",
                        });
                      }}
                      className="hover:text-gray-200 border border-gray-200 hover:cursor-pointer hover:bg-slate-600 mr-2 rounded-md px-4 py-2"
                    >
                      Exit
                    </button>
                    <button
                      onClick={() => handleConfirmEdit(editData)}
                      className="hover:text-red-400 border border-red-400 hover:cursor-pointer hover:bg-slate-600 rounded-md px-4 py-2"
                    >
                      Confirm
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowingData;
