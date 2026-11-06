import { api } from "../api";
import AuthRequests from "./AuthRequests";
import type { UserProfile } from "../types";

function getUsuarioId(): number {
  const id = AuthRequests.getIdUsuario();
  if (id === null) throw new Error("Sessão inválida. Entre novamente.");
  return id;
}

export async function getPerfil(): Promise<UserProfile> {
  return api.buscar<UserProfile>("usuarios", getUsuarioId());
}

export async function atualizarPerfil(
  payload: Partial<UserProfile>
): Promise<UserProfile> {
  if (!payload.nome || !payload.email || !payload.cpf) {
    throw new Error("Nome, e-mail e CPF são necessários para atualizar o perfil.");
  }

  await api.atualizar("usuarios", getUsuarioId(), {
    nome: payload.nome,
    email: payload.email,
    cpf: payload.cpf,
  });
  return getPerfil();
}