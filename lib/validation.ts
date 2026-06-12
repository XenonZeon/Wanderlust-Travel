import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(7).max(20),
  destination: z.string().max(100).optional(),
  message: z.string().max(500).optional(),
  _honey: z.string().max(0).optional(), // honeypot field — must be empty
});

export type LeadInput = z.infer<typeof leadSchema>;
