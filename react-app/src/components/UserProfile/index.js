import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { userPostsThunk } from "../../store/posts";
import PostCard from "../PostCard";
import "../HomePage/homepage.css";
import CreatePost from "../CreatePost/CreatePost";
import { addFriendThunk, othersFriendsThunk, unFriendThunk } from "../../store/friends";
import './UserProfile.css'
import { singleUserThunk } from "../../store/users";

function UserProfile() {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts.allPosts);

  const currentUser = useSelector((state) => state.session.user);
  const friendsObj = useSelector((state) => state.friends.friends);
  const user = useSelector((state) => state.users.singleUser);
  const history = useHistory()
  const friends = Object.values(friendsObj)
  const { userId } = useParams();
  let posts = postsState ? Object.values(postsState).reverse() : [];
  posts = posts.filter(post => post.author.id === +userId)
  const { firstName, lastName, profilePicURL, coverPhotoURL } = user;
  useEffect(() => {
    dispatch(singleUserThunk(userId));
    dispatch(userPostsThunk(userId));
    dispatch(othersFriendsThunk(userId))
  }, [dispatch]);

  if (!currentUser) return null
  const isUser = +userId === currentUser.id
  let isFriend = Object.keys(friendsObj).includes(`${currentUser.id}`)




  const addFriend = () => {
    dispatch(addFriendThunk(userId))
    // dispatch(othersFriendsThunk(userId))
  }
  const unFriend = () => {
    dispatch(unFriendThunk(userId))
    // dispatch(othersFriendsThunk(userId))
  }
  const redirectUserProfile = (userId) => {
    dispatch(singleUserThunk(userId))
    dispatch(userPostsThunk(userId));
    dispatch(othersFriendsThunk(userId))
    history.push(`/users/${userId}`)
  }

  return (
    <div className="user-profile__wrapper">
      <div className="user-profile__header">
        <div className="user-profile__cover-photo">
          <img className="cover-photo" src={coverPhotoURL} alt="user" />
        </div>
        <div className="user-profile__subheader">
          <div className="user-profile__subheader-box">
            <img className="user-profile__profile-pic" src={profilePicURL} alt="profile" />
            <div className="user-profile__header-info">
              <p className="user-profile__name">{firstName} {lastName}</p>
              <p className="user-profile__num-friends">{`${friends.length} friends`}</p>
            </div>
          </div>
          <div className="user-profile__buttons">
            {!isUser && isFriend && (<button onClick={unFriend}>Unfriend</button>)}
            {!isUser && !isFriend && (<button onClick={addFriend}>Add Friend</button>)}
          </div>
        </div>
      </div>
      <div className='user-profile-page'>
        <div className="user-profile__leftside">
          <div className='user-profile__friends'>
            {friends.map(friend => (
              <div className="friends-bar__friends" onClick={e => redirectUserProfile(friend.id)}>

                <img className="post-card__profile-pic" src={friend.profilePicURL} alt="friend pic" />
                <p>{friend.firstName}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="user-profile__rightside">
          {currentUser.id === +userId && <CreatePost />}
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
