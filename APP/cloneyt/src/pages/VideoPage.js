import Button from '../componet/atoms/Button';
import Link from '../componet/atoms/Link'
import Navbar from '../componet/molecules/Navbar';
import Video from '../componet/molecules/Video';
import data from '../data.json'
import { useParams } from 'react-router-dom';
import { BiLike, BiSolidLike, BiShareAlt  } from "react-icons/bi";
import styled from 'styled-components';
import Input from '../componet/atoms/Input';
import ProfileImage from '../componet/atoms/ProfileImage';
import moment from 'moment';

const StyledVideos = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const StyledMain = styled.main`

`

const StyledTitle = styled.div ` 
    color: #ffffff;
    display:flex;
    flex-direction: row;
    justify-content: space-between;

    div {
    display:flex;
    flex-direction: row;
    gap: 10px;
    }
    
`
const StyledContainer = styled.div`
    display:flex;
    flex-direction: row;
    padding: 10px;
    gap: 10px;
`
const StyledNewComment = styled.div`
    display:flex;
    flex-direction:column;
    gap: 10px;
    padding: 10px 0 10px 0;
    color: #ffffff;
`
const StyledComments = styled.div`
    display:flex;
    flex-direction:column;
    gap: 10px;
    color: #ffffff;
    > div {
        display:flex;
        flex-direction:row;
        gap: 10px;
        align-items: center;
        > p {
            display:flex;
            gap: 5px;
            flex-direction:column;
        } 
    }
`

const VideoPage = () => {
    const {id} = useParams()
    const video = data.videos.find(video => video.id == id)
    return (
       <>
         <Navbar/>
        <StyledContainer>
            <StyledMain>
                <video src={video.url} controls width={'100%'}></video>
                <StyledTitle>
                    <h1>
                        {video.title}
                    </h1>
                    <div>
                        {video.liked ? <Button icon = {<BiSolidLike/>}>Unlike</Button> : <Button icon = {<BiLike/>}>Like</Button>}
                        <Button icon = {<BiShareAlt/>}>Share</Button>
                    </div>
                </StyledTitle>
                <StyledNewComment>
                    <h3>
                    Comment
                    </h3>
                    <Input placeHolder={"Comment..."}/>
                </StyledNewComment >
                <StyledComments>
                    {data.comments.map((comment) => {
                        const create = new Date(comment.created_at)
                        const momentDate = moment(create)
                        return <div>
                            <ProfileImage src = {comment.user.profile_image}/>
                            <p>
                                <b>@{comment.user.username} | {momentDate.fromNow()}</b>
                                <span>{comment.text}</span>
                            </p>
                        </div>
                    })}
                </StyledComments>

            </StyledMain> 
            <StyledVideos>
                {data.videos.map(video => (
                    <Video key={video.id} {...video}/>
                ))}
            </StyledVideos>

        </StyledContainer>
       </>

    )
}

export default VideoPage;