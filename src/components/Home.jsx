import React from "react";

import img1 from "../assets/MacBook.png";
import img2 from "../assets/NikeMercurial.png";
import img3 from "../assets/MacBookAir.webp";
import img4 from "../assets/EuroFootball.avif";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const Home = () => {
  const productList = [
    {
      name: "MacBook",
      price: 1899,
      imgSrc: img1,
      id: 3,
    },
    { name: "Nike Mercurial", price: 399, imgSrc: img2, id: 4 },
    { name: "MacBook Air", price: 1399, imgSrc: img3, id: 5 },
    { name: "Euro Football", price: 199, imgSrc: img4, id: 6 },
  ];

  const dispatch = useDispatch();

  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculateSum" });
    toast.success("Added to cart");
  };
  return (
    <div className="home">
      {productList.map((i) => (
        <ProductCard
          key={i.id}
          imgSrc={i.imgSrc}
          name={i.name}
          price={i.price}
          id={i.id}
          handler={addToCartHandler}
        />
      ))}
    </div>
  );
};

const ProductCard = ({ name, id, price, handler, imgSrc }) => (
  <div className="productCard">
    <img src={imgSrc} alt={name} />
    <p>{name}</p>
    <h4>${price}</h4>
    <button onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}>
      Add to cart
    </button>
  </div>
);

export default Home;
