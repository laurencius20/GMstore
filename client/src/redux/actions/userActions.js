import axios from '../../lib/axios';
import {
  setLoading,
  setError,
  userLogin,
  userLogout,
  updateUserProfile,
  resetUpdate,
  setUserOrders,
} from '../slices/user';

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/users/login', { email, password }, config);
    dispatch(userLogin(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error occured. Please try again later.'
      )
    );
  }
};

export const logout = () => (dispatch) => {
  // dispatch(resetUpdate());
  localStorage.removeItem('userInfo');
  dispatch(userLogout());
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/users/register', { name, email, password }, config);
    dispatch(userLogin(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error occured. Please try again later.'
      )
    );
  }
};

export const updateProfile = (id, name, email, password) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(`/api/users/profile/${id}`, { _id: id, name, email, password }, config);
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch(updateUserProfile(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error occured. Please try again later.'
      )
    );
  }
};

export const resetUpdateSuccess = () => async (dispatch) => {
  dispatch(resetUpdate());
};

export const getUserOrders = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(`/api/users/${userInfo._id}`, config);
    dispatch(setUserOrders(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
  }
};

// export const midtransPayment = () => async (dispatch, getState) => {
//   try {
//     const config = {
//       headers: {
//         accept: 'application/json',
//         'content-type': 'application/json',
//         authorization: 'Basic U0ItTWlkLXNlcnZlci1GeXl2LTQya1ZadmhRRXJjZUtvaXlQU2o6',
//       },
//       data: {
//         transaction_details: { order_id: 'concert-ticket-01', gross_amount: 10000 },
//         usage_limit: 2,
//       },
//     };
//     const { data } = await axios.post('https://api.sandbox.midtrans.com/v1/payment-links', config);
//   } catch (error) {}
// const options = {
//   method: 'POST',
//   url: 'https://api.sandbox.midtrans.com/v1/payment-links',
//   headers: {
//     accept: 'application/json',
//     'content-type': 'application/json',
//     authorization: 'Basic U0ItTWlkLXNlcnZlci1GeXl2LTQya1ZadmhRRXJjZUtvaXlQU2o6'
//   },
//   data: {
//     transaction_details: {order_id: 'concert-ticket-01', gross_amount: 10000},
//     usage_limit: 2
//   }
// };
// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
// };
