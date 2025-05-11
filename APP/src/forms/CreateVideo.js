import Button from "../componet/atoms/Button";
import Input from "../componet/atoms/Input";
import Textarea from "../componet/atoms/Textarea";
import styled from "styled-components";
import { useState } from "react";
import { createVideo } from "../api";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  color: #ffffff;
`;

const CreateVideoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    createVideo(title, description, url, thumbnail).then((video) => {
      alert("Video created!");
      setTitle("");
      setDescription("");
      setUrl("");
      setThumbnail("");
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h1>Create Account</h1>
      <Input placeHolder={"title"} value={title} setValue={setTitle} />
      <Textarea
        placeHolder={"description"}
        value={description}
        setValue={setDescription}
      />
      <Input placeHolder={"url"} value={url} setValue={setUrl} />
      <Input
        placeHolder={"thumbnail"}
        value={thumbnail}
        setValue={setThumbnail}
      />
      <Button>Create</Button>
    </StyledForm>
  );
};

export default CreateVideoForm;
