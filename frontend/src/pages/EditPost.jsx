import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios"

const CreatePost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    axios.get("http://localhost:5000/api/post/" + id).then((response) => {
      setTitle(response.data.title);
      setContent(response.data.content);
    }).catch(err => console.log(err));
  }, []);

  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("content", content);
    data.set("id", id);

    await axios.put("http://localhost:5000/api/post",{ title, content, id, userId: userInfo.id }, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      setRedirect(true);
    }).catch(err => console.log(err));
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Update Post</button>
    </form>
  );
};

export default CreatePost;
