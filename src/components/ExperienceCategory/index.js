import React from 'react'
import { Container, ExperienceCategoryView, CategoryText } from './styles';

const ExperienceCategory = ({name}) => {
  return (
    <Container>
      <ExperienceCategoryView>
        <CategoryText>{(name)}</CategoryText>
      </ExperienceCategoryView>
    </Container>
  );
};

export default ExperienceCategory;
