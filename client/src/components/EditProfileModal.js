import { ViewIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel, ModalHeader, position } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { toast } from "react-toastify";
import FileBase from "react-file-base64";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { removeUserFromLocalStorage} from "../utils/localStorage";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    Button,
    useDisclosure,
    IconButton,
    useColorModeValue,
    Center,
    MenuDivider,
    Text,
    Divider,

} from "@chakra-ui/react";

const EditProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        avatar: "",
        bio: "",
        password: ""
    });
    const confirmSubmit = async () => {
        if (( values.username.length <= 4)  || 
            (values.password.length <= 8) || 
            values.bio !== "" || 
            values.avatar !== "") {
            toast.warn("Nothing has changed! you need to make some changes then submit :)");
        }
        else {
            removeUserFromLocalStorage();
            navigate("/register");
            toast.info("Your infos changed! You need to login again ")
        }
    }
    
    const userNameHandler = async () => {
        const { username } = values;

        if (!username || username.length <= 4) {
            toast.error("Please Provide a valid username");

            return;
        }
        try {

            const { data } = await api.patch('/api/v1/auth/updateUserName/${userId}', {
                username
            });
            toast.success(`${data.username}, your profile has been updated successfully`);
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };
    const bioHandler = async () => {
        const { bio } = values;
        try {

            const { data } = await api.patch('/api/v1/auth/updateUserBio/${userId}', {
                bio
            });
            toast.success(`${data.username}, your profile has been updated successfully`);
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };

    const avatarHandler = async () => {
        const { avatar } = values;
        try {

            const { data } = await api.patch('/api/v1/auth/updateUserAvatar/${userId}', {
                avatar
            });
            toast.success(`${data.username}, your profile has been updated successfully`);

        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };

    const passwordHandler = async () => {
        const { password } = values;
        if (!password || password.length <= 4) {
            toast.error("Please Provide a valid password");

            return;
        }
        try {

            const { data } = await api.patch('/api/v1/auth/updateUserPassword/${userId}', {
                password
            });
            toast.success(`${data.username}, your profile has been updated successfully`);
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    };

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
            <Modal size="xl" h={"900px"} onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />

                <ModalContent backgroundColor="#ffF">
                    <ModalHeader>
                        <Center>
                            <Text fontSize="35px" ><b>- Edit your infos -</b></Text>
                        </Center>
                        <Divider />
                    </ModalHeader>
                    <Center>
                        <VStack spacing="5px" fontFamily="Poppins">
                            <FormControl id="first-name" >
                                <FormLabel fontFamily="Poppins">Username</FormLabel>
                                <Input
                                    w={"450px"}
                                    fontFamily="Poppins"
                                    placeholder="username"
                                    onChange={(e) => setValues({ ...values, username: e.target.value })}
                                />
                                <Button 
                                    margin={"10px"}
                                    colorScheme='teal' 
                                    variant='outline' 
                                    onClick={userNameHandler}>Save</Button>
                            </FormControl>
                            <tr>
                            <FormControl id="password" >
                                <FormLabel>Password</FormLabel>
                                <td>
                                <InputGroup size="md">
                                    
                                    <Input
                                        w={"450px"}
                                        type={show ? "text" : "password"}
                                        placeholder="password"
                                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                                    />
                                    <InputRightElement width="5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                            {show ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                </td>
                                <td>
                                <Button 
                                        marginLeft={"10px"}
                                        colorScheme='teal' 
                                        variant='outline' 
                                        onClick={passwordHandler}>Save</Button>
                                    </td>
                            </FormControl>
                            </tr>
                            <FormControl id="bio" >
                                <FormLabel>Bio</FormLabel>
                                <Input
                                    w={"450px"}
                                    fontFamily="Poppins"
                                    placeholder="Bio"
                                    onChange={(e) => setValues({ ...values, bio: e.target.value })}
                                />
                                <Button 
                                    margin={"10px"}
                                    colorScheme='teal' 
                                    variant='outline' 
                                    onClick={bioHandler}>Save</Button>
                            </FormControl>
                            <FormControl id="pic">
                                <FormLabel>Upload Pic</FormLabel>
                                <FileBase
                                    w={"450px"}
                                    type="file"
                                    label="Image"
                                    multiple={false}
                                    name="myFile"
                                    onDone={({ base64 }) => setValues({ ...values, avatar: base64 })}
                                />
                                <b style={{ color: "red" }}>Max size is 10MB</b>
                                <Button 
                                    margin={"10px"}
                                    colorScheme='teal' 
                                    variant='outline' 
                                    onClick={avatarHandler}>Save</Button>
                            </FormControl>
                        </VStack>
                    </Center>
                    <ModalFooter>
                        <Button
                            w={'400px'}
                            mt={4}
                            bg={useColorModeValue('#151f21', 'gray.900')}
                            color={'white'}
                            rounded={'md'}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg',
                            }}
                            onClick={confirmSubmit}
                        >
                            Confirm
                            <CheckIcon marginLeft={"80px"} />
                        </Button>
                        <Center padding={"20px"}>
                            <Divider orientation='vertical' />
                        </Center>
                        <Button
                            w={'400px'}
                            mt={4}
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
                            <CloseIcon marginLeft={"80px"} />
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditProfileModal;
