---
title: JTaskboard
description: Gestión de tareas estilo Jira con frontend React y API Spring Boot hexagonal con JWT.
summary: Aplicación web en español para crear, editar y cambiar el estado de tareas, conectada a un backend Java real.
stack:
  - React
  - TypeScript
  - Spring Boot
  - JWT
  - Arquitectura hexagonal
demoUrl: https://jtaskboard-react-app.vercel.app
repoUrl: https://github.com/jdpadillaac/jtaskboard-react-app
secondaryRepoUrl: https://github.com/jdpadillaac/jtaskboard-java-api
featured: true
order: 1
ogImage: /og/jtaskboard.svg
accent: '#5b8def'
---

## Contexto

JTaskboard nació como un ejercicio completo de producto: interfaz usable, reglas de negocio claras y un backend que no es un mock.

## Frontend

La app web consume una API protegida con JWT. La organización por capas separa UI, casos de uso y acceso a datos, lo que facilita pruebas y evolución del dominio de tareas.

## Backend

La API REST está construida con Spring Boot y arquitectura hexagonal por feature. Autenticación, autorización y persistencia quedan encapsuladas detrás de puertos explícitos.

## Aprendizajes

Integrar dos repositorios (cliente y servidor), mantener contratos estables y documentar el flujo de login fue el núcleo del proyecto.
