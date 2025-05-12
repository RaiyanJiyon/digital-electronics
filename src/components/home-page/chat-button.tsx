"use client";

import type React from "react";
import { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

// Keywords that trigger the AI to respond
const RELEVANT_KEYWORDS = [
  "phone",
  "laptop",
  "tablet",
  "smartwatch",
  "camera",
  "product",
  "compare",
  "best",
  "buy",
  "recommend",
];

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! Welcome to our digital store. How can I help you today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const isRelevantMessage = (msg: string): boolean => {
    const lowerMsg = msg.toLowerCase();
    return RELEVANT_KEYWORDS.some((keyword) => lowerMsg.includes(keyword));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setMessage("");

    // Only respond if the message is relevant
    if (!isRelevantMessage(message)) {
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm here to help with digital product recommendations and comparisons. Could you tell me more about the kind of device or product you're looking for?",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackResponse]);
      return;
    }

    setIsLoading(true);

    try {
      const prompt = `
You are a helpful AI assistant for a digital e-commerce store.
The user asked: "${message}"

Your task:
- Help them find digital products like smartphones, laptops, tablets, smartwatches, etc.
- Suggest top models based on their needs.
- Compare features, prices, and brands.
- Keep your response clear and helpful.
`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      console.log(response);

      const data = await response.json();
      console.log(data);
      const aiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ??
        "I couldn't generate a response. Please try again.";
      console.log(aiResponse);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "There was an issue connecting to the AI service. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors z-50"
        aria-label="Chat with us"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 top-4 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-lg shadow-xl flex flex-col z-50 border border-gray-200">
          {/* Chat Header */}
          <div className="bg-red-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Digital Assistant</h3>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.sender === "user"
                      ? "bg-red-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {msg.sender === "ai" ? (
                      <Bot className="h-4 w-4 mr-1" />
                    ) : (
                      <User className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-xs opacity-75">
                      {msg.sender === "ai" ? "Digital Assistant" : "You"}
                    </span>
                  </div>
                  <div className="prose">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-xs opacity-75">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                  <p className="text-sm text-gray-500">Typing...</p>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-gray-200 p-4 flex items-center"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent h-10"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700 transition-colors h-10 disabled:opacity-50"
              disabled={!message.trim() || isLoading}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
