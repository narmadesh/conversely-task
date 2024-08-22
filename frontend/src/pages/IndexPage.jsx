import { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios"

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/post").then((response) => {
      setPosts(response.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post, index) => <Post {...post} key={index} />)}
    </>
  );
};

export default IndexPage;
