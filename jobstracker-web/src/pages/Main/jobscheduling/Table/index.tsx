import React, { useState, useEffect, useRef } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import Filter from "./Filter";
import PageSelect from "./PageSelect";
import ShowingData from "./showData";
import config from "@/config";
import { CSSTransition } from "react-transition-group";
import "./transitions.css"; // Import the CSS file for transitions
import { jsonToQueryString } from "@/function/jsonToQueryString";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsOpenModal,
  setTotalsData,
  setLoadingState,
  setTableData,
  setQueryData,
} from "@/slices/jobscheduling";
import { RootState } from "@/store";
import Modal from "@/components/modals/modals";
import { DeleteModal, EditModal, InputForm } from "./showData/modal";

const Table: React.FC = () => {
  const dispatch = useDispatch();
  const Jobscheduling = useSelector((state: RootState) => state.jobscheduling);
  const abortControllerRef = useRef<AbortController | null>(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handlenextpage = () => {
    if (
      Jobscheduling.queryData.page * Jobscheduling.queryData.pagesize >=
      Jobscheduling.totalsData
    ) {
      return;
    }
    const UpdateQueryData = {
      ...Jobscheduling.queryData,
      page: Jobscheduling.queryData.page + 1,
    };

    dispatch(setQueryData(UpdateQueryData));
    // updatelocation
    navigate(`${location.pathname}?${jsonToQueryString(UpdateQueryData)}`);
  };

  const handleprevpage = () => {
    if (Jobscheduling.queryData.page === 1) {
      return;
    }
    const UpdateQueryData = {
      ...Jobscheduling.queryData,
      page: Jobscheduling.queryData.page - 1,
    };
    dispatch(setQueryData(UpdateQueryData));

    // updatelocation
    navigate(`${location.pathname}?${jsonToQueryString(UpdateQueryData)}`);
  };

  const handleFetchJobscheduling = (abortController) => {
    // Abort the previous request if it exists

    const newqueryData = { ...Jobscheduling.queryData };
    searchParams.forEach((value, key) => {
      console.log(key, value);
      if (key === "page" || key === "pagesize") {
        newqueryData[key] = parseInt(value);
      }
    });
    dispatch(setQueryData(newqueryData));

    fetch(
      `${config.APIURL}/api/jobscheduling?${jsonToQueryString(newqueryData)}`,
      { signal: abortController.signal }
    )
      .then((response) => {
        dispatch(setLoadingState({ loading: true, error: null }));
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.data === null) {
          data.data = [];
        }
        dispatch(setTableData(data.data));
        dispatch(setTotalsData(data.totals));
        dispatch(setLoadingState({ loading: false, error: null }));
      })
      .catch((error) => {
        dispatch(setLoadingState({ loading: false, error }));
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    handleFetchJobscheduling(abortController);
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [location.search]); // Empty dependency array means this effect runs once on mount

  return (
    <div className="text-slate-300  shadow-md sm:rounded-lg bg-gray-800 border-gray-500 border">
      <Modal
        isOpen={Jobscheduling.isOpenModal}
        setIsOpen={(isOpen) => dispatch(setIsOpenModal(isOpen))}
      >
        {Jobscheduling.currentMode == "delete" ? <DeleteModal /> : null}
        {Jobscheduling.currentMode == "edit" ? <EditModal /> : null}
        {Jobscheduling.currentMode == "add" ? <InputForm /> : null}
      </Modal>
      <Filter />
      <div
        className="relative overflow-auto min-h-40"
        style={{
          height: `calc(${100}vh - 278px)`, // Example calculation
        }}
      >
        <CSSTransition
          in={
            Jobscheduling.loadingState.loading ||
            Jobscheduling.loadingState.error != null
          }
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <div
            className="bg-white bg-opacity-70 z-50 flex items-center justify-center max-w-7xl min-w-sm "
            style={{
              height: `calc(${100}vh - 358px)`, // Example calculation
            }}
          >
            {Jobscheduling.loadingState.loading ? (
              <div className="spinner"></div>
            ) : (
              Jobscheduling.loadingState.error != null && (
                <div className="font-bold text-lg text-red-500">
                  ERROR Unable to load data
                </div>
              )
            )}
          </div>
        </CSSTransition>
        <CSSTransition
          in={
            !Jobscheduling.loadingState.loading &&
            Jobscheduling.loadingState.error == null
          }
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <ShowingData TableData={Jobscheduling.tableData} />
        </CSSTransition>
        <CSSTransition
          in={Jobscheduling.tableData.length === 0}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <div
            className="bg-opacity-90 z-50 flex items-center justify-center max-w-7xl min-w-sm "
            style={{
              height: `calc(${100}vh - 358px)`, // Example calculation
            }}
          >
            <div className="font-bold text-lg text-red-500">No data found</div>
          </div>
        </CSSTransition>
      </div>
      <PageSelect
        handlenextpage={handlenextpage}
        handleprevpage={handleprevpage}
        page={Jobscheduling.queryData.page}
        pagesize={Jobscheduling.queryData.pagesize}
        totals={Jobscheduling.totalsData}
      />
    </div>
  );
};

export default Table;
