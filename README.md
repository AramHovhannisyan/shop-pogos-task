# About project

- Customers select products
- Products are weighed and priced
- Customers make payments and receive the receipts and change
- The same customers may return for additional purchases
- Pricing products based on weight
- Digital receipts
- Returns processing

# Instructions

To setup the project, run `npm install`

Make sure you have postgreSQL installed, and set the environment variables from `.env` file

POSTGRES_DB_USER

POSTGRES_DB_ROOT_PASSWORD

POSTGRES_DB_DATABASE

POSTGRES_DB_LOCAL_PORT


SMTP_HOST=smtp.gmail.com

SMTP_PORT=587

SMTP_USER=pogostask@gmail.com

SMTP_PASSWORD=uczgypxouquonljb

PORT=3000

DATABASE_URL="postgresql://${POSTGRES_DB_USER}:${POSTGRES_DB_ROOT_PASSWORD}@localhost:${POSTGRES_DB_LOCAL_PORT}/${POSTGRES_DB_DATABASE}?schema=public"


To create DB Model with Prisma run `npx prisma migrate dev --name init`

To start the app run `npm run dev`.

# API endpoints


## Seller


**Get Seller by id**

- URI: `/seller/:id`

- method: GET

- body: none


**Get all Sellers**

- URI: `/seller`

- method: GET

- body: none


**Create Seller**

- URI: `/seller`

- method: POST

- body: {

  name: string,   | required

}

## Client


**Get Seller by id**

- URI: `/client/:id`

- method: GET

- body: none


**Delete Seller by id**

- URI: `/client/:id`

- method: DELETE

- body: none


**Update Seller by id**

- URI: `/client/:id`

- method: PUT

- body {

  name: string,   | optional if email provided

  email: string   | optional if name provided

}


**Get all clients**

- URI: `/client`

- method: GET

- body: none


**Create Client**

- URI: `/client`

- method: POST

- body: {

  name: string,   | required

  email: email,   | required

}


## Product


**Get Product by id**

- URI: `/product/:id`

- method: GET

- body: none


**Create Product**

- URI: `/product`

- method: POST

- body: {

  title: string,                        | required

  price: number,                        | required

  measureType: enum "piece" or "gram",  | required

  count: integer                        | required

}

## Sale


**Get Sale**

- URI: `/sale/:id`

- method: GET

- body: none

**Create Sale (Order)**

- URI: `/sale`

- method: POST

- body: {

  paid: number,           | required

  clientId: number,       | required

  sellerId: number,       | required

  products: [

      {

          id: number,     | required

          count: number   | required

      },

      {

          id: number,     | required

          count: number   | required

      }

  ]                       | required

}

paid - Amount paid by the customer

clientId - Client's id

sellerId - Seller's id

products - Products purchased by the customer

id       - Product id

count    - Quantity or weight of the Product to be purchased. e.g 2 for 2 pieces, 1000 for 1000 grams