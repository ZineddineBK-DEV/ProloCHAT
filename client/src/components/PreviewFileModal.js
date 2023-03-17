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
  Button
} from "@chakra-ui/react";

const PreviewFileModal = ({ attach, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const downloadImage = () => {
    attach.map((attachment) =>
      saveAs(attachment.base64, attachment.name) // Put your image url here.
    )
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
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
        <ModalContent >
          <ModalCloseButton color={"whitesmoke"} bgColor={"#0E8388"} _hover={{ color: "#0E8388", bgColor: "whitesmoke" }} />
          {attach.map((attachment, i) =>
            <Center className='container'>
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}>
                <Image
                  key={i}
                  src={attachment.base64}
                  objectFit={'scale-down'}
                  width={"500px"}
                  height={"500px"}
                ></Image>
                <Button
                  key={i}
                  border={"0.5px solid #0E8388"}
                  position={"absolute"}
                  w={'100px'}
                  color={'#0E8388'}
                  rounded={'md'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                    bgColor: '#0E8388',
                    color: "whitesmoke"
                  }}
                  onClick={downloadImage}
                >
                  Download
                </Button>
              </div>
            </Center>)}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewFileModal;