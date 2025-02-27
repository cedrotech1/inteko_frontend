import React, { useState, useEffect } from 'react';

const AddPostForm = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryID: '',
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let token=localStorage.getItem('token');

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/categories/`, {
          method: 'GET',
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            
           
          },
        });
        const data = await response.json();
        if (data.success) {
          setCategories(data.data); // Populate categories
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { categoryID, title, description } = formData;

    if (!categoryID || !title || !description) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/post/add`, {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setSuccessMessage('Post added successfully!');
        setFormData({
          categoryID: '',
          title: '',
          description: '',
        });
      } else {
        setErrorMessage('Failed to add post. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="container mt-5">
  

      <form className='col-md-6 member' onSubmit={handleSubmit}>
      <h3 className="text-center" style={{backgroundColor:'lightblue',padding:'0.3cm',borderRadius:'0.2cm'}}>Add Post</h3>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <div className="form-group">
          <label htmlFor="categoryID">Category</label>
          <select
            id="categoryID"
            name="categoryID"
            className="form-control"
            value={formData.categoryID}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <br/>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddPostForm;
