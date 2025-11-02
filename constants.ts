import { Gender, Age, AspectRatio } from './types';

export const GENDER_OPTIONS = [
  { value: Gender.Female, label: 'Wanita' },
  { value: Gender.Male, label: 'Pria' },
];

export const AGE_OPTIONS = [
  { value: Age.Toddlers, label: 'Toddlers (2-4 thn)' },
  { value: Age.Children, label: 'Children (5-8 thn)' },
  { value: Age.PreTeens, label: 'Pre-teens (9-12 thn)' },
  { value: Age.Teens, label: 'Teens (13-17 thn)' },
  { value: Age.YoungAdults, label: 'Young Adults (18-25 thn)' },
  { value: Age.Adults, label: 'Adults (26-35 thn)' },
  { value: Age.MiddleAges, label: 'Middle Ages (36-50 thn)' },
];

export const ASPECT_RATIO_OPTIONS = [
  { value: AspectRatio.Portrait, label: 'Portrait (3:4)' },
  { value: AspectRatio.Square, label: 'Square (1:1)' },
  { value: AspectRatio.Landscape, label: 'Landscape (16:9)' },
];


export const DESCRIPTOR_MAP: Record<Gender, Record<Age, string>> = {
  [Gender.Male]: {
    [Age.Toddlers]: 'toddler boy 2–4 years',
    [Age.Children]: 'boy 5–8 years',
    [Age.PreTeens]: 'pre-teen boy 9–12 years',
    [Age.Teens]: 'teenage boy 13–17 years',
    [Age.YoungAdults]: 'young man 18–25 years',
    [Age.Adults]: 'man 26–35 years',
    [Age.MiddleAges]: 'middle-aged man 36–50 years',
  },
  [Gender.Female]: {
    [Age.Toddlers]: 'toddler girl 2–4 years',
    [Age.Children]: 'girl 5–8 years',
    [Age.PreTeens]: 'pre-teen girl 9–12 years',
    [Age.Teens]: 'teenage girl 13–17 years',
    [Age.YoungAdults]: 'young woman 18–25 years',
    [Age.Adults]: 'woman 26–35 years',
    [Age.MiddleAges]: 'middle-aged woman 36–50 years',
  },
};

export const ASPECT_RATIO_DESCRIPTION_MAP: Record<AspectRatio, string> = {
    [AspectRatio.Portrait]: 'portrait 3:4 ratio',
    [AspectRatio.Square]: 'square 1:1 ratio',
    [AspectRatio.Landscape]: 'landscape 16:9 ratio',
};

export const MASTER_POSE_LIST = [
  // --- DAFTAR POSE BERDIRI (25) ---
  // Gaya Percaya Diri
  'Standing tall, looking directly at the camera with a neutral, confident expression.',
  'Standing with one hand on hip, the other arm relaxed, slight smile.',
  'Standing with legs slightly crossed, hands resting lightly on hips.',
  'Facing 45 degrees away from camera, looking back over the shoulder.',
  'Standing with a wide, strong stance, arms folded across the chest.',
  'Power pose, standing tall, hands firmly placed on waist.',
  // Gaya Santai & Kasual
  'Standing relaxed, hands casually slipped into pockets.',
  'Leaning slightly against a simple white prop (like a block), very relaxed.',
  'Standing with one foot forward, body weight on the back foot, looking off-camera.',
  'Standing with feet shoulder-width apart, arms hanging naturally at the sides.',
  'Natural pose, one hand lightly touching the face or chin, thoughtful expression.',
  'Standing with one hand lightly brushing hair back.',
  'Profile shot (pose samping), model standing straight, looking forward.',
  'Three-quarter back pose, model standing, looking slightly to the side.',
  // Gaya Interaktif & Dinamis
  'Standing, one hand lightly holding the collar or lapel of the outfit.',
  'Standing, lightly touching or interacting with an accessory (e.g., bag, hat).',
  'Mid-walk pose, captured as if taking a step forward, natural movement.',
  'Slightly dynamic pose, one arm raised, showing the flow of the sleeve.',
  'Pose interacting with the outfit, like adjusting a cufflink or button.',
  'Playful pose, slight jump or hop, capturing fabric in motion.',
  'Standing, looking down at the outfit as if admiring it.',
  'Spinning motion pose, capturing the skirt or fabric flowing outwards.',
  'Standing on tiptoes, arms slightly raised, elegant and elongated.',
  'Pose with arms outstretched to the sides, open and free.',
  'Standing, hugging oneself lightly, conveying comfort or texture.',
  // --- DAFTAR POSE DUDUK (15) ---
  // Duduk di Balok/Bangku Sederhana
  'Seated on a low white stool, facing camera, knees together.',
  'Seated on a simple block, legs casually crossed at the ankle.',
  'Seated, leaning forward, elbows resting on knees, looking thoughtful.',
  'Seated sideways on a stool, looking back at the camera.',
  'Seated, one leg extended, the other bent, showing off footwear.',
  'Relaxed seated pose, leaning back slightly, supported by arms on the stool.',
  'Seated on a high stool, one foot on the rung, the other dangling.',
  // Duduk di Lantai
  'Seated on the floor, legs tucked neatly to one side.',
  'Seated on the floor, legs crossed ("lotus" style), hands on knees.',
  'Seated on the floor, hugging knees, looking at the camera.',
  'Lying on side on the floor, propped up on one elbow, relaxed.',
  'Seated on the floor, back against a white block, relaxed posture.',
  'Seated on the floor, legs extended straight out, hands resting on floor behind.',
  'Kneeling pose on the floor, body upright, looking at camera.',
  'Crouching pose, balanced on toes, looking intense or playful.',
  // --- DAFTAR POSE KONSEPTUAL (10) ---
  'Strong silhouette pose, body angled to create a clear shape.',
  'Mirrored pose, as if looking at a reflection (no mirror shown).',
  'Geometric pose, creating angles with arms and legs, like a dancer.',
  'Floating pose, captured mid-air in a graceful jump.',
  'Abstract pose, interacting with the floor, creating interesting shapes.',
  'Minimalist pose, standing completely still, arms perfectly straight at sides.',
  'Dramatic pose, one arm reaching up, creating a long vertical line.',
  'Candid laughter pose, model looking away, genuinely smiling.',
  'Contemplative pose, model walking slowly, looking down.',
  'Elegant finish pose, like a ballerina finishing a move, head tilted.'
];

export const PROMPT_TEMPLATE = `Create an ultra-photorealistic cinematic editorial fashion portrait in a {aspectRatioDescription}.
The subject is a realistic {descriptor} Indonesian model wearing the exact, complete outfit (details, colors, fabric texture) 
from the uploaded product photo.

Setting: A professional photo studio with a plain, seamless, solid white background.

Pose:
{poseInstruction}

As the Photographer, execute this specific pose while maintaining a clean, airy, cinematic studio aesthetic
and highlighting the outfit and the model's personality.

Expression: calm, dreamy, and inviting, with subtle emotional depth fitting the cinematic tone.

Watermark:
Incorporate the exact uploaded logo as a subtle, semi-transparent watermark 
in the bottom-right corner of the image. Maintain original proportions and natural blending.

Aesthetic: dreamy Korean movie still — cinematic, soft airy atmosphere, pastel tones, subtle film grain.
Lighting: diffused daylight, soft key light 45° left, gentle fill right, creamy shadows, subtle haze.
Camera: cinematic full-frame look, 85mm lens, aperture f/2.8, ISO 100, shallow depth of field, 
eye-level framing.

Negative Prompt:
harsh shadows, direct sunlight, oversaturated colors, busy background, distorted anatomy, 
unrealistic skin, cartoon, 3D render, poorly drawn hands, text, extra watermark, blurry product, mismatched outfit, mannequin, pedestal, stand, base, circular base, display stand, studio prop, podium.`;

export const MAX_PRODUCT_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
export const MAX_LOGO_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];