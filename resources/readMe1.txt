https://snyk.io/blog/how-to-build-secure-api-gateway-node-js/

// for authentication
npm install express-session dotenv --save

express-session
- is a npmjs package
- this package uses a cookie to help us to guard endpoints. 
- Users who don’t have a valid session cookie will receive a error response 
    HTTP 401 (Unauthorized) 
    HTTP 403 (Forbidden) status code.

dotenv
- to keep our password a little more secure 
- by storing it in an environment variable. 
- We’ll use the dotenv package to load our SESSION_SECRET variable from a .env file into process.env

