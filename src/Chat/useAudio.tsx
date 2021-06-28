import React, { useRef } from 'react';

const useAudio = (src?: string) => {
  const node = useRef(new Audio(src));

  const play = () => {
    node.current.play();
  };
  const pause = () => {
    node.current.pause();
  };
  const updateSource = (src: string) => {
    node.current.src = src;
  };

  return {
    play,
    pause,
    updateSource,
  };
};

export default useAudio;
