import styled from "styled-components";

export const ProductGalleryContainer = styled.div`
  display: flex;
  width: auto;
  gap: 2.5rem;
  height: 100%;
  @media (max-width: 1100px) {
    flex-wrap: wrap;
    flex-direction: column-reverse;
    margin: auto;
  }
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

  @media (max-width: 1100px) {
    flex-direction: row;
    max-width: 100%;
    width: 100%;
    overflow-x: auto;
    gap: 4rem;
    padding-bottom: 1rem;

    &::-webkit-scrollbar {
      height: 0.5rem;
    }
  }
`;

export const GalleryPreview = styled.img`
  object-fit: contain;
  height: 511px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 1325px) {
    height: 511px;
    width: 610px;
  }

  @media (max-width: 1100px) {
    height: auto;
    max-height: 511px;
    width: 100%;
    margin: 0 auto;
  }
`;

export const GalleryThumbnail = styled(GalleryPreview)`
  height: 80px;
  width: 80px;
  cursor: pointer;
  margin: 0 auto 0 3rem;

  @media (max-width: 1100px) {
    width: 100%;
    margin: auto;
  }
`;
