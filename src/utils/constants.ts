
import PropTypes from 'prop-types';

export const baseUrl = "https://norma.nomoreparties.space/api";
export const authUrl = `${baseUrl}/auth`;
export const ordersUrl = "wss://norma.nomoreparties.space/orders";
export const userOrderUrl = `${baseUrl}/orders`;

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

export const orderType = PropTypes.shape({
    createdAt:  PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    number:  PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
});

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
