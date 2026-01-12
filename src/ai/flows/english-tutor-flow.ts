
'use server';
/**
 * @fileOverview An English speaking tutor AI agent.
 *
 * - speakToTutor - A function that handles the conversational tutoring.
 * - EnglishTutorOutput - The return type for the speakToTutor function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const EnglishTutorOutputSchema = z.object({
  text: z.string().describe("The AI tutor's response text."),
});
export type EnglishTutorOutput = z.infer<typeof EnglishTutorOutputSchema>;

const englishTutorFlow = ai.defineFlow(
  {
    name: 'englishTutorFlow',
    inputSchema: z.string(),
    outputSchema: EnglishTutorOutputSchema,
  },
  async (userInput) => {
    const llmResponse = await ai.generate({
      prompt: `You are an expert English speaking tutor. Your role is to have a natural conversation with the user, gently correct their mistakes, and encourage them. The user's input is from a speech-to-text system, so it might have some inaccuracies.

User said: ${userInput}

Keep your response concise and conversational. If the user makes a mistake, first respond naturally, and then briefly explain the correction. For example: "That's a great question. By the way, we usually say 'an umbrella' instead of 'a umbrella' because 'umbrella' starts with a vowel sound."`,
    });
    
    const text = llmResponse.text;
    if (!text) {
      return { text: "I'm sorry, I don't know how to respond to that." };
    }

    return { text };
  }
);

export async function speakToTutor(
  userInput: string
): Promise<EnglishTutorOutput> {
  return englishTutorFlow(userInput);
}
