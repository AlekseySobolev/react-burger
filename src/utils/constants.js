
import PropTypes from 'prop-types';

export const baseUrl = "https://norma.nomoreparties.space/api";
export const authUrl = "https://norma.nomoreparties.space/api/auth";
export const ordersUrl = "wss://norma.nomoreparties.space/orders";
export const userOrderUrl = "https://norma.nomoreparties.space/api/orders";

export const orderColors = {
  done: "#00CCCC",
  pending: "#F2F2F3",
  created: "#F2F2F3"

}
export const orderLocaleStatus = {
  done: "Выполнен",
  pending: "В работе",
  created: "Создан"
}

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

export const orderType = PropTypes.shape({
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
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6"
        ],
        "_id": "",
        "name": "Dead star burger",
        "status": "Отменен",
        "number": "034535",
        "createdAt": "Сегодня, 16:20 i-GMT+3",
        "updatedAt": "2021-06-23T20:11:01.406Z"
      },
      {
        "ingredients": [
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6"
        ],
        "_id": "",
        "name": "Interstellar burger",
        "status": "Создан",
        "number": "034536",
        "createdAt": "Сегодня, 16:20 i-GMT+3",
        "updatedAt": "2021-06-23T20:13:23.657Z"
      },
      {
        "ingredients": [
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          
        ],
        "_id": "",
        "name": "Dead star burger",
        "status": "Готовится",
        "number": "034537",
        "createdAt": "Сегодня, 16:20 i-GMT+3",
        "updatedAt": "2021-06-23T20:11:01.406Z"
      },
      {
        "ingredients": [
          "60d3b41abdacab0026a733c6"
        ],
        "_id": "",
        "name": "Interstellar burger",
        "status": "Создан",
        "number": "034530",
        "createdAt": "Сегодня, 16:20 i-GMT+3",
        "updatedAt": "2021-06-23T20:13:23.657Z"
      },
      {
        "ingredients": [
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6"
        ],
        "_id": "",
        "name": "Dead star burger",
        "status": "Отменен",
        "number": "034535",
        "createdAt": "Сегодня, 16:20 i-GMT+3",
        "updatedAt": "2021-06-23T20:11:01.406Z"
      },
      {
        "ingredients": [
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6"
        ],
        "_id": "",
        "name": "Interstellar burger",
        "status": "Создан",
        "number": "034536",
        "createdAt": "Сегодня, 16:20 i-GMT+3",
        "updatedAt": "2021-06-23T20:13:23.657Z"
      },
      {
        "ingredients": [
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c6",
          
        ],
        "_id": "",
        "name": "Dead star burger",
        "status": "Готовится",
        "number": "034537",
        "createdAt": "Сегодня, 16:20 i-GMT+3",
        "updatedAt": "2021-06-23T20:11:01.406Z"
      },
      {
        "ingredients": [
          "60d3b41abdacab0026a733c6"
        ],
        "_id": "",
        "name": "Interstellar burger",
        "status": "Создан",
        "number": "034530",
        "createdAt": "Сегодня, 16:20 i-GMT+3",
        "updatedAt": "2021-06-23T20:13:23.657Z"
      } 
    ],
    "total": 4,
    "totalToday": 4
  } 