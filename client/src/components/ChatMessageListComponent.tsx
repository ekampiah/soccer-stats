import React, { ReactElement, useMemo, useRef } from "react";
import { ChatMessage } from "../App";
import ChatMessageComponent from "./ChatMessageComponent";

export default function ChatMessageListComponent({
  messages,
}: {
  messages: ChatMessage[];
}) {
  const chatMessages = useMemo(() => {
    let elements = [];
    for (let i = 0; i < messages.length; i++) {
      elements.push(
        <ChatMessageComponent
          key={i}
          message={messages[i]}
          isLast={i == messages.length - 1}
        />
      );
    }
    return elements;
  }, [messages]);
  return (
    <div
      className="flex flex-col overflow-y-scroll h-[200px] mb-5 md:h-[60%] md:overflow-y-auto"
      id="chat"
    >
      {chatMessages}
    </div>
  );
}
