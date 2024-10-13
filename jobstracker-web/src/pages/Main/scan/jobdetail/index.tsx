import React, { useEffect } from "react";
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const MockupJsonData = {
    "job_details": "Required skills : Node.js / Typescript / restful api and web sockets. Data integrity concepts. Basic knowledge of microservices. Data structures.Higher consideration for candidate skilled : blockchain, golang, redis, lua, AWS, Kafka, DockerExperienced with Node.js,TypeScript more than 2 years or above with higher skill related inExperienced integrating with API, SocketIOGood spoken English is a plus.***New graduate with high programming skill are welcome***",
    "job_details_pretty": "Here is the simplified text:\n\nRequired skills:\n\n* Node.js\n* Typescript\n* Restful APIs and WebSockets\n* Data integrity concepts\n* Basic knowledge of microservices\n* Data structures\n\nHigher consideration for candidate skilled in:\n\n* Blockchain\n* Golang\n* Redis\n* Lua\n* AWS\n* Kafka\n* Docker\n\nExperience with Node.js, TypeScript: more than 2 years or above.\n\nGood spoken English is a plus.\nNew graduates with high programming skills are welcome."
};

const Detail: React.FC = () => {
    // const paragraphs = MockupJsonData.job_details.split("\n\n");

    const Scan = useSelector((state: RootState) => state.scan);
    const [detailData, setDetailData] = React.useState([]);
    const [isPretty, setIsPretty] = React.useState(false);

    useEffect(() => {
        setIsPretty(false);
        if (Scan.currentSelection.superDetail != undefined) {
            if (Scan.currentSelection.superDetail.job_details != undefined) {
                setDetailData(Scan.currentSelection.superDetail.job_details.split("\n\n"));
            } else {
                setDetailData(["invalid data"]);
            }
        }
    }, [Scan.currentSelection.superDetail]);
    
    const handleprettystate = (e) => {
        const MockupJsonData = Scan.currentSelection.superDetail;
        if (e.target.id === "prettytext" && !isPretty) {
            setIsPretty(true);
            if (MockupJsonData.job_details_pretty != undefined) {
                setDetailData(MockupJsonData.job_details_pretty.split("\n\n"));
            } else {
                setDetailData(["กด เพื่อ Generate สำหรับ Pretty Text"]);
            }
            // setDetailData(MockupJsonData.job_details_pretty.split("\n\n"));
        } else if (e.target.id === "rawtext" && isPretty) {
            setIsPretty(false);
            if (MockupJsonData.job_details != undefined) {
                setDetailData(MockupJsonData.job_details.split("\n\n"));
            } else {
                setDetailData(["invalid data"]);
            }
            
        }
    };

  return (
    <div
      className="px-2 bg-slate-600 w-3/5 overflow-auto sticky top-16 shadow"
      style={{ height: `calc(100vh - 64px)` }}
    >
        <div className="bg-green-200 h-[60px] flex justify-center">
            <div onClick={handleprettystate} id="rawtext" className={`bg-purple-300 w-full h-[60px]  flex items-center justify-center ` + (!isPretty ? "shadow-black shadow-inner" : "hover:cursor-pointer")}>
                Raw Text
            </div>
            <div onClick={handleprettystate} id="prettytext" className={`bg-yellow-200 w-full h-[60px] flex items-center justify-center ` + (isPretty ? "shadow-black shadow-inner": "hover:cursor-pointer")}>
                Pretty Text
            </div>
        </div>
      <div className="bg-gray-800 text-gray-300 p-4" style={{ minHeight: `calc(100vh - 124px)` }}>
        <h2 className="text-xl font-bold mb-4">Job Details</h2>
        {detailData.map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Detail;