import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";
import { UilUser,UilSignout,UilEdit } from '@iconscout/react-unicons';
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { Spinner } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

import { toast } from "react-toastify";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import { useAppContext } from "../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import EditProfileModal from "./EditProfileModal";
import { removeUserFromLocalStorage } from "../utils/localStorage";
import { getSender } from "../config/chat";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = useAppContext();

   const logoutHandler = () => {
    removeUserFromLocalStorage("user");
    navigate("/register");
  };

  const handleSearch = async () => {
    if (!search) {
      toast.error("Please Provide username");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.get(`/api/v1/auth/users?search=${search}`);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error(error);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const { data } = await api.post(`/api/v1/chat`, { userId });

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <FiSearch />
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text
          fontSize="2xl"
          fontFamily="Poppins"
          css={{
            background:
              "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);",
            textFillColor: "text",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            " -webkit-text-fill-color": "transparent",
            fontWeight: 700,
          }}
        >
          ProloCHAT
        </Text>
        <div>
          <Menu>
          <MenuButton >
              {notification.length >= 1 ? (
                <b>{notification.length} <BellIcon color={"red"} fontSize="2xl" m={1} /></b>
              ) : <BellIcon fontSize="2xl" m={1} />}
              {/* <Badge badgeContent={notification.length} color="secondary">
                <MailIcon/>
              </Badge> */}
            </MenuButton>
            <MenuList pl={2}>
              {!notification?.length && "No New Message"}
              {notification?.map((noti) => (
                <MenuItem
                  key={noti._id}
                  onClick={() => {
                    setSelectedChat(noti.chat);
                    setNotification(notification.filter((n) => n !== noti));
                  }}
                >
                  {noti?.chat?.isGroupChat
                    ? `New Message in ${noti?.chat?.chatName}`
                    : `New Message from ${getSender(user, noti?.chat?.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu >
            <MenuButton p={4} as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                src={user.avatar}
              />
              

            </MenuButton>
            <MenuList >
              <Text
                fontSize="2xl"
                fontFamily="Poppins"
                align="center"
                css={{
                  background:
                    "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);",
                  textFillColor: "text",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  " -webkit-text-fill-color": "transparent",
                  fontWeight: 700,
                }}
              >Settings</Text>
              <MenuDivider />
              <ProfileModal user={user}>
              
                <MenuItem 
                bg={"#f5fcf7"} 
                h = {"50px"}
                padding = {"20px"}
                color = {"#404242"}
                width={"300px"}
                borderRadius = {"10px"}
                fontWeight ={"bold"}
                _hover ={{
                  color : '#edf0f0',
                  bg : '#3e9a9c',
                }}
                >
                  <UilUser 
                    size="25" 
                    color="#14403b"
                    _hover ={{
                      color : '#edf0f0',
                    }}
                    />
                  See your profile
                </MenuItem>
              </ProfileModal>

              <EditProfileModal user={user}>
              
                <MenuItem 
                bg={"#f5fcf7"} 
                h = {"50px"}
                padding = {"20px"}
                color = {"#404242"}
                width={"300px"}
                borderRadius = {"10px"}
                fontWeight ={"bold"}
                _hover ={{
                  color : '#edf0f0',
                  bg : '#3e9a9c',
                }}
                >
                  <UilEdit
                    size="25" 
                    color="#14403b"
                    _hover ={{
                      color : '#edf0f0',
                    }}
                    />
                  Edit your profile
                </MenuItem>
              </EditProfileModal>
              <MenuDivider />
              
              
              <MenuItem 
                bg={"#f5fcf7"} 
                color = {"#404242"}
                width={"300px"}
                borderRadius = {"10px"}
                fontWeight ={"bold"}
                onClick = {logoutHandler}
                _hover ={{
                  color : '#edf0f0',
                  bg : '#3e9a9c',
                }}
                >
                <UilSignout 
                size="25" 
                color="#14403b"
                _hover ={{
                  color : '#edf0f0',
                }}
                />
                  Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <Text
            height="max-content"
            fontSize="20px"
            fontFamily="Poppins"
            alignSelf="center"
            margin="20px"
          >
            Search Users
          </Text>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
