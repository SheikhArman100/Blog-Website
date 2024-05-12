"use client";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const RichTextEditor = () => {
  const {
    register,
    control,
    setValue,
    formState: { errors, isValid },
  } = useFormContext();
  return (
    <div className="w-full">
      <label className="inline-block mb-1 pl-1">Description:</label>

      <Controller
        name="description"
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
            initialValue=""
            init={{
              initialValue: "",
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
      {errors.description?.message && (
        <p className="text-xs font-semibold text-red-700 ">
          *{errors.description?.message}
        </p>
      )}
    </div>
  );
};

export default RichTextEditor;
