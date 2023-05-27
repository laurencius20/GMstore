import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  useColorModeValue,
  Text,
  Button,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { Link as ReactLink } from 'react-router-dom';
import { AiFillShop } from 'react-icons/ai';

const LandingScreen = () => (
  <>
    <Box maxW='8xl' mx='auto' px={{ base: '0', lg: '12' }} py={{ base: '0', lg: '12' }} minH='2xl'>
      <Stack direction={{ base: 'column-reverse', lg: 'row' }} spacing={{ base: '0', lg: '20' }}>
        <Box
          width={{ lg: 'sm' }}
          transform={{ base: 'translateY(-50%)', lg: 'none' }}
          bg={{ base: useColorModeValue('blue.50', 'gray.700'), lg: 'transparent' }}
          mx={{ base: '6', md: '8', lg: '0' }}
          px={{ base: '6', md: '8', lg: '0' }}
          py={{ base: '6', md: '8', lg: '12' }}
        >
          <Stack spacing={{ base: '8', lg: '10' }}>
            <Stack spacing={{ base: '2', lg: '4' }}>
              <Flex alignItems='center'>
                <Icon as={AiFillShop} h={12} w={12} color={useColorModeValue('blue.500', 'blue.300')} />
                <Text fontSize='4xl' fontWeight='bold' pl='2'>
                  Grahanindo Store
                </Text>
              </Flex>
              <Heading size='lg' fontWeight='normal'>
                Selling Pumps and Parts !
              </Heading>
            </Stack>
            <HStack spacing='3'>
              <Link
                as={ReactLink}
                to='/products'
                color={useColorModeValue('blue.500', 'blue.300')}
                fontWeight='bold'
                fontSize='lg'
                variant='ghost'
              >
                <Button colorScheme='blue' variant='ghost'>
                  Discover now
                </Button>
              </Link>
              <Icon color={useColorModeValue('blue.500', 'blue.300')} as={FaArrowRight} />
            </HStack>
          </Stack>
        </Box>
        <Flex flex='1' overflow='hidden'>
          <Image
            src='images/landing.jpg'
            alt='Lovely Image'
            fallback={<Skeleton />}
            maxH='550px'
            minW='300px'
            objectFit='cover'
            flex='1'
          />
        </Flex>
      </Stack>
    </Box>
    {/* About Us Section */}
    <Box maxW='8xl' mx='auto' px={{ base: '0', lg: '12' }} py={{ base: '0', lg: '12' }}>
      <Box
        mx={{ base: '6', md: '8', lg: '0' }}
        px={{ base: '6', md: '8', lg: '0' }}
        py={{ base: '6', md: '8', lg: '12' }}
      >
        <Stack direction={{ base: 'column-reverse', lg: 'row' }}>
          <Stack>
            <Box width={{ sm: '400px', md: '600px', lg: '600px' }}>
              <Heading size='lg'>About Us</Heading>
              <Heading size='md' pt='2'>
                PT. Grahanindo Mecanitron
              </Heading>
              <Text align='justify' fontSize='md' pt='2'>
                PT. Grahanindo Mecanitron is an established agency company for a range of reputable engineered products
                of pumps, pumping systems and fluid handling components. Industries we are mainly servicing are Food &
                Beverage, Chemical processing, Oil & Gas/Petrochemicals, Paint, Ceramics, Pulp & Paper, Automotive,
                Industrial, Building/construction and the water and waste water treatment industries.
              </Text>
            </Box>
          </Stack>
          <Stack>
            <Box>
              <Image src='images/logo.png' pt='12' pl={{ base: '0', lg: '16' }} w={600} h={150} />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  </>
);

export default LandingScreen;
