import { z } from "zod";

export const MortgageRateResponesType = z.object({
  rates: z.array(z.object({
    binding_period_in_months: z.number(),
    mortgage_rate: z.number(),
    last_updated: z.union([z.string(), z.null()])
  }))
});

export type IMortgageResponseType = z.infer<typeof MortgageRateResponesType>;

export type IBankType = IMortgageResponseType & { bank_name: string, image_url: string }