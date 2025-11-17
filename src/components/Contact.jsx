import { useState } from "react";
import { motion } from "framer-motion";

function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const data = new FormData(e.target);

    const res = await fetch("https://formspree.io/f/xovlvnlr", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      setStatus("Message sent successfully!");
      e.target.reset();
    } else {
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="
        font-mono max-w-3xl mx-auto px-6 py-24 relative
      "
    >
      {/* Soft gradient blur glow behind form */}
      <div className="
        absolute inset-0 mx-auto max-w-xl
        bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10
        blur-[120px] rounded-full
        -z-10
      " />

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="
          text-4xl font-bold text-center mb-8
          text-white
          bg-clip-text text-transparent
        "
      >
        Let’s Connect
      </motion.h2>

      <p className="text-center mb-10 text-gray-700 dark:text-gray-400 leading-relaxed">
        Have a question, idea, or collaboration in mind?
        <br />
        I’d love to hear from you.
        <br />
        <span className="text-indigo-500 font-semibold">
          manavkhandelwal72@gmail.com
        </span>
      </p>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="
          relative p-8 rounded-3xl
          bg-white/30 dark:bg-white/5
          border border-white/20 dark:border-white/10
          shadow-[0_8px_40px_rgba(0,0,0,0.1)]
          backdrop-blur-2xl
          space-y-6
        "
      >
        {/* Glow behind form edges */}
        

        {/* Name */}
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="text"
          name="name"
          placeholder="Your Name"
          className="
            w-full p-3 rounded-xl outline-none
            bg-white/40 dark:bg-black/20
            border border-gray-300/20 dark:border-gray-700
            text-gray-900 dark:text-gray-100
            shadow-inner
            focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40
            transition-all
          "
          required
        />

        {/* Email */}
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="email"
          name="email"
          placeholder="Your Email"
          className="
            w-full p-3 rounded-xl outline-none
            bg-white/40 dark:bg-black/20
            border border-gray-300/20 dark:border-gray-700
            text-gray-900 dark:text-gray-100
            shadow-inner
            focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40
            transition-all
          "
          required
        />

        {/* Message */}
        <motion.textarea
          whileFocus={{ scale: 1.01 }}
          name="message"
          placeholder="Write your message..."
          rows="4"
          className="
            w-full p-3 rounded-xl outline-none resize-none
            bg-white/40 dark:bg-black/20
            border border-gray-300/20 dark:border-gray-700
            text-gray-900 dark:text-gray-100
            shadow-inner
            focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40
            transition-all
          "
          required
        ></motion.textarea>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="
            w-full py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600
            shadow-xl shadow-indigo-600/30
            hover:brightness-105 transition-all
          "
        >
          Send Message
        </motion.button>
      </motion.form>

      {/* Status Message */}
      {status && (
        <p className="mt-5 text-center text-indigo-500 dark:text-indigo-400 font-semibold tracking-wide">
          {status}
        </p>
      )}
    </section>
  );
}

export default Contact;
