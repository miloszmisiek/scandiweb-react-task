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
    return (
      <ProductGalleryContainer>
        {this.props.gallery.length > 1 && (
          <GalleryThumbnails $overflow={this.props.gallery.length > 4}>
            {this.props.gallery.map((image, idx) => (
              <GalleryThumbnail
                key={idx}
                id={idx}
                src={image}
                onClick={(e) => this.handleClick(e)}
              />
            ))}
          </GalleryThumbnails>
        )}
        <ImageContainer>
          <GalleryPreview
            gap={this.props.gallery.length <= 1}
            src={this.props.gallery.filter(
              (image, idx) => idx === this.state.activeImage
            )}
          />
          {!this.props.inStock && <OutOfStock>out of stock</OutOfStock>}
        </ImageContainer>
      </ProductGalleryContainer>
    );
  }
}

export default ProductGallery;
