import { Avatar, Flex, Tooltip } from "@chakra-ui/react";
import React, { useRef, useEffect } from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/chat";
import { useAppContext } from "../context/ChatProvider";
import { format, parseISO } from 'date-fns'
import PreviewFileModal from "./PreviewFileModal";

import {
  Image,
} from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const { user } = useAppContext();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
                <Tooltip
                  label={m.sender.username}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.username}
                    src={m.sender.avatar}
                  />
                </Tooltip>
              )}
            <span
              style={{
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: "40%",
                color: "grey",
                fontSize: "0.7em"
              }}
            >{format((parseISO(m.createdAt)), 'dd MMM Y hh:mm a')}
            </span>

            {m.attachment.map((attach,a) => 
              m.message && attach ?
              <ul>
              <span
              key={a}
                style={{
                  backgroundColor: `${m.sender._id === user._id ? "#95BDFF" : "#3795BD"
                    }`,
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "35%",
                  fontSize: "0.8em",
                  fontFamily: "poppins"
                }}
              >
                {m.message}
                <PreviewFileModal attach={m.attachment} key={a}>
                  <Image
                    src={attach.base64}
                    borderRadius="10px"
                    key={a}
                  />
                </PreviewFileModal>
              </span></ul> : 
              <> 
              {m.message ? 
              <ul
              key={a}
                style={{
                  backgroundColor: `${m.sender._id === user._id ? "#95BDFF" : "#3795BD"
                    }`,
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "35%",
                  fontSize: "0.8em",
                  fontFamily: "poppins"
                }}
              >
                {m.message}
             
              </ul>
                :
                <>
                  {attach ?
                  <ul>
                  <span 
                  key={a}
                  style={{
                    backgroundColor: `${m.sender._id === user._id ? "#95BDFF" : "#3795BD"
                      }`,
                    marginLeft: isSameSenderMargin(messages, m, i, user._id),
                    marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                    borderRadius: "20px",
                    maxWidth: "35%",
                  }}
                    >
                    <PreviewFileModal  attach={m.attachment} key={a}>
                      <Image
                        src={attach.base64}
                        key={a}
                      />
                    </PreviewFileModal> 
                  </span>
                  </ul>
                  : <></>
                  } </>
                  } </>
                )}

                 
          </div>
        ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ScrollableChat;
