import { Product } from "../../data/products.js";

describe('test suite: Product class', ()=>{

  let product;

  beforeEach(()=>{
    
    product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]  
    });
  });

  it('has the correct properties', ()=>{

    expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
    expect(product.rating).toEqual({
      stars: 4.5,
      count: 87
    });
  });

  it('gets the stars URL', ()=>{

    expect(product.getStarsUrl()).toEqual('images/ratings/rating-45.png');
  });
  
  it('gets the product price', ()=>{

    expect(product.getPrice()).toEqual('$10.90');
  });
  
  it('does not display extra info', ()=>{

    expect(product.extraInfoHTML()).toEqual('');
  });

  
});
 
