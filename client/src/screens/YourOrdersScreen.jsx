import {
  TableContainer,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  Th,
  Tbody,
  Tr,
  Thead,
  // Button,
  ListItem,
  UnorderedList,
  Table,
  Td,
  AlertTitle,
  Wrap,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../redux/actions/userActions';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CheckCircleIcon } from '@chakra-ui/icons';

const YourOrdersScreen = () => {
  const dispatch = useDispatch();

  // Testing
  // const admin = useSelector((state) => state.admin);
  // const { orderStatus } = admin;

  const user = useSelector((state) => state.user);
  const { loading, error, orders, userInfo } = user;
  const location = useLocation();

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserOrders());
    }
  }, [userInfo, dispatch]);

  return userInfo ? (
    <>
      {loading ? (
        <Wrap justify='center' direction='column' align='center' mt='20px' minH='100vh'>
          <Stack direction='row' spacing={4}>
            <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
          </Stack>
        </Wrap>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        orders && (
          <TableContainer minHeight='100vh'>
            <Table variant='striped'>
              <Thead>
                <Tr>
                  <Th>Order Id</Th>
                  <Th>Order Date</Th>
                  <Th>Shipping Price</Th>
                  <Th>Paid Total</Th>
                  <Th>Items</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order) => (
                  <Tr key={order._id}>
                    <Td>{order._id}</Td>
                    <Td>{new Date(order.createdAt).toDateString()}</Td>
                    <Td>Rp. {Number(order.shippingPrice).toLocaleString('id-ID', { maximumFractionDigits: 3 })}</Td>
                    <Td>Rp. {Number(order.totalPrice).toLocaleString('id-ID', { maximumFractionDigits: 3 })}</Td>
                    <Td>
                      {order.orderItems.map((item) => (
                        <UnorderedList key={item._id}>
                          <ListItem>
                            {item.qty} x {item.name} (Rp.{' '}
                            {Number(item.price).toLocaleString('id-ID', { maximumFractionDigits: 3 })} ech)
                          </ListItem>
                        </UnorderedList>
                      ))}
                    </Td>
                    <Td>{order.isDelivered ? <CheckCircleIcon /> : 'Pending'}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )
      )}
    </>
  ) : (
    <Navigate to='/login' replace={true} state={{ from: location }} />
  );
};

export default YourOrdersScreen;
