"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { 
    MessageCircle, Plus, Edit2, Trash2, Star, CheckCircle, XCircle, 
    Loader2, User, Landmark, Sparkles, X, ChevronRight 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Testimonial {
    _id: string
    name: string
    role: string
    body: string
    rating: number
    initials: string
    active: boolean
    createdAt: string
}

export default function TestimonialsAdminPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentId, setCurrentId] = useState("")

    // Form states
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [body, setBody] = useState("")
    const [rating, setRating] = useState(5)
    const [initials, setInitials] = useState("")
    const [active, setActive] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchTestimonials()
    }, [])

    async function fetchTestimonials() {
        setLoading(true)
        try {
            const res = await axios.get("/api/testimonials?admin=true")
            setTestimonials(res.data.testimonials || [])
        } catch (err) {
            console.error(err)
            toast.error("Failed to load testimonials")
        } finally {
            setLoading(false)
        }
    }

    function openAddModal() {
        setIsEditing(false)
        setCurrentId("")
        setName("")
        setRole("")
        setBody("")
        setRating(5)
        setInitials("")
        setActive(true)
        setModalOpen(true)
    }

    function openEditModal(t: Testimonial) {
        setIsEditing(true)
        setCurrentId(t._id)
        setName(t.name)
        setRole(t.role)
        setBody(t.body)
        setRating(t.rating)
        setInitials(t.initials)
        setActive(t.active)
        setModalOpen(true)
    }

    // Auto-generate initials on name change
    function handleNameChange(val: string) {
        setName(val)
        if (!val) {
            setInitials("")
            return
        }
        const parts = val.trim().split(/\s+/)
        if (parts.length >= 2) {
            setInitials((parts[0][0] + parts[parts.length - 1][0]).toUpperCase())
        } else if (parts.length === 1 && parts[0]) {
            setInitials(parts[0].slice(0, 2).toUpperCase())
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!name.trim() || !role.trim() || !body.trim() || !initials.trim()) {
            toast.error("Please fill in all fields")
            return
        }

        setSaving(true)
        try {
            const payload = { name, role, body, rating, initials, active }
            if (isEditing) {
                await axios.put(`/api/testimonials/${currentId}`, payload)
                toast.success("Testimonial updated successfully")
            } else {
                await axios.post("/api/testimonials", payload)
                toast.success("Testimonial added successfully")
            }
            setModalOpen(false)
            fetchTestimonials()
        } catch (err) {
            console.error(err)
            toast.error(axios.isAxiosError(err) && err.response?.data?.error ? err.response.data.error : "Failed to save testimonial")
        } finally {
            setSaving(false)
        }
    }

    async function toggleActive(t: Testimonial) {
        try {
            const updatedActive = !t.active
            await axios.put(`/api/testimonials/${t._id}`, { active: updatedActive })
            setTestimonials(prev => prev.map(item => item._id === t._id ? { ...item, active: updatedActive } : item))
            toast.success(updatedActive ? "Testimonial activated" : "Testimonial deactivated")
        } catch (err) {
            console.error(err)
            toast.error("Failed to update status")
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this testimonial?")) return
        try {
            await axios.delete(`/api/testimonials/${id}`)
            setTestimonials(prev => prev.filter(t => t._id !== id))
            toast.success("Testimonial deleted successfully")
        } catch (err) {
            console.error(err)
            toast.error("Failed to delete testimonial")
        }
    }

    return (
        <div className="space-y-6 pt-3 sm:pt-5 lg:pt-6 text-left">
            {/* Header section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                        <MessageCircle className="w-6 h-6 text-emerald-600" />
                        Testimonials Management
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Manage customer reviews displayed on the homepage
                    </p>
                </div>
                <Button 
                    onClick={openAddModal}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 rounded-xl shadow-md transition-all active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    Add Testimonial
                </Button>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
                    <p className="text-slate-500 text-sm font-medium">Loading testimonials...</p>
                </div>
            ) : testimonials.length === 0 ? (
                <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center max-w-xl mx-auto space-y-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto border border-slate-100">
                        <MessageCircle className="w-6 h-6 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">No Testimonials Yet</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Add a review to display high-quality social proof on the premium Policymine homepage.
                    </p>
                    <Button onClick={openAddModal} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                        Add Your First Testimonial
                    </Button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <div 
                            key={t._id} 
                            className={`rounded-3xl p-6 bg-white border transition-all duration-300 relative ${
                                t.active ? "border-slate-200 hover:border-emerald-500/40 shadow-sm" : "border-slate-200 opacity-60 bg-slate-50/50"
                            }`}
                        >
                            {/* Initials & Active Badge */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-100">
                                    {t.initials}
                                </div>
                                <button 
                                    onClick={() => toggleActive(t)}
                                    className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border transition-all hover:scale-105 active:scale-95 ${
                                        t.active 
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                                            : "bg-rose-50 text-rose-700 border-rose-100"
                                    }`}
                                >
                                    {t.active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                    {t.active ? "Active" : "Inactive"}
                                </button>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-0.5 mb-3.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star 
                                        key={i} 
                                        className={`w-3.5 h-3.5 ${i < t.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} 
                                    />
                                ))}
                            </div>

                            {/* Review content */}
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                                "{t.body}"
                            </p>

                            {/* Author */}
                            <div className="pt-4 border-t border-slate-50 flex items-end justify-between">
                                <div>
                                    <p className="font-extrabold text-slate-800 text-sm">{t.name}</p>
                                    <p className="text-slate-400 text-xs font-medium mt-0.5">{t.role}</p>
                                </div>
                                
                                {/* Edit / Delete Actions */}
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => openEditModal(t)}
                                        className="p-2 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl border border-slate-100 text-slate-500 transition-colors"
                                        title="Edit Review"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(t._id)}
                                        className="p-2 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 rounded-xl border border-slate-100 text-slate-500 transition-colors"
                                        title="Delete Review"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Dialog */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
                    <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-lg shadow-2xl overflow-hidden animate-fade-up">
                        {/* Modal Header */}
                        <div className="px-6 py-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
                                {isEditing ? "Edit Testimonial" : "Add Testimonial"}
                            </h3>
                            <button 
                                onClick={() => setModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Customer Name</Label>
                                    <Input 
                                        value={name}
                                        onChange={(e) => handleNameChange(e.target.value)}
                                        placeholder="e.g. Rahul Shah"
                                        className="rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-800"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">City / Description</Label>
                                    <Input 
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        placeholder="e.g. Ahmedabad"
                                        className="rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-800"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Initials</Label>
                                    <Input 
                                        value={initials}
                                        onChange={(e) => setInitials(e.target.value.toUpperCase().slice(0, 3))}
                                        placeholder="RS"
                                        className="rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-mono font-bold text-slate-800"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Star Rating</Label>
                                    <select 
                                        value={rating} 
                                        onChange={(e) => setRating(Number(e.target.value))}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 outline-none"
                                    >
                                        <option value={5}>5 Stars (Excellent)</option>
                                        <option value={4}>4 Stars (Very Good)</option>
                                        <option value={3}>3 Stars (Decent)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Review Feedback</Label>
                                <Textarea 
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    placeholder="Write details of user's feedback here..."
                                    rows={4}
                                    className="rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-800 resize-none"
                                    required
                                />
                            </div>

                            <div className="flex items-center gap-2 py-1">
                                <input 
                                    type="checkbox" 
                                    id="active" 
                                    checked={active} 
                                    onChange={(e) => setActive(e.target.checked)}
                                    className="w-4.5 h-4.5 accent-emerald-600 rounded cursor-pointer"
                                />
                                <Label htmlFor="active" className="text-sm font-bold text-slate-700 cursor-pointer select-none">
                                    Display on Homepage
                                </Label>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={() => setModalOpen(false)}
                                    className="rounded-xl"
                                    disabled={saving}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md min-w-[120px]"
                                    disabled={saving}
                                >
                                    {saving ? (
                                        <><Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> Saving...</>
                                    ) : (
                                        "Save Testimonial"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
