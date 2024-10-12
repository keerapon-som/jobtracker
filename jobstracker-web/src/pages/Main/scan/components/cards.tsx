import React from "react";

const Card: React.FC = () => {
  return (
    <a
      href="#"
      className="block max-h-[384px] min-h-[240px] p-6 border  rounded-lg shadow m-2 bg-gray-800 border-gray-700 hover:border-green-400 hover:border-[3px] focus:border-green-400 focus:border-[5px]"
    >
      <h5 className="mb-2 text-xl font-semibold tracking-tight  text-green-400">
        Software Engineer
      </h5>
      <h2 className="text-xl font-semibold text-gray-300">Gosoft - Thailand</h2>
      <h2 className="text-base  text-gray-300">Address</h2>
      <h2 className="text-base  text-gray-300 pt-2">job detail</h2>
      <p className="font-normal  text-gray-300 pl-6 pt-2">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
    </a>
  );
};

export default Card;
