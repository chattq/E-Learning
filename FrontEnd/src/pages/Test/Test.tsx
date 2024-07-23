import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

export default function Test() {
  const editorRef = useRef(null);
  const [jsonOutput, setJsonOutput] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [currentAnswer, setCurrentAnswer] = useState("A");

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      const content = editor.getValue();
      parseContent(content);
    });
    editor.onKeyDown((event) => {
      if (event.keyCode === monaco.KeyCode.Enter) {
        handleEnterKey();
        event.preventDefault(); // Ngăn chặn hành vi mặc định của Enter
      }
    });
  };

  const handleEnterKey = () => {
    const editor = editorRef.current;
    if (editor) {
      const position = editor.getPosition();
      const model = editor.getModel();
      const lineContent = model.getLineContent(position.lineNumber).trim();

      if (lineContent) {
        const nextAnswer = currentAnswer;
        const nextLineContent = `${nextAnswer}. `;
        const currentLineNumber = position.lineNumber;
        console.log("nextLineContent", nextLineContent);

        // Thực hiện chỉnh sửa mô hình
        model.applyEdits([
          // Thêm một dòng trống sau dòng hiện tại
          {
            range: new monaco.Range(
              currentLineNumber + 1,
              1,
              currentLineNumber + 1,
              1
            ),
            text: "\n",
          },
          // Thêm ký tự trả lời vào dòng mới
          {
            range: new monaco.Range(
              currentLineNumber + 2,
              1,
              currentLineNumber + 2,
              1
            ),
            text: nextLineContent,
          },
        ]);

        // Di chuyển con trỏ đến đầu dòng mới sau khi đã thêm nội dung
        editor.setPosition({
          lineNumber: currentLineNumber + 2,
          column: nextLineContent.length + 1,
        });

        // Cập nhật ký tự trả lời hiện tại
        setCurrentAnswer(nextAnswerLetter(nextAnswer));
      }
    }
  };

  const nextAnswerLetter = (currentLetter) => {
    const letters = ["A", "B", "C", "D"];
    const currentIndex = letters.indexOf(currentLetter);
    console.log("letters[currentIndex + 1]", letters[currentIndex + 1]);
    console.log("currentIndex", currentIndex);
    console.log(currentLetter, "currentLetter");
    return letters[currentIndex + 1] || "A";
  };

  const parseContent = (content) => {
    const lines = content.split("\n");
    const newJsonOutput = { ...jsonOutput };
    let currentQuestionText = "";
    let isInQuestion = false;
    let answerIndex = 0;

    lines.forEach((line) => {
      if (line.startsWith("1.") || line.startsWith("2.")) {
        const questionNumber = line.split(".")[0];
        currentQuestionText = line.slice(3).trim();
        newJsonOutput[questionNumber] = {
          question: currentQuestionText,
          answer: [],
        };
        setCurrentQuestion(parseInt(questionNumber));
        setCurrentAnswer("A");
        isInQuestion = true;
        answerIndex = 0;
      } else if (
        isInQuestion &&
        (line.startsWith("A.") ||
          line.startsWith("B.") ||
          line.startsWith("C.") ||
          line.startsWith("D."))
      ) {
        const answerLetter = line[0];
        const answerText = line.slice(3).trim();
        newJsonOutput[currentQuestion].answer.push({
          [answerLetter]: answerText,
        });
        setCurrentAnswer(nextAnswerLetter(answerLetter));
        answerIndex++;
      } else if (line.trim() === "" && isInQuestion) {
        if (
          Object.keys(newJsonOutput).length > 0 &&
          newJsonOutput[currentQuestion].answer.length > 0
        ) {
          setCurrentQuestion((prev) => prev + 1);
          setCurrentAnswer("A");
          isInQuestion = false;
        }
      }
    });

    setJsonOutput(newJsonOutput);
  };

  return (
    <div>
      <Editor
        height="50vh"
        defaultLanguage="plaintext"
        defaultValue=""
        onMount={handleEditorDidMount}
      />
      <pre>{JSON.stringify(jsonOutput, null, 2)}</pre>
    </div>
  );
}
