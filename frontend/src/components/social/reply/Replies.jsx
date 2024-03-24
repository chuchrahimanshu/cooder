import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFollowingPosts,
  reactionOnReply,
} from "../../../redux/social/socialSlice";
import { TiHeart } from "react-icons/ti";
import { PiQuotesFill } from "react-icons/pi";
import { TbEdit, TbPinFilled, TbTrash } from "react-icons/tb";

const Replies = ({ comment, post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      {comment?.replies && comment.replies?.length > 0 && (
        <ul className="reply">
          {comment.replies.map((reply) => (
            <li key={reply._id} className="reply__list">
              <section className="reply__list-header">
                <section className="reply__list-header-user">
                  <img
                    src={reply.user?.avatar}
                    alt="User Avatar"
                    className="reply__list-avatar"
                  />
                  <section className="reply__list-user">
                    <p className="reply__list-user-name">{`${reply.user?.firstName} ${reply.user?.lastName}`}</p>
                    <p className="reply__list-user-username">
                      {`@${reply.user?.username}`}
                    </p>
                  </section>
                </section>
                {reply.user?._id === user?._id && (
                  <section className="reply__menu-container">
                    <button
                      className="reply__menu"
                      onClick={() => {
                        if (showSettings === reply._id) {
                          setShowSettings(false);
                        } else {
                          setShowSettings(reply._id);
                        }
                      }}>
                      <HiDotsHorizontal className="reply__menu-icon" />
                    </button>
                    {showSettings === reply._id && (
                      <section className="reply__menu-items">
                        <section className="reply__menu-item">
                          <TbEdit className="reply__menu-item-icon" />
                          <p className="reply__menu-item-text">Edit Reply</p>
                        </section>
                        <section
                          className="reply__menu-item"
                          id="reply__menu-delete">
                          <TbTrash className="reply__menu-item-icon" />
                          <p className="reply__menu-item-text">Delete Reply</p>
                        </section>
                      </section>
                    )}
                  </section>
                )}
              </section>
              <section className="reply__list-body">
                <p className="reply__list-content">{reply.content}</p>
                <p className="reply__list-date">
                  {new Date(reply.createdAt).toUTCString()}
                </p>
              </section>
              <section className="reply__list-footer">
                <TiHeart
                  id="reply__reaction"
                  className={`reply__list-footer-icons-primary ${
                    reply.reacted === true ? "c-red" : ""
                  }`}
                  title="Reaction"
                  onClick={async () => {
                    await dispatch(
                      reactionOnReply({
                        userid: user?._id,
                        postid: post?._id,
                        commentid: comment?._id,
                        replyid: reply?._id,
                      })
                    );
                    await dispatch(getAllFollowingPosts(user?._id));
                  }}
                />
                {reply.replyReactions?.length > 0 ? (
                  <p className="reply__list-footer-text">
                    {reply.replyReactions.length}
                  </p>
                ) : null}
                <PiQuotesFill
                  className="reply__list-footer-icons-secondary"
                  id="reply__quote"
                  title="Quote"
                />
              </section>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export { Replies };
