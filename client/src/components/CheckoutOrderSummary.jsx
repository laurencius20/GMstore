import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  Badge,
  Box,
  Link,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import { createOrder, resetOrder } from '../redux/actions/orderActions';
import { resetCart } from '../redux/actions/cartActions';
import { useEffect, useState, useCallback } from 'react';
import CheckoutItem from './CheckoutItem';
// import PayPalButton from './PayPalButton';
import PaymentButton from './PaymentButton';

const CheckoutOrderSummary = () => {
  const colorMode = mode('gray.600', 'gray.400');
  const cartItems = useSelector((state) => state.cart);
  const { cart, subtotal, expressShipping } = cartItems;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const shippingInfo = useSelector((state) => state.order);
  const { error, shippingAddress } = shippingInfo;
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  //  {Number(product.price).toLocaleString('id-ID', { maximumFractionDigits: 3 })}

  // shipping cost : 350.00 express, 150.00 standart
  // If Subtotal < 2100 (30 Juta), then shipping 150.00. Else, if subtotal > 2100, then shipping free. If expressShipping = true, subtotal + 350
  const shipping = useCallback(
    () => (expressShipping === 'true' ? 200000 : subtotal < 5000000 ? 100000 : 0),
    [expressShipping, subtotal]
  );

  const total = useCallback(
    () => Number(shipping() === 0 ? Number(subtotal) : Number(subtotal) + shipping()).toFixed(2),
    [shipping, subtotal]
  );

  useEffect(() => {
    if (!error) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [error, shippingAddress, total, expressShipping, shipping, dispatch]);

  const onPaymentSuccess = async (data) => {
    dispatch(
      createOrder({
        orderItems: cart,
        shippingAddress,
        paymentDetails: data,
        shippingPrice: shipping(),
        totalPrice: total(),
        userInfo,
      })
    );
    dispatch(resetOrder());
    dispatch(resetCart());
    navigate('/order-success');
  };

  const onPaymentError = () => {
    toast({
      description:
        'Something went wrong during the payment. Please try again or make sure your balance is enough for this purchase',
      status: 'error',
      duration: '600000',
      isClosable: true,
    });
  };

  return (
    <Stack spacing='8' rounded='xl' padding='8' width='full'>
      <Heading size='md'>Order Summary</Heading>
      {cart.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}

      <Stack spacing='6'>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={colorMode}>
            Subtotal
          </Text>
          <Text fontWeight='medium' color={colorMode}>
            Rp. {Number(subtotal).toLocaleString('id-ID', { maximumFractionDigits: 3 })}
          </Text>
        </Flex>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={colorMode}>
            Shipping
          </Text>
          <Text fontWeight='medium' color={colorMode}>
            {shipping() === 0 ? (
              <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
                Free
              </Badge>
            ) : (
              `Rp. ${Number(shipping()).toLocaleString('id-ID', { maximumFractionDigits: 3 })}`
            )}
          </Text>
        </Flex>

        <Flex justify='space-between'>
          <Text fontSize='lg' fontWeight='semibold'>
            Total
          </Text>
          <Text fontSize='xl' fontWeight='extrabold'>
            Rp. {Number(total()).toLocaleString('id-ID', { maximumFractionDigits: 3 })}
          </Text>
        </Flex>
      </Stack>
      <PaymentButton
        total={total}
        disabled={buttonDisabled}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
      />
      <Box align='center'>
        <Text fontSize='sm'>Have questions? or need help to complete your order?</Text>
        <Flex justifyContent='center' color={mode('blue.500', 'blue.100')}>
          <Flex align='center'>
            <PhoneIcon />
            <Text m='2'>Phone</Text>
          </Flex>
          <Flex align='center'>
            <EmailIcon />
            <Text m='2'>Email</Text>
          </Flex>
        </Flex>
      </Box>
      <Divider bg={mode('gray.400', 'gray.800')} />
      <Flex justifyContent='center' my='6' fontWeight='semibold'>
        {/* <p>or</p> */}
        <Link as={ReactLink} to='/products' ml='1'>
          Continue Shopping
        </Link>
      </Flex>
    </Stack>
  );
};

export default CheckoutOrderSummary;
