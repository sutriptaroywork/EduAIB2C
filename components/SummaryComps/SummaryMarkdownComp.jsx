import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

// Markdown Comp for summary Text view section
const SummaryMarkdownComp = ({ markdownContent }) => {
  return (
    <>
      <style jsx global>{`
        /* Custom styles for ReactMarkdown content */
        :root {
          --markdown-heading1-size: 22px;
          --markdown-heading2-size: 20px;
          --markdown-heading3-size: 18px;
          --markdown-list-padding: 20px;
          --markdown-bold-color: #000000;
          --markdown-italic-color: #737791;
          --markdown-code-background: #f6f8fa;
          --markdown-code-border: 5px solid #eaecef;
          --markdown-code-padding: 16px;
          --markdown-code-line-height: 5.4; /* Adjust line height for code */
          --markdown-code-margin-left: 2rem; /* Adjust margin-left for code block */
        }

        h1 {
          font-size: var(--markdown-heading1-size);
        }

        h2 {
          font-size: var(--markdown-heading2-size);
        }

        h3 {
          font-size: var(--markdown-heading3-size);
        }
        ul {
          list-style-type: disc;
        }
        ol {
          list-style-type: decimal;
        }

        li {
          margin-top: 8px;
          margin-bottom: 8px;
          color:#000000
          font-size:14px
        }
        ul,ol{
          font-size:14px
        }

        p{
          font-size:14px
        }
        

        strong {
          color: var(--markdown-bold-color);
        }

        em {
          color: var(--markdown-italic-color);
        }

        code {
          background-color: var(--markdown-code-background);
          border: var(--markdown-code-border);
          padding: var(--markdown-code-padding);
          font-family: "Courier New", monospace;
          white-space: pre-wrap; /* Preserve line breaks */
          line-height: var(--markdown-code-line-height);
          margin-left: var(
            --markdown-code-margin-left
          ); /* Adjust margin-left for code block */
        }

        /* Media query for small size laptops (adjust values as needed) */
        @media (max-width: 1366px) {
          h1 {
            font-size: 20px;
          }

          h2 {
            font-size: 16px;
          }

          h3 {
            font-size: 14px;
          }
        }

        /* Media query for large size laptops (adjust values as needed) */
        @media (min-width: 1440px) {
          h1 {
            font-size: 28px;
          }

          h2 {
            font-size: 22px;
          }

          h3 {
            font-size: 18px;
          }
          p{
            font-size:16px
          }
          li{
            font-size:16px
          }
          ul,ol{
            font-size:16px
          }
          
        }
      `}</style>
      <Markdown rehypePlugins={[rehypeRaw]} >{markdownContent}</Markdown>
      
      
    </>
  );
};

export default SummaryMarkdownComp;
