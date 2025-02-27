import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [addressHierarchy, setAddressHierarchy] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedCell, setSelectedCell] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Fetch posts
  const fetchPosts = () => {
    setLoading(true);
    fetch("http://localhost:7000/api/v1/post/")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch((error) => console.error("Error fetching posts:", error))
      .finally(() => setLoading(false));
  };

  useEffect(fetchPosts, []);

  // Fetch address hierarchy only once
  useEffect(() => {
    fetch("http://localhost:7000/api/v1/address")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setAddressHierarchy(data.data);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch((error) => console.error("Error fetching addresses:", error));
  }, []);

  // Auto-reload if no posts after 5 seconds
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        if (posts.length === 0) {
          fetchPosts();
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loading, posts]);

  // Handle filters without resetting on reload
  useEffect(() => {
    let filtered = posts;
    if (selectedProvince) filtered = filtered.filter((post) => post.province_id === Number(selectedProvince));
    if (selectedDistrict) filtered = filtered.filter((post) => post.district_id === Number(selectedDistrict));
    if (selectedSector) filtered = filtered.filter((post) => post.sector_id === Number(selectedSector));
    if (selectedCell) filtered = filtered.filter((post) => post.cell_id === Number(selectedCell));
    if (selectedVillage) filtered = filtered.filter((post) => post.village_id === Number(selectedVillage));

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [selectedProvince, selectedDistrict, selectedSector, selectedCell, selectedVillage, posts]);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📌 Posts</h2>
        <button className="btn btn-primary" onClick={() => fetchPosts()}>🔄 Reload</button>
      </div>

      {/* Address Filters */}
      <div className="row mb-3">
        {[
          { label: "Province", value: selectedProvince, setter: setSelectedProvince, options: addressHierarchy },
          { label: "District", value: selectedDistrict, setter: setSelectedDistrict, options: selectedProvince ? addressHierarchy.find(p => p.id === Number(selectedProvince))?.districts || [] : [] },
          { label: "Sector", value: selectedSector, setter: setSelectedSector, options: selectedDistrict ? addressHierarchy.find(p => p.id === Number(selectedProvince))?.districts.find(d => d.id === Number(selectedDistrict))?.sectors || [] : [] },
          { label: "Cell", value: selectedCell, setter: setSelectedCell, options: selectedSector ? addressHierarchy.find(p => p.id === Number(selectedProvince))?.districts.find(d => d.id === Number(selectedDistrict))?.sectors.find(s => s.id === Number(selectedSector))?.cells || [] : [] },
          { label: "Village", value: selectedVillage, setter: setSelectedVillage, options: selectedCell ? addressHierarchy.find(p => p.id === Number(selectedProvince))?.districts.find(d => d.id === Number(selectedDistrict))?.sectors.find(s => s.id === Number(selectedSector))?.cells.find(c => c.id === Number(selectedCell))?.villages || [] : [] }
        ].map(({ label, value, setter, options }, index) => (
          <div className="col-md-2" key={index}>
            <select className="form-control" value={value} onChange={(e) => setter(e.target.value)} disabled={!options.length}>
              <option value="">{`Select ${label}`}</option>
              {options.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
            </select>
          </div>
        ))}
      </div>

      {/* Posts Display */}
      {loading ? (
        <p className="text-center text-muted">Loading posts... 🔄</p>
      ) : currentPosts.length > 0 ? (
        <div className="row">
          {currentPosts.map((post) => (
            <div key={post.id} className="col-md-4">
              <div className="card border-primary shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="card-title text-primary">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <small className="text-muted">📅 {new Date(post.createdAt).toLocaleString()}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No posts available 📭</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default PostsList;
