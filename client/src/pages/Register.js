import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Login, Signup } from "../components";
import { useNavigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../utils/localStorage";
import MockupImage from "../assets/img/background.png";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getUserFromLocalStorage("user")) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [navigate]);

  return (
    <>
      <div className="main-container">
        <img src={MockupImage} alt="mockup" className="mockup"  />
        <Container maxW="xl" d="flex">
          <Box
            d="flex"
            justifyContent="center"
            p={3}
            bg="white"
            w="100%"
            m="40px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
          >
            <Text
              fontSize="80px"
              fontFamily="Poppins"
              textAlign="center"
              fontWeight={700}
              css={{
                background:
                  "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);",
                textFillColor: "text",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                " -webkit-text-fill-color": "transparent",
              }}
            >
              ProloCHAT
            </Text>

            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
              <Tabs
                isFitted
                variant="soft-rounded"
                colorScheme=" rgba(67, 43, 255, 0.8);"
                
              >
                <TabList mb="1em">
                  <Tab>Sign in</Tab>
                  <Tab>Sign Up</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Login />
                  </TabPanel>
                  <TabPanel>
                    <Signup />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Register;
