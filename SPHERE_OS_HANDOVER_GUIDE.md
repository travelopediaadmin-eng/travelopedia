# Sphere OS — Complete Client Handover & Deployment Guide
**Agency:** IllustrativeSphere (15 Clients)  
**System Architecture:** Hybrid (Next.js Portals + Airtable Relational Core + AI & Tech-QC Microservices)

---

## 1. Quick Access Links (All 6 Working Modules)

| Portal / Module | Target Stakeholder | URL (Localhost / Production) |
| :--- | :--- | :--- |
| **Founder Command Center** | Agency Owner / Founder | `http://localhost:3000/sphere-os` |
| **Staff "My Day" Portal** | Saakshi, Riddhi, Anjali | `http://localhost:3000/sphere-os/my-day` |
| **Client Review & Approval Desk** | Clients (e.g. Zaveri, Urban Chai) | `http://localhost:3000/sphere-os/client-portal` |
| **Vendor Ledger & Ingest Gate** | Shooters, Cinematographers | `http://localhost:3000/sphere-os/vendor-ledger` |
| **Brand Brain & Idea Vault** | Creative Lead / Drafters | `http://localhost:3000/sphere-os/brand-brain` |
| **7-Day Rollout Playbook** | Ops Lead / Launch Manager | `http://localhost:3000/sphere-os/onboarding` |

---

## 2. Kahan Pe Kya Chahiye (Credentials Checklist)

Client (IllustrativeSphere) ko ye 3 cheezein provide karni hongi apne `.env.local` mein:

```env
# 1. AIRTABLE (Master Database)
# Link: https://airtable.com/create/tokens
# Scopes: data.records:read, data.records:write, schema.bases:read
AIRTABLE_API_KEY=pat_xxxxxxxxxxxxxxxxxxxx
AIRTABLE_BASE_ID=appxxxxxxxxxxxxxxxxxx

# 2. GOOGLE GEMINI (AI Brief Writer & Calendar Drafter)
# Link: https://aistudio.google.com/app/apikey (Free tier available)
GEMINI_API_KEY=AIzaxxxxxxxxxxxxxxxxxxxxx

# 3. CLOUDFLARE R2 (4K Video Storage - Zero Egress Fees)
# Link: https://dash.cloudflare.com/ -> R2 -> Create Bucket
CLOUDFLARE_R2_ACCOUNT_ID=
CLOUDFLARE_R2_ACCESS_KEY_ID=
CLOUDFLARE_R2_SECRET_ACCESS_KEY=
CLOUDFLARE_R2_BUCKET_NAME=sphere-os-assets
```

*(Note: Agar client ke paas abhi ye keys nahi hain, tab bhi system 100% chalega kyunki smart fallback and in-memory engine build kiya gaya hai).*

---

## 3. Database CSV Schema Templates (Ready to Import)

Airtable mein Base banakar ye 4 files import karni hain (located in `data/airtable-schemas/`):
1. `Clients.csv` — 15 retainer clients, packages, SLAs, auto-approve flags.
2. `Content_Items.csv` — Posts pipeline, post dates, captions, approval status.
3. `Tasks.csv` — "My Day" daily assignments, Hinglish briefs, SOP checklists.
4. `Vendor_Deals.csv` — Vendor deliverable counts, payment calculation for accepted clips.

---

## 4. Key Rules Enforced in Sphere OS

1. **At most 3 tasks per person per day:** Staff "My Day" portal enforces a maximum of 3 tasks and 2 active tasks simultaneously to prevent half-finished work from piling up.
2. **10-Minute Decision Rule:** If Saakshi or editors are stuck on a creative choice (e.g. transition or color grade), the Decision Helper's default brand rule is applied and logged.
3. **Tech-QC Gate:** Every video export must pass 1080x1920 (9:16), 30fps CFR, H.264, and 48kHz audio checks before reaching senior staff or clients.
4. **Soft Auto-Approve & Evergreen Fallback:** 24-hour SLA with automated escalation. If the client remains silent at T-12h, a pre-approved Evergreen Post fills the slot.
5. **Vendor Reconciliation Rule:** Unusable/failed footage is non-billable. Vendors are paid only for accepted items.
