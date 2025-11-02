import { GoogleGenAI, Modality } from "@google/genai";
import { Gender, Age, AspectRatio } from '../types';
// Impor MASTER_POSE_LIST yang baru
import { DESCRIPTOR_MAP, PROMPT_TEMPLATE, MASTER_POSE_LIST } from '../constants'; 
import { fileToGenerativePart } from '../utils/fileUtils';

// Fungsi getApiKey tetap sama
const getApiKey = () => {
  const key = process.env.API_KEY;
  if (!key) {
    console.error("API_KEY environment variable not set.");
    throw new Error("API_KEY is not configured. Please set the environment variable.");
  }
  return key;
};

/**
 * Helper function to get N random items from an array.
 * This is a simple version of the Fisher-Yates shuffle.
 */
function getRandomPoses(poseList: string[], num: number): string[] {
  const shuffled = [...poseList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export const generateEditorialImages = async (
  productImage: File,
  logoImage: File,
  gender: Gender,
  age: Age,
  aspectRatio: AspectRatio
): Promise<string[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const descriptor = DESCRIPTOR_MAP[gender][age];

    const productPart = await fileToGenerativePart(productImage);
    const logoPart = await fileToGenerativePart(logoImage);

    // --- LOGIKA BARU DIMULAI DI SINI ---

    // 1. Dapatkan 4 pose acak dari daftar master
    const selectedPoses = getRandomPoses(MASTER_POSE_LIST, 4);

    // 2. Buat 4 panggilan API yang unik berdasarkan pose acak
    const imagePromises = selectedPoses.map(pose => {
      
      // 3. Buat prompt unik untuk setiap instruksi pose
      const prompt = PROMPT_TEMPLATE
        .replace('{descriptor}', descriptor)
        .replace('{aspectRatioDescription}', '') // Sesuai perbaikan sebelumnya
        .replace('{poseInstruction}', pose); // Menggunakan placeholder pose baru

      // 4. Kembalikan promise panggilan API
      return ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: prompt },
            productPart,
            logoPart
          ],
        },
        config: {
          responseModalities: [Modality.IMAGE],
          imageConfig: {
            aspectRatio: aspectRatio // Aspek rasio dinamis (sudah benar)
          }
        },
      }).then(response => {
        // 5. Proses respons di dalam .then()
        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
          }
        }
        throw new Error(`No image data found in API response for pose: ${pose}`);
      });
    });

    // 6. Jalankan semua promise secara paralel
    const results = await Promise.all(imagePromises);
    return results.filter((result): result is string => !!result);

    // --- LOGIKA BARU SELESAI ---

  } catch (error) {
    console.error("Error generating images with Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate images: ${error.message}`);
    }
    throw new Error("An unknown error occurred during image generation.");
  }
};