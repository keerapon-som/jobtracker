import { setCurrentMode, setIsOpenModal } from "@/slices/jobscheduling";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import config from "@/config";
import { useState } from "react";

export const DeleteModal: React.FC = () => {
  const dispatch = useDispatch();
  const jobscheduling = useSelector((state: RootState) => state.jobscheduling);

  const handleSubmitDelete = () => {
    // Handle the edit submission logic here
    const payload = {
      id: jobscheduling.currentSelection.id,
      uuid: jobscheduling.currentSelection.uuid,
    };

    fetch(`${config.APIURL}/api/jobscheduling/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        dispatch(setIsOpenModal(false));
        dispatch(setCurrentMode(""));
        return response.json();
      })
      .then((data) => {
        if (data.data === null) {
          data.data = [];
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-[512px] h-40">
      <div>
        <div className="pt-8 text-lg font-bold px-5">
          Do you want to delete this task?
        </div>
        <div className="pt-4 px-5">
          Task name: {jobscheduling.currentSelection.taskname}
        </div>
      </div>
      <div className="justify-end flex mr-4">
        <button
          onClick={() => {
            dispatch(setIsOpenModal(false));
            dispatch(setCurrentMode(""));
          }}
          className="mt-2 mr-2 py-2 px-4 border rounded-lg hover:bg-slate-700 hover:cursor-pointer"
        >
          CANCEL
        </button>
        <button
          onClick={handleSubmitDelete}
          className="mt-2 py-2 px-4 border-yellow-500 border-2 rounded-lg text-white bg-red-500 hover:cursor-pointer hover:bg-red-400"
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export const EditModal: React.FC = () => {
  const dispatch = useDispatch();
  const Jobscheduling = useSelector((state: RootState) => state.jobscheduling);

  const handleSubmitEdit = () => {
    // dispatch(editJob(Jobscrapelist.confirmEditData));
    console.log(Jobscheduling.confirmEditData);
    const payload = {
      id: Jobscheduling.confirmEditData.id,
      uuid: Jobscheduling.confirmEditData.uuid,
      taskname: Jobscheduling.confirmEditData.taskname,
      tasktype: Jobscheduling.confirmEditData.tasktype,
      taskstatus: Jobscheduling.confirmEditData.taskstatus,
      taskdescription: Jobscheduling.confirmEditData.taskdescription,
      hours_trigger: Jobscheduling.confirmEditData.hours_trigger,
      minute_trigger: Jobscheduling.confirmEditData.minute_trigger,
      list_weekdays_trigger:
        Jobscheduling.confirmEditData.list_weekdays_trigger,
    };

    fetch(`${config.APIURL}/api/jobscheduling`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        //   setStateLoadData({ loading: true, error: null });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        dispatch(setIsOpenModal(false));
        dispatch(setCurrentMode(""));
        return response.json();
      })
      .then((data) => {
        if (data.data === null) {
          data.data = [];
        }
        //   setTableData(data.data);
        //   setTotalsData(data.totals);
        //   setStateLoadData({ loading: false, error: null });
      })
      .catch((error) => {
        //   setStateLoadData({ loading: false, error });
      });
  };

  return (
    <div className="w-[512px] h-[450px]">
      <div>
        <div className="pt-8 text-lg font-bold px-5">
          Do you want to Edit this task?
        </div>
        <div className="pt-4 px-5">
          <div className="flex justify-between py-2">
            <span className="font-bold">task name:</span>
            <span
              className={`ml-4 ${
                Jobscheduling.currentSelection.taskname !==
                Jobscheduling.confirmEditData.taskname
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {Jobscheduling.currentSelection.taskname !==
              Jobscheduling.confirmEditData.taskname ? (
                <>
                  <span className="line-through">
                    {Jobscheduling.currentSelection.taskname}
                  </span>{" "}
                  <span>{Jobscheduling.confirmEditData.taskname}</span>
                </>
              ) : (
                <span>{Jobscheduling.currentSelection.taskname}</span>
              )}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">task type:</span>
            <span
              className={`ml-4 ${
                Jobscheduling.currentSelection.tasktype !==
                Jobscheduling.confirmEditData.tasktype
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {Jobscheduling.currentSelection.tasktype !==
              Jobscheduling.confirmEditData.tasktype ? (
                <>
                  <span className="line-through">
                    {Jobscheduling.currentSelection.tasktype}
                  </span>{" "}
                  <span>{Jobscheduling.confirmEditData.tasktype}</span>
                </>
              ) : (
                <span>{Jobscheduling.currentSelection.tasktype}</span>
              )}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">task status:</span>
            <span
              className={`ml-4 ${
                Jobscheduling.currentSelection.taskstatus !==
                Jobscheduling.confirmEditData.taskstatus
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {Jobscheduling.currentSelection.taskstatus !==
              Jobscheduling.confirmEditData.taskstatus ? (
                <>
                  <span className="line-through">
                    {Jobscheduling.currentSelection.taskstatus}
                  </span>{" "}
                  <span>{Jobscheduling.confirmEditData.taskstatus}</span>
                </>
              ) : (
                <span>{Jobscheduling.currentSelection.taskstatus}</span>
              )}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">task description:</span>
            <span
              className={`ml-4 ${
                Jobscheduling.currentSelection.taskdescription !==
                Jobscheduling.confirmEditData.taskdescription
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {Jobscheduling.currentSelection.taskdescription !==
              Jobscheduling.confirmEditData.taskdescription ? (
                <>
                  <span className="line-through">
                    {Jobscheduling.currentSelection.taskdescription}
                  </span>{" "}
                  <span>{Jobscheduling.confirmEditData.taskdescription}</span>
                </>
              ) : (
                <span>{Jobscheduling.currentSelection.taskdescription}</span>
              )}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">hours trigger:</span>
            <span
              className={`ml-4 ${
                Jobscheduling.currentSelection.hours_trigger !==
                Jobscheduling.confirmEditData.hours_trigger
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {Jobscheduling.currentSelection.hours_trigger !==
              Jobscheduling.confirmEditData.hours_trigger ? (
                <>
                  <span className="line-through">
                    {Jobscheduling.currentSelection.hours_trigger}
                  </span>{" "}
                  <span>{Jobscheduling.confirmEditData.hours_trigger}</span>
                </>
              ) : (
                <span>{Jobscheduling.currentSelection.hours_trigger}</span>
              )}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">minute trigger:</span>
            <span
              className={`ml-4 ${
                Jobscheduling.currentSelection.minute_trigger !==
                Jobscheduling.confirmEditData.minute_trigger
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {Jobscheduling.currentSelection.minute_trigger !==
              Jobscheduling.confirmEditData.minute_trigger ? (
                <>
                  <span className="line-through">
                    {Jobscheduling.currentSelection.minute_trigger}
                  </span>{" "}
                  <span>{Jobscheduling.confirmEditData.minute_trigger}</span>
                </>
              ) : (
                <span>{Jobscheduling.currentSelection.minute_trigger}</span>
              )}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">list weekdays trigger:</span>
            <span
              className={`ml-4 ${
                Jobscheduling.currentSelection.list_weekdays_trigger !==
                Jobscheduling.confirmEditData.list_weekdays_trigger
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {Jobscheduling.currentSelection.list_weekdays_trigger !==
              Jobscheduling.confirmEditData.list_weekdays_trigger ? (
                <>
                  <span className="line-through">
                    {Jobscheduling.currentSelection.list_weekdays_trigger}
                  </span>{" "}
                  <span>
                    {Jobscheduling.confirmEditData.list_weekdays_trigger}
                  </span>
                </>
              ) : (
                <span>
                  {Jobscheduling.currentSelection.list_weekdays_trigger}
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="justify-end flex mr-4">
        <button
          onClick={() => {
            dispatch(setIsOpenModal(false));
            dispatch(setCurrentMode(""));
          }}
          className="mt-2 mr-2 py-2 px-4 border rounded-lg hover:bg-slate-700 hover:cursor-pointer"
        >
          CANCEL
        </button>
        <button
          onClick={handleSubmitEdit}
          className="mt-2 py-2 px-4 border-white border-2 rounded-lg text-white bg-blue-500 hover:cursor-pointer hover:bg-red-400"
        >
          EDIT
        </button>
      </div>
    </div>
  );
};

interface AddModalProps {
  formData: any;
  setShowConfirmModal: (show: boolean) => void;
}

export const AddModal: React.FC<AddModalProps> = ({
  formData,
  setShowConfirmModal,
}) => {
  const dispatch = useDispatch();

  const handleSubmitAdd = () => {
    const payload = {
      taskname: formData.taskname,
      tasktype: formData.tasktype,
      taskstatus: formData.taskstatus,
      taskdescription: formData.taskdescription,
      hours_trigger: formData.hours_trigger,
      minute_trigger: formData.minute_trigger,
      list_weekdays_trigger: formData.list_weekdays_trigger,
    };

    fetch(`${config.APIURL}/api/jobscheduling`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        dispatch(setIsOpenModal(false));
        dispatch(setCurrentMode(""));
        return response.json();
      })
      .then((data) => {
        if (data.data === null) {
          data.data = [];
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-[512px] h-[450px]">
      <div>
        <div className="text-2xl font-bold pb-5 text-blue-400">
          Do you want to Add this task?
        </div>
        <div className="pt-4 px-5">
          <div className="flex justify-between py-2">
            <span className="font-bold">task name:</span>
            <span className="ml-4">{formData.taskname}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">task type:</span>
            <span className="ml-4">{formData.tasktype}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">task status:</span>
            <span className="ml-4">{formData.taskstatus}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">task description:</span>
            <span className="ml-4">{formData.taskdescription}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">hours trigger:</span>
            <span className="ml-4">{formData.hours_trigger}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">minute trigger:</span>
            <span className="ml-4">{formData.minute_trigger}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">list weekdays trigger:</span>
            <span className="ml-4">
              {formData.list_weekdays_trigger.join(", ")}
            </span>
          </div>
        </div>
      </div>
      <div className="justify-end flex mr-4">
        <button
          onClick={() => setShowConfirmModal(false)}
          className="mt-2 mr-2 py-2 px-4 border rounded-lg hover:bg-slate-700 hover:cursor-pointer"
        >
          CANCEL
        </button>
        <button
          onClick={handleSubmitAdd}
          className="mt-2 py-2 px-4 border-white border-2 rounded-lg text-white bg-blue-500 hover:cursor-pointer hover:bg-red-400"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export const InputForm: React.FC = () => {
  const [listnotempty, setListNotEmpty] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    taskname: "",
    tasktype: "getjobsCount",
    taskstatus: "Active",
    taskdescription: "",
    hours_trigger: 1,
    minute_trigger: 1,
    list_weekdays_trigger: [],
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "hours_trigger" || name === "minute_trigger"
          ? parseInt(value, 10)
          : value,
    });
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setFormData((prevFormData) => {
      const newList = prevFormData.list_weekdays_trigger.includes(
        selectedOption
      )
        ? prevFormData.list_weekdays_trigger.filter(
            (day) => day !== selectedOption
          )
        : [...prevFormData.list_weekdays_trigger, selectedOption];
      return { ...prevFormData, list_weekdays_trigger: newList };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    //validate empty fields
    e.preventDefault();
    const listnotempty = [];
    if (formData.taskname === "") {
      listnotempty.push("Task Name");
    }
    if (formData.list_weekdays_trigger.length === 0) {
      listnotempty.push("List Weekdays Trigger");
    }

    if (listnotempty.length > 0) {
      setListNotEmpty(listnotempty);
      return;
    }

    setShowConfirmModal(true);
  };

  return (
    <div className="pt-10  w-[300px] h-[500px] md:w-[512px] md:h-[600px] lg:w-[512px] lg:h-[700px] xl:w-[512px] xl:h-[750px] overflow-auto p-6 bg-slate-800 rounded-lg shadow-md">
      {showConfirmModal ? (
        <AddModal
          formData={formData}
          setShowConfirmModal={setShowConfirmModal}
        />
      ) : (
        <>
          <div className="text-2xl font-bold pb-5 text-blue-400">
            Add Job Schedule
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Task Name:</label>
              <input
                type="text"
                name="taskname"
                value={formData.taskname}
                onChange={handleChange}
                className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white ${
                  listnotempty.includes("Task Name") && "border-red-500"
                }`}
              />
              {listnotempty.includes("Task Name") ? (
                <label className="font-semibold text-red-400">
                  This field cannot be empty
                </label>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Task Type:</label>
              <select
                name="tasktype"
                value={formData.tasktype}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white"
              >
                <option value="getjobsCount">getjobsCount</option>
                <option value="getjobsdetails">getjobsdetails</option>
                <option value="getjobsSuperDetails">getjobsSuperDetails</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Task Status:</label>
              <select
                name="taskstatus"
                value={formData.taskstatus}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white"
              >
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Task Description:</label>
              <textarea
                name="taskdescription"
                value={formData.taskdescription}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white"
                rows={4}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Hours Trigger:</label>
              <select
                name="hours_trigger"
                value={formData.hours_trigger}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white"
              >
                {Array.from({ length: 24 }, (_, i) => i + 1).map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Minute Trigger:</label>
              <select
                name="minute_trigger"
                value={formData.minute_trigger}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white"
              >
                {Array.from({ length: 59 }, (_, i) => i + 1).map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">
                List Weekdays Trigger:
              </label>

              <select
                name="list_weekdays_trigger"
                multiple
                value={formData.list_weekdays_trigger}
                onChange={handleMultiSelectChange}
                className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white ${
                  listnotempty.includes("List Weekdays Trigger") &&
                  "border-red-500"
                }`}
              >
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  )
                )}
              </select>
              {listnotempty.includes("List Weekdays Trigger") ? (
                <label className="font-semibold text-red-400">
                  This field cannot be empty
                </label>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};
