import React from 'react';

import { ExperienceCategoryView, CategoryText } from './styles';

const ExperienceCategory = ({name}) => {
  return (
    <ExperienceCategoryView>
      <CategoryText>{name}</CategoryText>
    </ExperienceCategoryView>
  );
};

export default ExperienceCategory;
