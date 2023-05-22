import {
  Box,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Stack,
  Text,
  useColorModeValue as mode,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';
import { AiFillShop, AiOutlineMail, AiOutlineInstagram } from 'react-icons/ai';

const Footer = () => (
  <Box w='100%' bg={mode('gray.100', 'gray.900')}>
    <Container as='footer' role='contentinfo' maxW='7xl'>
      <Stack
        spacing='8'
        direction={{ base: 'column', md: 'row' }}
        justify='space-between'
        py={{ base: '12', md: '16' }}
      >
        <Stack spacing={{ base: '6', md: '8' }} align='start'>
          <Flex alignItems='center'>
            <Icon as={AiFillShop} h={10} w={10} color='blue.500' />
            <Text fontSize='2xl' fontWeight='extrabold' pl='2'>
              Grahanindo Store
            </Text>
          </Flex>
          <Text color='muted' fontWeight='semibold'>
            Industial Pump Manufacturer and Distributor.
          </Text>
        </Stack>
        <Stack
          direction={{ base: 'column-reverse', md: 'column', lg: 'column-reverse' }}
          spacing={{ base: '12', md: '8' }}
        >
          <Stack spacing='8'>
            <Stack pt='8' justify='space-between' direction={{ base: 'column' }} align='center'>
              <Text fontSize='lg' fontWeight='extrabold'>
                Contact Us
              </Text>
              <ButtonGroup variant='ghost'>
                <IconButton
                  as='a'
                  href='https://wa.me/+6285157311671?text=Halo%2C%20saya%20memiliki%20pertanyaan%20tentang%20Grahanindo%20Store.%20Apakah%20admin%20sedang%20online%20%3F'
                  target='_blank'
                  aria-label='Whatsapp'
                  icon={<FaWhatsapp fontSize='1.25rem' />}
                />
                <IconButton
                  as='a'
                  href='mailto:louissaga@gmail.com'
                  target='_blank'
                  aria-label='Email'
                  icon={<AiOutlineMail fontSize='1.25rem' />}
                />
                <IconButton
                  as='a'
                  href='https://www.instagram.com/laurenncius/'
                  target='_blank'
                  aria-label='Instagram'
                  icon={<AiOutlineInstagram fontSize='1.25rem' />}
                />
              </ButtonGroup>
            </Stack>
            {/* <Stack spacing='4' minW='36' flex='1'>
              <Text fontSize='sm' fontWeight='semibold' color='subtle'>
                Legal
              </Text>
              <Stack spacing='3' shouldWrapChildren>
                <Button variant='link'>Privacy</Button>
                <Button variant='link'>Terms</Button>
                <Button variant='link'>License</Button>
              </Stack>
            </Stack> */}
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack align='center' pt='8' pb='12' justify='space-between' direction={{ base: 'column-reverse', md: 'row' }}>
        <Text fontSize='sm' color='subtle'>
          &copy; {new Date().getFullYear()} PT. Grahanindo Mecanitron, Inc. All rights reserved.
        </Text>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
