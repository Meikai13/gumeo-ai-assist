import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AIRequest {
  user_id: string;
  prompt: string;
  context?: 'triagem' | 'relatorio' | 'insight' | 'geral';
  patient_data?: any;
  appointment_data?: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const { user_id, prompt, context = 'geral', patient_data, appointment_data }: AIRequest = await req.json();

    if (!user_id || !prompt) {
      return new Response(
        JSON.stringify({ error: 'user_id and prompt are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user profile for context
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user_id)
      .single();

    // Build system prompt based on context
    let systemPrompt = `Você é um assistente médico inteligente especializado em ajudar profissionais de saúde com o sistema Gumeo.

Informações do profissional:
- Nome: ${profile?.full_name || 'Não informado'}
- Especialidade: ${profile?.specialty || 'Não informada'}
- CRM: ${profile?.crm || 'Não informado'}

Instruções gerais:
- Responda sempre em português brasileiro
- Seja profissional, mas amigável
- Mantenha respostas concisas e práticas
- Use terminologia médica adequada quando necessário
- Sempre priorize a ética médica e segurança do paciente`;

    switch (context) {
      case 'triagem':
        systemPrompt += `\n\nContexto: TRIAGEM DIGITAL
Você está ajudando com triagem inicial de pacientes. Baseie-se nos dados fornecidos para:
- Identificar sintomas prioritários
- Sugerir nível de urgência (baixa, média, alta)
- Recomendar próximos passos
- NUNCA faça diagnósticos definitivos
- SEMPRE recomende avaliação médica presencial quando necessário`;
        break;

      case 'relatorio':
        systemPrompt += `\n\nContexto: GERAÇÃO DE RELATÓRIOS
Você está ajudando a gerar relatórios médicos. Mantenha:
- Linguagem técnica apropriada
- Estrutura clara e organizada
- Informações relevantes e precisas
- Formato profissional`;
        break;

      case 'insight':
        systemPrompt += `\n\nContexto: INSIGHTS ESTRATÉGICOS
Você está analisando dados para fornecer insights sobre:
- Padrões de consultas
- Performance financeira
- Gestão de tempo
- Oportunidades de melhoria
- Sugestões de otimização`;
        break;
    }

    // Add contextual data if provided
    if (patient_data) {
      systemPrompt += `\n\nDados do paciente: ${JSON.stringify(patient_data)}`;
    }
    if (appointment_data) {
      systemPrompt += `\n\nDados da consulta: ${JSON.stringify(appointment_data)}`;
    }

    console.log('Sending request to OpenAI with context:', context);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI response generated successfully');

    // Log the interaction for analytics
    await supabase
      .from('notifications')
      .insert([
        {
          user_id,
          title: `Consulta AI - ${context}`,
          message: `Pergunta: "${prompt.substring(0, 100)}..." | Resposta gerada com sucesso`,
          type: 'info',
        }
      ]);

    return new Response(
      JSON.stringify({ 
        success: true,
        response: aiResponse,
        context,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in ai-assistant function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        context: 'AI Assistant Error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);