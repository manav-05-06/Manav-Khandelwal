// Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";

const STATUS = { idle: "", sending: "sending", success: "success", error: "error" };

function Contact() {
  const [status, setStatus] = useState(STATUS.idle);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(STATUS.sending);

    const data = new FormData(e.target);

    try {
      const res = await fetch("https://formspree.io/f/xovlvnlr", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus(STATUS.success);
        e.target.reset();
      } else {
        setStatus(STATUS.error);
      }
    } catch {
      setStatus(STATUS.error);
    }
  };

  const isSending = status === STATUS.sending;

  return (
    <section
      id="contact"
      className="max-w-3xl mx-auto px-6 py-28 relative"
    >
      {/* Soft ambient glow background */}
      <div className="
        absolute inset-0 mx-auto max-w-xl
        bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10
        blur-[140px] rounded-full -z-10
      " />

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="
          text-4xl md:text-5xl font-bold text-center mb-12
          text-gray-900 dark:text-gray-100 relative w-fit mx-auto
        "
      >
        Let's Connect
        <span className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-32 h-[3px] rounded-full 
          bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></span>
      </motion.h2>

      <p className="text-center mb-12 text-gray-700 dark:text-gray-400 leading-relaxed">
        Have a question, idea, or want to collaborate?
        <br />
        Feel free to drop a message — I'll get back soon.
        <br />
        <span className="text-indigo-600 dark:text-indigo-300 font-semibold">
          manavkhandelwal72@gmail.com
        </span>
      </p>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="
          relative p-8 rounded-3xl 
          glass border border-white/20 dark:border-white/10
          shadow-[0_8px_40px_rgba(0,0,0,0.12)]
          backdrop-blur-2xl space-y-6
        "
      >
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="sr-only">
            Your Name
          </label>
          <motion.input
            id="contact-name"
            whileFocus={{ scale: 1.01 }}
            type="text"
            name="name"
            placeholder="Your Name"
            disabled={isSending}
            className="
              w-full p-3 rounded-xl outline-none
              bg-white/40 dark:bg-white/10
              text-gray-900 dark:text-gray-100
              border border-gray-300/40 dark:border-gray-600/40
              focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400
              transition-all disabled:opacity-60
            "
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="sr-only">
            Your Email
          </label>
          <motion.input
            id="contact-email"
            whileFocus={{ scale: 1.01 }}
            type="email"
            name="email"
            placeholder="Your Email"
            disabled={isSending}
            className="
              w-full p-3 rounded-xl outline-none
              bg-white/40 dark:bg-white/10
              text-gray-900 dark:text-gray-100
              border border-gray-300/40 dark:border-gray-600/40
              focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400
              transition-all disabled:opacity-60
            "
            required
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className="sr-only">
            Your message
          </label>
          <motion.textarea
            id="contact-message"
            whileFocus={{ scale: 1.01 }}
            name="message"
            placeholder="Write your message..."
            rows={4}
            disabled={isSending}
            className="
              w-full p-3 rounded-xl outline-none resize-none
              bg-white/40 dark:bg-white/10
              text-gray-900 dark:text-gray-100
              border border-gray-300/40 dark:border-gray-600/40
              focus:ring-2 focus:ring-indigo-400/40 focus:border-indigo-400
              transition-all disabled:opacity-60
            "
            required
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={!isSending ? { scale: 1.05 } : undefined}
          whileTap={!isSending ? { scale: 0.96 } : undefined}
          type="submit"
          disabled={isSending}
          className="
            w-full py-3 rounded-xl font-semibold text-white
            bg-gray-900 dark:bg-gray-100
            dark:text-black text-center
            hover:bg-gray-800 dark:hover:bg-gray-200
            transition-all duration-300 shadow-sm hover:shadow-lg
            disabled:opacity-70 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800
          "
        >
          {isSending ? "Sending…" : "Send Message"}
        </motion.button>
      </motion.form>

      {/* Status Message */}
      {status === STATUS.success && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 text-center font-semibold text-green-600 dark:text-green-400 bg-green-500/10 dark:bg-green-500/20 py-3 px-4 rounded-xl border border-green-500/30"
        >
          Message sent successfully! I'll get back to you soon.
        </motion.p>
      )}
      {status === STATUS.error && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 text-center font-semibold text-red-600 dark:text-red-400 bg-red-500/10 dark:bg-red-500/20 py-3 px-4 rounded-xl border border-red-500/30"
        >
          Failed to send. Please try again or email me directly.
        </motion.p>
      )}
    </section>
  );
}

export default Contact;
