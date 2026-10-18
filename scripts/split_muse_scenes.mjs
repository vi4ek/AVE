import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const ffmpeg = path.resolve("node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe");
const audioFile = path.resolve("public/inputs/muse_voiceover.mp3");

// Storyboard structure from muse_storyboard.json
const rawScenes = [
  {
    id: 1,
    name: "1 Hook",
    start_cut: 0.0,
    end_cut: 10.5,
    shots: [
      { id: "S1.1", orig_dur: 2.5, vo: "Meta ke naye AI agent Muse mein...", visual: "Giant '1 BILLION' counter ticking up, token coins popping out", background: "#FF5A1F", on_screen_text: "1 BILLION FREE TOKENS", sfx: "counter", music: "silent, riser starts" },
      { id: "S1.2", orig_dur: 2.0, vo: "milenge 1 billion free tokens!", visual: "Generic chat card labelled 'Muse' with a token-balance badge filling up", background: "#F7F4EE", on_screen_text: "MUSE · 1B TOKENS", sfx: "sub_hit", music: "riser continues" },
      { id: "S1.3", orig_dur: 2.5, vo: "Lekin sirf tab... jab aap ye ek step 48 ghante ke andar karoge.", visual: "Big countdown ring '48 HRS' ticking down", background: "#FF5A1F", on_screen_text: "SIRF 48 GHANTE", sfx: "clock_tick", music: "riser cuts for the drop" }
    ]
  },
  {
    id: 2,
    name: "2 Step 1 VPN",
    start_cut: 10.5,
    end_cut: 20.1,
    shots: [
      { id: "S2.1", orig_dur: 2.0, vo: "Step ek.", visual: "Huge 'STEP 1' badge sliding in", background: "#DCE8FF", on_screen_text: "STEP 1", sfx: "whoosh", music: "light groove enters" },
      { id: "S2.2", orig_dur: 3.5, vo: "Pehle ek bharosemand VPN download karo... aur US server se connect karo.", visual: "VPN app: toggle flips to Connected, server list with 'United States' selected", background: "#DCE8FF", on_screen_text: "TRUSTED VPN → US SERVER", sfx: "toggle_click", music: "groove" },
      { id: "S2.3", orig_dur: 3.5, vo: "Kyunki Muse abhi sabhi countries mein available nahi hai.", visual: "Dot-world map: India pin shows 'Not available in your region', then arrow jumps to US pin, check appears", background: "#DCE8FF", on_screen_text: "REGION LOCKED → US", sfx: "ping", music: "groove" }
    ]
  },
  {
    id: 3,
    name: "3 Step 2-3",
    start_cut: 20.1,
    end_cut: 26.65,
    shots: [
      { id: "S3.1", orig_dur: 2.5, vo: "Step do. Browser mein muse.ai kholo.", visual: "Browser window, address bar typing 'muse.ai/join'", background: "#FFE9A8", on_screen_text: "STEP 2 · muse.ai", sfx: "typing", music: "groove" },
      { id: "S3.2", orig_dur: 2.5, vo: "Step teen. Sign up par click karo.", visual: "Cursor clicks the 'Sign up' button, ripple, page transitions", background: "#FFE9A8", on_screen_text: "STEP 3 · SIGN UP", sfx: "click", music: "groove" }
    ]
  },
  {
    id: 4,
    name: "4 Step 4 Account",
    start_cut: 26.65,
    end_cut: 36.65,
    shots: [
      { id: "S4.1", orig_dur: 2.5, vo: "Step chaar... ye important hai.", visual: "Huge 'STEP 4' with an 'IMPORTANT' sticker slapped on", background: "#D6F5E0", on_screen_text: "STEP 4 · IMPORTANT", sfx: "sub_hit", music: "build" },
      { id: "S4.2", orig_dur: 3.0, vo: "Apne Gmail account se account banao.", visual: "Sign-up form with email field filling, 'Continue' pressed", background: "#D6F5E0", on_screen_text: "GMAIL SE ACCOUNT BANAO", sfx: "typing", music: "groove" },
      { id: "S4.3", orig_dur: 3.0, vo: "Agar age verification maange... toh use complete kar lo.", visual: "Age/ID check card with progress bar and a tick", background: "#D6F5E0", on_screen_text: "AGE VERIFICATION AAYE TOH COMPLETE KARO", sfx: "ping", music: "groove" },
      { id: "S4.4", orig_dur: 2.0, vo: "Bas, account ready!", visual: "Big check with confetti, 'ACCOUNT READY'", background: "#16A34A", on_screen_text: "ACCOUNT READY ✓", sfx: "success_chime", music: "beat drop" }
    ]
  },
  {
    id: 5,
    name: "5 Step 5 Claim",
    start_cut: 36.65,
    end_cut: 45.75,
    shots: [
      { id: "S5.1", orig_dur: 3.0, vo: "Ab tokens claim kaise karne hain?", visual: "'STEP 5 · CLAIM' with token coins orbiting a question mark", background: "#FFD9D6", on_screen_text: "STEP 5 · CLAIM", sfx: "whoosh", music: "groove" },
      { id: "S5.2", orig_dur: 3.5, vo: "Yaad rakho... account banne ke 48 ghante ke andar hi invite code redeem karna hai.", visual: "Large countdown timer 48:00:00 ticking, red accent, marker highlight on '48 GHANTE'", background: "#FFD9D6", on_screen_text: "48 GHANTE KE ANDAR", sfx: "clock_tick", music: "tension pulse" },
      { id: "S5.3", orig_dur: 2.5, vo: "Uske baad nahi hoga.", visual: "Timer hits 00:00, token coins grey out, 'EXPIRED' stamp", background: "#111111", on_screen_text: "DEADLINE MISS = NO TOKENS", sfx: "sub_hit", music: "drops out" }
    ]
  },
  {
    id: 6,
    name: "6 Step 6 Settings",
    start_cut: 45.75,
    end_cut: 53.0,
    shots: [
      { id: "S6.1", orig_dur: 3.0, vo: "Step chhe... bottom left mein do lines wala icon dikhega.", visual: "Muse sidebar with the bottom-left two-line menu icon circled, arrow callout", background: "#DCE8FF", on_screen_text: "STEP 6 · BOTTOM LEFT '='", sfx: "whoosh", music: "groove returns" },
      { id: "S6.2", orig_dur: 3.0, vo: "Us par click karo, phir Settings,", visual: "Menu pops up: Keyboard shortcuts, Download apps, Report an issue, Settings (highlighted)", background: "#DCE8FF", on_screen_text: "MENU → SETTINGS", sfx: "click", music: "groove" },
      { id: "S6.3", orig_dur: 2.0, vo: "aur General mein jao.", visual: "Settings panel opens, 'General' tab highlighted", background: "#DCE8FF", on_screen_text: "SETTINGS → GENERAL", sfx: "pop", music: "groove" }
    ]
  },
  {
    id: 7,
    name: "7 Step 7 Redeem",
    start_cut: 53.0,
    end_cut: 65.4,
    shots: [
      { id: "S7.1", orig_dur: 2.5, vo: "Aakhri step. Redeem invite code par click karo...", visual: "'Redeem invite code' row highlighted, field opens", background: "#D6F5E0", on_screen_text: "STEP 7 · REDEEM INVITE CODE", sfx: "click", music: "build" },
      { id: "S7.2", orig_dur: 3.0, vo: "aur ye code daalo. N-K-G-W-paanch-B.", visual: "Code NKGW5B typed into the field, letter by letter, big and readable", background: "#16A34A", on_screen_text: "NKGW5B", sfx: "typing", music: "build" },
      { id: "S7.3", orig_dur: 3.5, vo: "Ye mera referral code hai... isse dono ko 1 billion tokens milte hain.", visual: "Two cards: 'AAP +1B' and 'MAIN +1B', a small label 'REFERRAL CODE · mujhe bhi tokens milte hain'", background: "#16A34A", on_screen_text: "DONO KO 1B TOKENS · REFERRAL CODE", sfx: "success_chime", music: "lift" }
    ]
  },
  {
    id: 8,
    name: "8 CTA",
    start_cut: 65.4,
    end_cut: 70.11,
    shots: [
      { id: "S8.1", orig_dur: 3.0, vo: "Code copy karo, abhi try karo...", visual: "Code card 'NKGW5B' with a COPY button being tapped; small footer 'Offer terms badal sakte hain · muse.ai/join check karo'", background: "#111111", on_screen_text: "NKGW5B · muse.ai/join", sfx: "click", music: "groove settles" },
      { id: "S8.2", orig_dur: 2.5, vo: "aur follow karo, aise AI tricks ke liye!", visual: "FOLLOW button pulse, handle and logo", background: "#111111", on_screen_text: "FOLLOW KARO · @vizion.std", sfx: "pop", music: "tail fades to silence" }
    ]
  }
];

const outDir = path.resolve("public/inputs/muse_scenes");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

let currentGlobalFrame = 0;
const processedScenes = [];
const allShots = [];

for (const scene of rawScenes) {
  const outFile = path.join(outDir, `scene_${scene.id}_vo.mp3`);
  const dur = scene.end_cut - scene.start_cut;
  
  // Cut scene audio with ffmpeg
  const cutCmd = `"${ffmpeg}" -y -ss ${scene.start_cut} -to ${scene.end_cut} -i "${audioFile}" -c:a libmp3lame -q:a 2 "${outFile}"`;
  execSync(cutCmd, { stdio: "ignore" });

  const totalOrigDur = scene.shots.reduce((acc, s) => acc + s.orig_dur, 0);
  const sceneDurationSeconds = dur;
  const sceneTotalFrames = Math.round(dur * 30);
  const sceneStartFrame = currentGlobalFrame;
  const sceneEndFrame = currentGlobalFrame + sceneTotalFrames;

  let shotStartFrame = sceneStartFrame;
  const retimedShots = [];

  for (let i = 0; i < scene.shots.length; i++) {
    const shot = scene.shots[i];
    const isLast = (i === scene.shots.length - 1);
    
    // Proportional frame allocation
    let shotFrameCount;
    if (isLast) {
      shotFrameCount = sceneEndFrame - shotStartFrame;
    } else {
      shotFrameCount = Math.round((shot.orig_dur / totalOrigDur) * sceneTotalFrames);
    }

    const shotEndFrame = shotStartFrame + shotFrameCount;
    const shotRetimed = {
      ...shot,
      scene_id: scene.id,
      scene_name: scene.name,
      start_frame: shotStartFrame,
      end_frame: shotEndFrame,
      duration_frames: shotFrameCount,
      start_s: parseFloat((shotStartFrame / 30).toFixed(2)),
      end_s: parseFloat((shotEndFrame / 30).toFixed(2)),
      duration_s: parseFloat((shotFrameCount / 30).toFixed(2))
    };

    retimedShots.push(shotRetimed);
    allShots.push(shotRetimed);
    shotStartFrame = shotEndFrame;
  }

  processedScenes.push({
    id: scene.id,
    name: scene.name,
    vo_file: `inputs/muse_scenes/scene_${scene.id}_vo.mp3`,
    start_cut_s: scene.start_cut,
    end_cut_s: scene.end_cut,
    duration_s: parseFloat(dur.toFixed(2)),
    start_frame: sceneStartFrame,
    end_frame: sceneEndFrame,
    duration_frames: sceneTotalFrames,
    shots: retimedShots
  });

  currentGlobalFrame = sceneEndFrame;
}

const finalRetimedJson = {
  meta: {
    title: "Muse AI: 1 billion free tokens, step by step",
    width: 1080,
    height: 1920,
    fps: 30,
    total_frames: currentGlobalFrame,
    total_s: parseFloat((currentGlobalFrame / 30).toFixed(2)),
    style: "Light color-block with hard shadows: 3px #111 outlines, ~20px corners, offset hard shadow, subtle paper grain, marker highlights",
    referral_code: "NKGW5B",
    referral_url: "https://muse.ai/join",
    branding_handle: "@vizion.std"
  },
  scenes: processedScenes,
  shots: allShots
};

fs.writeFileSync("public/inputs/muse_retimed.json", JSON.stringify(finalRetimedJson, null, 2));
console.log(`Successfully generated public/inputs/muse_retimed.json!`);
console.log(`Total scenes: ${processedScenes.length}, Total shots: ${allShots.length}, Total frames: ${currentGlobalFrame} (${(currentGlobalFrame/30).toFixed(2)}s)`);
