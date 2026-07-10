"use client";

import { useState } from "react";
import { CreditCard, LockKeyhole, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";

export function BillingCard() {
  const [open, setOpen] = useState(false);
  const [approved, setApproved] = useState(false);
  const [charged, setCharged] = useState(false);
  return (
    <>
      <Card>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display font-bold">APP Usage / Billing</h3>
            <p className="mt-1 text-sm text-muted">Pay-per-insight with Upto spending caps.</p>
          </div>
          <CreditCard className="h-5 w-5 text-primary" />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-surface-soft p-3"><span className="text-muted">Deep analyses</span><b className="mt-1 block">17</b></div>
          <div className="rounded-lg bg-surface-soft p-3"><span className="text-muted">Spent</span><b className="mt-1 block">$42.18</b></div>
        </div>
        <Button className="mt-5 w-full" onClick={() => setOpen(true)}><Sparkles className="h-4 w-4" /> Run Deep Analysis</Button>
      </Card>
      <Modal open={open} title="Risk Deep Analysis Payment" onClose={() => setOpen(false)}>
        <div className="space-y-3 text-sm">
          <div className="rounded-lg border border-border bg-surface-soft p-4">
            <div className="flex items-center justify-between"><span className="text-muted">Purpose</span><b>Risk Deep Analysis</b></div>
            <div className="mt-3 flex items-center justify-between"><span className="text-muted">Max spend</span><b>3.00 USDC</b></div>
            <div className="mt-3 flex items-center justify-between"><span className="text-muted">Billing type</span><Badge tone="good">Upto</Badge></div>
            <div className="mt-3 flex items-center justify-between"><span className="text-muted">Estimated charge</span><b>1.20 - 2.80 USDC</b></div>
          </div>
          {!approved ? (
            <Button className="w-full" onClick={() => setApproved(true)}><LockKeyhole className="h-4 w-4" /> Approve spending cap</Button>
          ) : !charged ? (
            <Button className="w-full" onClick={() => setCharged(true)}><Sparkles className="h-4 w-4" /> Run analysis</Button>
          ) : (
            <div className="rounded-lg border border-primary/40 bg-primary/10 p-4">
              <b>Deep analysis complete. Charged 1.84 USDC.</b>
              <p className="mt-2 text-muted">Risk 74 to 49 after suggested rebalance. Health 61% to 78%.</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
