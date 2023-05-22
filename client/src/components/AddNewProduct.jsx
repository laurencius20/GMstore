import {
  Tr,
  Td,
  Button,
  VStack,
  Textarea,
  Tooltip,
  Input,
  FormControl,
  Switch,
  FormLabel,
  Text,
  Badge,
  Flex,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdDriveFolderUpload } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { uploadProduct } from '../redux/actions/adminActions';

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [productIsNew, setProductIsNew] = useState(true);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const createNewProduct = () => {
    dispatch(uploadProduct({ brand, name, category, stock, price, image, productIsNew, description }));
  };

  return (
    <Tr>
      <Td>
        <Text fontSize='sm'>Image File Name</Text>
        <Flex>
          <Select size='sm' placeholder='Select Image' value={image} onChange={(e) => setImage(e.target.value)}>
            <option value='daido-pump.jpg'>Daido Pump</option>
            <option value='ebara-pump.jpg'>Ebara Pump</option>
            <option value='gea-tp-pump.jpg'>GEA TP Pump</option>
            <option value='gea-tps-pump.jpg'>GEA TPS Pump</option>
            <option value='heishin-pumps.jpg'>Heishin Pump</option>
            <option value='netzsch-pump.jpg'>Netzsch Pump</option>
            <option value='sera-pump.jpg'>Sera Pump</option>
            <option value='torishima-pump.jpg'>Torishima Pump</option>
            <option value='yamada-pump.jpg'>Yamada Pump</option>
          </Select>
          <Tooltip
            label={
              'List Pumps : daido-pumps.jpg, ebara-pump.jpg, gea-tp-pump.jpg, gea-tps-pump.jpg, heishin-pumps.jpg, netzsch-pump.jpg, sera-pump.jpg, torishima-pump.jpg, yamada-pump.jpg'
            }
            fontSize='sm'
            closeDelay={1600}
          >
            <Button size='xs' ml={2} variant='ghost' h={8} w={8}>
              ?
            </Button>
          </Tooltip>
        </Flex>
      </Td>
      <Td>
        <Text fontSize='sm'>Description</Text>
        <Textarea
          value={description}
          w='270px'
          h='120px'
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder='Description'
          size='sm'
        />
      </Td>
      <Td>
        <Text fontSize='sm'>Brand</Text>
        <Input size='sm' value={brand} onChange={(e) => setBrand(e.target.value)} placeholder='Erabara or Yamada' />
        <Text fontSize='sm'>Name</Text>
        <Input size='sm' value={name} onChange={(e) => setName(e.target.value)} placeholder='Netzsch Pumps' />
      </Td>

      <Td>
        <Text fontSize='sm'>Category</Text>
        <Input size='sm' value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Pumps' />
        <Text fontSize='sm'>Price</Text>
        <Input size='sm' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='99.99' />
      </Td>

      <Td>
        <Text fontSize='sm'>Stock</Text>
        <Input size='sm' value={stock} onChange={(e) => setStock(e.target.value)} />
        <Text fontSize='sm'>New badge shwon on product card</Text>
        <FormControl display='flex' alignItems='center'>
          <FormLabel htmlFor='productIsNewFlag' mb='0' fontSize='sm'>
            Enable
            <Badge rounded='full' px='1' mx='1' fontSize='0.8em' colorScheme='green'>
              New
            </Badge>
            badge?
          </FormLabel>
          <Switch id='productIsNewFlag' onChange={() => setProductIsNew(!productIsNew)} isChecked={productIsNew} />
        </FormControl>
      </Td>
      <Td>
        <VStack>
          <Button variant='outline' w='160px' colorScheme='orange' onClick={() => createNewProduct()}>
            <MdDriveFolderUpload />
            <Text ml='2'>Save Product</Text>
          </Button>
        </VStack>
      </Td>
    </Tr>
  );
};

export default AddNewProduct;
