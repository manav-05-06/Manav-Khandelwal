const projects = [
  {
    id: 1,
    title: "MorseCode",
    category: "React",
    stack: ["React.js", "Express", "FireBase"],
    tags: ["Web App", "Converter", "UI/UX"],
    description:
      "A real-time text ↔ Morse code converter built with React.js and Tailwind CSS. Fast, clean UI with instant results and smooth animations. Fully responsive and deployed on Vercel.",
    repo: "https://github.com/manav-05-06/Code-Morse",
    live: "https://code-morse-me.vercel.app/",
    image: "./image/MorseCode.png",       // ADD IMAGE
    preview: "/projects/morse.gif"      // OPTIONAL GIF PREVIEW
  },

  {
    id: 2,
    title: "ChatJi",
    category: "AI",
    stack: ["React.js", "Express", "API"],
    tags: ["AI", "Chatbot", "Gemini API"],
    description:
      "AI-powered chatbot built using React.js & Node.js with Gemini API. Includes chat history, formatting, authentication, and fast streaming responses.",
    repo: "https://github.com/manav-05-06/ChatJi",
    live: "https://chat-ji.vercel.app/",
    image: "./image/Chatji.png",
    preview: "/projects/chatji.gif"
  },

  {
    id: 3,
    title: "Random Photo Generator",
    category: "JavaScript",
    stack: ["HTML", "CSS", "JavaScript"],
    tags: ["API", "Images", "Creative"],
    description:
      "A simple app that fetches high-quality random photos from the Unsplash API. Clean UI, smooth fade animations, and instant refresh.",
    repo: "https://github.com/manav-05-06/Random-photos-generator",
    live: "https://random-photos-generator-two.vercel.app/",
    image: "./image/Random image Generator.png",
    preview: "/projects/photo.gif"
  },

  {
    id: 4,
    title: "Bubble Game",
    category: "Game",
    stack: ["HTML", "CSS", "JavaScript"],
    tags: ["Game", "Fun", "Interactive"],
    description:
      "A fast-paced bubble popping game where players score by clicking the correct numbered bubble. Includes timer, score, difficulty, and effects.",
    repo: "https://github.com/manav-05-06/Bubble-game",
    live: "https://manav-05-06.github.io/Bubble-game/",
    image: "./image/Bubble Game.png",
    preview: "/projects/bubble.gif"
  },

  {
    id: 5,
    title: "Random Emoji Generator",
    category: "JavaScript",
    stack: ["HTML", "CSS", "JavaScript"],
    tags: ["Utility", "Fun", "UI Tools"],
    description:
      "A fun tool that generates random emojis. Includes hover animation, simple UI, and instant emoji output. Deployed using Vercel.",
    repo: "https://github.com/manav-05-06/Random-Emoji-Generator",
    live: "https://random-emoji-generator-drab.vercel.app/",
    image: "./image/Emoji Generator.png",
    preview: "/projects/emoji.gif"
  }
];

export default projects;
