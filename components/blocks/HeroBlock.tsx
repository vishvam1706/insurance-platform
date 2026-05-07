import { HeroBlockData } from "@/types/blocks"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"
import Image from "next/image"

export default function HeroBlock({ data }: { data: HeroBlockData }) {
    return (
        <div className="mb-8">
            {data.publishedDate && (
                <p className="text-xs text-slate-400 mb-3">
                    Published on: {data.publishedDate}
                </p>
            )}

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-6">
                {data.title}
            </h1>

            {data.subtitle && (
                <p className="text-lg text-slate-600 mb-6">{data.subtitle}</p>
            )}

            {(data.author || data.reviewer) && (
                <div className="flex flex-wrap items-center gap-6 py-4 border-y border-slate-200">
                    {data.author && (
                        <Person
                            label="Written by"
                            name={data.author.name}
                            role={data.author.role}
                            avatar={data.author.avatar}
                        />
                    )}
                    {data.reviewer && (
                        <Person
                            label="Reviewed by"
                            name={data.reviewer.name}
                            role={data.reviewer.role}
                            avatar={data.reviewer.avatar}
                        />
                    )}
                    {data.certificationId && (
                        <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span className="font-medium">Certified</span>
                            <span className="text-green-500">{data.certificationId}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

function Person({ label, name, role, avatar }: {
    label: string; name: string; role: string; avatar?: string
}) {
    return (
        <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden shrink-0">
                {avatar
                    ? <Image src={avatar} alt={name} width={36} height={36} className="object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-sm font-bold text-slate-500">
                        {name.charAt(0)}
                    </div>
                }
            </div>
            <div>
                <p className="text-xs text-slate-400">{label}</p>
                <p className="text-sm font-semibold text-slate-900">{name}</p>
                <p className="text-xs text-slate-500">{role}</p>
            </div>
        </div>
    )
}