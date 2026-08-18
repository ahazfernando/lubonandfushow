"use client";

import { Github, Mail, PenLine, ShoppingBag, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const roles = [
  { id: "reader", label: "I want to read", icon: User, note: "Instant access" },
  { id: "writer", label: "I want to write for you", icon: PenLine, note: "Needs approval" },
  { id: "client", label: "I want to order content", icon: ShoppingBag, note: "Needs approval" },
];

export function AuthPage() {
  const [role, setRole] = useState("reader");
  const [step, setStep] = useState<"account" | "profile">("account");

  return (
    <SiteLayout>
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-2">
        <div>
          <p className="text-primary kicker">Membership</p>
          <h1 className="mt-3 text-4xl md:text-5xl">Join the Pressroom.</h1>
          <p className="mt-4 max-w-md font-serif text-muted-foreground">
            Readers get a reading list and the daily brief. Writers get commissions. Clients get a
            newsroom on retainer.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            {[
              "Email verification and magic-link sign-in",
              "Google and GitHub single sign-on",
              "Role-based access: reader, writer, client, admin",
              "Profile step with avatar, bio and social links",
            ].map((f) => (
              <li key={f} className="flex gap-3">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-press p-6 md:p-8">
          {step === "account" ? (
            <Tabs defaultValue="signup">
              <TabsList className="w-full rounded-sm">
                <TabsTrigger value="signup" className="flex-1 rounded-sm">
                  Create account
                </TabsTrigger>
                <TabsTrigger value="signin" className="flex-1 rounded-sm">
                  Sign in
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signup" className="mt-6 space-y-5">
                <div className="space-y-2">
                  <Label>Choose your role</Label>
                  <div className="grid gap-2">
                    {roles.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`flex items-center gap-3 border p-3 text-left text-sm transition-colors ${
                          role === r.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-accent"
                        }`}
                      >
                        <r.icon className="size-4 text-primary" />
                        <span className="flex-1 font-semibold">{r.label}</span>
                        <span className="text-xs text-muted-foreground">{r.note}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" className="rounded-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="At least 8 characters" className="rounded-sm" />
                </div>
                <Button
                  className="w-full rounded-sm font-semibold uppercase"
                  onClick={() => {
                    toast.success("Verification email sent — next, complete your profile.");
                    setStep("profile");
                  }}
                >
                  Create account
                </Button>
                <Providers />
              </TabsContent>

              <TabsContent value="signin" className="mt-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email2">Email</Label>
                  <Input id="email2" type="email" placeholder="you@example.com" className="rounded-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password2">Password</Label>
                  <Input id="password2" type="password" className="rounded-sm" />
                </div>
                <Button
                  className="w-full rounded-sm font-semibold uppercase"
                  onClick={() => toast.success("Signed in (demo)")}
                >
                  Sign in
                </Button>
                <div className="flex justify-between text-sm">
                  <button
                    className="font-semibold text-primary"
                    onClick={() => toast.success("Magic link sent")}
                  >
                    <Mail className="mr-1 inline size-3.5" /> Email me a magic link
                  </button>
                  <button
                    className="text-muted-foreground"
                    onClick={() => toast.success("Password reset email sent")}
                  >
                    Forgot password?
                  </button>
                </div>
                <Providers />
              </TabsContent>
            </Tabs>
          ) : (
            <div className="space-y-5">
              <div>
                <p className="text-primary kicker">Step 2 of 2</p>
                <h2 className="mt-1 text-2xl">Complete your profile</h2>
              </div>
              <div className="flex items-center gap-4">
                <span className="grid size-16 place-items-center rounded-full bg-secondary text-xs text-muted-foreground">
                  Avatar
                </span>
                <Button variant="outline" className="rounded-sm" onClick={() => toast("Avatar upload (demo)")}>
                  Upload avatar
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Ada Nwosu" maxLength={100} className="rounded-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Short bio</Label>
                <Textarea id="bio" maxLength={280} placeholder="One or two lines about you" className="rounded-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social">Social link</Label>
                <Input id="social" placeholder="https://x.com/you" className="rounded-sm" />
              </div>
              {role !== "reader" && (
                <p className="border-l-4 border-primary bg-primary/5 p-3 text-sm">
                  Your <strong>{role}</strong> access is pending review. You'll get an email once an
                  editor approves it — reader access works immediately.
                </p>
              )}
              <Button
                className="w-full rounded-sm font-semibold uppercase"
                onClick={() => toast.success("Profile saved")}
              >
                Finish
              </Button>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Providers() {
  return (
    <>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or continue with{" "}
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Button variant="outline" className="rounded-sm" onClick={() => toast("Google OAuth (demo)")}>
          Google
        </Button>
        <Button variant="outline" className="rounded-sm" onClick={() => toast("GitHub OAuth (demo)")}>
          <Github className="size-4" /> GitHub
        </Button>
      </div>
    </>
  );
}
