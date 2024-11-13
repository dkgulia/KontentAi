"use client";
import React, { useState, useEffect } from "react";
import FormSection from "../component/FormSection";
import OutputSection from "../component/OutputSection";
import { TEMPLATE } from "../../_components/TemplateList";
import Templates from "@/app/(data)/Templates";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModel";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/clerk-react";
import { db } from "@/utils/db";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

function CreateNewContent({ params }: PROPS) {
  const [selectedTemplates, setSelectedTemplates] = useState<TEMPLATE | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const { user } = useUser();

  useEffect(() => {
    const template = Templates.find((item) => item.slug === params["template-slug"]);
    setSelectedTemplates(template);
  }, [params]);

  const GenerateAIContent = async (formData: any) => {
    setLoading(true);
    const SelectedPrompt = selectedTemplates?.aiPrompt;
    const FinalAIPrompt = JSON.stringify(formData) + "," + SelectedPrompt;

    const result = await chatSession.sendMessage(FinalAIPrompt);

    console.log(result.response.text());
    setAiOutput(result.response?.text());
    await SaveInDb(JSON.stringify(formData), selectedTemplates?.slug, result.response.text());
    setLoading(false);
  };

  const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
    const result = await db.insert(AIOutput).values({
      formData,
      templateSlug: slug,
      aiResponse: aiResp,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: new Date(),
    });

    console.log(result);
  };

  return (
    <div className="p-10 bg-customDark text-white">
      {/* Back button */}
      <Link href="/dashboard">
        <button className="flex items-center p-2 bg-primary hover:bg-gray-200 text-black rounded">
          <ArrowLeft className="mr-1" />
          Back
        </button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-5 py-5 text-black">
        {/* Form section (left, 30%) */}
        <div className="col-span-1 md:col-span-3 bg-customDark">
          <FormSection
            selectedTemplates={selectedTemplates}
            userFormInput={(v: any) => GenerateAIContent(v)}
            loading={loading}
          />
        </div>

        {/* Output section (right, 70%) */}
        <div className="col-span-1 md:col-span-7 bg-customDark text-white p-5">
          <div className="rounded-md shadow">
            <OutputSection aiOutput={aiOutput} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
