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
   
      saveAs(attach.base64, attach.name) // Put your image url here.
    
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
      <Modal size={"xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
        <ModalContent >
          <ModalCloseButton color={"whitesmoke"} bgColor={"#0E8388"} _hover={{ color: "#0E8388", bgColor: "whitesmoke" }} />
          
            <Center className='container' >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column"}}
                  >
                  {attach.type.includes("image") ? 
                  <center >
                  <Image
                  borderRadius = "10px"
                  padding={"5px"}
                  src={attach.base64}
                  objectFit={'scale-down'}
                  />
                  </center> : 
                  <div style={{
                    padding :'50px'
                  }}>
                    <center 
                    style={{
                      border : "3px dashed #0E8388",
                      borderRadius : "10px",
                      padding : "50px",
                      fontSize : "20px"
                      }}>
                      
                    <h1><b>You can't preview this type of files, please hit the buton to download the file.</b></h1>
                    </center>
                  </div>
                  }
                <center >
                <Button
                  border={"0.5px solid #0E8388"}
                  w={'100px'}
                  color={'#0E8388'}
                  rounded={'md'}
                  marginBottom= {"20px"}
                  marginTop= {"20px"}
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
                </center>
              </div>
            </Center>
          
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewFileModal;