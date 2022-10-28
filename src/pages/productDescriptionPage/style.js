import styled from "styled-components";

export const PDPContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 6.25rem;
  height: 100%;
  align-items: flex-start;
  position: relative;

  @media (max-width: 860px) {
    flex-wrap: wrap;
  }
`;
