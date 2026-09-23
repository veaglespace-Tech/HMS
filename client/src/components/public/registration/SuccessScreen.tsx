"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  hospitalName: string;
  email: string;
}

export function SuccessScreen({ hospitalName, email }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-card rounded-2xl border border-border shadow-soft p-10 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-10 h-10 text-success" />
      </motion.div>

      <h2 className="text-2xl font-bold text-foreground mb-2">Registration Complete! 🎉</h2>
      <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
        <strong className="text-foreground">{hospitalName}</strong> has been registered successfully.
        We'll review and approve your account within 1 business day.
      </p>

      <div className="flex flex-col gap-4 max-w-sm mx-auto mb-8">
        {[
          {
            icon: Mail,
            title: "Check your email",
            desc: `Approval notification will be sent to ${email}`,
          },
          {
            icon: Clock,
            title: "Review in progress",
            desc: "Our team verifies all hospital registrations manually for security",
          },
          {
            icon: ArrowRight,
            title: "Start using Arogya HMS",
            desc: "Login link and credentials will be sent after approval",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3 p-4 rounded-xl bg-canvas dark:bg-background text-left">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">{title}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Link href="/"
        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-600 transition-all">
        Back to Homepage
      </Link>
    </motion.div>
  );
}
