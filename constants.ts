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

export const PROMPT_TEMPLATE = `Create an ultra-photorealistic cinematic editorial fashion portrait in a {aspectRatioDescription}.
The subject is a realistic {descriptor} Indonesian model wearing the exact, complete outfit (details, colors, fabric texture) 
from the uploaded product photo.

Setting: A professional photo studio with a plain, seamless, solid light-gray background.

Pose:
As the Photographer, creatively innovate a natural, elegant pose and shot composition that best highlights the outfit 
and the model’s personality — while maintaining a clean, airy, cinematic studio aesthetic.
(Examples: full-body shot showing the outfit’s flow, half-body highlighting fabric, or a candid seated pose that feels spontaneous yet graceful.)

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
unrealistic skin, cartoon, 3D render, poorly drawn hands, text, extra watermark, blurry product, mismatched outfit.`;

export const MAX_PRODUCT_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
export const MAX_LOGO_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];