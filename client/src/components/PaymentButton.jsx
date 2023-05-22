import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

const PaymentButton = ({ total, onPaymentSuccess, onPaymentError, disabled }) => {
  const [image, setImage] = useState('');

  const convertToBase64 = (e) => {
    console.log(e);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log('Error : ', error);
    };
  };

  const finishPayment = async () => {
    try {
      const response = await axios.post('/api/payments/upload-paymentPhoto', { paymentPhoto: image });
      console.log(response.data); // Success message from the server
      onPaymentSuccess();
    } catch (error) {
      console.error('Failed to post data:', error);
      onPaymentError();
    }
  };

  const clearImage = () => {
    setImage('');
  };

  const closePaymentSection = () => {
    setImage(null);
    onClose();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme='blue' onClick={onOpen} isDisabled={disabled}>
        Pay Now
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight='extrabold'>Payment Section</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify='space-between'>
              <Text fontSize='lg' fontWeight='semibold'>
                Total Price :
              </Text>
              <Text fontSize='2xl' fontWeight='extrabold'>
                Rp. {Number(total()).toLocaleString('id-ID', { maximumFractionDigits: 3 })}
              </Text>
            </Flex>
            <Text pt='10px' fontSize='lg' fontWeight='semibold'>
              Please Transfer to this account :
            </Text>
            <Text align='center' pt='10px' fontSize='lg' fontWeight='bold'>
              0070732572 - Laurencius Louis
            </Text>
            <Text py='10px' fontSize='lg' fontWeight='semibold'>
              And make sure submit your payment proof !
            </Text>
            <input accept='image/*' type='file' onChange={convertToBase64}></input>
            {image === '' || image === null ? '' : <img width={250} height={250} src={image} />}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={closePaymentSection}>
              Cancel
            </Button>
            {image === '' || image === null ? (
              ''
            ) : (
              <Button colorScheme='blue' onClick={finishPayment}>
                Finish Your Order
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentButton;
