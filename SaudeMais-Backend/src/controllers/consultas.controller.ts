import { Request, Response } from "express";
import { supabaseAdmin } from "../config/supabase.js";


/**
 * Cria uma consulta - espera:
 * body: { medico_id: string, data: 'YYYY-MM-DD', horario: 'HH:MM' }
 * req.user!.id -> profile_id do paciente
 */
export async function criarConsulta(req: Request, res: Response) {
  try {
    const { medico_id, data, horario } = req.body;
    const profileId = req.user?.id;

    if (!profileId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const { data: paciente } = await supabaseAdmin
      .from("pacientes")
      .select("id")
      .eq("profile_id", profileId)
      .single();

    if (!paciente) {
      return res.status(404).json({ error: "Paciente não encontrado" });
    }

    const { data: consulta, error } = await supabaseAdmin
      .from("consultas")
      .insert({
        paciente_id: paciente.id,
        medico_id,
        data,
        horario,
        status: "agendada",
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: "Erro ao agendar consulta" });
    }

    return res.status(201).json({ success: true, data: consulta });
  } catch {
    return res.status(500).json({ error: "Erro interno" });
  }
}
