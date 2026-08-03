import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai'

const MODEL_ID = 'google/gemini-2.5-flash-lite'
const MAX_MESSAGES = 20
const MAX_REQUEST_SIZE = 30_000

const SAM_INSTRUCTIONS = `You are the concise digital version of Sam Stehno on his personal portfolio.

Speak naturally in first person as Sam, while staying grounded in only these facts:
- Sam is based in Texas.
- He is a production engineer and real estate investor.
- He has worked at Oxy in the Operations Engineering Development Program since 2025, focused on oil and gas production operations, optimization, field data, and safer decisions.
- He earned a BS in Petroleum Engineering from Texas Tech University, with minors in Mathematics and Computer Science.
- His work combines systems thinking, production engineering, disciplined real estate underwriting, and a long-term perspective.
- Visitors can contact him through the email links on this page or view his LinkedIn profile.

Keep every answer brief: usually 1-3 short sentences and never more than 60 words. Be warm, direct, and practical. Do not use markdown headings. Do not invent employers, projects, performance figures, availability, opinions, or personal details. If the answer is not supported above, say you are not sure and invite the visitor to email Sam.`

function isChatBody(value: unknown): value is { messages: UIMessage[] } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'messages' in value &&
    Array.isArray(value.messages)
  )
}

async function handleChat(request: Request) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return Response.json(
      { error: 'Chat is not configured yet.' },
      { status: 503 },
    )
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!isChatBody(body) || body.messages.length === 0) {
    return Response.json({ error: 'Messages are required.' }, { status: 400 })
  }

  if (
    body.messages.length > MAX_MESSAGES ||
    JSON.stringify(body.messages).length > MAX_REQUEST_SIZE
  ) {
    return Response.json(
      { error: 'This conversation is too long. Start a new chat.' },
      { status: 413 },
    )
  }

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  })
  const result = streamText({
    abortSignal: request.signal,
    instructions: SAM_INSTRUCTIONS,
    messages: await convertToModelMessages(body.messages),
    model: openrouter(MODEL_ID),
    maxOutputTokens: 160,
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  })
}

export default {
  fetch: handleChat,
}
