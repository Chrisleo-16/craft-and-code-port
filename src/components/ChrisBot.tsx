import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChrisBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasShownGreeting, setHasShownGreeting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show greeting on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShownGreeting) {
        setIsOpen(true);
        setMessages([
          {
            role: "assistant",
            content: "Hi 👋, I'm ChrisBot… Ooh I got something to say about Chris 😏 Wanna hear his deepest secrets? 😂",
          },
        ]);
        setHasShownGreeting(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [hasShownGreeting]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chris-bot", {
        body: { messages: [...messages, userMessage] },
      });

      if (error) throw error;

      if (data?.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch (error) {
      console.error("ChrisBot error:", error);
      toast({
        title: "Oops! ChrisBot malfunctioned 🤖",
        description: "Try again in a moment!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    let message = "";
    switch (action) {
      case "projects":
        message = "Tell me about Chris's coolest projects";
        break;
      case "skills":
        message = "What are Chris's superpowers?";
        break;
      case "tour":
        message = "Take me through the app";
        break;
      case "secret":
        message = "Tell me a fun fact about Chris";
        break;
    }
    sendMessage(message);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 left-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg hover:shadow-xl transition-shadow"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, x: -20, y: 20 }}
            animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            exit={{ scale: 0, opacity: 0, x: -20, y: 20 }}
            className="fixed bottom-6 left-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <div className="bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-2xl">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-bold text-white">ChrisBot</h3>
                    <p className="text-xs text-white/80">Your sarcastic guide 😏</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-muted/30">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.8, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-card-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-card rounded-2xl px-4 py-3 shadow-md">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 1 && (
                <div className="px-4 py-3 border-t border-border bg-background/50">
                  <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction("projects")}
                      className="text-xs"
                    >
                      🔥 Projects
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction("skills")}
                      className="text-xs"
                    >
                      💻 Skills
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction("tour")}
                      className="text-xs"
                    >
                      🚀 Tour
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction("secret")}
                      className="text-xs"
                    >
                      😂 Fun Fact
                    </Button>
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-border bg-background">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChrisBot;
