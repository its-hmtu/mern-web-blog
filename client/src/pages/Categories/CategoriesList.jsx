import React from 'react';
import CategoryItem from './CategoryItem'; // Đổi tên thành CategoryItem nếu có
import SkeletonCategories from '../Skeleton/SkeletonCategories'; // Đổi tên thành SkeletonCategories nếu có

const CategoryList = (props) => {
  if (!props.isLoading && props.categories && props.categories.length === 0) {
    return <div className="center">No categories found!</div>;
  }

  return (
    <div className="container categories">
      {props.isLoading && <SkeletonCategories />}
      {props.categories.map((category) => (
        <CategoryItem
          name={category.name}
          id={category.id}
          key={category.id}
          followers={category.followers} // Giữ lại nếu cần; có thể thay đổi nếu không có thuộc tính này
        />
      ))}
    </div>
  );
};

export default CategoryList;
