
import PropTypes from 'prop-types';

export const baseUrl = "https://norma.nomoreparties.space/api";
export const authUrl = "https://norma.nomoreparties.space/api/auth";
export const ingredientType = PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates:  PropTypes.number.isRequired,
    fat:  PropTypes.number.isRequired,
    image:  PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price:  PropTypes.number.isRequired,
    proteins:  PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v:  PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired
});
export const  ordersData = {
    "success": true,
    "orders": [
      {
        "ingredients": [
          "60d3463f7034a000269f45e9",
          "60d3463f7034a000269f45e7"
        ],
        "_id": "",
        "status": "done",
        "number": 1,
        "createdAt": "2021-06-23T20:11:01.403Z",
        "updatedAt": "2021-06-23T20:11:01.406Z"
      },
      {
        "ingredients": [
          "60d3463f7034a000269f45e9"
        ],
        "_id": "",
        "status": "done",
        "number": 3,
        "createdAt": "2021-06-23T20:13:23.654Z",
        "updatedAt": "2021-06-23T20:13:23.657Z"
      }
    ],
    "total": 2,
    "totalToday": 2
  } 