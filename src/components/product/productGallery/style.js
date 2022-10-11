import styled from "styled-components";

export const ProductGalleryContainer = styled.div`
  display: flex;
  /* width: 100%; */
  gap: 2.5rem;
  flex-wrap: wrap;
`;

export const GalleryThumbnails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const GalleryPreview = styled.img`
  object-fit: contain;
  height: 511px;
  width: 50vw;
  margin: 0 auto;
  margin-left: ${(props) => (props.gap ? "calc(80px + 2.5rem)" : undefined)};

  @media (min-width: 1325px) {
    height: 511px;
    width: 610px;
  }
`;

export const GalleryThumbnail = styled(GalleryPreview)`
  height: 80px;
  cursor: pointer;
  width: auto;
`;
