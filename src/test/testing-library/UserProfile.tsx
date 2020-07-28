import React, { useState } from "react";

export type UserProfileData = {
  name: string;
};

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfileData | undefined>();

  const handleRequestProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetch("/user")
      .then((r) => r.json())
      .then((data) => {
        setUserProfile(data);
      });
  };

  return (
    <section>
      <h2>User Profile</h2>
      {userProfile && <p>Hello {userProfile.name}</p>}
      {!userProfile && (
        <button data-testid="request-profile" onClick={handleRequestProfile}>
          Request profile
        </button>
      )}
    </section>
  );
};

export default UserProfile;
