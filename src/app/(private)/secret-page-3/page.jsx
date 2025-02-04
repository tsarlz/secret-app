"use client";
import SecretMessage from "@/components/SecretMessage";
import useGetUser from "@/utils/hooks/useGetUser";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const supabase = createClient();
const Page = () => {
  const { user } = useGetUser();
  const [profiles, setProfiles] = useState([]);
  const [receiverReq, setReceiverReq] = useState([]);
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) return; // to prevent the error prevent the first render
    async function fetchData() {
      try {
        const [profilesRes, receiverRequestRes, friendListRes, userRequestRes] =
          await Promise.all([
            supabase.from("profiles").select("id, username").neq("id", user.id), // fetch all profiles expect the logged-in user
            supabase
              .from("friend_requests")
              .select("id, sender_id")
              .eq("receiver_id", user.id)
              .eq("status", "pending"), // Fetch the Friend_Request that is pending
            supabase
              .from("friends")
              .select("user_id, friend_id")
              .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`), // Fetch Friends of the logged-in user
            supabase
              .from("friend_requests")
              .select("sender_id , receiver_id")
              .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`), // fetch Friend_Request that are sent to logged-in user
          ]);

        if (profilesRes.error) throw profilesRes.error;
        if (receiverRequestRes.error) throw receiverRequestRes.error;
        if (friendListRes.error) throw friendListRes.error;
        if (userRequestRes.error) throw userRequestRes.error;

        setProfiles(profilesRes.data);
        setReceiverReq(receiverRequestRes.data);
        setFriends(friendListRes.data);
        setRequests(userRequestRes.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [user]);

  const handleAddFriend = async (id) => {
    if (!user) return;

    const { data: insertReq, error: insertReqErr } = await supabase
      .from("friend_requests")
      .insert([{ sender_id: user.id, receiver_id: id }])
      .select();

    setRequests((prev) => [...prev, { sender_id: user.id, receiver_id: id }]);
  };

  const handleAcceptReq = async (reqId, userResponse, profileId) => {
    try {
      if (!user) return;

      const [{ error: updateErr }, { error: insertErr }] = await Promise.all([
        supabase
          .from("friend_requests")
          .update({ status: userResponse })
          .eq("id", reqId)
          .select(), // Update the friend request status
        supabase
          .from("friends")
          .insert([{ user_id: user.id, friend_id: profileId }]), //Insert new friend when FR is accepted
      ]);

      // Stop when there an error in Promise
      if (updateErr || insertErr) {
        console.log(updateErr || insertErr);
        return;
      }

      // Refech the updated receiver requests
      let { data: receiver_requests, error: receiverIdErr } = await supabase
        .from("friend_requests")
        .select("*")
        .eq("receiver_id", user.id)
        .eq("status", "pending");

      setReceiverReq(receiver_requests);

      // The UI or the Requested to Friend
      setFriends((prev) => [
        ...prev,
        { user_id: user.id, friend_id: profileId },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewMessage = async (id) => {
    if (!user) return;

    let { data } = await supabase
      .from("friends")
      .select("user_id")
      .or(`user_id.eq.${id}, friend_id.eq.${id}`);

    // console.log(object);

    if (!isAlreadyFriend(id)) {
      router.push("/404");
      return;
    } else {
      router.push(`/secret-page-3/${id}`);
    }
  };
  const isAlreadyFriend = (profileId) => {
    return friends.some(
      (friend) =>
        (friend.user_id === user.id && friend.friend_id === profileId) ||
        (friend.user_id === profileId && friend.friend_id === user.id)
    );
  };
  const hasPendingRequest = (profileId) => {
    return requests.some(
      (req) =>
        (req.sender_id === user.id && req.receiver_id === profileId) ||
        (req.sender_id === profileId && req.receiver_id === user.id)
    );
  };

  return (
    <div>
      <SecretMessage />
      {/* User List */}
      <section className="mt-5 bg-gray-600 p-5 text-white">
        <h3 className="text-md font-bold mb-4">User List:</h3>
        <ul className="space-y-4">
          {profiles.length ? (
            profiles.map((profile) => {
              return (
                <li
                  key={profile.id}
                  className="flex justify-between items-center py-3 px-2 shadow shadow-white"
                >
                  <h3 className="text-sm font-semibold">{profile?.username}</h3>
                  <div className="flex gap-3">
                    {/* Request Status and Add Friend Button */}
                    {!isAlreadyFriend(profile.id) ? (
                      !hasPendingRequest(profile.id) ? (
                        <button
                          onClick={() => handleAddFriend(profile.id)}
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
                      onClick={() => handleViewMessage(profile.id)}
                      className="text-xs hover:underline"
                    >
                      View Secret Message
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <p>No Other Users</p>
          )}
        </ul>
      </section>
      {/* Request List */}
      <section className="mt-5 bg-gray-600 p-5 text-white">
        <h3 className="text-md font-bold mb-4">Request List:</h3>
        <ul className="space-y-4">
          {receiverReq.length && user ? (
            receiverReq.map((req) => {
              // Find the profile that own the request
              const profile = profiles.find(
                (profile) => profile.id === req.sender_id
              );

              return (
                <li
                  key={req.id}
                  className="flex justify-between items-center py-3 px-5 shadow shadow-white"
                >
                  <h3 className="text-sm font-semibold">{profile.username}</h3>
                  <button
                    onClick={() =>
                      handleAcceptReq(req.id, "accepted", profile.id)
                    }
                    className="text-xs hover:underline"
                  >
                    Accept
                  </button>
                </li>
              );
            })
          ) : (
            <p>No request</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Page;
