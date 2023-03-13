import { saveAs } from 'file-saver'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Image,
  Center,
  ModalFooter,
  Button
} from "@chakra-ui/react";

const PreviewFileModal = ({ file, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const downloadImage = () => {
    saveAs(file.attachment, file.attachment.name) // Put your image url here.
}

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={"none"}
          onClick={onOpen}
        />
      )}
      <Modal size={"xxl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay  bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
        <ModalContent >
          <ModalCloseButton bgColor={"whitesmoke"} />
          <Center>
            <Image
              src={file.attachment}
              objectFit={'cover'}
             
            />
          </Center>
       
        <ModalFooter>
            <Button
              w={'full'}
              mt={8}
              color={'blue'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              onClick={downloadImage}
            >
              Download
            </Button>
          </ModalFooter>
          </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewFileModal;