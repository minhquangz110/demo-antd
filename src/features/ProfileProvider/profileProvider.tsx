import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { getProfile, setProfile } from "../../persist/localstorage";

export const ProfileContext = createContext(getProfile());
export const ProfileProvider = (props: PropsWithChildren) => {
  const [state, setState] = useState(getProfile());

  const updatProfile = (value: any) => {
    setProfile(value);
    setState({ ...value });
  };
  useEffect(() => {
    setState({ ...getProfile() });
  }, []);
  const value = {
    value: state,
    updatProfile: updatProfile,
  };
  return (
    <ProfileContext.Provider value={value}>
      {props.children}
    </ProfileContext.Provider>
  );
};
