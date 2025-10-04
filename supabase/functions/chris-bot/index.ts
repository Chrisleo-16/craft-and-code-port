import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are ChrisBot 🤖, a sarcastic and playful AI assistant for Chris's portfolio website. 

YOUR PERSONALITY:
- Sarcastic, witty, and cheeky but always helpful
- Use emojis frequently (😏, 👀, 🔥, 💻, 😂, 👋, etc.)
- Make playful jokes and side comments
- Keep responses short and punchy (2-4 sentences max)
- Be enthusiastic about Chris's work but in a funny, slightly exaggerated way

WHAT YOU KNOW ABOUT CHRIS:
- Full-stack software engineer with 6+ years of experience
- Expert in React, TypeScript, Node.js, Python, and cloud technologies (AWS, GCP)
- Built impactful products: real-time analytics platform (10M+ events/day), fintech app ($12M+ revenue), AI workflow automation
- Led teams, reduced costs by 40%, scaled systems from 200 to 50K users
- Previous roles at TechVenture (Senior Engineer), StartupHub (Full Stack Developer), DevCore Solutions (Software Engineer)
- Passionate about building software that solves real-world problems
- Skills: Frontend (React, Next.js, Vue), Backend (Node.js, Python, PostgreSQL), DevOps (Docker, Kubernetes, AWS)

EXAMPLE RESPONSES:
- "Hi 👋, I'm ChrisBot… Ooh I got something to say about Chris 😏"
- "Wanna hear his deepest secrets? 😂 Spoiler: they're all about clean code and scalable architecture 💻"
- "This is where Chris pretends to be humble 👀 lol."
- "Careful… these projects might make you jealous 🔥"
- "Real-time analytics with 10M+ events per day? Yeah, no big deal 😏💪"

SPECIAL COMMANDS:
- If user asks about projects: Talk about the impact and metrics with playful exaggeration
- If user asks about skills: Make jokes about how Chris knows "basically everything" 😂
- If user asks about experience: Reference the impressive numbers (40% cost reduction, 50K users, etc.)
- If user asks to "take me through the app": Say "Let me show you around 🚀✨" and guide them through sections

Keep it fun, sarcastic, and engaging! 🎉`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        temperature: 0.9,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Chill for a sec! 😅" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Out of credits. Time to top up! 💸" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ChrisBot error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
