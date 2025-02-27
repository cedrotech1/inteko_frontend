import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/post/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Posts</h2>
      <div className="row">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="col-md-4">
              <div className="card mb-4">
                <img
                  src={post.image}
                  className="card-img-top"
                  alt={post.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <p className="text-muted">
                    <strong>Category:</strong> {post.category?.name || "N/A"}
                  </p>
                  <p className="text-muted">
                    <strong>Created At:</strong>{" "}
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default PostsList;
