"use client";

import { updateDiaryContent, updateDiaryTitle } from "@/server";
import dayjs from "@/utils/dayjs";
import { Diary } from "@prisma/client";
import { useState } from "react";

export default function DiaryEdit({ diary }: { diary: Diary }) {
  const [title, setTitle] = useState(diary.title);
  const [content, setContent] = useState(diary.content);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    updateDiaryTitle(diary.id, title);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleContentBlur = () => {
    updateDiaryContent(diary.id, content);
  };

  return (
    <>
      <div className="text-gray-500">{dayjs(diary.date).calendar()}</div>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        onBlur={handleTitleBlur}
        className="mt-2 w-full text-2xl font-bold outline-none"
      />
      <textarea
        value={content}
        onChange={handleContentChange}
        onBlur={handleContentBlur}
        className="mt-3 w-full resize-none leading-relaxed outline-none [field-sizing:content]"
      ></textarea>
    </>
  );
}
