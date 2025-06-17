import React, { useState, useEffect, useRef } from "react";

import "../components/css/PetChat.css";
import Navbar from "../components/NavBar";

export default function ChatPage() {
  const [chatStarted, setChatStarted] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingIndicatorVisible, setTypingIndicatorVisible] = useState(false);
  const chatMessagesRef = useRef(null);

  const loadChatHistory = async () => {
    console.log("Loading chat history...");
    try {
      const response = await fetch("http://localhost:3000/api/chatHistory", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setChatHistory(data.chatHistory || []);
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };
  const initializeChat = () => {
    setMessageInput("");
    setTypingIndicatorVisible(false);
  };

  useEffect(() => {
    loadChatHistory();
  }, []);

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle("open");
    } else {
      sidebar.classList.toggle("collapsed");
    }
  };

  const startNewChat = () => {
    if (chatStarted && currentChatId) {
      saveChatToHistory();
    }
    setChatStarted(false);
    setCurrentChatId(null);
    setMessages([]);
    initializeChat(); // ← ADD THIS LINE
  };

  const saveChatToHistory = () => {
    if (!chatStarted || !currentChatId) return;

    const chatData = {
      id: currentChatId,
      title: messages[0]?.content || "New Chat",
      messages: messages,
      timestamp: new Date().toISOString(),
      lastUpdated: new Date().toLocaleString(),
    };

    setChatHistory((prevHistory) => {
      const updatedHistory = prevHistory.filter(
        (chat) => chat.id !== currentChatId
      );
      return [chatData, ...updatedHistory.slice(0, 19)];
    });
  };

  const loadChatFromHistory = (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (!chat) return;

    if (chatStarted && currentChatId && currentChatId !== chatId) {
      saveChatToHistory();
    }

    setCurrentChatId(chatId);
    setChatStarted(true);
    setMessages(chat.messages);
  };

  const renderChatHistory = () => {
    if (chatHistory.length === 0) {
      return (
        <div
          style={{
            color: "#B0C4C7",
            fontSize: "12px",
            textAlign: "center",
            padding: "2rem",
            opacity: 0.7,
          }}
        >
          No chat history yet
        </div>
      );
    }

    return chatHistory.map((chat) => (
      <div
        key={chat.id}
        className={`history-item ${chat.id === currentChatId ? "active" : ""}`}
        onClick={() => loadChatFromHistory(chat.id)}
      >
        <div className="history-item-title">{chat.title}</div>
        <div className="history-item-time">{chat.lastUpdated}</div>
      </div>
    ));
  };

const sendMessage = async () => {
  if (!messageInput.trim()) return;

  if (!chatStarted) {
    setCurrentChatId(`chat_${Date.now()}`);
    setChatStarted(true);
  }

  const userMessage = {
    content: messageInput.trim(),
    sender: "user",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  setMessages((prev) => [...prev, userMessage]);
  setMessageInput("");
  setTypingIndicatorVisible(true);

  const response = await fetchLlamaResponse(userMessage.content);

  if (response && response.trim() !== "") {
    const botMessage = {
      content: response,
      sender: "bot",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, botMessage]);
  }

  setTypingIndicatorVisible(false);
  saveChatToHistory();
  };
  
const fetchLlamaResponse = async (userMessage) => {
  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        messages: [
          ...messages.map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.content,
          })),
          { role: "user", content: userMessage },
        ],
        stream: true,
      }),
    });

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let fullResponse = "";

    // Temporarily show typing response in real-time
    const botMessage = {
      content: "",
      sender: "bot",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, botMessage]);

    const readChunk = async () => {
      const { done, value } = await reader.read();
      if (done) {
        setTypingIndicatorVisible(false);
        saveChatToHistory(); // Optionally move this inside sendMessage if needed
        return;
      }

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter(Boolean);

      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.done) break;
          fullResponse += json.message?.content || "";

          // Update the last message's content
          setMessages((prevMessages) => {
            const updated = [...prevMessages];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: fullResponse,
            };
            return updated;
          });
        } catch (err) {
          console.error("Parse error", err, line);
        }
      }

      return readChunk();
    };

    return readChunk();
  } catch (error) {
    console.error("Error streaming LLaMA3 response:", error);
    setTypingIndicatorVisible(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        content: "Something went wrong while getting a response.",
        sender: "bot",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  }
};
  return (
    <div>
      <Navbar />
      <button
        className="sidebar-toggle"
        id="sidebarToggle"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <div className="main-container">
        <div className="sidebar" id="sidebar">
          <div className="sidebar-header">
            <button
              className="new-chat-btn"
              id="newChatBtn"
              onClick={startNewChat}
            >
              <span className="plus-icon">+</span>
              New Chat
            </button>
          </div>
          <div className="chat-history">
            <h3>Recent Chats</h3>
            <div className="history-list" id="historyList">
              {renderChatHistory()}
            </div>
          </div>
        </div>

        <div className="chat-container">
          {!chatStarted && (
            <div className="welcome-section">
              <h1>PetHealth AI Helper</h1>
              <p>Your trusted companion for pet health advice and guidance</p>
              <div className="quick-actions">
                <div
                  className="action-card"
                  onClick={() => sendMessage("My pet seems unwell")}
                >
                  <h3>🏥 Health Concern</h3>
                  <p>Describe symptoms and get preliminary advice</p>
                </div>
                <div
                  className="action-card"
                  onClick={() => sendMessage("What should I feed my pet?")}
                >
                  <h3>🍽️ Nutrition Guide</h3>
                  <p>Get feeding recommendations for your pet</p>
                </div>
                <div
                  className="action-card"
                  onClick={() =>
                    sendMessage("How often should I exercise my dog?")
                  }
                >
                  <h3>🏃 Exercise Tips</h3>
                  <p>Learn about proper exercise routines</p>
                </div>
                <div
                  className="action-card"
                  onClick={() =>
                    sendMessage("When should I take my pet to the vet?")
                  }
                >
                  <h3>🩺 Vet Guidance</h3>
                  <p>Know when professional help is needed</p>
                </div>
              </div>
            </div>
          )}
          {/* Always show chat messages and input */}
          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div
                  className="message-content"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {msg.content}
                </div>
                <div className="message-time">{msg.time}</div>
              </div>
            ))}
          </div>

          {typingIndicatorVisible && (
            <div className="typing-indicator">
              <span>Tailo is typing</span>
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div className="input-area">
            <div className="input-container">
              <input
                type="text"
                className="message-input"
                placeholder="Ask me anything about your pet's health..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button
                className="send-button"
                onClick={() => sendMessage()}
                disabled={!messageInput.trim()}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
