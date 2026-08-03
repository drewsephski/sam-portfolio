import { useEffect, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { MessageCircle, Radio, X } from 'lucide-react'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message'
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from '@/components/ai-elements/prompt-input'

const chatTransport = new DefaultChatTransport({ api: '/api/chat' })

const SUGGESTIONS = [
  'What do you work on?',
  'Tell me about your background.',
  'What guides your investments?',
  'How can I reach you?',
]

function SignalBars({ active }: { active: boolean }) {
  return (
    <span aria-hidden="true" className="flex h-4 items-end gap-[2px]">
      {[5, 9, 13].map((height, index) => (
        <span
          className={`w-[2px] rounded-full bg-current transition-opacity duration-300 ${
            active ? 'animate-pulse opacity-100' : 'opacity-45'
          }`}
          key={height}
          style={{
            animationDelay: `${index * 140}ms`,
            height,
          }}
        />
      ))}
    </span>
  )
}

export function SamChat({ portrait }: { portrait: string }) {
  const [open, setOpen] = useState(false)
  const { error, messages, sendMessage, status, stop } = useChat({
    transport: chatTransport,
  })
  const isGenerating = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const submitMessage = ({ text }: PromptInputMessage) => {
    const trimmedText = text.trim()
    if (!trimmedText || isGenerating) return
    sendMessage({ text: trimmedText })
  }

  const askSuggestion = (text: string) => {
    if (!isGenerating) sendMessage({ text })
  }

  return (
    <aside className="fixed bottom-3 right-3 z-[70] sm:bottom-5 sm:right-5">
      <div
        aria-label="Chat with Sam's digital assistant"
        aria-modal="false"
        className={`absolute bottom-[4.75rem] right-0 flex h-[min(580px,calc(100dvh-7rem))] w-[calc(100vw-1.5rem)] max-w-[390px] origin-bottom-right flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#17191c] text-white shadow-[0_28px_90px_rgba(0,0,0,0.34)] transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:bottom-[5.25rem] ${
          open
            ? 'visible translate-y-0 scale-100 opacity-100'
            : 'invisible translate-y-5 scale-[0.92] opacity-0'
        }`}
        role="dialog"
      >
        <div className="relative overflow-hidden border-b border-white/10 px-5 pb-4 pt-5">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] bg-[#F26522]"
          />
          <div className="absolute right-16 top-0 h-24 w-24 rounded-full bg-[#F26522]/10 blur-3xl" />
          <div className="relative flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative shrink-0">
                <img
                  alt="Sam Stehno"
                  className="h-11 w-11 rounded-full border border-white/15 object-cover"
                  height="44"
                  src={portrait}
                  width="44"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-[3px] border-[#17191c] bg-[#F26522]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="truncate text-[15px] font-semibold tracking-[-0.01em]">
                    Ask Sam
                  </h2>
                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/50">
                    AI
                  </span>
                </div>
                <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/50">
                  <Radio aria-hidden="true" className="h-3 w-3 text-[#F5824A]" />
                  Brief answers from Sam&rsquo;s portfolio
                </p>
              </div>
            </div>
            <button
              aria-label="Close chat"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/65 transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
              type="button"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Conversation className="min-h-0 bg-[#f3f1ed] text-gray-900">
          <ConversationContent className="gap-4 px-4 py-5">
            <Message from="assistant" className="max-w-[92%]">
              <div className="mb-0.5 flex items-center gap-2 px-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-gray-400">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F26522]" />
                Sam / channel 01
              </div>
              <MessageContent className="rounded-2xl rounded-tl-[5px] bg-white px-4 py-3 text-[13px] leading-relaxed shadow-[0_1px_0_rgba(0,0,0,0.05)]">
                <MessageResponse>
                  Hey, I&rsquo;m Sam&rsquo;s digital stand-in. Ask me about my work, background, or how to get in touch.
                </MessageResponse>
              </MessageContent>
            </Message>

            {messages.map((message) => (
              <Message from={message.role} key={message.id}>
                {message.parts.map((part, index) =>
                  part.type === 'text' ? (
                    <MessageContent
                      className={
                        message.role === 'user'
                          ? 'rounded-2xl rounded-br-[5px] bg-[#23262a] px-4 py-3 text-[13px] leading-relaxed text-white'
                          : 'rounded-2xl rounded-tl-[5px] bg-white px-4 py-3 text-[13px] leading-relaxed shadow-[0_1px_0_rgba(0,0,0,0.05)]'
                      }
                      key={`${message.id}-${index}`}
                    >
                      <MessageResponse>{part.text}</MessageResponse>
                    </MessageContent>
                  ) : null,
                )}
              </Message>
            ))}

            {status === 'submitted' && (
              <div
                aria-label="Sam is thinking"
                className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-[5px] bg-white px-4 py-3 shadow-[0_1px_0_rgba(0,0,0,0.05)]"
              >
                {[0, 1, 2].map((dot) => (
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#F26522]"
                    key={dot}
                    style={{ animationDelay: `${dot * 120}ms` }}
                  />
                ))}
              </div>
            )}

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-[12px] leading-relaxed text-red-700">
                The line dropped. Please try again in a moment.
              </p>
            )}

            {messages.length === 0 && (
              <div className="mt-1 flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    className="rounded-full border border-gray-300 bg-transparent px-3 py-2 text-left text-[11px] font-medium text-gray-600 transition-[border-color,background-color,color] hover:border-[#F26522]/50 hover:bg-white hover:text-gray-900"
                    key={suggestion}
                    onClick={() => askSuggestion(suggestion)}
                    type="button"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton className="border-gray-200 bg-white text-gray-900" />
        </Conversation>

        <div className="border-t border-white/10 bg-[#1d1f22] p-3">
          <PromptInput
            className="[&_[data-slot=input-group]]:rounded-[1.15rem] [&_[data-slot=input-group]]:border-white/10 [&_[data-slot=input-group]]:bg-white/[0.07] [&_[data-slot=input-group]]:shadow-none"
            onSubmit={submitMessage}
          >
            <PromptInputBody>
              <PromptInputTextarea
                aria-label="Message Sam"
                autoFocus={open}
                className="min-h-[54px] resize-none px-3 pt-3 text-[13px] leading-relaxed text-white placeholder:text-white/35"
                disabled={isGenerating}
                placeholder="Ask Sam something…"
              />
            </PromptInputBody>
            <PromptInputFooter className="px-2 pb-2">
              <span
                aria-live="polite"
                className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white/35"
              >
                <SignalBars active={isGenerating} />
                {isGenerating ? 'Transmitting' : 'Open channel'}
              </span>
              <PromptInputSubmit
                className="rounded-full bg-[#F26522] text-white hover:bg-[#df5b1d]"
                onStop={stop}
                status={status}
              />
            </PromptInputFooter>
          </PromptInput>
          <p className="mt-2 text-center text-[9px] tracking-wide text-white/25">
            AI can miss details. Email Sam for anything important.
          </p>
        </div>
      </div>

      <button
        aria-expanded={open}
        aria-label={open ? 'Close chat with Sam' : 'Open chat with Sam'}
        className={`group relative ml-auto flex h-16 items-center gap-3 overflow-hidden rounded-full bg-[#17191c] p-2 pl-5 text-white shadow-[0_16px_45px_rgba(0,0,0,0.25)] transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-[#202327] sm:h-[68px] ${
          open ? 'pointer-events-none scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={() => setOpen(true)}
        type="button"
      >
        <span className="text-left">
          <span className="block text-[13px] font-semibold leading-none">Ask Sam</span>
          <span className="mt-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-white/45">
            <SignalBars active /> Quick answers
          </span>
        </span>
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F26522] text-white sm:h-[52px] sm:w-[52px]">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#F26522] opacity-20" />
          <MessageCircle aria-hidden="true" className="relative h-5 w-5" />
        </span>
      </button>
    </aside>
  )
}
