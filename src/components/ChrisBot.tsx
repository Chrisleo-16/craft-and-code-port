import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import chrisbotCharacter from "@/assets/chrisbot-character.png";

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
            content: "Eish! Chris ameni-program vibaya bana — sasa niko hapa kupiga story.\nUnataka tuende na lugha gani? Sheng? Swahili? Ama English ya ku-make investor smile? 😏",
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
        title: "Eeh! ChrisBot ame-hang 🤖",
        description: "Maze, try again in a sec!",
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
        message = "Niaje, show me Chris's dopest projects";
        break;
      case "skills":
        message = "What's Chris's superpowers? Maze!";
        break;
      case "tour":
        message = "Sawa, take me through the app";
        break;
      case "secret":
        message = "Tell me something spicy about Chris";
        break;
    }
    sendMessage(message);
  };

  return (
    <>
      {/* Character Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ x: 100, y: 100, opacity: 0 }}
            animate={{ 
              x: 0, 
              y: 0, 
              opacity: 1,
              rotate: [0, -2, 2, -2, 0],
            }}
            exit={{ x: 100, y: 100, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              rotate: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }
            }}
            className="fixed bottom-0 right-12 z-50 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <motion.img
              src={chrisbotCharacter}
              alt="ChrisBot Character"
              className="h-48 w-auto drop-shadow-2xl"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-2xl px-4 py-2 shadow-xl border-2 border-primary"
            >
              <p className="text-sm font-medium whitespace-nowrap">Niaje! Tap me 😏</p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-r-2 border-b-2 border-primary rotate-45" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, x: 100, y: 100 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              x: 0, 
              y: 0,
            }}
            exit={{ scale: 0, opacity: 0, x: 100, y: 100 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-12 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <div className="bg-background border-2 border-primary rounded-2xl shadow-2xl overflow-hidden">
              {/* Header with Character */}
              <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between relative">
                <div className="flex items-center gap-3">
                  <motion.img
                    src={chrisbotCharacter}
                    alt="ChrisBot"
                    className="h-12 w-12 rounded-full object-cover border-2 border-white"
                  />
                  <div>
                    <h3 className="font-bold text-white">ChrisBot</h3>
                    <p className="text-xs text-white/80">Your sarcastic mate 😏</p>
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
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-3 border-t border-border bg-background/50"
                >
                  <p className="text-xs text-muted-foreground mb-2">Vipi? Pick one:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction("projects")}
                      className="text-xs hover:scale-105 transition-transform"
                    >
                      🔥 Projects
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction("skills")}
                      className="text-xs hover:scale-105 transition-transform"
                    >
                      💻 Skills
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction("tour")}
                      className="text-xs hover:scale-105 transition-transform"
                    >
                      🚀 Tour
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction("secret")}
                      className="text-xs hover:scale-105 transition-transform"
                    >
                      😏 Spicy Stuff
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Input with Voice */}
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
                    placeholder="Type your message..."
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
