import React, { useState, useEffect, useRef } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import Filter from "./Filter";
import PageSelect from "./PageSelect";
import ShowingData from "./showData";
import config from "@/config";
import { CSSTransition } from "react-transition-group";
import "./transitions.css"; // Import the CSS file for transitions
import { jsonToQueryString } from "@/function/jsonToQueryString";
import Modal from "@/components/modals/modals";
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsOpenModal,
  setTotalsData,
  setLoadingState,
  setTableData,
  setQueryData,
} from "@/slices/jobscrapelist";
import { RootState } from '@/store';
import { DeleteModal, EditModal, InputForm } from "./showData/modal";

const Table: React.FC = () => {
  const dispatch = useDispatch();
  const Jobscrapelist = useSelector((state: RootState) => state.jobscrapelist);
  const abortControllerRef = useRef<AbortController | null>(null);

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handlenextpage = () => {
    if (
      Jobscrapelist.queryData.page * Jobscrapelist.queryData.pagesize >=
      Jobscrapelist.totalsData
    ) {
      return;
    }
    const UpdateQueryData = {
      ...Jobscrapelist.queryData,
      page: Jobscrapelist.queryData.page + 1,
    };

    dispatch(setQueryData(UpdateQueryData));
    // updatelocation
    navigate(`${location.pathname}?${jsonToQueryString(UpdateQueryData)}`);
  };

  const handleprevpage = () => {
    if (Jobscrapelist.queryData.page === 1) {
      return;
    }
    const UpdateQueryData = {
      ...Jobscrapelist.queryData,
      page: Jobscrapelist.queryData.page - 1,
    };
    dispatch(setQueryData(UpdateQueryData));

    // updatelocation
    navigate(`${location.pathname}?${jsonToQueryString(UpdateQueryData)}`);
  };

  const handleFetchJobscrapelist = (abortController) => {
    // Abort the previous request if it exists

    const newqueryData = { ...Jobscrapelist.queryData };
    searchParams.forEach((value, key) => {
      console.log(key, value);
      if (key === "page" || key === "pagesize") {
        newqueryData[key] = parseInt(value);
      }
    });
    dispatch(setQueryData(newqueryData));

    fetch(
      `${config.APIURL}/api/jobscrapelist?${jsonToQueryString(newqueryData)}`,
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

    handleFetchJobscrapelist(abortController);
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [location.search]); // Empty dependency array means this effect runs once on mount

  return (
    <div className="text-slate-300  shadow-md sm:rounded-lg bg-gray-800 border-gray-500 border">
      <Modal
        isOpen={Jobscrapelist.isOpenModal}
        setIsOpen={(isOpen) => dispatch(setIsOpenModal(isOpen))}
      >
        {Jobscrapelist.currentMode == "delete" ? <DeleteModal /> : null}
        {Jobscrapelist.currentMode == "edit" ? <EditModal /> : null}
        {Jobscrapelist.currentMode == "add" ? <InputForm /> : null}
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
            Jobscrapelist.loadingState.loading ||
            Jobscrapelist.loadingState.error != null
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
            {Jobscrapelist.loadingState.loading ? (
              <div className="spinner"></div>
            ) : (
              Jobscrapelist.loadingState.error != null && (
                <div className="font-bold text-lg text-red-500">
                  ERROR Unable to load data
                </div>
              )
            )}
          </div>
        </CSSTransition>
        <CSSTransition
          in={
            !Jobscrapelist.loadingState.loading &&
            Jobscrapelist.loadingState.error == null
          }
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <ShowingData TableData={Jobscrapelist.tableData} />
        </CSSTransition>
        <CSSTransition
          in={Jobscrapelist.tableData.length === 0}
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
        page={Jobscrapelist.queryData.page}
        pagesize={Jobscrapelist.queryData.pagesize}
        totals={Jobscrapelist.totalsData}
      />
    </div>
  );
};

export default Table;
