---
title: API Go y MySQL
description: REST API en Go con arquitectura limpia, JWT, bcrypt y persistencia MySQL.
summary: Servicio backend educativo y reutilizable que separa dominio, casos de uso e infraestructura.
stack:
  - Go
  - MySQL
  - JWT
  - Gorilla Mux
  - Clean architecture
repoUrl: https://github.com/jdpadillaac/go-mysql-api
featured: true
order: 4
ogImage: /og/go-mysql-api.svg
accent: '#29c5f6'
---

## Arquitectura

El proyecto organiza handlers HTTP, reglas de negocio y acceso a datos en capas independientes. La autenticación usa JWT y contraseñas hasheadas con bcrypt.

## Persistencia

MySQL conecta mediante un driver estándar; los repositorios implementan interfaces del dominio para facilitar pruebas y sustitución.

## Uso

Sirve como base para microservicios pequeños o como referencia de patrones en Go sin acoplarse a un framework pesado.
