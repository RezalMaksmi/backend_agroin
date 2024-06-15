const dbPool = require("../config/database");

const getFoods = () => {
  query = `
SELECT
    *
FROM
    foods`;
  return dbPool.execute(query);
};

/**
 * get Food price by foodId, type, and date
 * @param {number} foodId
 * @param {string} type - available values = ["grosir", "eceran", "produsen"]
 * @param {string} startDate - date format: YYYY-MM-DD
 * @param {string} endDate - date format: YYYY-MM-DD
 */
const getFoodPrice = (foodId, type, startDate, endDate) => {
  const query = `
SELECT
    *
FROM
    food_prices fp
WHERE
    fp.food_id = ? AND
    fp.type = ? AND
    DATE(fp.created_at) BETWEEN ? AND ?
ORDER BY
    fp.created_at DESC
LIMIT 1`;
  const values = [foodId, type, startDate, endDate];
  return dbPool.execute(query, values);
};

module.exports = {
  getFoods,
  getFoodPrice,
};
