const FoodModel = require("../models/food");
const moment = require("moment");

const getFoods = async (req, res) => {
  const { type, startDate, endDate } = req.query;
  const availableTypes = ["grosir", "eceran", "produsen"];
  let isTypeValid = false;
  availableTypes.forEach((availableType) => {
    if (type && type === availableType) {
      isTypeValid = true;
    }
  });

  if (!isTypeValid) {
    return res.status(400).json({
      message: "type tidak valid",
    });
  }

  const parsedStartDate = moment(startDate, "YYYY-MM-DD", true);
  const parsedEndDate = moment(endDate, "YYYY-MM-DD", true);

  if (!parsedStartDate.isValid() || !parsedEndDate.isValid()) {
    return res.status(400).json({
      message: "date tidak valid",
    });
  }

  try {
    const [foodNames] = await FoodModel.getFoods();
    const foodPrices = [];
    for (const foodName of foodNames) {
      const [foodPrice] = await FoodModel.getFoodPrice(
        foodName.id,
        type,
        startDate,
        endDate
      );

      if (foodPrice.length > 0) {
        foodPrices.push({
          id: foodName.id,
          name: foodName.name,
          price: foodPrice[0].price,
          img: foodName.img,
          type: foodPrice[0].type,
        });
      }
    }

    return res.json({
      data: {
        foodPrices,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getFoods,
};
