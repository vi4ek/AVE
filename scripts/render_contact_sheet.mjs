import { renderStill } from "@remotion/renderer";
import path from "path";
import fs from "fs";

const framesToRender = [
  { frame: 18, name: "01_s11_phone_thumb_tap" },
  { frame: 40, name: "02_s11_chai_stall_broll" },
  { frame: 65, name: "03_s12_qr_scan_broll" },
  { frame: 95, name: "04_s12_gone_marker_wipe" },
  { frame: 135, name: "05_s13_2_seconds_orange" },
  { frame: 200, name: "06_s14_question_zoom" },
  { frame: 280, name: "07_s21_pin_keypad" },
  { frame: 360, name: "08_s22_encrypted_lock" },
  { frame: 500, name: "09_s24_shield_no_plaintext" },
  { frame: 600, name: "10_s31_npci_city_network" },
  { frame: 700, name: "11_s32_sorting_hub" },
  { frame: 1000, name: "12_s41_debit_sms_balance" },
  { frame: 1060, name: "13_s42_500_note_macro_broll" },
  { frame: 1100, name: "14_s42_credit_sms_coin_arc" },
  { frame: 1345, name: "15_s52_soundbox_broll" },
  { frame: 1390, name: "16_s52_green_checkmark_confetti" },
  { frame: 1460, name: "17_s61_tech_slam" },
  { frame: 1540, name: "18_s62_follow_button" },
];

async function main() {
  const outDir = path.resolve("out/contact_sheet");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log(`Starting contact sheet stills rendering (${framesToRender.length} frames)...`);

  const entryPoint = path.resolve("src/index.ts");
  const { bundle } = await import("@remotion/bundler");
  const bundleLocation = await bundle({
    entryPoint,
    webpackOverride: (config) => config,
  });

  const { selectComposition } = await import("@remotion/renderer");
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "UpiPaymentFlowReel",
  });

  for (const item of framesToRender) {
    const outputPath = path.join(outDir, `${item.name}.png`);
    console.log(`Rendering frame ${item.frame} (${item.name})...`);
    await renderStill({
      composition,
      serveUrl: bundleLocation,
      output: outputPath,
      frame: item.frame,
      imageFormat: "png",
      chromiumOptions: {
        gl: "angle",
      },
    });
    console.log(`✓ Saved ${outputPath}`);
  }

  console.log("All contact sheet frames rendered successfully!");
}

main().catch((err) => {
  console.error("Error rendering contact sheet:", err);
  process.exit(1);
});
