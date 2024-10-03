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
} from "@/slices/jobscheduling";
import { RootState } from "@/store";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { jsonToQueryString } from "@/function/jsonToQueryString";

type TableProps = {
  index: number;
  id: number;
  uuid: string;
  taskname: string;
  tasktype: string;
  taskstatus: string;
  taskdescription: string;
  hours_trigger: number;
  minute_trigger: number;
  list_weekdays_trigger: Array<string>;
  created_at: string;
};

interface ShowingDataProps {
  TableData: TableProps[];
}

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
  const [editData, setEditData] = useState<TableProps>({
    index: 0,
    id: 0,
    uuid: "",
    taskname: "",
    tasktype: "",
    taskstatus: "",
    taskdescription: "",
    hours_trigger: 0,
    minute_trigger: 0,
    list_weekdays_trigger: [],
    created_at: "",
  });

  const handleConfirmEdit = (data: TableProps) => {
    dispatch(setIsOpenModal(true));
    dispatch(setCurrentMode("edit"));
    dispatch(setConfirmEditData(data));
    setEditMode({ ...editMode, [data.id]: false });
  };

  const handleDelete = (data: TableProps) => {
    dispatch(setCurrentMode(""));
    dispatch(setIsOpenModal(true));
    dispatch(setCurrentMode("delete"));
    dispatch(setCurrentSelection(data));
  };

  const handleEdit = (data: TableProps) => {
    dispatch(setCurrentMode(""));
    dispatch(setCurrentSelection(data));
    setEditData(data);
    setEditMode({ [data.id]: true });
  };

  return (
    <div>
      <table className="w-full text-sm text-left  text-gray-400">
        <thead className="text-xs uppercase  bg-gray-700 text-gray-400">
          <tr>
            <th
              scope="col"
              id="index"
              className="w-2 px-6 py-3 border-gray-500 border hover:cursor-pointer hover:bg-slate-600 hover:text-white"
              onClick={() => handleclickheader("index")}
            >
              <div className="flex place-items-center ">
               
                Index
              </div>
            </th>
            <th
              scope="col"
              id="id"
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
              id="taskname"
              className="hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-32 px-2 py-3 border-gray-500 border"
              onClick={() => handleclickheader("taskname")}
            >
              <div className="flex place-items-center ">
              {(currentSortBy == "taskname" && currentSortDesc) ? <svg aria-labelledby="sortDownIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortDownIconTitle"/><path d="M11 9H17"/><path d="M11 5H19"/><path d="M11 13H15"/><path d="M10 17L7 20L4 17"/><path d="M7 5V19"/></svg> : null}
              {(currentSortBy == "taskname" && !currentSortDesc) ? <svg aria-labelledby="sortUpIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortUpIconTitle"/><path d="M11 16H17"/><path d="M11 20H19"/><path d="M11 12H15"/><path d="M4 8L7 5L10 8"/><path d="M7 20L7 6"/></svg> : null}
                taskname
              </div>
            </th>
            <th
              scope="col"
              id="tasktype"
              className="hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-10 py-2 border-gray-500 border"
              onClick={() => handleclickheader("tasktype")}
            >
              <div className="flex place-items-center ">
              {(currentSortBy == "tasktype" && currentSortDesc) ? <svg aria-labelledby="sortDownIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortDownIconTitle"/><path d="M11 9H17"/><path d="M11 5H19"/><path d="M11 13H15"/><path d="M10 17L7 20L4 17"/><path d="M7 5V19"/></svg> : null}
              {(currentSortBy == "tasktype" && !currentSortDesc) ? <svg aria-labelledby="sortUpIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortUpIconTitle"/><path d="M11 16H17"/><path d="M11 20H19"/><path d="M11 12H15"/><path d="M4 8L7 5L10 8"/><path d="M7 20L7 6"/></svg> : null}
                tasktype
              </div>
            </th>
            <th
              scope="col"
              id="taskstatus"
              className="hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-10 px-2 py-3 border-gray-500 border"
              onClick={() => handleclickheader("taskstatus")}
            >
              <div className="flex place-items-center ">
              {(currentSortBy == "taskstatus" && currentSortDesc) ? <svg aria-labelledby="sortDownIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortDownIconTitle"/><path d="M11 9H17"/><path d="M11 5H19"/><path d="M11 13H15"/><path d="M10 17L7 20L4 17"/><path d="M7 5V19"/></svg> : null}
              {(currentSortBy == "taskstatus" && !currentSortDesc) ? <svg aria-labelledby="sortUpIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortUpIconTitle"/><path d="M11 16H17"/><path d="M11 20H19"/><path d="M11 12H15"/><path d="M4 8L7 5L10 8"/><path d="M7 20L7 6"/></svg> : null}
                taskstatus
              </div>
            </th>
            <th
              scope="col"
              id="taskdescription"
              className="hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-10 px-2 py-3 border-gray-500 border"
              onClick={() => handleclickheader("taskdescription")}
            >
              <div className="flex place-items-center ">
              {(currentSortBy == "taskdescription" && currentSortDesc) ? <svg aria-labelledby="sortDownIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortDownIconTitle"/><path d="M11 9H17"/><path d="M11 5H19"/><path d="M11 13H15"/><path d="M10 17L7 20L4 17"/><path d="M7 5V19"/></svg> : null}
              {(currentSortBy == "taskdescription" && !currentSortDesc) ? <svg aria-labelledby="sortUpIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortUpIconTitle"/><path d="M11 16H17"/><path d="M11 20H19"/><path d="M11 12H15"/><path d="M4 8L7 5L10 8"/><path d="M7 20L7 6"/></svg> : null}
                taskdescription
              </div>
            </th>
            <th
              scope="col"
              id="hours_trigger"
              className="hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-40 px-2 py-3 border-gray-500 border"
              onClick={() => handleclickheader("hours_trigger")}
            >
              <div className="flex place-items-center ">
              {(currentSortBy == "hours_trigger" && currentSortDesc) ? <svg aria-labelledby="sortDownIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortDownIconTitle"/><path d="M11 9H17"/><path d="M11 5H19"/><path d="M11 13H15"/><path d="M10 17L7 20L4 17"/><path d="M7 5V19"/></svg> : null}
              {(currentSortBy == "hours_trigger" && !currentSortDesc) ? <svg aria-labelledby="sortUpIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortUpIconTitle"/><path d="M11 16H17"/><path d="M11 20H19"/><path d="M11 12H15"/><path d="M4 8L7 5L10 8"/><path d="M7 20L7 6"/></svg> : null}
                hours_trigger
              </div>
            </th>
            <th
              scope="col"
              id="minute_trigger"
              className="hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-40 px-2 py-3 border-gray-500 border"
              onClick={() => handleclickheader("minute_trigger")}
            >
              <div className="flex place-items-center ">
              {(currentSortBy == "minute_trigger" && currentSortDesc) ? <svg aria-labelledby="sortDownIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortDownIconTitle"/><path d="M11 9H17"/><path d="M11 5H19"/><path d="M11 13H15"/><path d="M10 17L7 20L4 17"/><path d="M7 5V19"/></svg> : null}
              {(currentSortBy == "minute_trigger" && !currentSortDesc) ? <svg aria-labelledby="sortUpIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortUpIconTitle"/><path d="M11 16H17"/><path d="M11 20H19"/><path d="M11 12H15"/><path d="M4 8L7 5L10 8"/><path d="M7 20L7 6"/></svg> : null}
                minute_trigger
              </div>
            </th>
            <th
              scope="col"
              id="list_weekdays_trigger"
              className="hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-40 px-2 py-3 border-gray-500 border"
              onClick={() => handleclickheader("list_weekdays_trigger")}
            >
              <div className="flex place-items-center ">
              {(currentSortBy == "list_weekdays_trigger" && currentSortDesc) ? <svg aria-labelledby="sortDownIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortDownIconTitle"/><path d="M11 9H17"/><path d="M11 5H19"/><path d="M11 13H15"/><path d="M10 17L7 20L4 17"/><path d="M7 5V19"/></svg> : null}
              {(currentSortBy == "list_weekdays_trigger" && !currentSortDesc) ? <svg aria-labelledby="sortUpIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortUpIconTitle"/><path d="M11 16H17"/><path d="M11 20H19"/><path d="M11 12H15"/><path d="M4 8L7 5L10 8"/><path d="M7 20L7 6"/></svg> : null}
                list_weekdays_trigger
              </div>
            </th>
            <th
              scope="col"
              id="created_at"
              className="hover:text-white hover:cursor-pointer hover:bg-slate-600 min-w-40 px-2 py-3 border-gray-500 border"
              onClick={() => handleclickheader("created_at")}
            >
              <div className="flex place-items-center ">
              {(currentSortBy == "created_at" && currentSortDesc) ? <svg aria-labelledby="sortDownIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortDownIconTitle"/><path d="M11 9H17"/><path d="M11 5H19"/><path d="M11 13H15"/><path d="M10 17L7 20L4 17"/><path d="M7 5V19"/></svg> : null}
              {(currentSortBy == "created_at" && !currentSortDesc) ? <svg aria-labelledby="sortUpIconTitle" color="#befaf8" fill="none" height="24px" stroke="#befaf8" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg"><title id="sortUpIconTitle"/><path d="M11 16H17"/><path d="M11 20H19"/><path d="M11 12H15"/><path d="M4 8L7 5L10 8"/><path d="M7 20L7 6"/></svg> : null}
                created_at
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
              <td className="min-w-52 px-2 py-4 border-gray-500 border">
                {editMode[task.id] ? (
                  <input
                    type="text"
                    value={editData.taskname}
                    onChange={(e) =>
                      setEditData({ ...editData, taskname: e.target.value })
                    }
                    className="text-black w-full px-2 py-1 border rounded-md"
                  />
                ) : (
                  task.taskname
                )}
              </td>
              <td className={`min-w-52 px-2 py-4 border-gray-500 border `}>
                {editMode[task.id] ? (
                  <select
                    value={editData.tasktype}
                    onChange={(e) =>
                      setEditData({ ...editData, tasktype: e.target.value })
                    }
                    className="text-black w-full px-2 py-1 border rounded-md"
                  >
                    <option value="getjobsCount">getjobsCount</option>
                    <option value="getjobsDetails">getjobsDetails</option>
                    <option value="getjobsSuperDetails">getjobsSuperDetails</option>
                  </select>
                ) : (
                  task.tasktype
                )}
              </td>
              <td className={`min-w-20 px-2 py-4 border-gray-500 border `}>
                {editMode[task.id] ? (
                  <select

                    value={editData.taskstatus}
                    onChange={(e) =>
                      setEditData({ ...editData, taskstatus: e.target.value })
                    }
                    className="text-black w-full px-2 py-1 border rounded-md"
                  >
                    <option value="Active">Active</option>
                    <option value="Deactive">Deactive</option>
                  </select>
                ) : (
                  task.taskstatus
                )}
              </td>
              <td className="px-2 py-4 border-gray-500 border ">
                {editMode[task.id] ? (
                  <textarea
                    value={editData.taskdescription}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        taskdescription: e.target.value,
                      })
                    }
                    className="text-black w-full px-2 py-1 border rounded-md"
                  />
                ) : (
                  task.taskdescription
                )}
              </td>
              <td className={`min-w-20 px-2 py-4 border-gray-500 border`}>
                {editMode[task.id] ? (
                  <select
                    value={editData.hours_trigger}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        hours_trigger: parseInt(e.target.value, 10),
                      })
                    }
                    className="text-black w-full px-2 py-1 border rounded-md"
                  >
                    {Array.from({ length: 24 }, (_, i) => i + 1).map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                ) : (
                  task.hours_trigger
                )}
              </td>
              <td className={`min-w-20 px-2 py-4 border-gray-500 border`}>
                {editMode[task.id] ? (
                  <select
                    value={editData.minute_trigger}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        minute_trigger: parseInt(e.target.value, 10),
                      })
                    }
                    className="text-black w-full px-2 py-1 border rounded-md"
                  >
                    {Array.from({ length: 59 }, (_, i) => i + 1).map(
                      (minute) => (
                        <option key={minute} value={minute}>
                          {minute}
                        </option>
                      )
                    )}
                  </select>
                ) : (
                  task.minute_trigger
                )}
              </td>
              <td className={`min-w-20 px-2 py-4 border-gray-500 border`}>
                {editMode[task.id] ? (
                  <select
                    multiple
                    value={editData.list_weekdays_trigger}
                    onChange={(e) => {
                      const selectedOptions = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      );
                      const newSelection = [...editData.list_weekdays_trigger];

                      selectedOptions.forEach((option) => {
                        const index = newSelection.indexOf(option);
                        if (index > -1) {
                          // Remove the option if it's already selected
                          newSelection.splice(index, 1);
                        } else {
                          // Add the option if it's not selected
                          newSelection.push(option);
                        }
                      });

                      setEditData({
                        ...editData,
                        list_weekdays_trigger: newSelection,
                      });
                    }}
                    className="text-black w-full px-2 py-1 border rounded-md"
                  >
                    {weekdays.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                ) : (
                  task.list_weekdays_trigger.join(", ")
                )}
              </td>
              <td className="px-2 py-4 border-gray-500 border ">
                {task.created_at}
              </td>
              <td className="min-w-20 px-2 py-4 flex items-center">
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
                          id: 0,
                          uuid: "",
                          taskname: "",
                          tasktype: "",
                          taskstatus: "",
                          taskdescription: "",
                          hours_trigger: 0,
                          minute_trigger: 0,
                          list_weekdays_trigger: [],
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
