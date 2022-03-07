import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layouts/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import { getProfileById } from "../../actions/profile";

const Profile = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userProfile = useSelector((state) => state.profile.profile);

  useEffect(() => {
    dispatch(getProfileById(props.match.params.id));
  }, [getProfileById, props.match.params.id]);

  return (
    <Fragment>
      {userProfile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === userProfile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={userProfile} />
            <ProfileAbout profile={userProfile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {userProfile.experience.length > 0 ? (
                <Fragment>
                  {userProfile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {userProfile.education.length > 0 ? (
                <Fragment>
                  {userProfile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {userProfile.githubusername && (
              <ProfileGithub username={userProfile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
