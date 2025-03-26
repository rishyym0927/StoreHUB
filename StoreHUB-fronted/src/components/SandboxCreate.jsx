import React, { useState } from "react";
import axios from "axios";
import { Code, Globe, Layers, Braces } from "lucide-react";
import apiClient from "../utils/apiClient";

// Framework-specific configurations
const FRAMEWORK_CONFIGS = {
  html: {
    name: "HTML/CSS/JS",
    icon: <Globe className="mr-2" />,
    files: [
      {
        name: "index.html",
        label: "HTML",
        placeholder: "Write your HTML code here",
        defaultValue:
          "<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>",
      },
      {
        name: "styles.css",
        label: "CSS",
        placeholder: "Write your CSS code here",
        defaultValue:
          "body {\n  font-family: Arial, sans-serif;\n  text-align: center;\n}",
      },
      {
        name: "script.js",
        label: "JavaScript",
        placeholder: "Write your JavaScript code here",
        defaultValue:
          "console.log('Hello World');\n\ndocument.querySelector('h1').onclick = () => {\n  alert('Clicked!');\n}",
      },
    ],
  },
  react: {
    name: "React",
    icon: <Code className="mr-2" />,
    files: [
      {
        name: "App.js",
        label: "App.js",
        placeholder: "Write your React component here",
        defaultValue: `import React, { useState } from 'react';\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <h1>Counter: {count}</h1>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}\n\nexport default App;`,
      },
      {
        name: "index.js",
        label: "index.js",
        placeholder: "Entry point for React application",
        defaultValue: `import React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\n\nReactDOM.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n  document.getElementById('root')\n);`,
      },
      {
        name: "package.json",
        label: "package.json",
        placeholder: "Define your dependencies here",
        defaultValue: `{
  "name": "react-sandbox",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "react": "^17.0.0",
    "react-dom": "^17.0.0"
  }
}`,
      },
    ],
  },
  vue: {
    name: "Vue",
    icon: <Layers className="mr-2" />,
    files: [
      {
        name: "App.vue",
        label: "App.vue",
        placeholder: "Write your Vue component here",
        defaultValue: `<template>\n  <div>\n    <h1>{{ message }}</h1>\n    <button @click=\"updateMessage\">\n      Click Me\n    </button>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      message: 'Hello Vue!'\n    }\n  },\n  methods: {\n    updateMessage() {\n      this.message = 'Message Updated!'\n    }\n  }\n}\n</script>`,
      },
      {
        name: "index.html",
        label: "HTML",
        placeholder: "Write your HTML file here",
        defaultValue:
          '<!DOCTYPE html>\n<html>\n<body>\n  <div id="app"></div>\n  <script src="main.js"></script>\n</body>\n</html>',
      },
      {
        name: "package.json",
        label: "package.json",
        placeholder: "Define your dependencies here",
        defaultValue: `{
  "name": "vue-sandbox",
  "version": "1.0.0",
  "main": "main.js",
  "dependencies": {
    "vue": "^3.0.0"
  }
}`,
      },
    ],
  },
  svelte: {
    name: "Svelte",
    icon: <Braces className="mr-2" />,
    files: [
      {
        name: "App.svelte",
        label: "App.svelte",
        placeholder: "Write your Svelte component here",
        defaultValue: `<script>\n  let count = 0;\n  function handleClick() {\n    count += 1;\n  }\n</script>\n\n<main>\n  <h1>Svelte Counter: {count}</h1>\n  <button on:click={handleClick}>\n    Increment\n  </button>\n</main>\n\n<style>\n  main {\n    text-align: center;\n    padding: 20px;\n  }\n</style>`,
      },
      {
        name: "package.json",
        label: "package.json",
        placeholder: "Define your dependencies here",
        defaultValue: `{
  "name": "svelte-sandbox",
  "version": "1.0.0",
  "main": "App.svelte",
  "dependencies": {
    "svelte": "^3.0.0"
  }
}`,
      },
    ],
  },
};

const SandboxCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [activeFramework, setActiveFramework] = useState("html");
  const [codeFiles, setCodeFiles] = useState(
    FRAMEWORK_CONFIGS["html"].files.reduce(
      (acc, file) => ({
        ...acc,
        [file.name]: file.defaultValue,
      }),
      {}
    )
  );
  const [embedUrl, setEmbedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = (fileName, value) => {
    setCodeFiles((prev) => ({
      ...prev,
      [fileName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setEmbedUrl("");

    try {
      const payload = {
        files: Object.entries(codeFiles)
          .filter(([_, content]) => content.trim())
          .reduce(
            (acc, [fileName, content]) => ({
              ...acc,
              [fileName]: { content },
            }),
            {}
          ),
      };

      const response = await axios.post(
        "https://codesandbox.io/api/v1/sandboxes/define?json=1",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      const sandboxId = response.data.sandbox_id;
      //   const formData =
      const formData = {
        title: title,
        description: description,
        elink: `https://codesandbox.io/embed/${sandboxId}?view=preview`,
      };
      console.log(formData);
      const response2 = await apiClient.post('/sandbox', formData);

      setTitle("");
      setDescription("");

      setEmbedUrl(`https://codesandbox.io/embed/${sandboxId}`);
    } catch (error) {
      console.error("Error creating sandbox:", error);
      alert("An error occurred while generating the sandbox.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectFramework = (framework) => {
    const newFiles = FRAMEWORK_CONFIGS[framework].files.reduce(
      (acc, file) => ({
        ...acc,
        [file.name]: file.defaultValue,
      }),
      {}
    );

    setActiveFramework(framework);
    setCodeFiles(newFiles);
    setEmbedUrl("");
  };

  return (
    <div className="container mx-auto p-6 mt-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        CodeSandbox Generator
      </h1>

      <div className="space-y-4 mb-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

  
      <div className="flex justify-center space-x-4 mb-6">
        {Object.entries(FRAMEWORK_CONFIGS).map(([key, config]) => (
          <button
            key={key}
            onClick={() => selectFramework(key)}
            className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg transition-all
                  ${
                    activeFramework === key
                      ? "bg-black text-white"
                      : "bg-white border border-black text-gray-700 hover:bg-gray-100"
                  }
                `}
          >
            {config.icon}
            <span>{config.name}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {FRAMEWORK_CONFIGS[activeFramework].files.map((file) => (
          <div key={file.name}>
            <label
              htmlFor={file.name}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {file.label}
            </label>
            <textarea
              id={file.name}
              value={codeFiles[file.name] || ""}
              onChange={(e) => handleCodeChange(file.name, e.target.value)}
              placeholder={file.placeholder}
              rows={10}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={
                file.name ===
                Object.keys(FRAMEWORK_CONFIGS[activeFramework].files)[0]
              }
            />
          </div>
        ))}


        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="
                  bg-white text-black border border-black px-6 py-3 rounded-lg
                  hover:bg-gray-100 hover:scale-105 
                  transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center
                "
          >
            {isLoading ? "Generating..." : "Create Sandbox"}
          </button>
        </div>
      </form>

      {embedUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Generated Sandbox
          </h2>
          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <iframe
              src={embedUrl}
              title="CodeSandbox Embed"
              className="w-full h-[600px] border-0"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default SandboxCreate;
