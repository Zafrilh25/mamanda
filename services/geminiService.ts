
import { GoogleGenAI, Modality } from "@google/genai";
import { Gender, Age, AspectRatio } from '../types';
import { DESCRIPTOR_MAP, PROMPT_TEMPLATE } from '../constants';
import { fileToGenerativePart } from '../utils/fileUtils';

// This function assumes `process.env.API_KEY` is set in the environment
// In a real-world scenario, you would handle this more securely.
const getApiKey = () => {
  const key = process.env.API_KEY;
  if (!key) {
    console.error("API_KEY environment variable not set.");
    throw new Error("API_KEY is not configured. Please set the environment variable.");
  }
  return key;
};

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
    // The aspect ratio is now handled by the imageConfig, so we replace the prompt placeholder with an empty string.
    const prompt = PROMPT_TEMPLATE
      .replace('{descriptor}', descriptor)
      .replace('{aspectRatioDescription}', '');


    const productPart = await fileToGenerativePart(productImage);
    const logoPart = await fileToGenerativePart(logoImage);

    const generateImage = async () => {
      // Re-added imageConfig to control the aspect ratio of the generated image.
      const response = await ai.models.generateContent({
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
            aspectRatio: aspectRatio
          }
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
      }
      throw new Error("No image data found in API response.");
    };

    // Generate 4 images in parallel
    const imagePromises = Array(4).fill(0).map(() => generateImage());
    const results = await Promise.all(imagePromises);
    return results;

  } catch (error) {
    console.error("Error generating images with Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate images: ${error.message}`);
    }
    throw new Error("An unknown error occurred during image generation.");
  }
};
