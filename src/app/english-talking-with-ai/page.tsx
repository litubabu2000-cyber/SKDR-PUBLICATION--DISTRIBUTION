
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Loader2, Bot, User } from 'lucide-react';
import { speakToTutor } from '@/ai/flows/english-tutor-flow';

type Message = {
  speaker: 'user' | 'ai';
  text: string;
};

export default function EnglishTalkingWithAiPage() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Ensure this code runs only on the client
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          setTranscript(interimTranscript);
          if (finalTranscript) {
            handleUserSpeech(finalTranscript);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };

      } else {
        console.warn('Web Speech API is not supported in this browser.');
      }
    }
  }, []);

  const handleUserSpeech = async (text: string) => {
    if (!text.trim()) return;

    setConversation((prev) => [...prev, { speaker: 'user', text }]);
    setTranscript('');
    setIsLoading(true);

    try {
      const response = await speakToTutor(text);
      if (response && response.audioUrl) {
        setConversation((prev) => [...prev, { speaker: 'ai', text: response.text || '' }]);
        const audio = new Audio(response.audioUrl);
        audio.play();
      } else {
         setConversation((prev) => [...prev, { speaker: 'ai', text: "Sorry, I didn't get a response. Please try again." }]);
      }
    } catch (error) {
      console.error('Error with AI tutor:', error);
       setConversation((prev) => [...prev, { speaker: 'ai', text: 'An error occurred. Please check the console.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported by your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          English Talking with AI
        </h1>
        <p className="text-muted-foreground md:text-xl">
          Practice your English speaking skills with our AI tutor.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Bot className="size-8 text-primary" />
              <CardTitle className="text-2xl font-headline">
                AI Conversation
              </CardTitle>
            </div>
            <Button onClick={toggleListening} size="icon" variant={isListening ? 'destructive' : 'default'}>
              {isListening ? <MicOff /> : <Mic />}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-80 overflow-y-auto p-4 border rounded-md bg-muted/50 flex flex-col gap-4">
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    msg.speaker === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.speaker === 'ai' && <Bot className="size-6 text-primary flex-shrink-0" />}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] text-sm ${
                      msg.speaker === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background'
                    }`}
                  >
                    {msg.text}
                  </div>
                   {msg.speaker === 'user' && <User className="size-6 text-muted-foreground flex-shrink-0" />}
                </div>
              ))}
               {isListening && transcript && (
                <div className="flex items-start gap-3 justify-end opacity-60">
                    <div className="rounded-lg p-3 max-w-[80%] text-sm bg-primary/80 text-primary-foreground">
                        {transcript}
                    </div>
                    <User className="size-6 text-muted-foreground flex-shrink-0" />
                </div>
              )}
               {isLoading && (
                <div className="flex items-center gap-3 justify-start">
                  <Bot className="size-6 text-primary flex-shrink-0" />
                  <div className="rounded-lg p-3 bg-background inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    <span>Thinking...</span>
                    </div>
                </div>
              )}
               {conversation.length === 0 && !isListening && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                  <Mic className="size-10 mb-4" />
                  <p>Click the microphone button to start a conversation with the AI tutor.</p>
                </div>
              )}
            </div>
            <div className='text-center text-sm text-muted-foreground pt-2'>
                {isListening ? 'Listening...' : 'Click the mic to start speaking'}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
