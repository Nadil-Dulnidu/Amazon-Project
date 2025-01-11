import { Product, Clothing, Appliance } from "../../data/products.js";

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

describe('test suite: Clothing class', ()=>{

  let clothing;

  beforeEach(()=>{

    clothing = new Clothing({

      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"

    });
  });

  it('has the correct properties', ()=>{

    expect(clothing.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(clothing.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
    expect(clothing.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
    expect(clothing.rating).toEqual({
      stars: 4.5,
      count: 56
    });
    expect(clothing.sizeChartLink).toEqual('images/clothing-size-chart.png');
  });

  it('get the product price', ()=>{

    expect(clothing.getPrice()).toEqual('$7.99');
  });

  it('displays the size chart link', ()=>{

    expect(clothing.extraInfoHTML()).toContain('<a href="images/clothing-size-chart.png" target="_blank">Size chart</a>');
  });

  it('get the stars URL', ()=>{

    expect(clothing.getStarsUrl()).toEqual('images/ratings/rating-45.png');
  });
});

describe('test suite: Applince test', ()=>{

  let appliance;

  beforeEach(()=>{

    appliance = new Appliance({

      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: 'appliance',
      instructionsLink: 'images/appliance-instructions.png',
      warrantyLink: 'images/appliance-warranty.png'

    });
  });

  it('has the correct properties', ()=>{

    expect(appliance.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(appliance.image).toEqual('images/products/black-2-slot-toaster.jpg');
    expect(appliance.instructionsLink).toEqual('images/appliance-instructions.png');expect(appliance.warrantyLink).toEqual('images/appliance-warranty.png');
  });

  it('displays the warrenty and instruction links', ()=>{

  expect(appliance.extraInfoHTML()).toContain(
    
    `<a href="images/appliance-instructions.png" target="_blank">Instructions</a>`
  );

  expect(appliance.extraInfoHTML()).toContain(

    `<a href="images/appliance-warranty.png" target="_blank">Warranty</a>`
  );

  });

});
 
