import { setCurrentMode, setIsOpenModal } from "@/slices/jobscrapelist";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import config from "@/config";

export const DeleteModal: React.FC = () => {
  const dispatch = useDispatch();
  const Jobscrapelist = useSelector((state: RootState) => state.jobscrapelist);

  const handleSubmitDelete = () => {
    // Handle the edit submission logic here
    const payload = {
      id: Jobscrapelist.currentSelection.id,
      uuid: Jobscrapelist.currentSelection.uuid,
    };

    fetch(`${config.APIURL}/api/jobscrapelist/`, {
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
    <div className="w-[488px] p-6 h-40">
      <div>
        <div className="pt-8 text-lg font-bold px-5">
          Do you want to delete this job?
        </div>
        <div className="pt-4 px-5">
          Job name: {Jobscrapelist.currentSelection.jobname}
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
          className="mt-2 py-2 px-4 border-yellow-500 border-2 rounded-lg text-white bg-red-500 hover:cursor-pointer hover:bg-red-400">
            DELETE
        </button>
      </div>
    </div>
  );
};

export const EditModal: React.FC = () => {
  const dispatch = useDispatch();
  const Jobscrapelist = useSelector((state: RootState) => state.jobscrapelist);

  const handleSubmitEdit = () => {
    // dispatch(editJob(Jobscrapelist.confirmEditData));
    console.log(Jobscrapelist.confirmEditData);
    const payload = {
      id: Jobscrapelist.confirmEditData.id,
      uuid: Jobscrapelist.confirmEditData.uuid,
      jobname: Jobscrapelist.confirmEditData.jobname,
      getjobsCount: Jobscrapelist.confirmEditData.getjobsCount,
      getjobsDetails: Jobscrapelist.confirmEditData.getjobsDetails,
    };

    fetch(`${config.APIURL}/api/jobscrapelist`, {
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
    <div className="w-[488px] h-80">
      <div>
        <div className="pt-8 text-lg font-bold px-5">
          Do you want to Edit this job?
        </div>
        <div className="pt-4 px-5">
          <div className="flex justify-between py-2">
            <span className="font-bold">Job name:</span>
            <span
              className={`ml-4 ${
                Jobscrapelist.currentSelection.jobname !==
                Jobscrapelist.confirmEditData.jobname
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {Jobscrapelist.currentSelection.jobname !==
              Jobscrapelist.confirmEditData.jobname ? (
                <>
                  <span className="line-through">
                    {Jobscrapelist.currentSelection.jobname}
                  </span>{" "}
                  <span>{Jobscrapelist.confirmEditData.jobname}</span>
                </>
              ) : (
                <span>{Jobscrapelist.currentSelection.jobname}</span>
              )}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">Get Jobs Count:</span>
            <span
              className={`ml-4 ${
                Jobscrapelist.currentSelection.getjobsCount !==
                Jobscrapelist.confirmEditData.getjobsCount
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {Jobscrapelist.currentSelection.getjobsCount !==
              Jobscrapelist.confirmEditData.getjobsCount ? (
                <>
                  <span className="line-through">
                    {Jobscrapelist.currentSelection.getjobsCount ? "Yes" : "No"}
                  </span>{" "}
                  <span>
                    {Jobscrapelist.confirmEditData.getjobsCount ? "Yes" : "No"}
                  </span>
                </>
              ) : (
                <span>
                  {Jobscrapelist.currentSelection.getjobsCount ? "Yes" : "No"}
                </span>
              )}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">Get Jobs Details:</span>
            <span
              className={`ml-4 ${
                Jobscrapelist.currentSelection.getjobsDetails !==
                Jobscrapelist.confirmEditData.getjobsDetails
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {Jobscrapelist.currentSelection.getjobsDetails !==
              Jobscrapelist.confirmEditData.getjobsDetails ? (
                <>
                  <span className="line-through">
                    {Jobscrapelist.currentSelection.getjobsDetails
                      ? "Yes"
                      : "No"}
                  </span>{" "}
                  <span>
                    {Jobscrapelist.confirmEditData.getjobsDetails
                      ? "Yes"
                      : "No"}
                  </span>
                </>
              ) : (
                <span>
                  {Jobscrapelist.currentSelection.getjobsDetails ? "Yes" : "No"}
                </span>
              )}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">Get Jobs Super Details:</span>
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
  formData: {
    jobname: string;
    getjobsCount: boolean;
    getjobsDetails: boolean;
  };
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AddModalProps {
  formData: {
    jobname: string;
    getjobsCount: boolean;
    getjobsDetails: boolean;
  };
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddModal: React.FC<AddModalProps> = ({
  formData,
  setShowConfirmModal,
}) => {
  const dispatch = useDispatch();

  const handleSubmitAdd = () => {
    // Handle the edit submission logic here
    const payload = {
      jobname: formData.jobname,
      getjobsCount: formData.getjobsCount,
      getjobsDetails: formData.getjobsDetails,
    };

    fetch(`${config.APIURL}/api/jobscrapelist/`, {
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
    <div className="w-[488px] h-80">
      <div>
        <div className="text-2xl font-bold pb-5 text-blue-400">Do you want to Add this job?</div>
        <div className="pt-4 px-5">
          <div className="flex justify-between py-2">
            <span className="font-bold">Job name:</span>
            <span className="ml-4 text-green-500">{formData.jobname}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">Get Jobs Count:</span>
            <span className="ml-4 text-green-500">
              {formData.getjobsCount ? "Yes" : "No"}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold">Get Jobs Details:</span>
            <span className="ml-4 text-green-500">
              {formData.getjobsDetails ? "Yes" : "No"}
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
          onClick={handleSubmitAdd}
          className="mt-2 py-2 px-4 border-white border-2 rounded-lg text-white bg-blue-500 hover:cursor-pointer hover:bg-red-400"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export const InputForm: React.FC = () => {
  const [listnotempty, setListNotEmpty] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    jobname: "",
    getjobsCount: false,
    getjobsDetails: false,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const listnotempty = [];
    if (formData.jobname === "") {
      listnotempty.push("jobname");
    }

    if (listnotempty.length > 0) {
      setListNotEmpty(listnotempty);
      return;
    }

    setShowConfirmModal(true);
  };

  return (
    <div className="sm:w-[280px] md:w-[488px] h-full m-6 bg-slate-800 rounded-lg">
      {showConfirmModal ? (
        <AddModal
          formData={formData}
          setShowConfirmModal={setShowConfirmModal}
        />
      ) : (
        <>
        <div className="text-2xl font-bold pb-5 text-blue-400">Add Job Name to scrape</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Job Name:</label>
            <input
              type="text"
              name="jobname"
              value={formData.jobname}
              onChange={handleChange}
              className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white ${
                listnotempty.includes("jobname") && "border-red-500"
              } `}
            />
            {listnotempty.includes("jobname") ? (
              <label className="font-semibold text-red-400">
                This field cannot be empty
              </label>
            ) : null}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="getjobsCount"
              checked={formData.getjobsCount}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="font-semibold">Get Jobs Count</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="getjobsDetails"
              checked={formData.getjobsDetails}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="font-semibold">Get Jobs Details</label>
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
