"use client";
import React, { useState, useEffect } from 'react';
import FormSection from '../component/FormSection';
import OutputSection from '../component/OutputSection';
import { TEMPLATE } from '../../_components/TemplateList';
import Templates from '@/app/(data)/Templates';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link'; 
import { chatSession } from '@/utils/AiModel';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/clerk-react';
import { db } from '@/utils/db';

interface PROPS {
    params: Promise<{
        'template-slug': string;
    }>;
    slug: string;
}

function CreateNewContent(props: PROPS) {
    const [selectedTemplates, setSelectedTemplates] = useState<TEMPLATE | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState<string>('');
    const { user } = useUser();

    useEffect(() => {
        const fetchParams = async () => {
            const resolvedParams = await props.params;
            const template = Templates?.find(item => item.slug === resolvedParams['template-slug']);
            setSelectedTemplates(template);
        };
        fetchParams();
    }, [props.params]);

    const GenerateAIContent = async (formData: any) => {
        setLoading(true);
        const SelectedPrompt = selectedTemplates?.aiPrompt;
        const FinalAIPrompt = JSON.stringify(formData) + "," + SelectedPrompt;

        const result = await chatSession.sendMessage(FinalAIPrompt);

        console.log(result.response.text())
        setAiOutput(result.response?.text());
        await SaveInDb(JSON.stringify(formData), selectedTemplates?.slug, result.response.text())
        setLoading(false);
    };

    const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
        const result = await db.insert(AIOutput).values({
            formData: formData,
            templateSlug: slug,
            aiResponse: aiResp,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: new Date()
        })

        console.log(result);
    }

    return (
        <div className="p-10">
            {/* Back button */}
            <Link href="/dashboard">
                <button className="flex items-center p-2 bg-gray-100 hover:bg-gray-200 rounded">
                    <ArrowLeft className="mr-1" />
                    Back
                </button>
            </Link>
            
            <div className="grid grid-cols-1 md:grid-cols-10 gap-5 py-5">
    {/* Form section (left, 30%) */}
    <div className="col-span-1 md:col-span-3">
        <FormSection
            selectedTemplates={selectedTemplates}
            userFormInput={(v: any) => GenerateAIContent(v)}
            loading={loading}
        />
    </div>
    
    {/* Output section (right, 70%) */}
    <div className="col-span-1 md:col-span-7">
        <div className="bg-gray-100 p-5 rounded-md shadow">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Your Result</h2>
                <button className="text-blue-500 hover:text-blue-700">Copy</button>
            </div>
            <OutputSection aiOutput={aiOutput}/>
        </div>
    </div>
</div>

        </div>
    );
}

export default CreateNewContent;
