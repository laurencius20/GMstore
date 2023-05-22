import { Button, Flex, Heading, Stack, Text, useColorModeValue as mode, Badge } from '@chakra-ui/react';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link as ReactLink, useNavigate } from 'react-router-dom';

const CartOrderSummary = () => {
  const [buttonLoading, setButtonLoading] = useState();
  const standardShipping = Number(100000);
  const cartItems = useSelector((state) => state.cart);
  const { subtotal } = cartItems;
  const navigate = useNavigate();
  const total = Number(subtotal) + Number(standardShipping);

  const checkoutHandler = () => {
    setButtonLoading(true);
    navigate('/checkout');
  };

  return (
    <Stack spacing='8' borderWidth='1px' rounded='lg' padding='8' w='full'>
      <Flex w='180px'>
        <Heading size='md'>Order Summary</Heading>
      </Flex>
      <Stack spacing='6'>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>
            Subtotal
          </Text>
          <Text fontWeight='medium'>Rp. {Number(subtotal).toLocaleString('id-ID', { maximumFractionDigits: 3 })}</Text>
        </Flex>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>
            Shipping
          </Text>
          <Text fontWeight='medium'>
            {subtotal < 5000000 ? (
              <Text>Rp. {Number(standardShipping).toLocaleString('id-ID', { maximumFractionDigits: 3 })}</Text>
            ) : (
              <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
                Free
              </Badge>
            )}
          </Text>
        </Flex>
        <Flex justify='space-between'>
          <Text fontSize='lg' fontWeight='extrabold'>
            Total
          </Text>
          <Text fontSize='xl' fontWeight='extrabold'>
            Rp. {''}
            {subtotal < 5000000
              ? Number(total).toLocaleString('id-ID', { maximumFractionDigits: 3 })
              : Number(subtotal).toLocaleString('id-ID', { maximumFractionDigits: 3 })}
          </Text>
        </Flex>
      </Stack>
      <Button
        as={ReactLink}
        to='/checkout'
        colorScheme='blue'
        size='lg'
        fontSize='md'
        rightIcon={<FaArrowRight />}
        isLoading={buttonLoading}
        onClick={() => checkoutHandler()}
      >
        Checkout
      </Button>
    </Stack>
  );
};

export default CartOrderSummary;
