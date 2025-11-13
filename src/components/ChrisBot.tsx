import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Lottie from "lottie-react";
import chrisbotAnimation from "@/assets/chatbot-animation.json";

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
  const [showBot, setShowBot] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Listen for preloader completion
  useEffect(() => {
    const checkPreloader = () => {
      const isComplete = localStorage.getItem('preloader-complete');
      if (isComplete === 'true') {
        setShowBot(true);
      }
    };

    checkPreloader();

    const handlePreloaderComplete = () => {
      setShowBot(true);
    };

    window.addEventListener('preloader-complete', handlePreloaderComplete);
    return () => window.removeEventListener('preloader-complete', handlePreloaderComplete);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOpen = () => {
    setIsOpen(true);
    if (!hasShownGreeting) {
      setMessages([
        {
          role: "assistant",
          content:
            "Eish! Chris ameni-program vibaya bana — sasa niko hapa kupiga story.\nUnataka tuende na lugha gani? Sheng? Swahili? Ama English ya ku-make investor smile? 😏",
        },
      ]);
      setHasShownGreeting(true);
    }
  };

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
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
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

  // Don't render until preloader is done
  if (!showBot) return null;

  return (
    <>
      {/* Character Button (cartoon assistant style) */}
<AnimatePresence>
  {!isOpen && (
    <motion.div
      initial={{ x: 100, y: 100, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={{ x: 100, y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-0 right-4 md:right-12 z-50 cursor-pointer select-none"
      onClick={handleOpen}
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [0, 1.5, -1.5, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <motion.div
          className="h-32 md:h-48 w-32 md:w-48 drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.6 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Lottie
            animationData={chrisbotAnimation}
            loop={true}
            className="w-full h-full"
          />
        </motion.div>

        {/* Glowing aura */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          animate={{
            boxShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 25px rgba(255,200,100,0.4)",
              "0 0 0px rgba(255,255,255,0)",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
        />

        {/* Floating sparkles */}
        <motion.span
          className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-300 text-lg"
          animate={{
            y: [0, -12, 0],
            opacity: [0.6, 1, 0.6],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          ✨
        </motion.span>

        <motion.span
          className="absolute -right-4 bottom-8 text-blue-400 text-xl"
          animate={{
            y: [0, -6, 0],
            opacity: [0.9, 1, 0.9],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
        >
          💬
        </motion.span>

        {/* ❌ REMOVED EYE BLINKS — no blinking at all */}
      </motion.div>

      {/* Speech bubble */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.05, 1], opacity: 1 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 bg-card/95 backdrop-blur-sm rounded-2xl px-3 md:px-4 py-2 shadow-xl border-2 border-primary"
      >
        <p className="text-xs md:text-sm font-medium whitespace-nowrap">
          Hi there 😎
        </p>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-r-2 border-b-2 border-primary rotate-45" />
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, x: 100, y: 100 }}
            animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            exit={{ scale: 0, opacity: 0, x: 100, y: 100 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-12 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-[calc(100vw-2rem)]"
          >
            <div className="bg-card/95 backdrop-blur-md border-2 border-primary rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between relative">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="h-12 w-12 rounded-full border-2 border-white overflow-hidden bg-primary/10"
                    animate={{
                      rotate: [0, 1, -1, 0],
                      y: [0, -2, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeInOut",
                    }}
                  >
                    <Lottie
                      animationData={chrisbotAnimation}
                      loop={true}
                      className="w-full h-full"
                    />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-white">ChrisBot</h3>
                    <p className="text-xs text-white/80">
                      Your sarcastic mate 😏
                    </p>
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
              <div className="h-80 md:h-96 overflow-y-auto p-3 md:p-4 space-y-4 bg-transparent">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.8, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
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
                  className="px-3 md:px-4 py-3 border-t border-border bg-transparent"
                >
                  <p className="text-xs text-muted-foreground mb-2">
                    Vipi? Pick one:
                  </p>
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

              {/* Input */}
              <div className="p-3 md:p-4 border-t border-border bg-transparent">
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
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                  >
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
