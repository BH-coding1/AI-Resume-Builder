"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { convertPdfToImage } from "@/app/lib/pdfToImage";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useResponse } from "@/app/context/ResponseContext";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroupTextarea } from "@/components/ui/input-group";
import FileUploaderButton from "./fileUploaderButton";

const formSchema = z.object({
  companyName: z
    .string()
    .min(1, "Company Name must be longer than 2")
    .max(30, "Company Name must be at most 30 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(100, "Description must be at most 100 characters."),
  jobTitle: z
    .string()
    .min(5, "Description must be at least 5 characters.")
    .max(20, "Description must be at most 20 characters."),
  uploader: z.file(),
});

const UploadForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      description: "",
      jobTitle: "",
    },
  });
  const { setResponse } = useResponse();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    description,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    description: string;
    file: File;
  }) => {
    try {
      setIsProcessing(true);
      setStatusText("Uploading the file...");

      
    // Upload PDF
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    const uploadRes = await fetch("/api/upload-pdf", {
      method: "POST",
      body: uploadFormData,
    });
    
    if (!uploadRes.ok){
      console.log(uploadRes.json())
      throw new Error("Failed to upload PDF");
    } 

    const { pdfUrl } = await uploadRes.json();   

      // Prepare the form data to send to the backend API
      const formData = new FormData();
      formData.append("companyName", companyName);
      formData.append("jobTitle", jobTitle);
      formData.append("description", description);
      formData.append("pdfUrl", pdfUrl);  

      // Send the data to the backend API
      const response = await fetch("/api/webhooks/analysis", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log("content", result.result[0].message.content);

      console.log("API response:", result);

      setStatusText("Analyzing the resume...");
      const imageFile = await convertPdfToImage(file);
      console.log("Converted image file:", imageFile);

      if (!imageFile.file) {
        setStatusText("No images generated from PDF.");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsProcessing(false);
        return console.error("No images generated from PDF.");
      }

      setStatusText("Generating the report...");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate analysis results
      const analysisResults = {
        pdfImage: imageFile.imageUrl,
        title: jobTitle,
        companyname: companyName,
      };
      // setting the response context

      setResponse({
        pdfUrl, 
        scores: {
          tone_score: result.result[0].message.content.scores?.tone_score || 0,
          structure_score:
            result.result[0].message.content.scores?.structure_score || 0,
          skills_match_score:
            result.result[0].message.content.scores?.skills_match_score || 0,
        },
        ats_score: {
          score: result.result[0].message.content.ats_score?.score || 0,
          justification:
            result.result[0].message.content.ats_score?.justification || "",
        },
        resume_analysis: result.result[0].message.content.resume_analysis || [],
        optimization_suggestions:
          result.result[0].message.content.optimization_suggestions || [],
        companyName: analysisResults.companyname,
        jobTitle: analysisResults.title,
      });

      setStatusText("Analysis complete!");
      toast.success("Analysis completed successfully!");

      router.push(
        `/analysis?pdfImage=${encodeURIComponent(
          analysisResults.pdfImage
        )}&title=${encodeURIComponent(analysisResults.title)}
        }&companyname=${encodeURIComponent(analysisResults.companyname)}`
      );
    } catch (error) {
      console.error("Error during analysis:", error);
      setStatusText("An error occurred during the analysis.");
      toast.error("Failed to analyze the file.");
    } finally {
      setIsProcessing(false);
    }
  };

  function onSubmit(data: z.infer<typeof formSchema>) {
    const { companyName, jobTitle, description, uploader } = data;

    if (!file) {
      toast.error("Please upload a file before analyzing.");
      return;
    }

    handleAnalyze({
      companyName,
      jobTitle,
      description,
      file: uploader,
    });
  }

  const handleFileUpload = (file: File | null) => {
    setFile(file);
  };

  return (
    <section className="py-40">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-3 md:px-6">
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center">
            <div className="loader mb-4"></div>
            <p className="text-gray-600 text-lg">{statusText}</p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-6xl font-extrabold tracking-tight bg-gray-900 text-transparent bg-clip-text">
                Smart Analyzer for Your Dream Job
              </h1>
              <p className="mt-5 text-lg sm:text-xl text-gray-500 text-base">
                Drag and drop your résumé to be scored and get personalized tips
              </p>
            </div>

            <Card className="w-full xl border-none shadow-none mt-10 bg-transparent">
              <CardContent className="p-8">
                <form id="Upload_form" onSubmit={form.handleSubmit(onSubmit)}>
                  <FieldGroup className="space-y-6">
                    <Controller
                      name="companyName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="companyName"
                            className="text-gray-600"
                          >
                            Company Name
                          </FieldLabel>
                          <Input
                            {...field}
                            id="companyName"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter company name"
                            autoComplete="on"
                            className="min-h-[3rem] w-full rounded-2xl bg-white border shadow-sm px-4 py-3 text-gray-800 placeholder-gray-100 focus:bg-white focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-200"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="jobTitle"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="jobTitle"
                            className="text-gray-600 font-medium"
                          >
                            Job Title
                          </FieldLabel>
                          <Input
                            {...field}
                            id="jobTitle"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter job title"
                            autoComplete="on"
                            className="min-h-[3rem] w-full rounded-2xl bg-white shadow-sm px-4 py-3 text-gray-800 placeholder-gray-100 focus:bg-white focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-200"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="description"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="description"
                            className="text-gray-600 font-medium"
                          >
                            Description
                          </FieldLabel>
                          <InputGroupTextarea
                            {...field}
                            id="description"
                            placeholder="Describe the company or role"
                            rows={6}
                            className="min-h-[12rem] w-full rounded-2xl bg-white border shadow-sm px-4 py-3 text-gray-800 placeholder-gray-100 focus:bg-white focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all duration-200"
                            aria-invalid={fieldState.invalid}
                          />
                          <FieldDescription className="text-sm text-gray-500 mt-1">
                            Write a short description about the company or
                            position you’re targeting.
                          </FieldDescription>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="uploader"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="companyName"
                            className="text-gray-700 font-semibold"
                          ></FieldLabel>
                          <div
                            {...field}
                            id="uploader"
                            aria-invalid={fieldState.invalid}
                          >
                            <FileUploaderButton
                              onFileSelect={(file) => {
                                field.onChange(file);
                                setFile(file);
                              }}
                            />
                          </div>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center gap-4 p-6 border-t border-gray-100">
                <Button
                  type="submit"
                  form="Upload_form"
                  className="rounded-full w-full px-6 h-full py-3 bg-primary hover:bg-primary-500 text-white font-xl shadow-md transition-all duration-100"
                >
                  Analyze
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </section>
  );
};

export default UploadForm;
