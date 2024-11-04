import React, { useRef,useEffect } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Copy } from "lucide-react";



interface props{
  aiOutput:string;
}
function OutputSection({aiOutput}:props) {
  const editorRef: any = useRef();
  useEffect(()=>{
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  },[aiOutput])

  const handleEditorChange = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getInstance().getMarkdown());
    }
  };

  return (
    <div className="bg-white shadow-lg-border">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-bold text-lg">Your Result</h2>
        <button className="flex gap-2">
          <Copy className="w-4 h-4"
           />
          Copy
        </button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Generating..."
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default OutputSection;
