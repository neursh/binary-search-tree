import { useHookstate } from '@hookstate/core';
import { motion } from 'framer-motion';
import { forwardRef, MutableRefObject, useEffect, useRef } from 'react';
import Context from '../context';

const Settings = forwardRef<HTMLElement>((_, container) => {
  container = container as MutableRefObject<HTMLElement>;

  const containerReceived = useHookstate(false);
  const open = useHookstate(true);
  const updating = useHookstate(false);
  const input = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (container.current) {
      containerReceived.set(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container.current]);

  if (containerReceived.get()) {
    return (
      <section className="fixed top-0 right-0">
        <motion.div
          className="flex items-center"
          initial={{ translateX: 0 }}
          animate={{ translateX: open.get() ? 0 : 384 }}
          transition={{
            ease: [0.5, 0.5, 0, 1],
            duration: 0.5,
          }}
        >
          <div
            className="w-8 h-8 rounded-full outline outline-2 outline-slate-300 flex items-center justify-center cursor-pointer backdrop-blur-lg bg-white bg-opacity-50"
            onClick={() => open.set((p) => !p)}
          >
            <motion.svg
              className="w-6 h-6"
              viewBox="0 -960 960 960"
              fill="#434343"
              initial={{ rotate: 0 }}
              animate={{
                rotate: open.get() ? 0 : 180,
              }}
              transition={{
                ease: [0.5, 0.5, 0, 1],
                duration: 0.5,
              }}
            >
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
            </motion.svg>
          </div>
          <motion.div
            className="relative w-96 h-48 m-2 p-2 rounded-lg outline outline-2 outline-slate-300 backdrop-blur-lg bg-white bg-opacity-50 flex flex-col"
            initial={{ height: 192 }}
            animate={{ height: open.get() ? 192 : 96 }}
            transition={{
              ease: [0.5, 0.5, 0, 1],
              delay: open.get() ? 0 : 0.5,
              duration: 0.5,
            }}
          >
            <p className="font-semibold">Input:</p>
            <textarea
              ref={input}
              className="w-full h-[calc(100%-8px)] ml-1 mr-1 outline-none resize-none font-mono bg-transparent"
            />
            <div className="flex justify-end">
              <motion.div
                className="h-6 cursor-pointer rounded-full outline-dotted outline-2 text-center overflow-hidden"
                onClick={() => {
                  if (!updating.get()) {
                    updating.set(true);
                    Context.buildTree(input.current!.value);
                    setTimeout(() => updating.set(false), 1000);
                  }
                }}
                initial={{ width: 64, rotate: 0 }}
                animate={{
                  width: updating.get() ? 24 : 64,
                  rotate: updating.get() ? 360 : 0,
                }}
                transition={{
                  width: {
                    ease: [0.25, 0.25, 0, 1],
                  },
                  rotate: updating.get()
                    ? {
                        ease: [0, 0, 0, 0],
                        delay: 0.25,
                        repeatType: 'loop',
                        repeat: Infinity,
                        duration: 3,
                      }
                    : {
                        duration: 0,
                      },
                }}
              >
                <motion.p
                  initial={{ translateX: 0, opacity: 1 }}
                  animate={{
                    translateX: updating.get() ? 24 : 0,
                    opacity: updating.get() ? 0 : 1,
                  }}
                  transition={{
                    ease: [0.25, 0.25, 0, 1],
                  }}
                >
                  Update
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    );
  }
});

export default Settings;
