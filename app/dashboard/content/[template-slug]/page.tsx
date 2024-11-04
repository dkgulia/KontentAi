"use client";
import React,{useState}from 'react';
import FormSection from '../component/FormSection';
import OutputSection from '../component/OutputSection';
import { TEMPLATE } from '../../_components/TemplateList';
import Templates from '@/app/(data)/Templates';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link'; 
import { chatSession } from '@/utils/AiModel';

interface PROPS {
    params: {
        'template-slug': string;
    };
    slug: string;
}

function CreateNewContent(props: PROPS) {
    const selectedTemplates: TEMPLATE | undefined = Templates?.find(
        (item) => item.slug == props.params['template-slug']
    );
     
    const [loading,setLoading]=useState(false);
    const [aiOutput,setAiOutput]=useState<string>('')
    const GenerateAIContent = async(formData: any) => {
        setLoading(true);
       const SelectedPrompt = selectedTemplates?.aiPrompt;

       const FinalAIPrompt=JSON.stringify(formData)+","+SelectedPrompt;

       const result = await chatSession.sendMessage(FinalAIPrompt);

       console.log(result.response.text())
       setAiOutput(result.response?.text())
       setLoading(false);
    };

    return (
        <div className="p-10">
            {/* Back button */}
            <Link href="/dashboard">
                <button className="flex items-center p-2 bg-gray-100 hover:bg-gray-200 rounded">
                    <ArrowLeft className="mr-1" />
                    Back
                </button>
            </Link>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                {/* Form section (left, 30%) */}
                <div className="md:col-span-1">
                    <FormSection
                        selectedTemplates={selectedTemplates}
                        userFormInput={(v: any) => GenerateAIContent(v)}
                        loading={loading}
                    />
                </div>
                
                {/* Output section (right, 70%) */}
                <div className="md:col-span-2">
                    <OutputSection aiOutput={aiOutput}/>
                </div>
            </div>
        </div>
    );
}

export default CreateNewContent;
