import React from "react";

const ProfileLists = ({
  id,
  username,
  handleViewMessage,
  handleAddFriend,
  isAlreadyFriend,
  hasPendingRequest,
}) => {
  return (
    <li className="flex justify-between items-center py-3 px-2 shadow shadow-white">
      <h3 className="text-sm font-semibold">{username}</h3>
      <div className="flex gap-3">
        {/* Request Status and Add Friend Button */}
        {!isAlreadyFriend(id) ? (
          !hasPendingRequest(id) ? (
            <button
              onClick={() => handleAddFriend(id)}
              className="text-xs hover:underline"
            >
              Add friend
            </button>
          ) : (
            <p className="text-xs text-gray-400">Requested</p>
          )
        ) : (
          <p className="text-xs text-gray-400">Friend</p>
        )}

        <button
          onClick={() => handleViewMessage(id)}
          className="text-xs hover:underline"
        >
          View Secret Message
        </button>
      </div>
    </li>
  );
};

export default ProfileLists;
