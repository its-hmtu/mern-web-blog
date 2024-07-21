import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import ErrorModal from '../../components/Modal/ErrorModal';
import CategoryList from './CategoryList';
import 'styles/index.scss';

const Categories = () => {
  const [loadedCategories, setLoadedCategories] = useState([]);
  const { isLoading, sendReq, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await sendReq(ENDPOINTS.getCategories);
        setLoadedCategories(responseData.categories); 
    };
    fetchCategories();
  }, [sendReq]);

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <CategoryList isLoading={isLoading} categories={loadedCategories} />{' '}
    
    </>
  );
};

export default Categories; 
