"use client"

import { policymineExperienceBlockData } from "@/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import ImageUploader from "../ImageUploader"

interface Props {
    data: policymineExperienceBlockData
    onChange: (d: policymineExperienceBlockData) => void
}

export default function policymineExperienceEditor({ data = {}, onChange }: Props) {
    function set(key: keyof policymineExperienceBlockData, val: any) {
        onChange({ ...data, [key]: val })
    }

    return (
        <div className="space-y-6">
            {/* Texts Section */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Left Content & Header Texts</h3>
                
                <div className="space-y-2">
                    <Label className="text-xs text-slate-500">Badge/Heading (e.g. "The Process")</Label>
                    <Input 
                        value={data?.heading || ""} 
                        onChange={(e) => set("heading", e.target.value)} 
                        placeholder="The Process (default)" 
                        className="text-sm font-medium"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-xs text-slate-500">Section Title (e.g. "The Policymine Experience.")</Label>
                    <Input 
                        value={data?.subheading || ""} 
                        onChange={(e) => set("subheading", e.target.value)} 
                        placeholder="The Policymine Experience. (default)" 
                        className="text-sm font-medium"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-xs text-slate-500">Section Description</Label>
                    <Textarea 
                        value={data?.description || ""} 
                        onChange={(e) => set("description", e.target.value)} 
                        placeholder="We have redesigned the entire buying journey to put you in control... (default)" 
                        className="text-sm min-h-[80px]"
                    />
                </div>
            </div>

            <hr className="border-slate-200" />

            {/* Images Section */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Process & Step Visual Media</h3>
                
                <ImageUploader
                    label="Left Card Process Image (optional)"
                    value={data?.leftImage || ""}
                    onChange={(url) => set("leftImage", url)}
                />
                <p className="text-[10px] text-slate-500 -mt-2">
                    Displays inside the left sticky card below the description text.
                </p>

                <div className="border border-slate-200 rounded-xl p-4 space-y-4 bg-slate-50">
                    <h4 className="text-[11px] font-bold text-slate-500 uppercase">Step Side Panels (replaces custom interactive graphics)</h4>

                    <div className="space-y-2">
                        <ImageUploader
                            label="Step 1 Visual Photo: Get Expert Guidance (optional)"
                            value={data?.step1Image || ""}
                            onChange={(url) => set("step1Image", url)}
                        />
                        <p className="text-[10px] text-slate-500">
                            Replaces the interactive phone chat mockup visual.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <ImageUploader
                            label="Step 2 Visual Photo: End-to-End Assistance (optional)"
                            value={data?.step2Image || ""}
                            onChange={(url) => set("step2Image", url)}
                        />
                        <p className="text-[10px] text-slate-500">
                            Replaces the Journey Tracker progress timeline visual.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <ImageUploader
                            label="Step 3 Visual Photo: Dedicated Claim Support (optional)"
                            value={data?.step3Image || ""}
                            onChange={(url) => set("step3Image", url)}
                        />
                        <p className="text-[10px] text-slate-500">
                            Replaces the claim settlement progress bar visual.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
