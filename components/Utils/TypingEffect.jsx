import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";

export function useTypingEffect(
  textToType,
  interKeyStrokeDurationInMs,
  typingEnded,
  setTypingEnded,
  audioRef,
  setShowTypeEffect
) {
  const [currentPosition, setCurrentPosition] = useState(0);
  const currentPositionRef = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPosition((value) => value + 1);
      currentPositionRef.current += 1;

      if (currentPositionRef.current > textToType.length) {
        clearInterval(intervalId);
        setShowTypeEffect(false)
        setTypingEnded(false);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }, interKeyStrokeDurationInMs);
    return () => {
      clearInterval(intervalId);
      currentPositionRef.current = 0;
      setCurrentPosition(0);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interKeyStrokeDurationInMs, textToType]);
  return textToType.substring(0, currentPosition);
}

const TypingEffect = ({
  text,
  interKeyStrokeDurationInMs,
  typingEnded,
  setTypingEnded,
  setShowTypeEffect,
}) => {
  const audioRef = useRef(null);
  useEffect(() => {
    audioRef.current.volume = 0.1; // Set the volume
    audioRef.current.play();
  }, []);

  const typingEffectText = useTypingEffect(
    text,
    interKeyStrokeDurationInMs,
    typingEnded,
    setTypingEnded,
    audioRef,
    setShowTypeEffect
  );

  return (
    <div>
      <style jsx>{`
        /* Custom styles for ReactMarkdown content */
        /* Custom CSS for Markdown Elements */

        /* Base styles */
        // body {
        //   font-family: 'Arial', sans-serif;
        //   line-height: 1.6;
        //   color: #333;
        //   background-color: #f4f4f4;
        //   padding: 20px;
        // }

        .container{

        p{
          line-height :normal
        }

        /* Headings */
        h1, h2, h3 {
          margin-top: 1em;
          margin-bottom: 0.5em;
          line-height: 1.3;
          color:#ffcc02 !important
        }

        h1 {
          font-size: 2em; /* Larger size for H1 */
          color: #0056b3; /* Dark blue */
          border-bottom: 2px solid #dee2e6; /* Adds a subtle line under H1 */
        }

        h2 {
          font-size: 1.75em;
          color: #ffcc02; /* Dark gray */
        }

        h3 {
          font-size: 1.5em;
          color: #ffcc02; /* Light gray */
        }

        
        /* Lists */
        ul, ol {
          padding-left: 20px;
          margin-top: 0.5em;

        }

        ul{
          list-style:disc
        }
        ol{
          list-style:decimal
        }

        li {
          margin-bottom: 0.25em;
        }

        /* Tables */
        table {
          width: 100%;
          margin-top: 1em;
          border-collapse: collapse;
          background-color: #fff;
        }

        th, td {
          border: 1px solid #dee2e6;
          padding: 8px 12px;
          text-align: left;
        
        }

        th {
          background-color: #efe8fd;
          color:#ffcc02
        }

        /* Code Blocks */
          pre {
            background-color: #1e1e1e; /* Dark background similar to VS Code */
            color: #dcdcdc; /* Light grey text */
            border-radius: 5px; /* Rounded corners */
            padding: 16px;
            overflow-x: auto;
            margin: 1em 0;
            font-size: 0.9em;
            font-family: 'Consolas', 'Courier New', monospace;
          }
        
          /* Inline Code */
          code {
            background-color: #1e1e1e; /* Matching the block background */
            color: #9CDCFE; /* Soft blue for inline code, similar to VS Code */
            padding: 4px 6px; /* Increased padding */
            border-radius: 4px;
            font-family: 'Consolas', 'Courier New', monospace;
          }
        
          /* Styling for functions in code blocks */
          pre code .function {
            color: #c586c0; /* Soft purple, typical for functions in many themes */
          }
        
        /* Custom styles for LaTeX */
        .katex {
          font-size: 1.5em;
        }      
      }   
        }
      `}</style>
      <div className="text-black ml-4">
        <audio
          ref={audioRef}
          preload="none"
          src="/sounds/typing.wav"
          className="invisible"
        />
        {/* Render the ReactMarkdown component within the TypingEffect */}
        {/* <ReactMarkdown>{typingEffectText}</ReactMarkdown> */}
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
        >
          {typingEffectText}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default TypingEffect;
