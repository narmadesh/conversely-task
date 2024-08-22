import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios"

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo, userInfo } = useContext(UserContext);

  async function createNewPost(e) {
    const data = new FormData();
    data.set("title", title);
    data.set("content", content);
    e.preventDefault();

    await axios.post("http://localhost:5000/api/post", { title, content, userId: userInfo.id }, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      setRedirect(true);
    }).catch(err => console.log(err));

  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill value={content} onChange={setContent} height={500} />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
};

export default CreatePost;
