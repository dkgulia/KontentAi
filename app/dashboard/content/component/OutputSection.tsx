import React, { useRef, useEffect } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Copy, CheckCircle } from "lucide-react";

interface props {
  aiOutput: string;
}

function OutputSection({ aiOutput }: props) {
  const editorRef: any = useRef();

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  }, [aiOutput]);

  const handleEditorChange = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getInstance().getMarkdown());
    }
  };

  return (
    <div className="bg-white shadow-lg p-5 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 className="font-bold text-xl text-gray-800">Your Result</h2>
        <button
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          onClick={() => {
            navigator.clipboard.writeText(aiOutput);
          }}
        >
          <Copy className="w-5 h-5" />
          <span className="font-medium">Copy</span>
        </button>
      </div>
      <div>
        <Editor
          ref={editorRef}
          initialValue="Generating..."
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
          onChange={handleEditorChange}
          toolbarItems={[
            ["heading", "bold", "italic", "strike"],
            ["ol", "ul", "link", "image"],
          ]}
          customButtons={{
            confirm: {
              className: "bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 font-medium",
              event: () => {
                navigator.clipboard.writeText(aiOutput);
              },
              text: (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Copied</span>
                </span>
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default OutputSection;