import { Pool } from "pg";

export default new Pool({
  connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DB_PORT || 5432}/${process.env.DATABASE}`
});