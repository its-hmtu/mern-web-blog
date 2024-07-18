import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'styles/index.scss';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/categories')
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <div className="container my-5">
      <h1 className="mb-4">Categories</h1>
      <div className="row">
        {categories.map((category, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">{category.count} posts</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
