"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import {
  CreateUserSchema,
  CreateUserInput,
} from "@/lib/validations/user.schema";
import { useAuth } from "@/hooks/useAuth";
import { INDIAN_STATES, LANGUAGES } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, UserPlus } from "lucide-react";

interface AddUserDialogProps {
  onSuccess: () => void;
}

export default function AddUserDialog({ onSuccess }: AddUserDialogProps) {
  const { user: authUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("employee");
  const [states, setStates] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [pincodes, setPincodes] = useState<string[]>([]);
  const [pincodeInput, setPincodeInput] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(CreateUserSchema),
  });

  async function onSubmit(data: CreateUserInput) {
    try {
      await axios.post("/api/users", {
        ...data,
        role,
        state: states[0] || "",
        language: languages[0] || "",
        states,
        languages,
        pincodes,
      });
      toast.success("User created successfully");
      reset();
      setRole("employee");
      setStates([]);
      setLanguages([]);
      setPincodes([]);
      setPincodeInput("");
      setOpen(false);
      onSuccess();
    } catch (err) {
      toast.error(
        axios.isAxiosError(err)
          ? (err.response?.data?.error ?? "Failed to create user")
          : "Failed to create user",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
          <UserPlus className="w-4 h-4" />
          Add User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription className="sr-only">
            Create a new administrator or employee account.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label>Full Name</Label>
            <Input placeholder="Ravi Sharma" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="ravi@platform.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Min 8 characters"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Role — super admin sees all, admin only sees employee */}
          <div className="space-y-1.5">
            <Label>Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {authUser?.role === "super_admin" && (
                  <>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </>
                )}
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {role === "employee" && (
            <>
              {/* States */}
              <div className="space-y-1.5">
                <Label>
                  States <span className="text-slate-400 text-xs">(Select multiple)</span>
                </Label>
                <div className="h-36 overflow-y-auto border border-slate-200 rounded-xl p-2.5 space-y-1 bg-slate-50/30 scrollbar-thin">
                  {INDIAN_STATES.map((s) => (
                    <label key={s} className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all duration-150">
                      <input
                        type="checkbox"
                        checked={states.includes(s)}
                        onChange={(e) => {
                          if (e.target.checked) setStates([...states, s]);
                          else setStates(states.filter((x) => x !== s));
                        }}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-1.5">
                <Label>
                  Languages <span className="text-slate-400 text-xs">(Select multiple)</span>
                </Label>
                <div className="h-36 overflow-y-auto border border-slate-200 rounded-xl p-2.5 space-y-1 bg-slate-50/30 scrollbar-thin">
                  {LANGUAGES.map((l) => (
                    <label key={l} className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all duration-150">
                      <input
                        type="checkbox"
                        checked={languages.includes(l)}
                        onChange={(e) => {
                          if (e.target.checked) setLanguages([...languages, l]);
                          else setLanguages(languages.filter((x) => x !== l));
                        }}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                      />
                      <span>{l}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pincodes */}
              <div className="space-y-1.5">
                <Label>Pincodes</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type pincode & press Enter or comma"
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === "," || e.key === " ") {
                        e.preventDefault();
                        const val = pincodeInput.trim().replace(/[^0-9]/g, "");
                        if (/^\d{6}$/.test(val)) {
                          if (!pincodes.includes(val)) {
                            setPincodes([...pincodes, val]);
                          }
                          setPincodeInput("");
                        } else if (val) {
                          toast.error("Pincode must be exactly 6 digits");
                        }
                      }
                    }}
                    onBlur={() => {
                      const val = pincodeInput.trim().replace(/[^0-9]/g, "");
                      if (/^\d{6}$/.test(val)) {
                        if (!pincodes.includes(val)) {
                          setPincodes([...pincodes, val]);
                        }
                        setPincodeInput("");
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const val = pincodeInput.trim().replace(/[^0-9]/g, "");
                      if (/^\d{6}$/.test(val)) {
                        if (!pincodes.includes(val)) {
                          setPincodes([...pincodes, val]);
                        }
                        setPincodeInput("");
                      } else {
                        toast.error("Pincode must be exactly 6 digits");
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                {pincodes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 p-2 border border-slate-100 rounded-xl bg-slate-50/50 max-h-24 overflow-y-auto mt-2">
                    {pincodes.map((p) => (
                      <span
                        key={p}
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200"
                      >
                        {p}
                        <button
                          type="button"
                          onClick={() => setPincodes(pincodes.filter((x) => x !== p))}
                          className="hover:text-red-500 font-bold ml-1 text-xs"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
