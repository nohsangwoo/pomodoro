'use client'

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import ParticlesBackground from './components/ParticlesBackground';
import DisplayLudgi from './components/DisplayLudgi';

export default function Home() {
  const [time, setTime] = useState(25 * 60); // 25분으로 변경
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const playAlarm = useCallback(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const duration = 5; // 알람 지속 시간 (초)
    const interval = 0.5; // 비프음 간격 (초)

    for (let i = 0; i < duration; i += interval) {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = 'sine'; // 부드러운 사인파 사용
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime + i); // A4 음

      gainNode.gain.setValueAtTime(0, audioContext.currentTime + i);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + i + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + i + interval - 0.01);

      oscillator.start(audioContext.currentTime + i);
      oscillator.stop(audioContext.currentTime + i + interval);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      setIsCompleted(true);
      playAlarm();
    }

    return () => clearInterval(interval);
  }, [isActive, time, playAlarm]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(25 * 60);
    setIsActive(false);
    setIsCompleted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white p-4">
      <ParticlesBackground />
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-8 z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Pomodoro Timer
      </motion.h1>
      <motion.div
        className="text-8xl md:text-9xl font-bold mb-8 z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {formatTime(time)}
      </motion.div>
      <motion.button
        className="bg-white text-purple-600 p-4 rounded-full text-xl font-semibold shadow-lg hover:bg-opacity-90 transition duration-300 z-10 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isCompleted ? resetTimer : toggleTimer}
      >
        {isCompleted ? <FaRedo size={24} /> : isActive ? <FaPause size={24} /> : <FaPlay size={24} />}
      </motion.button>
      <DisplayLudgi />
    </div>
  );
}
