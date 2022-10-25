import styled from "styled-components";

export const ProductGalleryContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 2.5rem;
  height: 100%;
`;

export const GalleryThumbnails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 100%;
  max-width: 20%;
  max-height: 60vh;
  overflow-y: ${(props) => (props.overflow ? "auto" : undefined)};
  overflow-x: hidden;
  direction: rtl;
  scrollbar-gutter: stable;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #5ece7b;
    border-radius: 100px;
  }
`;

export const GalleryPreview = styled.img`
  object-fit: contain;
  height: 511px;
  width: 100%;
  max-width: 70%;
  margin: 0 auto;

  @media (min-width: 1325px) {
    height: 511px;
    width: 610px;
  }
`;

export const GalleryThumbnail = styled(GalleryPreview)`
  height: 80px;
  cursor: pointer;
  width: max-content;
  margin: 0 auto 0 3rem;
`;
