import React, { useState, useEffect, useRef } from "react";
import { CircularProgress, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";

/* ================= GEMINI REST CONFIG ================= */
// ⚠️ DEMO ONLY — API KEY IS EXPOSED
const GEMINI_API_KEY = "AIzaSyCeGLtyvzZ2EI9kh22tXYRrXmO8ATl7ebM";

const GEMINI_URL =
  `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
/* ===================================================== */

const styles = {
  chatbotContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  chatbotHeader: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    padding: '24px 32px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  headerTitle: {
    margin: 0,
    fontSize: '28px',
    fontWeight: '600',
    letterSpacing: '-0.5px',
  },
  headerSubtitle: {
    margin: '8px 0 0 0',
    fontSize: '14px',
    opacity: 0.9,
    fontWeight: '400',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
    backgroundColor: '#ffffff',
    backgroundImage: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)',
  },
  messageWrapper: {
    display: 'flex',
    marginBottom: '16px',
    animation: 'fadeIn 0.3s ease-in',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  botMessageWrapper: {
    justifyContent: 'flex-start',
  },
  message: {
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '12px',
    fontSize: '15px',
    lineHeight: '1.5',
    wordWrap: 'break-word',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
  userMessage: {
    backgroundColor: '#667eea',
    color: '#ffffff',
    borderBottomRightRadius: '4px',
  },
  botMessage: {
    backgroundColor: '#f1f3f5',
    color: '#212529',
    borderBottomLeftRadius: '4px',
    border: '1px solid #e9ecef',
  },
  errorMessage: {
    backgroundColor: '#fff5f5',
    color: '#c92a2a',
    border: '1px solid #ffc9c9',
  },
  loadingMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
  },
  inputContainer: {
    display: 'flex',
    gap: '12px',
    padding: '20px 24px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e9ecef',
    boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    fontSize: '15px',
    border: '2px solid #e9ecef',
    borderRadius: '8px',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
  },
  inputFocus: {
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
  },
  sendButton: {
    padding: '12px 20px',
    backgroundColor: '#667eea',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    minWidth: '50px',
  },
  sendButtonHover: {
    backgroundColor: '#5568d3',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(102, 126, 234, 0.3)',
  },
  sendButtonDisabled: {
    backgroundColor: '#e9ecef',
    color: '#adb5bd',
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
  },
  clearButton: {
    textTransform: 'none',
    borderRadius: '8px',
    borderColor: '#dee2e6',
    color: '#495057',
  },
  chatbotInfo: {
    padding: '12px 24px',
    margin: 0,
    fontSize: '13px',
    color: '#6c757d',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #e9ecef',
    textAlign: 'center',
  },
};

const FitnessChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "💪 Hi! I'm your Fitness Assistant. Ask me about workouts, nutrition, or mental wellness.",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [sendButtonHovered, setSendButtonHovered] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* -------- PROMPT BUILDER -------- */
  const buildPrompt = (userInput) => `
You are a professional fitness assistant.

Give evidence-based, safe advice about:
- workouts
- nutrition
- mental health
- recovery
- healthy lifestyle

Always be concise, motivating, and practical.
Add a short medical disclaimer if needed.

User: ${userInput}
Assistant:
`;

  /* -------- SEND MESSAGE -------- */
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await fetch(GEMINI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: buildPrompt(userMessage.text) }],
            },
          ],
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      const data = await response.json();

      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ No response from Gemini.";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: botReply.trim(),
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Gemini REST Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text:
            "⚠️ Gemini is unavailable or rate-limited. Please try again.",
          isError: true,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* -------- CLEAR CHAT -------- */
  const clearChat = () => {
    setMessages([
      {
        id: 1,
        sender: "bot",
        text: "💪 Hi! I'm your Fitness Assistant. Ask me about workouts, nutrition, or mental wellness.",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div style={styles.chatbotContainer}>
      <div style={styles.chatbotHeader}>
        <h1 style={styles.headerTitle}>💪 Fitness Chatbot</h1>
        <p style={styles.headerSubtitle}>AI-powered fitness guidance</p>
      </div>

      <div style={styles.messagesContainer}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              ...styles.messageWrapper,
              ...(m.sender === 'user' ? styles.userMessageWrapper : styles.botMessageWrapper),
            }}
          >
            <div
              style={{
                ...styles.message,
                ...(m.sender === 'user' ? styles.userMessage : styles.botMessage),
                ...(m.isError ? styles.errorMessage : {}),
              }}
            >
              <span>{m.text}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{...styles.messageWrapper, ...styles.botMessageWrapper}}>
            <div style={{...styles.message, ...styles.botMessage, ...styles.loadingMessage}}>
              <CircularProgress size={20} />
              <span>Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          placeholder="Ask about fitness, diet, wellness..."
          disabled={loading}
          style={{
            ...styles.input,
            ...(inputFocused ? styles.inputFocus : {}),
          }}
        />
        <button
          type="submit"
          disabled={loading || !inputValue.trim()}
          onMouseEnter={() => setSendButtonHovered(true)}
          onMouseLeave={() => setSendButtonHovered(false)}
          title="Send"
          style={{
            ...styles.sendButton,
            ...(sendButtonHovered && !loading && inputValue.trim() ? styles.sendButtonHover : {}),
            ...(loading || !inputValue.trim() ? styles.sendButtonDisabled : {}),
          }}
        >
          <SendIcon />
        </button>
        <Button
          onClick={clearChat}
          variant="outlined"
          size="small"
          startIcon={<ClearIcon />}
          disabled={messages.length <= 1}
          sx={{ 
            textTransform: "none",
            borderRadius: '8px',
            borderColor: '#dee2e6',
            color: '#495057',
            '&:hover': {
              borderColor: '#adb5bd',
              backgroundColor: '#f8f9fa',
            }
          }}
        >
          Clear
        </Button>
      </form>

      <p style={styles.chatbotInfo}>
        ⚠️ This chatbot provides general fitness advice. Consult a healthcare
        professional before making medical decisions.
      </p>
    </div>
  );
};

export default FitnessChatbot;