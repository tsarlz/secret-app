import React from "react";

const RequestLists = ({ reqId, profileId, username, handleAcceptReq }) => {
  return (
    <li
      key={reqId}
      className="flex justify-between items-center py-3 px-5 shadow shadow-white"
    >
      <h3 className="text-sm font-semibold">{username}</h3>
      <button
        onClick={() => handleAcceptReq(reqId, "accepted", profileId)}
        className="text-xs hover:underline"
      >
        Accept
      </button>
    </li>
  );
};

export default RequestLists;
