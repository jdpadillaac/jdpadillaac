---
title: Chat en tiempo real
description: API de chat con WebSockets y endpoints REST para salas y mensajes.
summary: Backend orientado a comunicación en tiempo real con separación entre transporte y lógica de mensajes.
stack:
  - Go
  - WebSockets
  - REST
  - Tiempo real
repoUrl: https://github.com/jdpadillaac/go_chat
featured: true
order: 5
ogImage: /og/go-chat.svg
accent: '#9b5de5'
---

## Idea

Explorar cómo combinar HTTP tradicional con conexiones persistentes para mensajería instantánea.

## Implementación

El servicio expone rutas REST para operaciones puntuales y un canal WebSocket para eventos de chat en vivo.

## Resultado

Una base compacta para prototipos de mensajería o para estudiar concurrencia y manejo de conexiones en Go.
