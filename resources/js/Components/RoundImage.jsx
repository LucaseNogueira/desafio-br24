import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin: 0 10px;
  display: flex;
`;

export const RoundImage = ({ source, alt }) => {
  return <Image src={source} alt={alt} />;
};
