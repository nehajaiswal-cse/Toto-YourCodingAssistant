import { useContext } from "react";
import { fixCode } from "../service/chatapi";
import { ChatContext } from "../chatContext";
import { createChat, updateChat } from "../service/chatHistoryapi";

export const useCodefix = () => {
  const context = useContext(ChatContext);

  const {
    messages,
    setMessages,
    loading,
    setLoading,
    error,
    code,
    setCode,
    currentChatId,
    setCurrentChatId,
    chats,
    setChats,
  } = context;

  const cleanReply = (text) => {
    if (!text) return "Code fixed successfully";

    return text
      .replace(/```[\s\S]*?```/g, "")
      .replace(/\n\s*\n/g, "\n")
      .trim();
  };

  const fixcode = async (prompt) => {
    if (!prompt.trim()) return;

    const userMsg = {
      role: "user",
      content: prompt,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    try {
      setLoading(true);

      const res = await fixCode(prompt);

      const aiMsg = {
        role: "ai",
        content:
          cleanReply(res.reply) ||
          "Your code has been analyzed and fixed.",
      };

      const updatedMessages = [...newMessages, aiMsg];
      setMessages(updatedMessages);

      if (!currentChatId) {
        const chat = await createChat(updatedMessages);

        setCurrentChatId(chat.data._id);
        setChats((prev) => [chat.data, ...prev]);
      } else {
        await updateChat(currentChatId, [userMsg, aiMsg]);
      }

      // Updated fixed code
      setCode({
        html: res.code?.html || "",
        css: res.code?.css || "",
        js: res.code?.js || "",
      });
    } catch (err) {
      console.error("Code Fix Error:", err);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Failed to fix the code. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    fixcode,
    loading,
    error,
    code,
    chats,
    setChats,
    setMessages,
    setCurrentChatId,
  };
};