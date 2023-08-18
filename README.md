# ecomm-backend-nodejs

### Auth Endpoint for login/register
  ![image](https://github.com/Sanjeev85/ecomm-backend-nodejs/assets/54615519/5b4b835b-a2e9-4df4-af08-49bddf717404)

### CATEGORIES (Get All Categories / create category)
  ![image](https://github.com/Sanjeev85/ecomm-backend-nodejs/assets/54615519/01c64a1f-9e59-42e1-91fa-537dd0ddb82d)
  
### Products Endpoints
![image](https://github.com/Sanjeev85/ecomm-backend-nodejs/assets/54615519/f55dae85-d60c-4ee6-8054-1ce1132eeca0)
    
### UserEndpoints For various actions 
  ![image](https://github.com/Sanjeev85/ecomm-backend-nodejs/assets/54615519/b55f230b-2e0c-4367-be8c-a33e49c0addf)

### Click on Lock Icon to add bearer token on swagger-ui
![image](https://github.com/Sanjeev85/ecomm-backend-nodejs/assets/54615519/b5abf7c2-95ea-4b09-85e6-1357c9dda6d1)



#### All Routes are available in  routes.http file

### Note 
    1. This project uses local mongodb database 
    2. Categories to be created first to be able to add products to cart


### setup
    1. Clone repository by using git clone https://github.com/Sanjeev85/ecomm-backend-nodejs.git
    2. cd ecomm-backend-nodejs
    3. yarn  (For installing all libraries)
    4. Add PORT and SECRET_KEY in .env file
    5. In linux start mongod service if not started already
    6. yarn start (to start server)
    7. Navigate to http://localhost:5000/api-docs/#/ for swagger-ui 

### Used compression for decreasing response size also added ratelimiter of 100 request / 15 minutes

### Libraries Used
  1. mongoose
  2. express
  3. jwt
  4. bcrypt
  5. compression
  6. express-rate-limit
  7. cors
  8. nodemon
  9. swagger-jsdoc, swagger-ui-express








