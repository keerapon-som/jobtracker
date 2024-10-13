import React, { useEffect } from "react";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import config from "@/config";
import { setCurrentSelection, setLoadingState } from "@/slices/scan";

const MockupJsonData = {
  job_details:
    "Required skills : Node.js / Typescript / restful api and web sockets. Data integrity concepts. Basic knowledge of microservices. Data structures.Higher consideration for candidate skilled : blockchain, golang, redis, lua, AWS, Kafka, DockerExperienced with Node.js,TypeScript more than 2 years or above with higher skill related inExperienced integrating with API, SocketIOGood spoken English is a plus.***New graduate with high programming skill are welcome***",
  job_details_pretty:
    "Here is the simplified text:\n\nRequired skills:\n\n* Node.js\n* Typescript\n* Restful APIs and WebSockets\n* Data integrity concepts\n* Basic knowledge of microservices\n* Data structures\n\nHigher consideration for candidate skilled in:\n\n* Blockchain\n* Golang\n* Redis\n* Lua\n* AWS\n* Kafka\n* Docker\n\nExperience with Node.js, TypeScript: more than 2 years or above.\n\nGood spoken English is a plus.\nNew graduates with high programming skills are welcome.",
};

const Detail: React.FC = () => {

  const dispatch = useDispatch();
  const CurrentSelection = useSelector((state: RootState) => state.scan.currentSelection);
  const LoadingState = useSelector(
    (state: RootState) => state.scan.loadingState
  );

  const [isPretty, setIsPretty] = React.useState(false);

  //   useEffect(() => {
  //     setIsPretty(false);
  //     if (CurrentSelection.superDetail != undefined) {
  //       if (CurrentSelection.superDetail.job_details != undefined) {
  //         setDetailData(CurrentSelection.superDetail.job_details.split("\n\n"));
  //       } else {
  //         setDetailData(["invalid data"]);
  //       }
  //     }
  //   }, [CurrentSelection.superDetail]);

  const handleprettystate = (e) => {
    if (e.target.id === "prettytext" && !isPretty) {
      setIsPretty(true);
    } else if (e.target.id === "rawtext" && isPretty) {
      setIsPretty(false);
    }
  };

  const handleGeneratePrettyJson = () => {
    dispatch(setLoadingState({ loading: true, error: null }));
    const id = CurrentSelection.id;
    const url = `${config.APIURL}/api/jobscan/${id}`;
    const method = "PATCH";

    fetch(url, {
      method: method,
      // headers: {
      //     'Content-Type': 'application/json',
      // },
      // body: JSON.stringify({ "job_details": CurrentSelection.superDetail.job_details })
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(
            setLoadingState({ loading: false, error: response.statusText })
          );
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(//// เดี๋ยวคิดว่าต้องทำให้ Response กลับมาเลย แต่เข้า State loading แล้ว Stamp state และจัด Message Q ที่หลังบ้านเอา จะไม่ SetCurrentSelect ตรงนี้อีกต่อไป
          setCurrentSelection({
            ...CurrentSelection,
            superDetail: {
              ...CurrentSelection.superDetail,
              job_details_pretty: data.data,
            },
          })
        );
        dispatch(setLoadingState({ loading: false, error: null }));
      })
      .catch((error) => {
        dispatch(setLoadingState({ loading: false, error: error.message }));
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  return (
    <div
      className="px-2 bg-slate-600 w-3/5 overflow-auto sticky top-16 shadow"
      style={{ height: `calc(100vh - 64px)` }}
    >
      <div className="bg-green-200 h-[60px] flex justify-center">
        <div
          onClick={handleprettystate}
          id="rawtext"
          className={
            `bg-purple-300 w-full h-[60px]  flex items-center justify-center ` +
            (!isPretty ? "shadow-black shadow-inner" : "hover:cursor-pointer")
          }
        >
          Raw Text
        </div>
        <div
          onClick={handleprettystate}
          id="prettytext"
          className={
            `bg-yellow-200 w-full h-[60px] flex items-center justify-center ` +
            (isPretty ? "shadow-black shadow-inner" : "hover:cursor-pointer")
          }
        >
          Pretty Text
        </div>
      </div>
      <div
        className="bg-gray-800 text-gray-300 p-4"
        style={{ minHeight: `calc(100vh - 124px)` }}
      >
        {!LoadingState.loading ? (
          <>
            <h2 className="text-xl font-bold mb-4">Job Details</h2>
            {isPretty == true ? (
              <button
                onClick={() => handleGeneratePrettyJson()}
                className="bg-slate-700 h-10 w-60 p-2 border-2 border-gray-300 hover:border-blue-400 hover:cursor-pointer focus:border-4 focus:border-blue-600"
              >
                Generate Pretty text with AI
              </button>
            ) : null}
            {!isPretty
              ? CurrentSelection.superDetail?.job_details
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))
                  : CurrentSelection.superDetail?.job_details_pretty
                  ? CurrentSelection.superDetail.job_details_pretty
                      .split("\n\n")
                      .map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))
                  : <div>Didn't Generate yet, Please Click Generate text</div>}
          </>
        ) : (
          <>
            <div className="bg-gray-400 text-black h-20">Loading naja</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Detail;
