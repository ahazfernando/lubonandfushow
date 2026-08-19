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
import { useI18n } from "@/components/site/LanguageProvider";

export function AuthPage() {
  const [role, setRole] = useState("reader");
  const [step, setStep] = useState<"account" | "profile">("account");
  const { t, msg, locale } = useI18n();
  const caseClass = locale === "si" ? "" : "uppercase";

  const roles = [
    { id: "reader", label: t.auth.roleReader, icon: User, note: t.auth.noteInstant },
    { id: "writer", label: t.auth.roleWriter, icon: PenLine, note: t.auth.noteApproval },
    { id: "client", label: t.auth.roleClient, icon: ShoppingBag, note: t.auth.noteApproval },
  ];

  const features = [t.auth.feat1, t.auth.feat2, t.auth.feat3, t.auth.feat4];

  return (
    <SiteLayout>
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-2">
        <div>
          <p className="text-primary kicker">{t.auth.kicker}</p>
          <h1 className="mt-3 text-4xl md:text-5xl">{t.auth.title}</h1>
          <p className="mt-4 max-w-md font-serif text-muted-foreground">{t.auth.body}</p>
          <ul className="mt-8 space-y-4 text-sm">
            {features.map((f) => (
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
                  {t.auth.createAccount}
                </TabsTrigger>
                <TabsTrigger value="signin" className="flex-1 rounded-sm">
                  {t.auth.signIn}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signup" className="mt-6 space-y-5">
                <div className="space-y-2">
                  <Label>{t.auth.chooseRole}</Label>
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
                  <Label htmlFor="email">{t.auth.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.newsletter.placeholder}
                    className="rounded-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t.auth.password}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t.auth.passwordPlaceholder}
                    className="rounded-sm"
                  />
                </div>
                <Button
                  className={`w-full rounded-sm font-semibold ${caseClass}`}
                  onClick={() => {
                    toast.success(t.auth.verifySent);
                    setStep("profile");
                  }}
                >
                  {t.auth.createAccount}
                </Button>
                <AuthProviders />
              </TabsContent>

              <TabsContent value="signin" className="mt-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email2">{t.auth.email}</Label>
                  <Input
                    id="email2"
                    type="email"
                    placeholder={t.newsletter.placeholder}
                    className="rounded-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password2">{t.auth.password}</Label>
                  <Input id="password2" type="password" className="rounded-sm" />
                </div>
                <Button
                  className={`w-full rounded-sm font-semibold ${caseClass}`}
                  onClick={() => toast.success(t.auth.signedIn)}
                >
                  {t.auth.signIn}
                </Button>
                <div className="flex justify-between text-sm">
                  <button
                    className="font-semibold text-primary"
                    onClick={() => toast.success(t.auth.magicSent)}
                  >
                    <Mail className="mr-1 inline size-3.5" /> {t.auth.magicLink}
                  </button>
                  <button
                    className="text-muted-foreground"
                    onClick={() => toast.success(t.auth.resetSent)}
                  >
                    {t.auth.forgot}
                  </button>
                </div>
                <AuthProviders />
              </TabsContent>
            </Tabs>
          ) : (
            <div className="space-y-5">
              <div>
                <p className="text-primary kicker">{t.auth.step2}</p>
                <h2 className="mt-1 text-2xl">{t.auth.completeProfile}</h2>
              </div>
              <div className="flex items-center gap-4">
                <span className="grid size-16 place-items-center rounded-full bg-secondary text-xs text-muted-foreground">
                  {t.auth.avatar}
                </span>
                <Button
                  variant="outline"
                  className="rounded-sm"
                  onClick={() => toast(t.auth.avatarDemo)}
                >
                  {t.auth.uploadAvatar}
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">{t.auth.fullName}</Label>
                <Input id="name" placeholder="Ada Nwosu" maxLength={100} className="rounded-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">{t.auth.shortBio}</Label>
                <Textarea
                  id="bio"
                  maxLength={280}
                  placeholder={t.auth.bioPlaceholder}
                  className="rounded-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social">{t.auth.socialLink}</Label>
                <Input id="social" placeholder="https://x.com/you" className="rounded-sm" />
              </div>
              {role !== "reader" && (
                <p className="border-l-4 border-primary bg-primary/5 p-3 text-sm">
                  {msg(t.auth.pendingNote, { role: t.roles[role] ?? role })}
                </p>
              )}
              <Button
                className={`w-full rounded-sm font-semibold ${caseClass}`}
                onClick={() => toast.success(t.auth.profileSaved)}
              >
                {t.auth.finish}
              </Button>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function AuthProviders() {
  const { t } = useI18n();
  return (
    <>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> {t.auth.orContinue}{" "}
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          variant="outline"
          className="rounded-sm"
          onClick={() => toast("Google OAuth (demo)")}
        >
          Google
        </Button>
        <Button
          variant="outline"
          className="rounded-sm"
          onClick={() => toast("GitHub OAuth (demo)")}
        >
          <Github className="size-4" /> GitHub
        </Button>
      </div>
    </>
  );
}
