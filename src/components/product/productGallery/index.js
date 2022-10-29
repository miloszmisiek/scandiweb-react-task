import React, { Component } from "react";
import { ImageContainer, OutOfStock } from "../productCard/style";
import {
  GalleryPreview,
  GalleryThumbnail,
  GalleryThumbnails,
  ProductGalleryContainer,
} from "./style";

export class ProductGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImage: 0,
    };
  }

  handleClick(e) {
    this.setState((prevState) => ({
      ...prevState,
      activeImage: parseInt(e.target.id),
    }));
  }

  render() {
    const { gallery, inStock } = this.props;
    return (
      <ProductGalleryContainer>
        <GalleryThumbnails $overflow={gallery.length > 4}>
          {gallery.map((image, idx) => (
            <GalleryThumbnail
              key={idx}
              id={idx}
              src={image}
              onClick={(e) => this.handleClick(e)}
            />
          ))}
        </GalleryThumbnails>
        <ImageContainer>
          <GalleryPreview
            gap={gallery.length <= 1}
            src={gallery.filter((image, idx) => idx === this.state.activeImage)}
          />
          {!inStock && <OutOfStock>out of stock</OutOfStock>}
        </ImageContainer>
      </ProductGalleryContainer>
    );
  }
}

export default ProductGallery;
