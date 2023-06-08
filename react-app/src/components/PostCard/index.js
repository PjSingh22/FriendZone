import React, { useState } from "react"
import { useModal } from "../../context/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton";
import PostDetailModal from "../PostDetailModal";
import DeletePostModal from "../DeletePostModal";
import EditPostModal from "../EditPostModal";
import "./PostCard.css"
import { createLikeThunk, removeLikeThunk } from "../../store/posts";
import { allPostsThunk } from "../../store/posts";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


function PostCard({ post }) {
  const user = useSelector(state => state.session.user)
  const { closeModal } = useModal();
  const dispatch = useDispatch()
  const [text, setText] = useState("")
  const likedPeeps = useSelector(state => state.posts.allPosts[post.id].likedBy)
  const history = useHistory()

  const { content, numLikes, author, postImages, createdAt } = post
  const { firstName, lastName, profilePicURL } = author
  const likedUser = likedPeeps.find(liker => liker.id === user.id)
  const [liked, setLiked] = useState(likedUser !== undefined);

  const handleLike = async (e) => {
    if (!likedUser) {
      await dispatch(createLikeThunk(post.id, user))
      setLiked(true)
    } else {
      await dispatch(removeLikeThunk(post.id, user))
      setLiked(false)
    }
  }

  const handleInputChange = (e) => {
    setText(e.target.value);
  }
  let likeByNames; // dont touch this

  if (likedPeeps) {
    likeByNames = likedPeeps.map(obj => {
      return <span>{obj.firstName} {obj.lastName}</span>
    })

  }

  const redirectUserProfile = (e) => {
    history.push(`/${author.id}`)
  }

  const timeAgo = (dateObj) => {
    const date = new Date(dateObj);
    const currentDate = new Date()
    const timeDif = currentDate.getTime() - date.getTime();

    const seconds = Math.floor(timeDif / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    // const months = Math.floor(days / 30);
    // const years = Math.floor(months / 12);

    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const time = date.toLocaleString('en-US', options);
    const dateString = `${month} ${year} at ${time}`

    if (days >= 7) return dateString;
    else if (days >= 1) return `${days}d`;
    else if (hours >= 1) return `${hours}h`;
    else if (minutes >= 1) return `${minutes}m`
    else return 'Just now';
  }

  return (
    <div className="post-card__container">
      <div className="post-card__info-content">
        <div className="post-card__user-info">
          <div className="post-card__profile-info">
            <img className="post-card__profile-pic" src={profilePicURL} alt="profile" onClick={redirectUserProfile} />
            <div className="profile-info__left-side">
              <p onClick={redirectUserProfile}>{firstName} {lastName}</p>
              <div className="profile-info__post-date">
                <span>{timeAgo(createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="post-card__edit-delete">
            {user.id === post.author.id && (
              <>
                <OpenModalButton
                  buttonText="Edit"
                  onItemClick={closeModal}
                  modalComponent={<EditPostModal user={user} post={post} />}
                />
                <OpenModalButton
                  buttonText="Delete"
                  onItemClick={closeModal}
                  modalComponent={<DeletePostModal post={post} />}
                />
              </>
            )}
          </div>
        </div>
        <div className="post-card__content">
          <p>{content}</p>
        </div>
      </div>
      <div className="post-card__images">
        {postImages.map(image => {
          return <img src={image.imageUrl} key={image.id} alt="post" />
        })}
      </div>
      <div className="post-card__details">
        <div className="post-card__engagement">
          <Tippy content={<span style={{ display: 'flex', flexDirection: 'column' }}>{likeByNames}</span>} placement="bottom" arrow={false}>
            <div className="post-card__likes">
              {numLikes <= 0 ? "" : `❤️ ${numLikes}`}
            </div>
          </Tippy>
        </div>
        <div className="post-card__buttons">
          {liked ?
            <button style={{ color: 'blue' }} className={liked} onClick={handleLike}>❤️ LIKE</button> :
            <button className={liked} onClick={handleLike}>🖤 LIKE</button>
          }
          <OpenModalButton
            buttonText="Comment"
            onItemClick={closeModal}
            modalComponent={<PostDetailModal post={post} />}
          />
        </div>
        <div className="post-card__comment-bar">
          <img className="post-card__profile-pic" src={user.profilePicURL} alt="profile" />
          <div>
            <textarea className="add-comment" value={text} onChange={handleInputChange} rows={1}></textarea>
            <span>➡</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard