import { useEffect, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { ArrowRight, MessageCircle, X } from 'lucide-react'
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
  { label: 'Work & experience', prompt: 'What do you work on?' },
  { label: 'Background', prompt: 'Tell me about your background.' },
  { label: 'Investment approach', prompt: 'What guides your investments?' },
  { label: 'Get in touch', prompt: 'How can I reach you?' },
]

export function SamChat({ portrait }: { portrait: string }) {
  const [open, setOpen] = useState(false)
  const [suggestionsReady, setSuggestionsReady] = useState(false)
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

  useEffect(() => {
    if (!open) {
      setSuggestionsReady(false)
      return
    }

    const timer = window.setTimeout(() => setSuggestionsReady(true), 500)
    return () => window.clearTimeout(timer)
  }, [open])

  const submitMessage = ({ text }: PromptInputMessage) => {
    const trimmedText = text.trim()
    if (!trimmedText || isGenerating) return
    sendMessage({ text: trimmedText })
  }

  const askSuggestion = (text: string) => {
    if (suggestionsReady && !isGenerating) sendMessage({ text })
  }

  return (
    <aside className="fixed bottom-3 right-3 z-[70] sm:bottom-5 sm:right-5">
      <div
        aria-hidden={!open}
        aria-label="Chat with Sam's digital assistant"
        aria-modal="false"
        className={`absolute bottom-[4.5rem] right-0 flex h-[min(580px,calc(100dvh-6.5rem))] w-[calc(100vw-1.5rem)] max-w-[410px] origin-bottom-right flex-col overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white text-gray-900 shadow-[0_28px_90px_rgba(17,24,39,0.2)] transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:bottom-[5rem] ${
          open
            ? 'visible translate-y-0 scale-100 opacity-100'
            : 'invisible translate-y-5 scale-[0.92] opacity-0'
        }`}
        inert={!open}
        role="dialog"
      >
        <div className="relative overflow-hidden border-b border-gray-200 px-5 pb-4 pt-5">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-[#F26522]"
          />
          <div className="relative flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative shrink-0">
                <img
                  alt="Sam Stehno"
                  className="h-12 w-12 rounded-full border border-gray-200 object-cover"
                  height="48"
                  src={portrait}
                  width="48"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-[#F26522]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="truncate text-[16px] font-semibold tracking-[-0.02em] text-gray-900">
                    Ask Sam
                  </h2>
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                    Portfolio AI
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  Answers grounded in this portfolio
                </p>
              </div>
            </div>
            <button
              aria-label="Close chat"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-900 hover:text-white"
              onClick={() => setOpen(false)}
              type="button"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Conversation className="min-h-0 bg-[#F5F5F5] text-gray-900">
          <ConversationContent className="gap-5 px-4 py-5 sm:px-5">
            <Message from="assistant" className="max-w-[92%]">
              <div className="mb-0.5 flex items-center gap-2 px-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-gray-400">
                <span className="h-px w-4 bg-[#F26522]" />
                A note from Sam
              </div>
              <MessageContent className="rounded-[1.15rem] rounded-tl-[5px] border border-gray-200 bg-white px-4 py-3.5 text-[13px] leading-relaxed shadow-[0_1px_2px_rgba(17,24,39,0.03)]">
                <MessageResponse>
                  Hi, I&rsquo;m Sam&rsquo;s portfolio assistant. Ask about my engineering work, investment approach, background, or how to get in touch.
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
                          ? 'rounded-[1.15rem] rounded-br-[5px] bg-gray-900 px-4 py-3 text-[13px] leading-relaxed text-white'
                          : 'rounded-[1.15rem] rounded-tl-[5px] border border-gray-200 bg-white px-4 py-3 text-[13px] leading-relaxed shadow-[0_1px_2px_rgba(17,24,39,0.03)]'
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
                className="flex w-fit items-center gap-1.5 rounded-[1.15rem] rounded-tl-[5px] border border-gray-200 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(17,24,39,0.03)]"
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
              <div className="mt-1">
                <p className="mb-2.5 px-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-gray-400">
                  Good places to start
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      className="group flex min-h-[58px] items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-left text-[11px] font-medium leading-snug text-gray-700 shadow-[0_1px_2px_rgba(17,24,39,0.02)] transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_5px_14px_rgba(17,24,39,0.06)] disabled:pointer-events-none"
                      disabled={!suggestionsReady || isGenerating}
                      key={suggestion.prompt}
                      onClick={() => askSuggestion(suggestion.prompt)}
                      type="button"
                    >
                      <span>{suggestion.label}</span>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors group-hover:bg-[#F26522] group-hover:text-white">
                        <ArrowRight aria-hidden="true" className="h-3 w-3" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton className="border-gray-200 bg-white text-gray-900" />
        </Conversation>

        <div className="border-t border-gray-200 bg-white p-3">
          <PromptInput
            className="[&_[data-slot=input-group]]:rounded-[1.15rem] [&_[data-slot=input-group]]:border-gray-200 [&_[data-slot=input-group]]:bg-[#F5F5F5] [&_[data-slot=input-group]]:shadow-none [&_[data-slot=input-group]]:focus-within:border-gray-400 [&_[data-slot=input-group]]:focus-within:ring-0"
            onSubmit={submitMessage}
          >
            <PromptInputBody>
              <PromptInputTextarea
                aria-label="Message Sam"
                autoFocus={open}
                className="min-h-[54px] resize-none px-3 pt-3 text-[13px] leading-relaxed text-gray-900 placeholder:text-gray-400"
                disabled={isGenerating}
                placeholder="Ask about Sam’s work…"
              />
            </PromptInputBody>
            <PromptInputFooter className="px-2 pb-2">
              <span
                aria-live="polite"
                className="flex items-center gap-2 text-[10px] font-medium text-gray-400"
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full bg-[#F26522] ${isGenerating ? 'animate-pulse' : ''}`}
                />
                {isGenerating ? 'Sam is thinking…' : 'Portfolio assistant'}
              </span>
              <PromptInputSubmit
                className="rounded-full bg-[#F26522] text-white hover:bg-[#df5b1d]"
                onStop={stop}
                status={status}
              />
            </PromptInputFooter>
          </PromptInput>
          <p className="mt-2 text-center text-[9px] tracking-wide text-gray-400">
            AI can miss details. Email Sam for anything important.
          </p>
        </div>
      </div>

      <button
        aria-hidden={open}
        aria-expanded={open}
        aria-label={open ? 'Close chat with Sam' : 'Open chat with Sam'}
        className={`group relative ml-auto flex h-[60px] items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-gray-900 p-1.5 pl-5 text-white shadow-[0_16px_45px_rgba(17,24,39,0.25)] transition-[transform,background-color,opacity] duration-300 hover:-translate-y-1 hover:bg-[#202327] sm:h-16 ${
          open ? 'pointer-events-none scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={() => setOpen(true)}
        tabIndex={open ? -1 : 0}
        type="button"
      >
        <span className="text-left">
          <span className="block text-[13px] font-semibold leading-none">Ask Sam</span>
          <span className="mt-1.5 block text-[10px] text-white/45">
            Portfolio assistant
          </span>
        </span>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F26522] text-white transition-transform duration-300 group-hover:rotate-[-8deg] sm:h-[52px] sm:w-[52px]">
          <MessageCircle aria-hidden="true" className="h-5 w-5" />
        </span>
      </button>
    </aside>
  )
}
