
'use server';
/**
 * @fileOverview An English speaking tutor AI agent.
 *
 * - speakToTutor - A function that handles the conversational tutoring.
 * - EnglishTutorOutput - The return type for the speakToTutor function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

export const EnglishTutorOutputSchema = z.object({
  text: z.string().describe('The AI tutor\'s response text.'),
  audioUrl: z.string().describe('A data URI of the AI tutor\'s spoken response in WAV format.'),
});
export type EnglishTutorOutput = z.infer<typeof EnglishTutorOutputSchema>;

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const englishTutorPrompt = ai.definePrompt({
  name: 'englishTutorPrompt',
  input: { schema: z.string() },
  prompt: `You are an expert English speaking tutor. Your role is to have a natural conversation with the user, gently correct their mistakes, and encourage them. The user's input is from a speech-to-text system, so it might have some inaccuracies.

User said: {{{prompt}}}

Keep your response concise and conversational. If the user makes a mistake, first respond naturally, and then briefly explain the correction. For example: "That's a great question. By the way, we usually say 'an umbrella' instead of 'a umbrella' because 'umbrella' starts with a vowel sound."`,
});

const englishTutorFlow = ai.defineFlow(
  {
    name: 'englishTutorFlow',
    inputSchema: z.string(),
    outputSchema: EnglishTutorOutputSchema,
  },
  async (userInput) => {
    const llmResponse = await englishTutorPrompt(userInput);
    const textToSpeak = llmResponse.text || "I'm sorry, I don't know how to respond to that.";

    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: textToSpeak,
    });

    if (!media) {
      throw new Error('No audio media was generated.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const wavBase64 = await toWav(audioBuffer);

    return {
      text: textToSpeak,
      audioUrl: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);

export async function speakToTutor(
  userInput: string
): Promise<EnglishTutorOutput> {
  return englishTutorFlow(userInput);
}
