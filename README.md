# Project Name : Fitness Equipment and accessories (Server)

**Live Link Server: [https://fitness-equipment-server-silk.vercel.app](https://fitness-equipment-server-silk.vercel.app/)** 
**Website Live Link : [https://epicfit.vercel.app/](https://epicfit.vercel.app/)** </br>

## Features

1. **User Sign up system**
2. **User log in system**
3. **Create product by Admin**
4. **Retrieve All product and Specific product Also Update and Delete product**
5. **Control all user**
6. **Create product category**
7. **Control product category**
8. **Create order product api**
9.  **Manage all order**


## Technology Used

1. **Node.js**
2. **Express.js**
3. **Mongoose**
4. **TypeScript**
5. **Dotenv**
6. **Zod Validation**
7. **Jsonwebtoken**
8. **http-status**




## Instructions on how to run the application locally

1. **Clone or download the repository:**
   - First you clone the repository .
    
   - Or download the repository .

2. **Open the project:**
   - Open the project directory.

3. **Install packages:**
   - Open a command terminal or Git Bash to run the following command to install all necessary packages:
     ```
     npm install
     ```

4. **Set up environment variables:**
   - Create a `.env` file in the root of the project.
   - Add the following environment variables in the `.env` file:
     ```
     PORT=5000

     DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.25fgudl.mongodb.net/carWashing?retryWrites=true&w=majority&appName=Cluster0

     JWT_ACCESS_TOKEN_SECRET=jfkgkjfdioufdhjfgshuirturt8uiyhueruiourjeioteroehjkfgjkfghkjjk
     
     JWT_ACCESS_EXPIRES_IN=5d
     
     ```
     Replace `username` and `password` with your MongoDB `username` and `password`. <br>
    **`It's Just example create this veriable with your own imformation`**
5. **Run the application:**
   - Open a terminal in the project directory and run the following command to start the project:
     ```
     npm run start
     ```
   - Your project should now be running.
