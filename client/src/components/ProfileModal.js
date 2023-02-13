import { ViewIcon } from "@chakra-ui/icons";
import { EmailIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Stack,
  Heading,
  Center,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor="#DEEDCF">
          <ModalCloseButton />

          <Image
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            h={'150px'}
            w={'full'}
            src={
              'https://images.unsplash.com/photo-1558470598-a5dda9640f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80'
            }
            objectFit={'cover'}
          />
          <Center>
            <Image
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'outline'}
              marginTop={"-25px"}
              position={"absolute"}
              h={'150px'}
              w={'150px'}
              src={user.avatar}
              objectFit={'cover'}
              borderRadius="50%"
            />
          </Center>
          <Box paddingTop={"80px"}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'xxx-large'} fontWeight={500} fontFamily={'body'}>
                {user.username}
              </Heading>
              <Text color={'gray.500'} fontSize={"x-large"}>{user.bio}</Text>
            </Stack>
            <Stack align={'center'}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}><EmailIcon boxSize={"30px"} /></Text>
                <Text fontSize={'25px'} color={'gray.500'}>
                  {user.email}

                </Text>
              </Stack>
            </Stack>
          </Box>
          <ModalFooter>
            <Button
              w={'full'}
              mt={8}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
