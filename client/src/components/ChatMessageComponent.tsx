import { ChatMessage } from "../App";

export default function ChatMessageComponent({
  message,
  isLast,
}: {
  message: ChatMessage;
  isLast: boolean;
}) {
  return (
    <div
      className="p-2 bg-white shadow-md rounded-lg mb-2"
      {...(isLast ? { ref: (el) => el?.scrollIntoView() } : {})}
    >
      <div className="flex md:items-center flex-col md:flex-row">
        <div className="font-bold">{message.username}</div>
        <div className="text-gray-500 text-xs md:text-sm md:ml-2">{message.time}</div>
      </div>
      <div className="text-gray-800">{message.message}</div>
    </div>
  );
}
