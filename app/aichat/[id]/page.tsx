import 'server-only';
import ChatComponent from '../components/Chat';
import { createServerSupabaseClient } from '@/lib/server/server';
import { format } from 'date-fns';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';

interface ChatMessage {
  id: string;
  is_user_message: boolean;
  content: string | null;
  created_at: string;
}

async function fetchChat(supabase: SupabaseClient<Database>, chatId: string) {
  noStore();
  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select(
        `
        id,
        user_id,
        created_at,
        updated_at,
        chat_messages!inner (
          id,
          is_user_message,
          content,
          created_at
        )
      `
      )
      .eq('id', chatId)
      .order('created_at', {
        ascending: true,
        referencedTable: 'chat_messages'
      })
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching chat data from Supabase:', error);
    return null;
  }
}

export default async function ChatPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const supabase = await createServerSupabaseClient();
  const chatData = await fetchChat(supabase, id);

  if (!chatData) {
    redirect('/aichat');
  }
  const cookieStore = await cookies();
  const modelType = cookieStore.get('modelType')?.value ?? 'standart';
  const selectedOption =
    cookieStore.get('selectedOption')?.value ?? 'gpt-3.5-turbo-1106';

  const formattedChatData = {
    id: chatData.id,
    user_id: chatData.user_id,
    prompt: chatData.chat_messages
      .filter((m: ChatMessage) => m.is_user_message)
      .map((m: ChatMessage) => m.content),
    completion: chatData.chat_messages
      .filter((m: ChatMessage) => !m.is_user_message)
      .map((m: ChatMessage) => m.content),
    created_at: format(new Date(chatData.created_at), 'dd-MM-yyyy HH:mm'),
    updated_at: format(new Date(chatData.updated_at), 'dd-MM-yyyy HH:mm'),
    chat_messages: chatData.chat_messages
  };

  return (
    <ChatComponent
      currentChat={formattedChatData}
      chatId={id}
      initialModelType={modelType}
      initialSelectedOption={selectedOption}
    />
  );
}
