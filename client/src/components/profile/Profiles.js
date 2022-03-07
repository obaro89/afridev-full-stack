import React, { useEffect, Fragment } from "react";
import Spinner from "../layouts/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

function Profiles(props) {
  const { profiles } = useSelector((state) => state.profile);
  const { isLoading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">African Devs</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            Software devs
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Profiles;
