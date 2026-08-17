
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Paperclip, X, } from "lucide-react";

import { useCreateRequestMutation } from "../../store/slices/requestSlice";

/* Validation Schema */

const requestSchema = z.object({
  title: z
    .string()
    .min(1, "Request title is required")
    .min(5, "Title must be at least 5 characters"),

  category: z
    .string()
    .min(1, "Please select a category"),

  priority: z
    .string()
    .min(1, "Please select a priority"),

  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),

  assignedTo: z
    .string()
    .min(1, "Please select a user"),

  dueDate: z
    .string()
    .min(1, "Due date is required"),
});

/* =========================
   Mock Data
========================= */

const categoryOptions = [
  {
    value: "hardware",
    label: "Hardware",
  },
  {
    value: "software",
    label: "Software",
  },
  {
    value: "access",
    label: "Access",
  },
  {
    value: "hr",
    label: "HR",
  },
  {
    value: "stationery",
    label: "Stationery",
  },
  {
    value: "other",
    label: "Other",
  },
];

const priorityOptions = [
  {
    value: "low",
    label: "Low",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "high",
    label: "High",
  },
  {
    value: "critical",
    label: "Critical",
  },
];

const userOptions = [
  {
    value: "amit",
    label: "Amit Sharma",
  },
  {
    value: "priya",
    label: "Priya Singh",
  },
  {
    value: "rahul",
    label: "Rahul Verma",
  },
];

/* =========================
   Component
========================= */

export default function RequestForm() {
  const router = useRouter();
  const [createRequest] = useCreateRequestMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(requestSchema),

    defaultValues: {
      title: "",
      category: "",
      priority: "",
      description: "",
      assignedTo: "",
      dueDate: "",
    },
  });

  /* =========================
     File Upload
  ========================= */

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(
      event.target.files || []
    );

    setFiles((previousFiles) => [
      ...previousFiles,
      ...selectedFiles,
    ]);
  };

  const removeFile = (indexToRemove) => {
    setFiles((previousFiles) =>
      previousFiles.filter(
        (_, index) => index !== indexToRemove
      )
    );
  };

  /* =========================
     Submit
  ========================= */

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const newRequest = await createRequest({
        id: `REQ-${Math.floor(Math.random() * 10000)}`,
        title: data.title,
        category: data.category,
        priority: data.priority,
        description: data.description,
        assignedTo: data.assignedTo,
        dueDate: data.dueDate,
        status: "Pending",
        attachments: files,
        requestedBy: "Raj Kumar",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }).unwrap();

      // console.log("New Request:", newRequest);

      // API call with RTK Query mutation - this automatically updates cache
      // console.log("API Response:", newRequest);

      // Request list par redirect
      router.push("/requests");

    } catch (error) {
      console.log("Failed to create request:", error);
      setError(error?.message || "Failed to create request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================
     Input Style
  ========================= */

  const inputClass = (error) =>
    `w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/10 ${error
      ? "border-red-500 focus:border-red-500"
      : "border-slate-300 focus:border-blue-500"
    }`;

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =========================
          Header
      ========================= */}

      <div className="border-b border-slate-200 bg-white">
        <div className="flex min-w-0 flex-1 flex-col lg:ml-64 ">
          <div className="mx-auto flex w-full items-center gap-4 px-4 py-5 sm:px-6 lg:px-8">

            <button
              type="button"
              onClick={() => router.push("/requests")}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            ><ArrowLeft size={20} /></button>

            <div>
              <h1 className="text-xl font-bold text-slate-900">Create New Request</h1>
              <p className="mt-1 text-sm text-slate-500">Create a new service request for your team.</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          Content
      ========================= */}

      <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 flex-col lg:ml-64 ">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            {/* =========================
              Request Information
          ========================= */}

            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <h2 className="text-base font-semibold text-slate-900">Request Information</h2>
                <p className="mt-1 text-sm text-slate-500">Provide the details of the service request.</p>
              </div>

              <div className="space-y-6 p-6">

                {/* Title */}



                {/* Category + Priority */}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-slate-700">Request Title</label>
                    <input
                      id="title"
                      type="text"
                      placeholder="e.g. Laptop replacement required"
                      {...register("title")}
                      className={inputClass(errors.title)}
                    />

                    {errors.title && (<p className="text-xs font-medium text-red-500">{errors.title.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
                    <select id="category"
                      {...register("category")}
                      className={inputClass(errors.category)}
                    >
                      <option value="">Select Category</option>

                      {categoryOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>

                    {errors.category && (
                      <p className="text-xs font-medium text-red-500">{errors.category.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="priority" className="block text-sm font-medium text-slate-700">Priority</label>

                    <select
                      id="priority"
                      {...register("priority")}
                      className={inputClass(errors.priority)}
                    >
                      <option value="">Select Priority</option>

                      {priorityOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>

                    {errors.priority && (
                      <p className="text-xs font-medium text-red-500">{errors.priority.message}</p>
                    )}
                  </div>

                </div>

                {/* Assigned To + Due Date */}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                  <div className="space-y-2">
                    <label
                      htmlFor="assignedTo"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Assigned To
                    </label>

                    <select
                      id="assignedTo"
                      {...register("assignedTo")}
                      className={inputClass(
                        errors.assignedTo
                      )}
                    >
                      <option value="">
                        Select User
                      </option>

                      {userOptions.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>

                    {errors.assignedTo && (
                      <p className="text-xs font-medium text-red-500">
                        {errors.assignedTo.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="dueDate"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Due Date
                    </label>

                    <input
                      id="dueDate"
                      type="date"
                      {...register("dueDate")}
                      className={inputClass(
                        errors.dueDate
                      )}
                    />

                    {errors.dueDate && (
                      <p className="text-xs font-medium text-red-500">
                        {errors.dueDate.message}
                      </p>
                    )}
                  </div>

                </div>

                {/* Description */}

                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>

                  <textarea
                    id="description"
                    rows={5}
                    placeholder="Please describe your request in detail..."
                    {...register("description")}
                    className={`${inputClass(
                      errors.description
                    )} resize-none`}
                  />

                  {errors.description && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>

              </div>
            </section>

            {/* =========================
              Attachments + Description
          ========================= */}

            <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <h2 className="text-base font-semibold text-slate-900">Attachments</h2>
                <p className="mt-1 text-sm text-slate-500">Add relevant files if required.</p>
              </div>
              <div className="p-6">
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 py-10 transition hover:border-blue-400 hover:bg-blue-50/30">
                  <Paperclip
                    size={24}
                    className="text-slate-400"
                  />
                  <p className="mt-3 text-sm font-medium text-slate-700">Click to upload files</p>
                  <p className="mt-1 text-xs text-slate-400">PDF, PNG, JPG, DOC up to 10MB</p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>

                {/* Selected Files */}

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-700">{file.name}</p>
                          <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-4 rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                        >
                          <X size={17} />
                        </button>

                      </div>
                    ))}

                  </div>
                )}

              </div>
            </section>

            {/* =========================
              Actions
          ========================= */}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => router.push("/requests")}
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Creating...
                  </>
                ) : (
                  "Create Request"
                )}
              </button>

            </div>

          </form>
        </div>
      </div>
    </main>
  );
}

