
import Card from './../components/cards';
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsOpenModal,
  setTotalsData,
  setLoadingState,
  setTableData,
  setQueryData,
  setCurrentSelection,
} from "@/slices/scan";
import { RootState } from '@/store';
import config from "@/config";
import { jsonToQueryString } from "@/function/jsonToQueryString";

type queryData = {
    page: number;
    pagesize: number;
    sorting?: sort;
    jobid?: number;
};

type sort = {
    sortBy: string;
    sortOrder: string;
  };

const Joblists: React.FC = () => {
    const dispatch = useDispatch();
    const Scan = useSelector((state: RootState) => state.scan);
    const abortControllerRef = useRef<AbortController | null>(null);
    const [oldqueryData, setOldQueryData] = useState<queryData>({
        page: 0,
        pagesize: 0,
        sorting: {
          sortBy: "ID",
          sortOrder: "desc",
        },
        jobid: 0,
    });
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();


    const handleFetchJobScan = (abortController) => {
        // Abort the previous request if it exists

        const newqueryData = { ...Scan.queryData };
        searchParams.forEach((value, key) => {
          if (key === "page" || key === "pagesize" || key === "jobid") {
            newqueryData[key] = parseInt(value);
          }
        });
        
        if (oldqueryData.page !== newqueryData.page || oldqueryData.pagesize !== newqueryData.pagesize) {
            dispatch(setQueryData(newqueryData));
        
            fetch(
              `${config.APIURL}/api/jobscan?${jsonToQueryString(newqueryData)}`,
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
                console.log(data);
                dispatch(setTableData(data.data));
                dispatch(setTotalsData(data.totals));
                dispatch(setLoadingState({ loading: false, error: null }));
              })
              .catch((error) => {
                dispatch(setLoadingState({ loading: false, error }));
              });
        }
        if (oldqueryData.jobid !== newqueryData.jobid) {
            dispatch(setQueryData(newqueryData));
        
            fetch(
              `${config.APIURL}/api/jobscan/${newqueryData.jobid}`,
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
                  data.data = {};
                }
                const CurrentSelectionUpdate = {...Scan.currentSelection, superDetail:data.data };
                CurrentSelectionUpdate.id = newqueryData.jobid;
                dispatch(setCurrentSelection(CurrentSelectionUpdate));
                // dispatch(setTableData(data.data));
                dispatch(setLoadingState({ loading: false, error: null }));
              })
              .catch((error) => {
                dispatch(setLoadingState({ loading: false, error }));
              });
        }

      };
    
      useEffect(() => {
        const abortController = new AbortController();
        abortControllerRef.current = abortController;
    
        handleFetchJobScan(abortController);
        return () => {
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }
        };
      }, [location.search]); // Empty dependency array means this effect runs once on mount

      const handleSelectCard = (Data) => {
        // console.log(id);
        setOldQueryData(Scan.queryData);
        const UpdateQueryData = {
            ...Scan.queryData,
            jobid: Data.id,
            };

        dispatch(setCurrentSelection(Data));
        dispatch(setQueryData(UpdateQueryData));
        navigate(`${location.pathname}?${jsonToQueryString(UpdateQueryData)}`);
    }

    return (
        <div className="w-2/5">
            {Scan.tableData.map((data, index) => {
                return (
                    <>
                    <Card
                        Key={index}
                        Data={data}
                        handleSelectCard={handleSelectCard}
                    />
                    </>
                );
            })}
        </div>
    );
};

export default Joblists;