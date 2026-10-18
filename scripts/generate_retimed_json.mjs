import fs from "fs";

const originalStoryboard = {
  meta: {
    title: "What Happens When You Tap Pay on UPI?",
    width: 1080,
    height: 1920,
    fps: 30
  },
  scenes: [
    {
      id: 1,
      name: "1 Hook",
      vo_file: "inputs/upi_scenes/scene_1_vo.mp3",
      frames: 232, // 7.73s
      shots: [
        { id: "S1.1", orig_dur: 1.8, vo: "Aapne Pay dabaya...", on_screen_text: "", visual: "Phone screen, thumb taps green 'Pay ₹500' button" },
        { id: "S1.2", orig_dur: 2.0, vo: "...aur do second mein paise kat gaye.", on_screen_text: "₹500 > GONE", visual: "Screen freezes, glowing ring pulses, ₹500 flies off" },
        { id: "S1.3", orig_dur: 1.7, vo: "(Beat of silence before the question.)", on_screen_text: "2 SECONDS", visual: "Smash cut to black. Giant 2 SECONDS with countdown ring" },
        { id: "S1.4", orig_dur: 2.5, vo: "Lekin in do seconds mein... asal mein hota kya hai?", on_screen_text: "Asal mein kya hota hai?", visual: "Zoom through countdown ring into phone UI with ? glyphs" }
      ]
    },
    {
      id: 2,
      name: "2 App & PIN",
      vo_file: "inputs/upi_scenes/scene_2_vo.mp3",
      frames: 319, // 10.63s
      shots: [
        { id: "S2.1", orig_dur: 2.5, vo: "Sabse pehle, aap PIN daalte hain.", on_screen_text: "STEP 1 · PIN daalo", visual: "PIN pad fills screen, 4 dots fill" },
        { id: "S2.2", orig_dur: 2.0, vo: "Aapka app usse encrypt karta hai,", on_screen_text: "ENCRYPTED", visual: "PIN dots morph into code characters, padlock locks" },
        { id: "S2.3", orig_dur: 2.0, vo: "aur payment request bhej deta hai.", on_screen_text: "REQUEST SENT", visual: "Lock becomes glowing packet shooting out of phone" },
        { id: "S2.4", orig_dur: 2.5, vo: "Aapka PIN... kabhi bhi khule roop mein kahin nahi jaata.", on_screen_text: "PIN kabhi plain text nahi", visual: "Shield with checkmark over phone, plain text crossed out" }
      ]
    },
    {
      id: 3,
      name: "3 NPCI",
      vo_file: "inputs/upi_scenes/scene_3_vo.mp3",
      frames: 388, // 12.93s
      shots: [
        { id: "S3.1", orig_dur: 2.5, vo: "Request pahunchti hai N-P-C-I tak... jo U-P-I ka central switch hai.", on_screen_text: "NPCI = UPI ka central switch", visual: "Packet flies across abstract dot-map into glowing hub" },
        { id: "S3.2", orig_dur: 2.5, vo: "Ise ek super-fast post office samjhiye.", on_screen_text: "SUPER-FAST POST OFFICE", visual: "Hub transforms into sorting machine with flying envelopes" },
        { id: "S3.3", orig_dur: 2.5, vo: "Ye decide karta hai ki aapka paisa kis bank mein hai...", on_screen_text: "AAPKA BANK / RECEIVER KA BANK", visual: "Two lines draw from hub to two generic bank icons" },
        { id: "S3.4", orig_dur: 2.5, vo: "...aur samne wale ka account kis bank mein.", on_screen_text: "", visual: "Triangle layout locks: your bank, NPCI, receiver's bank" }
      ]
    },
    {
      id: 4,
      name: "4 Banks",
      vo_file: "inputs/upi_scenes/scene_4_vo.mp3",
      frames: 298, // 9.93s
      shots: [
        { id: "S4.1", orig_dur: 3.5, vo: "Aapka bank PIN aur balance check karta hai... phir paise kaat leta hai.", on_screen_text: "PIN ✓  Balance ✓  -₹500", visual: "Split screen left: balance ₹5,000 > ₹4,500, checkmarks" },
        { id: "S4.2", orig_dur: 3.0, vo: "Samne wale ka bank... paise jama kar deta hai.", on_screen_text: "+₹500", visual: "Split screen right: balance ₹2,000 > ₹2,500, coin flies across" },
        { id: "S4.3", orig_dur: 3.5, vo: "Dono banks N-P-C-I ko confirm kar dete hain.", on_screen_text: "DONO BANKS > CONFIRM", visual: "Both sides send checkmark pulses to center NPCI node" }
      ]
    },
    {
      id: 5,
      name: "5 Confirmation",
      vo_file: "inputs/upi_scenes/scene_5_vo.mp3",
      frames: 176, // 5.85s
      shots: [
        { id: "S5.1", orig_dur: 3.0, vo: "Confirmation dono phones par wapas aata hai.", on_screen_text: "Confirmation ✓", visual: "Beam from NPCI node travels down to two phones" },
        { id: "S5.2", orig_dur: 3.0, vo: "Ho gaya! Ye sab... sirf kuch hi seconds mein.", on_screen_text: "Payment Successful · ₹500 · ~2 sec", visual: "Big green checkmark draws, confetti burst, success card" }
      ]
    },
    {
      id: 6,
      name: "6 CTA",
      vo_file: "inputs/upi_scenes/scene_6_vo.mp3",
      frames: 151, // 4.02s + 1s tail
      shots: [
        { id: "S6.1", orig_dur: 3.0, vo: "Aisi hi tech... aasan bhasha mein samajhne ke liye...", on_screen_text: "AISI HI TECH / AASAN BHASHA MEIN", visual: "Phone shrinks, large kinetic slam text appears" },
        { id: "S6.2", orig_dur: 2.0, vo: "...follow kar lo!", on_screen_text: "FOLLOW KAR LO", visual: "FOLLOW button with pulse, cursor tap, following state" }
      ]
    }
  ],
  raw_sfx_cues: [
    { shot: "S1.1", offset_rel: 0.11, sound: "pop", volume: 0.4 },
    { shot: "S1.1", offset_rel: 0.17, sound: "sub_hit", volume: 0.7 },
    { shot: "S1.2", offset_rel: 0.10, sound: "riser", volume: 0.3 },
    { shot: "S1.2", offset_rel: 0.40, sound: "sub_hit", volume: 0.65 },
    { shot: "S1.3", offset_rel: 0.24, sound: "click", volume: 0.35 },
    { shot: "S1.4", offset_rel: 0.72, sound: "whoosh", volume: 0.6 },
    { shot: "S1.4", offset_rel: 0.92, sound: "sub_hit", volume: 0.6 },
    { shot: "S2.1", offset_rel: 0.12, sound: "click", volume: 0.35 },
    { shot: "S2.2", offset_rel: 0.10, sound: "digital_glitch", volume: 0.4 },
    { shot: "S2.2", offset_rel: 0.80, sound: "lock_clunk", volume: 0.5 },
    { shot: "S2.3", offset_rel: 0.10, sound: "whoosh", volume: 0.55 },
    { shot: "S2.4", offset_rel: 0.12, sound: "ping", volume: 0.4 },
    { shot: "S3.1", offset_rel: 0.05, sound: "whoosh", volume: 0.55 },
    { shot: "S3.1", offset_rel: 0.64, sound: "ping", volume: 0.45 },
    { shot: "S3.2", offset_rel: 0.08, sound: "pop", volume: 0.35 },
    { shot: "S3.3", offset_rel: 0.12, sound: "whoosh", volume: 0.4 },
    { shot: "S3.3", offset_rel: 0.60, sound: "ping", volume: 0.45 },
    { shot: "S3.4", offset_rel: 0.05, sound: "whoosh", volume: 0.35 },
    { shot: "S4.1", offset_rel: 0.09, sound: "click", volume: 0.35 },
    { shot: "S4.1", offset_rel: 0.74, sound: "sub_hit", volume: 0.6 },
    { shot: "S4.2", offset_rel: 0.07, sound: "whoosh", volume: 0.5 },
    { shot: "S4.2", offset_rel: 0.53, sound: "coin_clink", volume: 0.6 },
    { shot: "S4.3", offset_rel: 0.09, sound: "ping", volume: 0.45 },
    { shot: "S4.3", offset_rel: 0.43, sound: "whoosh", volume: 0.55 },
    { shot: "S5.1", offset_rel: 0.05, sound: "whoosh", volume: 0.5 },
    { shot: "S5.1", offset_rel: 0.50, sound: "notification_buzz", volume: 0.5 },
    { shot: "S5.2", offset_rel: 0.07, sound: "pop", volume: 0.4 },
    { shot: "S5.2", offset_rel: 0.27, sound: "success_chime", volume: 0.7 },
    { shot: "S6.1", offset_rel: 0.05, sound: "whoosh", volume: 0.5 },
    { shot: "S6.1", offset_rel: 0.23, sound: "pop", volume: 0.4 },
    { shot: "S6.2", offset_rel: 0.30, sound: "click", volume: 0.4 },
    { shot: "S6.2", offset_rel: 0.50, sound: "ping", volume: 0.35 }
  ]
};

// Calculate exact retimed frames
let currentGlobalFrame = 0;
const retimedShots = [];
const shotMap = {};

for (const scene of originalStoryboard.scenes) {
  const origTotalDur = scene.shots.reduce((acc, s) => acc + s.orig_dur, 0);
  let sceneFrameAccum = 0;

  for (let i = 0; i < scene.shots.length; i++) {
    const shot = scene.shots[i];
    // Scale shot proportionally
    const shotFr = i === scene.shots.length - 1 
      ? scene.frames - sceneFrameAccum 
      : Math.round((shot.orig_dur / origTotalDur) * scene.frames);
    
    sceneFrameAccum += shotFr;

    const start_frame = currentGlobalFrame;
    const end_frame = currentGlobalFrame + shotFr;
    const shotObj = {
      id: shot.id,
      scene_id: scene.id,
      scene_name: scene.name,
      start_frame,
      end_frame,
      duration_frames: shotFr,
      start_s: Number((start_frame / 30).toFixed(2)),
      end_s: Number((end_frame / 30).toFixed(2)),
      duration_s: Number((shotFr / 30).toFixed(2)),
      vo: shot.vo,
      on_screen_text: shot.on_screen_text,
      visual: shot.visual
    };
    retimedShots.push(shotObj);
    shotMap[shot.id] = shotObj;
    currentGlobalFrame += shotFr;
  }
}

// Retime SFX Cues
const retimedSfx = originalStoryboard.raw_sfx_cues.map(cue => {
  const targetShot = shotMap[cue.shot];
  const offsetFrames = Math.round(targetShot.duration_frames * cue.offset_rel);
  const triggerFrame = targetShot.start_frame + offsetFrames;
  return {
    shot: cue.shot,
    frame: triggerFrame,
    sound: cue.sound,
    volume: cue.volume,
    time_s: Number((triggerFrame / 30).toFixed(2))
  };
});

const retimedData = {
  meta: {
    title: "What Happens When You Tap Pay on UPI? (Retimed)",
    width: 1080,
    height: 1920,
    fps: 30,
    total_frames: currentGlobalFrame,
    total_s: Number((currentGlobalFrame / 30).toFixed(2))
  },
  scenes: originalStoryboard.scenes.map(s => {
    const scShots = retimedShots.filter(sh => sh.scene_id === s.id);
    return {
      id: s.id,
      name: s.name,
      vo_file: s.vo_file,
      start_frame: scShots[0].start_frame,
      end_frame: scShots[scShots.length - 1].end_frame,
      duration_frames: s.frames,
      shots: scShots
    };
  }),
  shots: retimedShots,
  sfx_cues: retimedSfx
};

fs.writeFileSync("public/inputs/retimed.json", JSON.stringify(retimedData, null, 2));
console.log(`Successfully generated public/inputs/retimed.json with ${retimedShots.length} shots and total duration ${currentGlobalFrame} frames (${(currentGlobalFrame/30).toFixed(2)}s)`);
