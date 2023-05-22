import { Button, Alert, AlertTitle, AlertIcon, Wrap, useToast, Stack } from '@chakra-ui/react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';

const OrderSuccessScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const logoutHandler = () => {
    dispatch(logout());
    toast({ description: 'You have been logged out.', status: 'success', isClosable: true });
    navigate('/');
  };

  return (
    <Wrap justify='center' direction='column' align='center' mt='20px' minH='45vh'>
      <Alert
        status='success'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='auto'
      >
        <AlertIcon boxSize='55px' />
        <AlertTitle pt='8px' fontSize='xl'>
          Payment Successful!
        </AlertTitle>

        <Stack mt='20px' minW='200px'>
          <Button colorScheme='green' variant='outline' as={ReactLink} to='/your-orders'>
            Your Order
          </Button>
          <Button colorScheme='green' variant='outline' as={ReactLink} to='/products'>
            Products
          </Button>
          <Button colorScheme='green' variant='outline' as={ReactLink} onClick={logoutHandler}>
            Logout
          </Button>
        </Stack>
      </Alert>
    </Wrap>
  );
};

export default OrderSuccessScreen;