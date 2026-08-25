import { defineConfig } from 'vite';
import { resolve } from 'path';

// Every screen lives in its own folder as code.html (exported from the
// design tool). This just tells Vite's production build about all of
// them so `npm run build` produces a working static site too.
// `npm run dev` doesn't need this list — Vite serves any file in the
// project as-is.
const screens = [
  'analyzing_your_business',
  'business_alternatives_ai_ranking',
  'business_feasibility_dashboard',
  'business_swot_analysis',
  'competitor_deep_dive',
  'gramudyam_financial_plan',
  'gramudyam_home',
  'market_reach_analysis',
  'opportunity_gap_analysis',
  'pricing_market_value_fixed_layout',
  'repayment_timeline_emi',
  'risk_radar_management',
  'start_analysis_business',
  'start_analysis_capital',
  'start_analysis_location',
];

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...Object.fromEntries(
          screens.map((s) => [s, resolve(__dirname, `${s}/code.html`)])
        ),
      },
    },
  },
});
