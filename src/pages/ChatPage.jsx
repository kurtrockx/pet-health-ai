import React, { useState, useEffect, useRef } from "react";

import "../components/css/PetChat.css";
import Navbar from "../components/NavBar.jsx";

export default function ChatPage() {
  const [chatStarted, setChatStarted] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingIndicatorVisible, setTypingIndicatorVisible] = useState(false);
  const chatMessagesRef = useRef(null);

  const loadChatHistory = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser?.id) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/chatHistory?userId=${loggedInUser.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
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

  const saveChatToHistory = async () => {
    console.log("➡️ saveChatToHistory called");

    if (!chatStarted || !currentChatId || messages.length === 0) {
      console.log("⛔ Not saving: Missing conditions", {
        chatStarted,
        currentChatId,
        messagesLength: messages.length,
      });
      return;
    }

    const now = new Date().toISOString();
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    console.log("🔐 Logged in user:", loggedInUser);

    const chatData = {
      chatId: currentChatId,
      title: messages[0]?.content || "New Chat",
      messages,
      createdAt: now,
      updatedAt: now,
      userId: loggedInUser?.id,
    };

    console.log("💾 Attempting to save chatData:", chatData);

    try {
      const res = await fetch("http://localhost:3000/api/saveChat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chatData),
      });

      const data = await res.json();
      console.log("✅ Chat saved:", data);
      await loadChatHistory(); // refresh sidebar
    } catch (err) {
      console.error("❌ Failed to save chat:", err);
    }
  };

  const startNewChat = async () => {
    if (chatStarted && currentChatId && messages.length > 0) {
      await saveChatToHistory(); // <-- wait for it to complete
    }

    setChatStarted(false);
    setCurrentChatId(null);
    setMessages([]);
    initializeChat();
  };

  const loadChatFromHistory = (chatId) => {
    const chat = chatHistory.find((c) => c.chatId === chatId); // ✅ corrected
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
        key={chat.chatId}
        className={`history-item ${
          chat.chatId === currentChatId ? "active" : ""
        }`}
        onClick={() => loadChatFromHistory(chat.chatId)}
      >
        <div className="history-item-title">{chat.title}</div>
        <div className="history-item-time">{chat.lastUpdated}</div>
      </div>
    ));
  };

  const sendMessage = async (preset = null) => {
    const input = preset || messageInput.trim();
    if (!input) return;

    // Ensure chat ID and state are set before adding message
    if (!chatStarted) {
      setCurrentChatId(`chat_${Date.now()}`);
      setChatStarted(true);
    }

    const userMessage = {
      content: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!preset) setMessageInput("");
    setTypingIndicatorVisible(true);

    const response = await fetchLlamaResponse(
      ` You are Tailo AI Chatbot for the Pet Health Helper system giving first aid advice for pet issues. If the problem is severe, recommend seeing a vet. Max 5 sentences. Start each response with "Tailo: "
        The user said: "${userMessage.content}"`
    );

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
          model: "gemma:2b",
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
    <div className="chat-body">
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
                <div
                  className="action-card"
                  onClick={() =>
                    sendMessage("What vaccinations does my pet need?")
                  }
                >
                  <h3>💉 Vaccination Info</h3>
                  <p>Learn about essential vaccinations for your pet</p>
                </div>
                <div
                  className="action-card"
                  onClick={() =>
                    sendMessage("How can I train my pet effectively?")
                  }
                >
                  <h3>🐾 Training Tips</h3>
                  <p>Get advice on training your pet</p>
                </div>
                <div
                  className="action-card"
                  onClick={() =>
                    sendMessage("What are common signs of illness in pets?")
                  }
                >
                  <h3>🩹 Illness Signs</h3>
                  <p>Identify symptoms of common pet illnesses</p>
                </div>
                <div
                  className="action-card"
                  onClick={() => sendMessage("How do I groom my pet properly?")}
                >
                  <h3>🛁 Grooming Tips</h3>
                  <p>Learn how to keep your pet clean and healthy</p>
                </div>
                <div
                  className="action-card"
                  onClick={() =>
                    sendMessage("What should I do if my pet is injured?")
                  }
                >
                  <h3>🚑 First Aid</h3>
                  <p>Get guidance on handling pet injuries</p>
                </div>
                <div
                  className="action-card"
                  onClick={() =>
                    sendMessage("How can I help my pet with anxiety?")
                  }
                >
                  <h3>😟 Anxiety Help</h3>
                  <p>Learn how to calm your anxious pet</p>
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
