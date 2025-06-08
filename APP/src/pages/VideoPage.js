import Button from "../componet/atoms/Button";
import Link from "../componet/atoms/Link";
import Navbar from "../componet/molecules/Navbar";
import Video from "../componet/molecules/Video";
import { useParams } from "react-router-dom";
import { BiLike, BiSolidLike, BiShareAlt } from "react-icons/bi";
import styled from "styled-components";
import Input from "../componet/atoms/Input";
import ProfileImage from "../componet/atoms/ProfileImage";
import moment from "moment";
import { useState, useEffect } from "react";
import {
  getVideo,
  getVideos,
  createComment,
  getComments,
  getLike,
  setLike,
  getSubscription,
  setSubscription,
} from "../api";

const StyledVideos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.div`
  width: 100%;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  gap: 10px;
`;
const StyledNewComment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0 10px 0;
  color: #ffffff;
`;

const StyledComments = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
  color: #ffffff;
  > div {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    > p {
      display: flex;
      gap: 5px;
      flex-direction: column;
    }
    > span {
      font-weight: 100;
    }
  }
`;

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState({});
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [sub, setSub] = useState(false); // <-

  useEffect(() => {
    getVideo(id).then((v) => setVideo(v));
    getVideos().then((v) => setVideos(v));
    getLike(id).then((l) => {
      // <-
      setLiked(l);
    });
  }, [id]);

  useEffect(() => {
    if (video && video.user) {
      getSubscription(video.user).then((s) => setSub(s));
    }
  }, [video.user]);

  const refreshComments = () => {
    getComments(id).then((c) => setComments(c));
  };

  useEffect(refreshComments, []);

  const handleChangeLike = (liked) => {
    // <-
    setLike(id, liked);
    setLiked(liked);
  };

  const handleChangeSubscription = (subscribe) => {
    // <-
    console.log(video.user, subscribe);
    setSubscription(video.user, subscribe);
    setSub(subscribe);
  };

  const handleCommentKeyDown = (event) => {
    if (event.keyCode === 13) {
      createComment(comment, id).then((comm) => {
        setComment("");
        refreshComments();
      });
    }
  };

  return (
    <>
      <div></div>
      <Navbar />
      <StyledContainer>
        <StyledMain>
          <video src={video.url} controls width={"100%"}></video>
          <StyledTitle>
            <h1>{video.title}</h1>
            <div>
              {sub ? (
                <Button onClick={() => handleChangeSubscription(false)}>
                  Unsubscribe
                </Button>
              ) : (
                <Button onClick={() => handleChangeSubscription(true)}>
                  Subscribe
                </Button>
              )}

              {liked ? (
                <Button
                  onClick={() => handleChangeLike(false)}
                  icon={<BiSolidLike />}
                >
                  Unlike
                </Button>
              ) : (
                <Button
                  onClick={() => handleChangeLike(true)}
                  icon={<BiLike />}
                >
                  Like
                </Button>
              )}
              <Button icon={<BiShareAlt />}>Share</Button>
            </div>
          </StyledTitle>
          <StyledNewComment>
            <h3>Comment</h3>
            <Input
              placeHolder={"Comment..."}
              onKeyUp={handleCommentKeyDown}
              value={comment}
              setValue={setComment}
            />
          </StyledNewComment>
          <StyledComments>
            {comments.map((comment) => {
              const create = new Date(comment.create_at);
              const momentDate = moment(create);
              return (
                <div key={comment._id}>
                  <ProfileImage src={comment.user.profile_image} />
                  <p>
                    <b>
                      @{comment.user.username} | {momentDate.fromNow()}
                    </b>
                    <span>{comment.text}</span>
                  </p>
                </div>
              );
            })}
          </StyledComments>
          <Button backgroundColor="#ffffff" color="#000000">
            LOAD MORE
          </Button>
        </StyledMain>
        <StyledVideos>
          {videos.map((video) => (
            <Video key={video._id} {...video} />
          ))}
        </StyledVideos>
      </StyledContainer>
    </>
  );
};

export default VideoPage;
