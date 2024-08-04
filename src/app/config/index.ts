import dotenv from "dotenv";
dotenv.config();

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url:process.env.DB_URL,
  jwt_access_secret:process.env.JWT_ACCESS_SECRET,
  jwt_access_expressIn:process.env.JWT_ACCESS_EXPIRESIN,
  jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expressIn:process.env.JWT_REFRESH_EXPIRESIN,
  saltRounds:process.env.SALTROUND
};
