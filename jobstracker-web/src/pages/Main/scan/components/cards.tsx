import React from "react";

type TableProps = {
  index: number;
  id: number;
  advertiserId: string;
  advertiserName: string;
  area: string;
  areaId: number;
  areaWhereValue: string;
  countryCode: string;
  listingDate: string;
  roleId: string;
  title: string;
  salary: string;
  teaser: string;
  workType: string;
  latest_update: string;
  error: string;
  superDetail: any;
};

type ShowingCardsProps = {
  Key: number;
  Data: TableProps;
  handleSelectCard: (id: TableProps) => void;
};

const Card: React.FC<ShowingCardsProps> = ({ Key, Data,handleSelectCard }) => {
  
  return (
    <div id={Data.id.toString()} onClick={() => handleSelectCard(Data)}>
      <a
        className="block max-h-[384px] min-h-[240px] p-6 border  rounded-lg shadow m-2 bg-gray-800 border-gray-700 hover:border-green-400 hover:border-[3px] focus:border-green-400 focus:border-[5px]"
      >
        <h5 className="mb-2 text-xl font-semibold tracking-tight  text-green-400">
          {Data.title}
        </h5>
        <h2 className="text-xl font-semibold text-gray-300">
          {Data.advertiserName}
        </h2>
        <h2 className="text-base  text-gray-300">{Data.areaWhereValue}</h2>
        <h2 className="text-base  text-gray-300 pt-2"> Role Id : {Data.roleId}</h2>
        <p className="font-normal  text-gray-300 pl-6 pt-2">
          {Data.teaser}
        </p>
      </a>
    </div>
  );
};

export default Card;
