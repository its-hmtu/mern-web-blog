import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import ErrorModal from '../../components/Modal/ErrorModal';
import CategoryList from './CategoryList'; // Đổi tên thành CategoryList nếu bạn có component cho categories
import { ENDPOINTS } from '../../routes/api.path';
import 'styles/index.scss'; // Đổi tên thành Categories.css nếu bạn có file CSS cho categories

const Categories = () => {
  const [loadedCategories, setLoadedCategories] = useState([]);
  const { isLoading, sendReq, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await sendReq(ENDPOINTS.getCategories);
        setLoadedCategories(responseData.categories); // Cập nhật từ `tags` thành `categories`
      } catch (err) {}
    };
    fetchCategories();
  }, [sendReq]);

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <CategoryList isLoading={isLoading} categories={loadedCategories} />{' '}
      {/* Đổi tên thành CategoryList và categories */}
    </>
  );
};

export default Categories; // Đổi tên thành Categories nếu bạn đổi tên file
