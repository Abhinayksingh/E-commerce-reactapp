import { useContext } from "react";
import "./product-card.styles.scss";
import { CartContext } from "../../contexts/cart-context";

import Button from "../button/button.component";
const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button onClick={addProductToCart}>Add to card</Button>
    </div>
  );
};

export default ProductCard;
