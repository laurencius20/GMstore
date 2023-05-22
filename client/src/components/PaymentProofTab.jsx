import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPaymentPhotos, deletePaymentPhoto, resetErrorAndRemoval } from '../redux/actions/adminActions';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';

import {
  Box,
  TableContainer,
  Th,
  Tr,
  Table,
  Td,
  Thead,
  Tbody,
  Button,
  useDisclosure,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const PaymentProofTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { paymentPhotos, paymentPhotoRemoval } = admin;
  const toast = useToast();

  const [paymentPhotoToDelete, setPaymentPhotoToDelete] = useState('');

  const openDeleteConfirmBox = (photo) => {
    setPaymentPhotoToDelete(photo);
    onOpen();
  };

  useEffect(() => {
    dispatch(getAllPaymentPhotos());
    dispatch(resetErrorAndRemoval());
    if (paymentPhotoRemoval) {
      toast({ description: 'Payment Photo has been removed.', status: 'success', isClosable: true, duration: 3000 });
    }
  }, [dispatch, toast, paymentPhotoRemoval]);

  return (
    <div>
      <Box>
        <TableContainer>
          <Table variant='simple' size='sm'>
            <Thead>
              <Tr>
                <Th>Payment Proof</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paymentPhotos &&
                paymentPhotos.map((photo) => (
                  <Tr key={photo._id}>
                    <Td>
                      <img width='250' height='250' src={photo.paymentPhoto} />
                    </Td>
                    <Td>
                      <Flex direction='column'>
                        <Button variant='outline' onClick={() => openDeleteConfirmBox(photo)}>
                          <DeleteIcon mr='5px' />
                          Remove Photo
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        <ConfirmRemovalAlert
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          cancelRef={cancelRef}
          itemToDelete={paymentPhotoToDelete}
          deleteAction={deletePaymentPhoto}
        />
      </Box>
    </div>
  );
};

export default PaymentProofTab;
