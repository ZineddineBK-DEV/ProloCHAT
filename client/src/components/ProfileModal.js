import { ViewIcon } from "@chakra-ui/icons";
import { EmailIcon }  from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
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
        <ModalContent w="700" h="600px">
          <ModalCloseButton />

          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
           <Text
              fontSize="30px"
              fontFamily="Poppins"
              display="flex"
              justifyContent="center"
            >
              Profile
            </Text>
            <Image
              borderRadius="full"
              boxSize="50px"
              src={user.avatar}
              alt={user.username}
            />
               <Text
              fontSize="30px"
              fontFamily="Poppins"
              display="flex"
              justifyContent="flex-start"
            >
              Bio : {user.bio}
            </Text>
             <Text
              fontSize="30px"
              fontFamily="Poppins"
              display="flex"
              justifyContent="left"
            >
              Username : {user.username}
            </Text>
            <Text 
            fontSize={{ base: "28px", md: "30px" }} 
            fontFamily="Poppins"
            display="flex"
            justifyContent="left"
            >
              <EmailIcon boxSize={5}/>Email : {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
