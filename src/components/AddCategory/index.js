import React from 'react';

import { ExperienceCategoryView, CategoryText } from './styles';

const AddCategory = ({name}) => {
  return (
    <ExperienceCategoryView>
      <CategoryText>{name}</CategoryText>
    </ExperienceCategoryView>
  );
};

export default AddCategory;
