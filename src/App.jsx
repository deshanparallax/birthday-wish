import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

function App() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleShowMe = () => {
    if (name.trim() === '') {
      setError('Please enter your name first! 🥺');
      return;
    }
    setError('');
    setStep(1);
  };

  const handleOpenGift = () => {
    setStep(2);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#ffb347', '#ffcc33', '#ff6b6b', '#aee1cd', '#c084fc']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#ffb347', '#ffcc33', '#ff6b6b', '#aee1cd', '#c084fc']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  // Variants for steps transitions
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, scale: 1.1, y: -20, transition: { duration: 0.4, ease: "easeIn" } }
  };

  // Bouncing animation for the gift box
  const bounceVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
    bounce: {
      y: [0, -20, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Spring animation for final reveal
  const finalRevealVariants = {
    hidden: { opacity: 0, scale: 0.3, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 150,
        damping: 10,
        delay: 0.1
      } 
    },
    exit: { opacity: 0 }
  };

  return (
    <>
      <AnimatePresence mode="wait">
      {step === 0 && (
        <motion.div
          key="step0"
          className="step-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.h1 className="intro-heading">Hey there! 👋</motion.h1>
          <motion.p className="intro-subtext">I have a small surprise for you...</motion.p>
          <motion.input
            className="name-input"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          />
          <AnimatePresence>
            {error && (
              <motion.p 
                className="error-message"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto', y: -10 }}
                exit={{ opacity: 0, height: 0 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
          <motion.button 
            className="show-me-btn" 
            onClick={handleShowMe}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Show Me!
          </motion.button>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div
          key="step1"
          className="step-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div 
            className="gift-box"
            variants={bounceVariants}
            animate="bounce"
            whileHover="hover"
            whileTap="tap"
            onClick={handleOpenGift}
          >
            🎁
          </motion.div>
          <motion.p className="tap-text">Tap the box to open!</motion.p>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          key="step2"
          className="step-container"
          variants={finalRevealVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.h1 className="birthday-heading">
            Happy Birthday{name ? `, ${name}` : ''}! 🎉
          </motion.h1>
          <motion.p className="birthday-message">
            Wishing you a fantastic day filled with joy, laughter, and wonderful memories.
            May all your dreams come true this year!
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
      <footer className="footer">
        Created with ❤️ by Deshan
      </footer>
    </>
  );
}

export default App;
