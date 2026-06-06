import Navbar from "../component/Navbar";
import FixChat from "../component/codeFixchat";
import CodeEditor from "../component/Editor";
import Preview from "../component/preview";
import { useChat } from "../hooks/usechat";

const CodeFix = () => {
  const { code } = useChat();

  return (
    <div className="h-screen flex flex-col bg-[#0f172a] text-white">

      {/* Navbar */}
      <Navbar />

      {/* Top Info Bar */}
      <div className="px-6 py-3 bg-[#020617] border-b border-gray-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-red-400">
            Code Error Fixer
          </h2>

          <p className="text-sm text-gray-400">
            Paste your code, identify errors, and receive corrected solutions with explanations.
          </p>
        </div>

        <button className="bg-red-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition">
          Analyze & Fix
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-3 flex-1 min-h-0">

        {/* AI Chat */}
        <div className="border-r border-gray-800 flex flex-col min-h-0">
          <FixChat />
        </div>

        {/* Code Editor */}
        <div className="border-r border-gray-800 min-h-0 overflow-hidden">
          <CodeEditor code={code} />
        </div>

        {/* Fixed Code Preview */}
        <div className="min-h-0 overflow-hidden">
          <Preview code={code} />
        </div>

      </div>
    </div>
  );
};

export default CodeFix;