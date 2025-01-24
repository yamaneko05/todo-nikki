"use client";

import * as server from "@/server";
import dayjs from "@/utils/dayjs";
import { Diary } from "@prisma/client";
import { LucideTrash2 } from "lucide-react";
import { useState } from "react";

export default function DiaryEdit({ diary }: { diary: Diary }) {
  const [title, setTitle] = useState(diary.title);
  const [content, setContent] = useState(diary.content);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    server.updateDiaryTitle(diary.id, title);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleContentBlur = () => {
    server.updateDiaryContent(diary.id, content);
  };

  const handleDeleteButtonClick = () => {
    server.deleteDiary(diary.id);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-gray-500">
          {dayjs(diary.date).format("M/D (ddd)")}
        </div>
        <button
          onClick={handleDeleteButtonClick}
          className="flex items-center gap-1 text-sm text-gray-500"
        >
          <LucideTrash2 size={18} />
          削除
        </button>
      </div>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        onBlur={handleTitleBlur}
        placeholder="日記のタイトルを入力"
        className="mt-2 w-full text-2xl font-bold outline-none"
      />
      <textarea
        value={content}
        onChange={handleContentChange}
        onBlur={handleContentBlur}
        className="mt-3 w-full resize-none leading-relaxed outline-none [field-sizing:content]"
        placeholder="日記の本文を入力"
      ></textarea>
    </>
  );
}
