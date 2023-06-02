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
import axios from '../lib/axios';

const PaymentButton = ({ total, onPaymentSuccess, onPaymentError, disabled }) => {
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    if (e.target.files.length === 0) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const finishPayment = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('paymentPhoto', image);
      const response = await axios.post('/api/payments/upload-paymentPhoto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); // Success message from the server
      onPaymentSuccess();
    } catch (error) {
      console.error('Failed to post data:', error);
      onPaymentError();
    }
    setLoading(false);
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
              0000000000 - PT. Grahanindo Mecanitron
            </Text>
            <Text py='10px' fontSize='sm' fontWeight='semibold'>
              NOTE: Testing App ! Just submit any photo.
            </Text>
            <Text py='10px' fontSize='lg' fontWeight='semibold'>
              And make sure submit your payment proof !
            </Text>
            <input accept='image/*' type='file' onChange={changeHandler}></input>
            {image === '' || image === null ? '' : <img width={250} height={250} src={imagePreview} />}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={closePaymentSection}>
              Cancel
            </Button>
            {image === '' || image === null ? (
              ''
            ) : (
              <Button isLoading={loading} loadingText='Submitting' colorScheme='blue' onClick={finishPayment}>
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
