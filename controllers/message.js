import Message from "../models/message.js";
import User from "../models/user.js";
import Chat from "../models/chat.js";
import { StatusCodes } from "http-status-codes";

import { BadRequestError } from "../errors/index.js";

const sendMessage = async (req, res) => {
  const { message, attachment , chatId } = req.body;
  let m;
  if (!message  || !chatId) {
    return new BadRequestError("Please Provide All Fields To send Message");
  }
  if (attachment && message) {
    let newMessage = {
      sender: req.user.id,
      message: message,
      attachment: attachment,
      chat: chatId,
    };

    m = await Message.create(newMessage);
  } else if (message) {
    let newMessage = {
      sender: req.user.id,
      message: message,
      chat: chatId,
    };

    m = await Message.create(newMessage);
  } else if (attachment) {
    let newMessage = {
      sender: req.user.id,
      attachment: attachment,
      chat: chatId,
    };

    m = await Message.create(newMessage);
  }

  m = await m.populate("sender", "username avatar");
  m = await m.populate("chat");
  m = await User.populate(m, {
    path: "chat.users",
    select: "username avatar email _id",
  });

  await Chat.findByIdAndUpdate(chatId, { latestMessage: m }, { new: true });

  res.status(StatusCodes.OK).json(m);
};

const allMessages = async (req, res) => {
  const { chatId } = req.params;

  const getMessage = await Message.find({ chat: chatId })
    .populate("sender", "username avatar email _id")
    .populate("chat");

  res.status(StatusCodes.OK).json(getMessage);
};

export { allMessages, sendMessage };
