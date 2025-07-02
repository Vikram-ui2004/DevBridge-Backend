import express from "express";
import fetch from "node-fetch";


const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  console.log("📩 Incoming prompt:", prompt);

  const siteContext = `
DevBridge is a full-stack collaboration platform built by Vikram Nayak using MERN (MongoDB, Express, React, Node.js), Firebase, and Tailwind CSS. It empowers students and developers to build real-world projects and grow together.


Greeting & Welcome Questions
1. Hello!
2. Hi there, what can you do?
3. Namaste! Who are you?
4. Good morning/afternoon/evening
5. How can I get started?
6. Can you guide me through this website?
7. What is DevBridge?
8. What features does this platform offer?

🔑 Key Features:
- 🚀 Student & Developer Dashboards
- 
-
- 📬 Real-time 1-on-1 Chat (Firebase Firestore)
- 👤 Profile Management: image upload, skills, resume, GitHub, social links
- 🧠 AI Assistant powered by Mistral / Ollama / OpenRouter
- 📩 Feedback & Questions modal (with email and toast notifications)
- 📢 Notification system (Firestore) for updates like password change, messages
- 🔐 Auth with Google Sign-In, role-based dashboards, and protected routes
- 📚 Role Selection on signup (Student or Developer)
- 📈 Like counters, project experience logs, and dynamic dashboards
- 🌗 Dark Mode Toggle (Framer Motion)
- 💬 Ask Question modal (stored in Firestore)
- ✨ Animations and transitions with Framer Motion
- 🔧 Node.js backend for secure image upload to Cloudinary
- 🌍 Responsive UI using Tailwind CSS
-  📄 Resources upload easily and access resources when you have a account on the devbridge
   pdf uploader place in the toolkit in the side bar for students and developers

👩‍💻 Developer Dashboard includes:
- View student profiles (with full modal)
- Add experience, skills, GitHub, resume, and social links
- Realtime chat with students

🎓 Student Dashboard includes:
- 
- Profile editing (education, skills, interest, resume)
- Realtime chat with developers

FAQs:
1. 🔼 To upload PDFs: go to /student-dashboard > Upload Section
2. 👥 To browse student profiles: go to /dev-dashboard > All Students
3. 💬 To chat: click a user profile and start messaging
4. 🔧 To edit profile: go to /edit-profile (role-based view)
5. 📚 You can switch roles only during initial signup
6. 🧠 Use the AI Assistant in the FAB menu to ask site-related or coding questions
7. 🗣️ All feedback/questions go to the admin panel (FireStore collection)

Platform by: Vikram Nayak – MERN stack developer and creator of DevBridge.

politeResponses:
 hello: "Hello! How can I assist you today?",
  thank_you: "You're very welcome! 😊",
  good_morning: "Good morning! Hope you're having a great day.",
  what_can_you_do: "I can guide you around DevBridge — from uploading notes to connecting with developers!",

Respectful:
1. Thank you!
2. You're doing a great job.
3. I appreciate your help.
4. Please help me again.
5. Could you guide me step by step?
6. I’m confused, can you explain again?
7. Respectful language like: “Sir”, “Madam”, “Dear Assistant”

Chat / AI Assistant Questions
1. What can you help me with?
2. Are you connected to live support?
3. Can I ask coding questions?
4. Can you suggest resources for web development?
5. Who built this AI Assistant?

Student Side Questions
1. How do I share my notes?
2. Where can I connect with developers?
3. How can I edit my education details?
4. Can I upload my resume for job opportunities?
5. Is there a job interest or hiring feature?

Developer Side Questions
1. How can I view student profiles?
2. Can I filter students by skills?
3. How can I contact a student?
4. Where do I update my experience and skills?
5. Can I upload my GitHub or portfolio?

 Account & Login Questions
 1. How do I sign up?
2. Can I sign in with Google?
3. I'm having trouble logging in
4. How can I reset my password?
5. How do I change my email or profile picture?
6. Is my data secure on this platform?

General Website Usage Questions
1. How do I upload notes?
2. Where can I find previous year question papers?
3. How can I view my dashboard?
4. What is the difference between Student and Developer roles?
5. How can I switch my role?
6. Where is the chat feature?
7. Can I download shared PDFs?
8. How can I update my profile?
9. Can I upload my resume or portfolio?
`;

const fullPrompt = `${siteContext}\n\nUser asked: ${prompt}`;

  try {
   const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
  },
  body: JSON.stringify({
    model: "mistralai/mistral-7b-instruct",
    messages: [{ role: "user", content: fullPrompt }],
  }),
});

    const data = await response.json();
    console.log("🤖 AI response:", data);

    const answer = data.choices?.[0]?.message?.content || "No response.";
    res.json({ answer });

  } catch (err) {
    console.error("❌ OpenRouter API error:", err);
    res.status(500).json({ answer: "⚠️ AI server error. Please try again later." });
  }
});

export default router;
