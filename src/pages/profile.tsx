import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../utils/context";
import { axios_getUsersByID } from "../services";
import { errorHandler } from "../utils/errorHandler";

type ProfileProps = {};

type TxtComponentProps = { name: keyof User; value?: User };
const TxtComponent = ({ name, value }: TxtComponentProps) => (
  <div>
    <label className="text-lg text-gray-800 font-bold" htmlFor={name}>
      {name}:
    </label>
    <span className="text-lg text-gray-800 font-bold" id={name}>
      {value && value[name]}
    </span>
  </div>
);
const Profile: FC<ProfileProps> = (props: ProfileProps) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User>();
  const [errmsg, setErrmsg] = useState<string>("");
  useEffect(() => {
    const fetchUser = async () => {
      const uid = user?.user_id;
      if (!uid) return;
      const res = await axios_getUsersByID(uid);
      if (!res.data.data) {
        const msg = errorHandler(res);
        setErrmsg(msg);
        return;
      }

      setUserData(res.data.data);
    };
    fetchUser();

    return () => {
      // cleanup function to cancel async task if component unmounts
      const controller = new AbortController();
      controller.abort();
    };
  }, []);

  return (
    <div className="container mx-auto d-flex lg:w-1/3 border-2 border-gray-500 p-6 mt-10 ">
      <div className="flex justify-center">
        <img src="src\assets\profile.svg" alt="profile" />
      </div>
      <TxtComponent name="first_name" value={userData} />
      <TxtComponent name="last_name" value={userData} />
      <TxtComponent name="email" value={userData} />
      <TxtComponent name="phone" value={userData} />
      <TxtComponent name="user_id" value={userData} />
    </div>
  );
};

export default Profile;
