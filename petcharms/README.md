# Charms Necklace MVP - Entrega 1

**Documentación Completa del Proyecto Final - Master AI For Devs**

---

## 📋 Tabla de Contenidos

1. [Ficha del Producto](#1-ficha-del-producto)
2. [Historias de Usuario](#2-historias-de-usuario)
3. [Tickets de Trabajo](#3-tickets-de-trabajo)
4. [Arquitectura del Sistema](#4-arquitectura-del-sistema)
5. [Modelo de Datos](#5-modelo-de-datos)
6. [Diseño de API REST](#6-diseño-de-api-rest)
7. [Diseño Frontend](#7-diseño-frontend)
8. [Plan de Testing](#8-plan-de-testing)
9. [CI/CD Pipeline](#9-cicd-pipeline)
10. [🚀 Despliegue y Producción](#10--despliegue-y-producción)
11. [Registro del Uso de IA](#11-registro-del-uso-de-ia)

---

## 1. Ficha del Producto

### 📌 Propuesta de Valor

Un e-commerce minimalista que permite a clientes comprar un collar base personalizado con charms seleccionables. Enfoque en **simplicity, elegance, y rapid time-to-market**.

### 🎯 Problema que Resuelve

- **Para clientes:** Necesidad de personalizar accesorios sin complejidad técnica innecesaria.
- **Para el negocio:** Generar ingresos con un MVP testeable antes de agregar features complejas (pagos reales, inventario, cuentas de usuario).

### ✨ Características y Funcionalidades Principales

#### Funcionalidades Core Implementadas:

1. **Personalización de Collares para Mascotas**
   - Selección de tamaño (S, M, L)
   - Elección de color del collar (13 colores disponibles)
   - Personalización con letras (hasta 12 letras)
   - Selección de formas/charm shapes (más de 30 opciones: unicornios, corazones, animales, etc.)
   - Selección de colores para letras (10 colores disponibles)

2. **Gestión de Carrito de Compras**
   - Agregar productos personalizados al carrito
   - Visualización de resumen del carrito
   - Edición y eliminación de items
   - Cálculo automático de precios

3. **Sistema de Órdenes**
   - Creación de órdenes personalizadas
   - Almacenamiento temporal en memoria
   - Visualización de historial de órdenes
   - Confirmación de orden con número único

4. **Autenticación de Usuarios**
   - Registro de nuevos usuarios
   - Inicio de sesión
   - Integración con Supabase para gestión de usuarios

5. **Páginas Implementadas**
   - Landing Page (Index) con productos y formas disponibles
   - Product Page con personalización completa
   - Cart Page con resumen y edición
   - Checkout Page para completar la compra
   - Order Confirmation Page con detalles de la orden
   - Orders Page para ver historial
   - Login y Register Pages para autenticación

6. **API REST Implementada**
   - GET /api/v1/products - Lista de productos
   - GET /api/v1/shapes - Lista de formas disponibles (más de 30)
   - GET /api/v1/colors - Lista de colores para letras

### 👥 Público Objetivo

- **Primario:** Mujeres jóvenes (18–35) que valorizan accesorios personalizados.
- **Secundario:** Regalistas (buscan personalización).
- **Tertiary:** Early adopters dispuestos a probar nuevas marcas.

### 🎯 Objetivos del MVP

| Objetivo               | Métrica                       | Target Entrega 1 |
| ---------------------- | ----------------------------- | ---------------- |
| **Validar demanda**    | Conversión landing → carrito  | >15%             |
| **Producto funcional** | 100% de flujo E2E sin errores | 0 critical bugs  |
| **Time-to-market**     | Días en vivo                  | <14 días         |
| **Calidad inicial**    | Test coverage                 | >70%             |

### 🔄 Flujo E2E Claro

```
┌─────────────────────────────────────────────┐
│  1. Landing Page                            │
│     - Mostrar collar base + descripción     │
│     - Mostrar galería de charms disponibles │
└────────────────┬────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────┐
│  2. Product Page                            │
│     - Collar base (1 SKU fijo)              │
│     - Selector de charms (checkboxes)       │
│     - Vista previa de precio                │
│     - Botón "Agregar al carrito"            │
└────────────────┬────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────┐
│  3. Cart Page                               │
│     - Resumen del collar + charms           │
│     - Total de precio                       │
│     - Botón "Proceder al checkout"          │
└────────────────┬────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────┐
│  4. Order Confirmation Page                 │
│     - Número de orden (simulado)            │
│     - Resumen de producto                   │
│     - Estimado de entrega (fake)            │
│     - "Continuar comprando" → vuelve a inicio│
└────────────────────────���────────────────────┘
```

### 📊 Métricas Iniciales

| Métrica                          | Propósito                 | Tool                      |
| -------------------------------- | ------------------------- | ------------------------- |
| Page Load Time                   | Performance baseline      | Lighthouse                |
| Conversion Rate (Landing → Cart) | Product-market fit signal | Google Analytics (future) |
| Error Rate                       | Quality gate              | Sentry (future)           |
| Test Coverage                    | Code quality              | Vitest coverage report    |

---

## 2. Historias de Usuario

### 📊 Resumen de Historias

| ID     | Título                                     | Prioridad | Historia Asociada             |
| ------ | ------------------------------------------ | --------- | ----------------------------- |
| US-001 | Ver Collar Base y Descripción              | MUST      | Landing Page                  |
| US-002 | Seleccionar Charms (Múltiples)             | MUST      | Product Page                  |
| US-003 | Agregar al Carrito                         | MUST      | Cart Page                     |
| US-004 | Ver Resumen del Carrito                    | MUST      | Cart Page                     |
| US-005 | Crear Orden Simulada                       | MUST      | Checkout + Order Confirmation |
| US-006 | Autenticación de Usuarios (Login/Register) | SHOULD    | LoginPage + RegisterPage      |
| US-007 | Historial de Órdenes (Simulado)            | SHOULD    | Orders Page                   |

**Total:** 7 historias (5 MUST + 2 SHOULD)

### 🔴 MUST (Requisitos Críticos)

#### US-001: Ver Collar Base y Descripción

**Como** cliente potencial  
**Quiero** ver un collar base con imagen, descripción y precio  
**Para** decidir si me interesa personalizarlo

**Criterios de Aceptación (Given/When/Then):**

```gherkin
Given que entro a la landing page
When cargo la página
Then veo:
  - Imagen del collar base
  - Nombre del producto
  - Descripción corta (1–2 líneas)
  - Precio base ($)
  - Botón "Ver detalles" o similar
```

**Dependencias:** Base de datos con datos del collar (mock data es OK para MVP)  
**Riesgos:** Imagen muy grande → lentitud | Mitigación: optimizar imágenes, lazy load  
**Notas QA:**

- Verificar que la imagen carga sin errores 404
- Responsive en mobile (imagen escala correctamente)
- Precios muestran sin errores de parsing
- Nada hardcodeado (usar API)

---

#### US-002: Seleccionar Charms (Múltiples)

**Como** cliente  
**Quiero** seleccionar múltiples charms mediante checkboxes  
**Para** personalizar mi collar según mis preferencias

**Criterios de Aceptación:**

```gherkin
Given que estoy en la página de producto
When hago click en checkboxes de charms
Then:
  - El checkbox se marca/desmarca correctamente
  - La selección persiste (no se pierde si cambio de sección)
  - El precio total se actualiza en tiempo real
  - Puedo seleccionar de 0 a N charms
```

**Dependencias:** Lista de shapes disponibles (GET /api/v1/shapes), lista de colores disponibles (GET /api/v1/colors)  
**Riesgos:** Selecciones no se guardan → Mitigación: state management local (Zustand)  
**Notas QA:**

- Test: seleccionar 0 charms
- Test: seleccionar 1 charm
- Test: seleccionar todos los charms
- Test: deseleccionar charms
- Verificar cálculo de precio (precio_base + suma_charms)
- No permitir valores negativos

---

#### US-003: Agregar al Carrito

**Como** cliente  
**Quiero** agregar mi collar personalizado al carrito  
**Para** proceder hacia el checkout

**Criterios de Aceptación:**

```gherkin
Given que he seleccionado un collar y charms
When hago click en "Agregar al carrito"
Then:
  - El producto se agrega al carrito
  - Veo confirmación visual (toast/modal)
  - Puedo navegar al carrito o continuar viendo productos
  - El carrito persiste (localStorage o session state)
```

**Dependencias:** Cart state management  
**Riesgos:** Carrito se borra si recargo | Mitigación: persistencia en localStorage  
**Notas QA:**

- Verificar que el producto tiene todos los atributos (collar_id, charms_ids, precio)
- Agregar el mismo producto 2 veces → ¿suma cantidades o crea 2 líneas?
- Validar que no se agrega nada sin collar base

---

#### US-004: Ver Resumen del Carrito

**Como** cliente  
**Quiero** ver un resumen de mi carrito antes de pagar  
**Para** revisar lo que voy a comprar

**Criterios de Aceptación:**

```gherkin
Given que estoy en la página de carrito
When cargo la página
Then veo:
  - Cada producto en el carrito (collar + lista de charms)
  - Precio por unidad
  - Precio subtotal
  - Cálculo correcto de total
  - Botones para editar o eliminar items
  - Botón "Proceder al checkout"
```

**Dependencias:** Carrito con items persistidos  
**Riesgos:** Precios incorrectos | Mitigación: validar en backend  
**Notas QA:**

- Test carrito vacío (debe permitir navegar atrás)
- Test carrito con 1 item
- Test carrito con múltiples items
- Verificar sumas matemáticas
- Botones "Editar" y "Eliminar" funcionan

---

#### US-005: Crear Orden Simulada

**Como** cliente  
**Quiero** crear una orden sin pagar realmente  
**Para** simular el checkout

**Criterios de Aceptación:**

```gherkin
Given que estoy en el carrito
When hago click en "Proceder al checkout" → "Confirmar orden"
Then:
  - Se envía orden directamente a Supabase (tabla 'orders')
  - Se genera un número de orden único (UUID de Supabase)
  - Se muestra página de confirmación con:
    - Número de orden
    - Resumen del producto
    - Estimado de entrega (fake: "5–7 días hábiles")
  - El carrito se vacía
```

**Dependencias:** Cliente Supabase configurado, tabla 'orders' en Supabase PostgreSQL, usuario autenticado  
**Riesgos:** Orden duplicada si envío 2 veces | Mitigación: debounce + optimistic update  
**Notas QA:**

- Validar estructura de datos enviada
- Número de orden debe ser único
- Validar que datos llegan al backend correctamente
- No se crea orden si carrito está vacío

---

### 🟡 SHOULD (Features de Valor Agregado)

#### US-006: Autenticación de Usuarios (Login/Register)

**Como** cliente  
**Quiero** registrarme e iniciar sesión en la plataforma  
**Para** acceder a mi historial de órdenes y tener una experiencia personalizada

**Criterios de Aceptación:**

```gherkin
Given que soy un nuevo usuario
When accedo a la página de registro
Then puedo:
  - Ingresar mi nombre completo
  - Ingresar mi email
  - Crear una contraseña (mínimo 6 caracteres)
  - Confirmar mi contraseña
  - Registrarme exitosamente
  - Ser redirigido a la página de órdenes

Given que soy un usuario registrado
When accedo a la página de login
Then puedo:
  - Ingresar mi email y contraseña
  - Iniciar sesión exitosamente
  - Ver mensaje de bienvenida
  - Ser redirigido a la página de órdenes
```

**Dependencias:** Integración con Supabase para autenticación  
**Riesgos:** Credenciales incorrectas, errores de red | Mitigación: validación de formularios, manejo de errores con toasts  
**Notas QA:**

- Validar que el email tiene formato correcto
- Validar que la contraseña tiene mínimo 6 caracteres
- Validar que las contraseñas coinciden en registro
- Mostrar errores claros si el login/registro falla
- Verificar que después de login se redirige correctamente
- Test: registro con email duplicado (debe mostrar error)
- Test: login con credenciales incorrectas (debe mostrar error)
- Test: mostrar/ocultar contraseña funciona

---

#### US-007: Historial de Órdenes (Simulado)

**Como** cliente repetido  
**Quiero** ver mis órdenes anteriores  
**Para** repedir o ver configuraciones previas

**Criterios de Aceptación:**

```gherkin
Given que soy un cliente que ha hecho compras
When accedo a "Mi historial"
Then veo:
  - Lista de órdenes (simuladas de sesiones previas)
  - Fecha, número de orden, total
  - Opción "Repetir esta orden"
```

**Dependencias:** Cliente Supabase configurado, tabla 'orders' en Supabase PostgreSQL, usuario autenticado  
**Notas QA:** Baja prioridad, buscar en Etapa 3+

---

## 3. Tickets de Trabajo

### 📊 Resumen de Tickets

| ID     | Título                        | Tipo     | Historia       | Módulo/Impacto          | Estimación |
| ------ | ----------------------------- | -------- | -------------- | ----------------------- | ---------- |
| TK-001 | Setup base de datos           | Backend  | Infrastructure | Base de datos           | 2h         |
| TK-002 | GET /api/v1/products          | Backend  | US-001         | API Products            | 1.5h       |
| TK-003 | GET /api/v1/shapes            | Backend  | US-002         | API Shapes              | 1.5h       |
| TK-004 | Integración Supabase Orders   | Frontend | US-005         | CheckoutPage + Supabase | 3h         |
| TK-005 | Error Handling Global         | Backend  | Infrastructure | Middleware              | 2h         |
| TK-006 | Setup Zustand                 | Frontend | Infrastructure | State Management        | 1h         |
| TK-007 | Landing Page Component        | Frontend | US-001         | Pages/Index             | 2h         |
| TK-008 | Product Page (Charm Selector) | Frontend | US-002, US-003 | Pages/ProductPage       | 3h         |
| TK-009 | Cart Page                     | Frontend | US-004         | Pages/CartPage          | 2.5h       |
| TK-010 | Order Confirmation Page       | Frontend | US-005         | Pages/OrderConfirmation | 2h         |
| TK-011 | Responsive Design + Mobile    | Frontend | All            | UI/UX                   | 2h         |
| TK-012 | GitHub Actions Setup          | DevOps   | Infrastructure | CI/CD                   | 2h         |
| TK-013 | Deployment a Netlify          | DevOps   | Infrastructure | Deployment              | 1.5h       |

**Total:** 13 tickets (5 Backend + 6 Frontend + 2 DevOps)

### Estructura de Tickets

Cada ticket sigue este formato:

```
### TK-XXX: [Título]
**Tipo:** Backend | Frontend | DevOps
**Story:** US-00X
**Estimación:** 2–4 horas
**Dependencias:** Ninguna | TK-XXX

**Descripción:**
[Descripción técnica clara]

**Criterios de Done:**
- [ ] Código escrito y testeado
- [ ] Tests pasan (unit + integration si aplica)
- [ ] No warnings en linter
- [ ] Code review aprobado
- [ ] Documentado (comentarios si lógica compleja)

**Checklist QA:**
- [ ] Validación de inputs
- [ ] Manejo de errores
- [ ] No hay hardcoded values
- [ ] Responsive (si es UI)
- [ ] Performance acceptable
```

### Backend Tickets

#### TK-001: Setup base de datos (SQLite + Schema)

**Tipo:** Backend  
**Story:** Infrastructure  
**Módulo/Impacto:** Base de datos - Almacenamiento persistente  
**Estimación:** 2 horas

**Descripción:**

- Crear schema SQLite con tablas: products, charms, orders, order_items
- Script de init para popular datos mock
- Conexión en server/index.ts

**Criterios de Done:**

- [ ] Base de datos se inicializa sin errores
- [ ] Datos mock cargan correctamente
- [ ] Schema soporta todas las entidades del MVP

**Checklist QA:**

- [ ] Verificar integridad de datos (FK constraints)
- [ ] Datos mock son realistas
- [ ] No hay valores NULL inadecuados

---

#### TK-002: GET /api/v1/products (Listar productos)

**Tipo:** Backend  
**Story:** US-001  
**Módulo/Impacto:** API Products - Endpoint de productos  
**Estimación:** 1.5 horas

**Descripción:**

- Endpoint que retorna lista de productos (para MVP: 1 collar base)
- Incluye imagen, nombre, descripción, precio_base

**Criterios de Done:**

- [ ] Endpoint devuelve JSON válido
- [ ] Tests (unit + integration)
- [ ] Validación de headers (Accept: application/json)

**Checklist QA:**

- [ ] Status 200
- [ ] Estructura de response correcta
- [ ] Precios son positivos
- [ ] No hay productos duplicados

---

#### TK-003: GET /api/v1/shapes (Listar shapes disponibles)

**Tipo:** Backend  
**Story:** US-002  
**Módulo/Impacto:** API Shapes - Endpoint de shapes  
**Estimación:** 1.5 horas

**Descripción:**

- Endpoint que retorna lista de shapes disponibles
- Incluye ID, nombre, emoji, descripción

**Criterios de Done:**

- [ ] Endpoint devuelve JSON con array de shapes
- [ ] Tests (unit + integration)
- [ ] Datos validados (no valores nulos)

**Checklist QA:**

- [ ] Almenos 5 shapes en mock data

---

#### TK-004: Integración Supabase Orders (Crear orden)

**Tipo:** Frontend  
**Story:** US-005  
**Módulo/Impacto:** CheckoutPage + Supabase - Creación de órdenes  
**Estimación:** 3 horas

**Descripción:**

- Integrar cliente Supabase en CheckoutPage
- Crear orden directamente en Supabase (tabla 'orders')
- Validar datos del carrito antes de enviar
- Manejar errores de Supabase y mostrar feedback al usuario
- Guardar orden_id en localStorage para confirmación

**Criterios de Done:**

- [ ] Cliente Supabase configurado y funcionando
- [ ] Orden se crea en Supabase PostgreSQL
- [ ] ID de orden es único (UUID generado por Supabase)
- [ ] Validación de datos antes de enviar
- [ ] Manejo de errores implementado

**Checklist QA:**

- [ ] Validar que usuario está autenticado antes de crear orden
- [ ] Total de precio se calcula correctamente
- [ ] No se crea orden si carrito está vacío
- [ ] Error handling muestra mensajes claros al usuario
- [ ] Orden se guarda correctamente en Supabase

---

#### TK-005: Error Handling Global

**Tipo:** Backend  
**Story:** Infrastructure  
**Módulo/Impacto:** Middleware - Manejo global de errores  
**Estimación:** 2 horas

**Descripción:**

- Middleware global para errores (try/catch wrapper)
- Respuestas consistentes: { success, data, error }
- Logging básico (console.log → archivos después)

**Criterios de Done:**

- [ ] Todos los endpoints retornan formato consistente
- [ ] Status codes apropiados (400, 404, 500)
- [ ] Mensajes de error informativos pero seguros (no exponen stack traces)

**Checklist QA:**

- [ ] Error 400 por validación fallida
- [ ] Error 404 por recurso no encontrado
- [ ] Error 500 solo en excepciones no previstas
- [ ] No logs de secrets en consola

---

### Frontend Tickets

#### TK-006: Setup Zustand (State Management)

**Tipo:** Frontend  
**Story:** Infrastructure  
**Módulo/Impacto:** State Management - Gestión de estado global  
**Estimación:** 1 hora

**Descripción:**

- Crear store Zustand para carrito
- Actions: addItem, removeItem, clearCart, getTotal
- Persistencia en localStorage

**Criterios de Done:**

- [ ] Store funciona sin errores
- [ ] localStorage actualiza en tiempo real
- [ ] Tests para store actions

**Checklist QA:**

- [ ] Datos persisten al recargar
- [ ] No hay memory leaks

---

#### TK-007: Landing Page Component

**Tipo:** Frontend  
**Story:** US-001  
**Módulo/Impacto:** Pages/Index - Página principal  
**Estimación:** 2 horas

**Descripción:**

- Página de inicio con hero banner
- Mostrar producto base (collar)
- Call-to-action: "Ver detalles"
- Responsive mobile-first

**Criterios de Done:**

- [ ] Componentes renderean sin errores
- [ ] Responsive en mobile, tablet, desktop
- [ ] Accesibilidad (WCAG AA mínimo)

**Checklist QA:**

- [ ] Imagen carga correctamente
- [ ] No layout shift
- [ ] Mobile < 5s load time
- [ ] Título accesible (h1)

---

#### TK-008: Product Page (Charm Selector)

**Tipo:** Frontend  
**Story:** US-002, US-003  
**Módulo/Impacto:** Pages/ProductPage - Personalización de productos  
**Estimación:** 3 horas

**Descripción:**

- Página de producto con:
  - Imagen del collar
  - Selector de tamaño (S, M, L)
  - Selector de color del collar
  - Input para nombre de mascota
  - Selector de letras personalizadas (hasta 12 letras)
  - Selector de formas/charm shapes (GET /api/v1/shapes)
  - Selector de colores para letras (GET /api/v1/colors)
  - Cálculo de precio en tiempo real
  - Botón "Agregar al carrito"

**Criterios de Done:**

- [ ] Shapes y colors cargan desde API
- [ ] Selectores funcionan correctamente
- [ ] Precio calcula correctamente
- [ ] Item se agrega al carrito (localStorage)

**Checklist QA:**

- [ ] Seleccionar/deseleccionar charms
- [ ] Precio actualiza en tiempo real
- [ ] Botón "Agregar" deshabilitado si carrito está completo (opcional)
- [ ] Responsive

---

#### TK-009: Cart Page

**Tipo:** Frontend  
**Story:** US-004  
**Módulo/Impacto:** Pages/CartPage - Gestión de carrito  
**Estimación:** 2.5 horas

**Descripción:**

- Tabla o lista de items en carrito
- Precio por item + total
- Botones: "Eliminar", "Actualizar", "Vaciar"
- Botón "Proceder al checkout"
- Carrito vacío → fallback UI

**Criterios de Done:**

- [ ] Items renderean correctamente
- [ ] Precios calculan bien
- [ ] Botones funcionan
- [ ] Empty state manejado

**Checklist QA:**

- [ ] Carrito vacío muestra mensaje amigable
- [ ] Eliminar item funciona
- [ ] Total actualiza al eliminar
- [ ] Responsive

---

#### TK-010: Order Confirmation Page

**Tipo:** Frontend  
**Story:** US-005  
**Módulo/Impacto:** Pages/OrderConfirmation - Confirmación de orden  
**Estimación:** 2 horas

**Descripción:**

- Orden se crea en Supabase desde CheckoutPage
- Mostrar orden_id (UUID de Supabase), resumen, estimado de entrega
- Botón "Continuar comprando" → vuelve a home
- Manejo de errores (mostrar toast si falla creación en Supabase)

**Criterios de Done:**

- [ ] Orden se crea correctamente en Supabase
- [ ] Confirmación renderea con datos reales
- [ ] Carrito se vacía después
- [ ] Error handling funciona

**Checklist QA:**

- [ ] Validar que orden se guarda en Supabase
- [ ] orden_id se muestra correctamente
- [ ] Número de orden es único (UUID)
- [ ] Error toast si creación falla
- [ ] Botón "Continuar" navega a home

---

#### TK-011: Responsive Design + Mobile Testing

**Tipo:** Frontend  
**Story:** All  
**Módulo/Impacto:** UI/UX - Diseño responsive y mobile-first  
**Estimación:** 2 horas

**Descripción:**

- Verificar mobile-first design en todas las páginas
- Breakpoints: 320px, 768px, 1024px
- Imágenes optimizadas

**Criterios de Done:**

- [ ] Mobile (320px) se ve bien
- [ ] Tablet (768px) OK
- [ ] Desktop (1024px+) OK

**Checklist QA:**

- [ ] No overflow horizontal
- [ ] Botones clickeables (min 44x44px)
- [ ] Tipografía legible
- [ ] Imágenes escalan sin distorsión

---

### DevOps Tickets

#### TK-012: GitHub Actions Setup (Lint + Test + Build)

**Tipo:** DevOps  
**Story:** Infrastructure  
**Módulo/Impacto:** CI/CD - Pipeline de integración continua  
**Estimación:** 2 horas

**Descripción:**

- Workflow: PR abierto → lint → test → build
- Bloquear merge si falla
- Reporte de cobertura

**Criterios de Done:**

- [ ] Workflow ejecuta en cada PR
- [ ] Tests pasan antes de merge
- [ ] Build no falla

**Checklist QA:**

- [ ] Lint errors detectados
- [ ] Test failures bloqueados
- [ ] Build artifacts generados

---

#### TK-013: Deployment a Netlify o Vercel

**Tipo:** DevOps  
**Story:** Infrastructure  
**Módulo/Impacto:** Deployment - Despliegue en producción  
**Estimación:** 1.5 horas

**Descripción:**

- Conectar repo a Netlify/Vercel
- Auto-deploy en main
- Preview deploys en PRs
- Env vars manejadas por MCP

**Criterios de Done:**

- [ ] Main se deploya automáticamente
- [ ] PRs tienen preview URLs
- [ ] No secrets en repo

**Checklist QA:**

- [ ] Sitio live en producción
- [ ] Preview URL funciona
- [ ] Performance acceptable

---

## 4. Arquitectura del Sistema

### 📐 Diagrama de Arquitectura (Mermaid)

#### **Arquitectura en Desarrollo**

```mermaid
graph TB
    Client["🖥️ Client<br/>(React 18 + Vite + TanStack Query)<br/>- Index Page<br/>- ProductPage<br/>- CartPage<br/>- CheckoutPage<br/>- OrderConfirmation<br/>- OrdersPage<br/>- LoginPage<br/>- RegisterPage"]

    ViteDev["⚡ Vite Dev Server<br/>(Puerto 8080)<br/>- Hot Module Replacement<br/>- Express Middleware Plugin"]

    API["🔌 Express API<br/>(Integrado con Vite)<br/>- Routes Handlers<br/>- Zod Validation<br/>- Error Handling<br/>- CORS"]

    Routes["📡 API Routes<br/>- /api/v1/products<br/>- /api/v1/shapes<br/>- /api/v1/colors"]

    Supabase["🔐 Supabase<br/>- Authentication<br/>- PostgreSQL Database<br/>- Orders Storage"]

    StaticData["📦 Static Data<br/>(Hardcoded en Routes)<br/>- Products<br/>- Shapes<br/>- Colors"]

    Client -->|HTTP Requests| ViteDev
    ViteDev -->|Express Middleware| API
    API -->|Route Handlers| Routes
    Routes -->|Read| StaticData
    Client -->|Auth & Orders| Supabase

    style Client fill:#e1f5ff
    style ViteDev fill:#fff3e0
    style API fill:#f3e5f5
    style Routes fill:#e8f5e9
    style Supabase fill:#e0f2f1
    style StaticData fill:#f1f8e9
```

#### **Arquitectura en Producción (Netlify)**

```mermaid
graph TB
    User["👤 Usuario<br/>Navegador Web"]

    NetlifyCDN["🌐 Netlify CDN<br/>- SPA Hosting<br/>- Static Assets<br/>- Edge Network"]

    SPA["📱 Single Page App<br/>(React Build)<br/>dist/spa/<br/>- Index.html<br/>- Assets JS/CSS"]

    NetlifyFunctions["⚡ Netlify Functions<br/>Serverless API<br/>netlify/functions/api.ts<br/>- Express wrapped<br/>- serverless-http"]

    ExpressAPI["🔌 Express API<br/>(Mismo código que dev)<br/>- Routes Handlers<br/>- Zod Validation<br/>- CORS"]

    Routes["📡 API Routes<br/>- /api/v1/products<br/>- /api/v1/shapes<br/>- /api/v1/colors"]

    Supabase["🔐 Supabase<br/>- Authentication<br/>- PostgreSQL Database<br/>- Orders Storage"]

    StaticData["📦 Static Data<br/>(Hardcoded)<br/>- Products<br/>- Shapes<br/>- Colors"]

    User -->|HTTPS| NetlifyCDN
    NetlifyCDN -->|Serves| SPA
    SPA -->|API Calls| NetlifyFunctions
    NetlifyFunctions -->|Wraps| ExpressAPI
    ExpressAPI -->|Route Handlers| Routes
    Routes -->|Read| StaticData
    SPA -->|Auth & Orders| Supabase

    style User fill:#e3f2fd
    style NetlifyCDN fill:#fff3e0
    style SPA fill:#e1f5ff
    style NetlifyFunctions fill:#f3e5f5
    style ExpressAPI fill:#e8f5e9
    style Routes fill:#e8f5e9
    style Supabase fill:#e0f2f1
    style StaticData fill:#f1f8e9
```

### 🏗️ Explicación para Principiantes

**¿Qué hace cada componente?**

#### **En Desarrollo:**

1. **Client (React + Vite):** La interfaz de usuario. Usa React Router para navegación, TanStack Query para manejo de estado del servidor, y shadcn/ui para componentes.

2. **Vite Dev Server:** Servidor de desarrollo que integra Express como middleware mediante un plugin personalizado. Todo corre en el puerto 8080 durante desarrollo. El plugin `expressPlugin()` en `vite.config.ts` añade Express como middleware al servidor de Vite.

3. **Express API:** Backend integrado que maneja las rutas API. Valida requests con Zod y retorna respuestas consistentes. El mismo código se usa tanto en desarrollo como en producción.

4. **Routes Handlers:** Funciones que procesan cada endpoint específico (products, shapes, colors). Ubicadas en `server/routes/`.

5. **Static Data:** Productos, shapes y colores están hardcodeados en los archivos de rutas (`server/routes/products.ts` y `server/routes/shapes.ts`). Fácil de cambiar sin base de datos.

6. **Supabase:** Servicio externo para autenticación de usuarios (registro, login) y almacenamiento de órdenes en PostgreSQL. Las órdenes se guardan directamente en Supabase desde el frontend.

#### **En Producción (Netlify):**

1. **Netlify CDN:** Sirve los archivos estáticos del frontend (SPA) desde `dist/spa/`. Incluye edge network para mejor performance global.

2. **Netlify Functions:** Wrapper serverless que ejecuta Express API usando `serverless-http`. El archivo `netlify/functions/api.ts` importa y envuelve el mismo servidor Express usado en desarrollo.

3. **Express API:** El mismo código Express corre en Netlify Functions, garantizando consistencia entre desarrollo y producción.

4. **Supabase:** Mismo servicio que en desarrollo, ahora con variables de entorno configuradas en Netlify Dashboard.

**Ventajas de esta arquitectura:**

- ✅ Mismo código para desarrollo y producción (menos bugs)
- ✅ Serverless = escalabilidad automática sin gestión de servidores
- ✅ Netlify CDN = performance global excelente
- ✅ Hot reload en desarrollo con Vite
- ✅ Type-safe con TypeScript end-to-end

### 📁 Estructura de Carpetas Real (Implementada)

```
petcharms/
├── client/                          # Frontend React
│   ├── pages/                      # Páginas/rutas de la aplicación
│   │   ├── Index.tsx               # Landing page con productos y shapes
│   │   ├── ProductPage.tsx         # Personalización completa (tamaño, color, letras, formas)
│   │   ├── CartPage.tsx            # Resumen y gestión del carrito
│   │   ├── CheckoutPage.tsx        # Formulario de checkout
│   │   ├── OrderConfirmation.tsx   # Confirmación de orden
│   │   ├── OrdersPage.tsx          # Historial de órdenes del usuario
│   │   ├── LoginPage.tsx           # Inicio de sesión (Supabase)
│   │   ├── RegisterPage.tsx        # Registro de usuarios (Supabase)
│   │   └── NotFound.tsx            # Página 404
│   ├── components/                 # Componentes React reutilizables
│   │   ├── Header.tsx              # Navegación principal con links y auth
│   │   └── ui/                     # Componentes shadcn/ui (49 archivos)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── input.tsx
│   │       ├── toast.tsx
│   │       ├── dialog.tsx
│   │       ├── select.tsx
│   │       └── ... (más de 40 componentes)
│   ├── hooks/                      # Custom React hooks
│   │   ├── use-mobile.tsx          # Hook para detectar dispositivos móviles
│   │   └── use-toast.ts            # Hook para sistema de toasts
│   ├── lib/                        # Utilidades y configuraciones
│   │   ├── supabase.ts             # Cliente Supabase configurado
│   │   ├── utils.ts                # Utilidades (cn helper, etc.)
│   │   └── utils.spec.ts           # Tests de utilidades
│   ├── App.tsx                     # Router principal + TanStack Query Provider
│   ├── global.css                  # Estilos globales + TailwindCSS
│   └── vite-env.d.ts               # Tipos de Vite
│
├── server/                         # Backend Express
│   ├── routes/                     # Handlers de API endpoints
│   │   ├── products.ts             # GET /api/v1/products
│   │   └── shapes.ts               # GET /api/v1/shapes, GET /api/v1/colors
│   ├── index.ts                    # Configuración Express (createServer)
│   └── node-build.ts               # Entry point para build del servidor
│
├── shared/                         # Código compartido entre client y server
│   └── api.ts                     # Tipos TypeScript compartidos
│
├── netlify/                        # Configuración Netlify Functions
│   ├── functions/
│   │   └── api.ts                  # Wrapper serverless-http para Express
│   └── plugins.json                # Plugins de Netlify
│
├── public/                         # Archivos estáticos públicos
│   ├── favicon.ico
│   ├── necklace.jpg                # Imagen del producto
│   ├── woman-with-dog.jpg          # Imagen hero
│   ├── placeholder.svg
│   └── robots.txt
│
├── dist/                           # Build output (generado)
│   ├── spa/                        # Frontend build (Netlify deploy)
│   │   ├── index.html
│   │   ├── assets/                 # JS y CSS bundles
│   │   └── [archivos públicos]
│   └── server/                     # Server build (no usado en Netlify)
│       └── node-build.mjs
│
├── index.html                      # Entry point HTML para Vite
├── vite.config.ts                  # Configuración Vite (dev + build client)
├── vite.config.server.ts           # Configuración Vite para build del servidor
├── netlify.toml                    # Configuración Netlify (build, redirects)
├── tailwind.config.ts              # Configuración TailwindCSS
├── postcss.config.js                # Configuración PostCSS
├── tsconfig.json                   # Configuración TypeScript
├── components.json                 # Configuración shadcn/ui
├── package.json                    # Dependencias y scripts
├── pnpm-lock.yaml                  # Lock file de pnpm
└── README.md                       # Este archivo
```

**Notas importantes sobre la estructura:**

- **`client/`**: Todo el código frontend React. Los componentes UI están en `components/ui/` (shadcn/ui).
- **`server/`**: Backend Express que se ejecuta tanto en desarrollo (como middleware de Vite) como en producción (Netlify Functions).
- **`netlify/functions/`**: Wrapper que permite ejecutar Express en Netlify Functions usando `serverless-http`.
- **`shared/`**: Tipos TypeScript compartidos entre frontend y backend para mantener consistencia.
- **`dist/`**: Generado automáticamente al hacer build. `dist/spa/` se despliega en Netlify.
- **`public/`**: Archivos estáticos copiados directamente al build final.

### 🔄 Flujo de Datos (Ejemplo: Crear Orden)

#### **En Desarrollo:**

```
[Usuario hace click en "Confirmar orden"]
         ↓
[CheckoutPage.tsx valida datos del carrito]
         ↓
[Verifica que usuario está autenticado (Supabase Auth)]
         ↓
[Cliente Supabase inserta orden directamente en tabla 'orders']
         ↓
[Supabase PostgreSQL inserta orden con UUID único]
         ↓
[Supabase retorna orden creada con id + timestamp]
         ↓
[CheckoutPage guarda order_id en localStorage]
         ↓
[React navega a OrderConfirmation y renderiza con datos]
```

#### **En Producción (Netlify):**

```
[Usuario hace click en "Confirmar orden"]
         ↓
[CheckoutPage.tsx valida datos del carrito]
         ↓
[Verifica que usuario está autenticado (Supabase Auth)]
         ↓
[Cliente Supabase inserta orden directamente en tabla 'orders']
         ↓
[Supabase PostgreSQL inserta orden con UUID único]
         ↓
[Supabase retorna orden creada con id + timestamp]
         ↓
[CheckoutPage guarda order_id en localStorage]
         ↓
[React navega a OrderConfirmation y renderiza con datos]
```

**Nota importante:** Las órdenes NO pasan por el backend Express. Se crean directamente desde el frontend hacia Supabase usando el cliente de Supabase. El backend Express solo maneja productos, shapes y colors.

**Nota importante:** Las órdenes se crean directamente desde el frontend hacia Supabase, no pasan por el backend Express. El backend Express solo maneja productos, shapes y colors.

### 📚 Stack Tecnológico Implementado (2024–2025)

| Componente                    | Tecnología           | Versión | Justificación                                        |
| ----------------------------- | -------------------- | ------- | ---------------------------------------------------- |
| **Frontend Framework**        | React                | 18.3.1  | Estándar de industria, amplia comunidad              |
| **Build Tool**                | Vite                 | 7.1.2   | Build rápido, HMR excelente, mejor que Webpack/CRA   |
| **Routing**                   | React Router         | 6.30.1  | Routing declarativo, estándar para React             |
| **State Management (Server)** | TanStack Query       | 5.84.2  | Manejo automático de cache, refetch, loading states  |
| **UI Components**             | shadcn/ui + Radix UI | Latest  | Componentes accesibles, personalizables, modernos    |
| **Styling**                   | TailwindCSS          | 3.4.17  | Utility-first, responsive, productivo                |
| **Backend**                   | Express              | 5.1.0   | Integrado con Vite, simple y efectivo                |
| **Validación**                | Zod                  | 3.25.76 | Type-safe, validación robusta, mensajes claros       |
| **Autenticación**             | Supabase             | 2.45.0  | Autenticación lista para usar, sin backend propio    |
| **Testing**                   | Vitest               | 3.2.4   | Rápido, compatible con Vite, alternativa a Jest      |
| **TypeScript**                | TypeScript           | 5.9.2   | Type safety, mejor DX, detección temprana de errores |
| **Package Manager**           | pnpm                 | 10.14.0 | Más rápido que npm, mejor manejo de dependencias     |

---

## 5. Modelo de Datos

### 📊 Diagrama ERD (Mermaid)

```mermaid
erDiagram
    USERS ||--o{ ORDERS : "creates"
    PRODUCTS ||--o{ ORDERS : "references"

    USERS {
        string id PK "UUID from Supabase Auth"
        string email "user email"
        string full_name "user full name"
        timestamp created_at
        timestamp updated_at
    }

    PRODUCTS {
        string id PK "UUID"
        string name "collar base name"
        text description "product description"
        decimal price "price in USD"
        string image_url "CDN image path"
        timestamp created_at
        timestamp updated_at
    }

    ORDERS {
        string id PK "UUID generated by Supabase"
        string user_id FK "reference to USERS"
        string product_id "reference to PRODUCTS"
        string size "S | M | L"
        string collar_color "color ID del collar"
        string pet_name "nombre de la mascota"
        jsonb customizations "letters y shapes"
        decimal total_price "final price"
        string status "pending | completed"
        timestamp created_at
        timestamp updated_at
    }

    CUSTOMIZATIONS {
        array letters "array de letras personalizadas"
        array shapes "array de formas seleccionadas"
    }

    LETTER {
        string letter "letra individual"
        string colorId "ID del color de la letra"
    }

    SHAPE {
        string shapeId "ID de la forma seleccionada"
    }
```

**Nota:** PRODUCTS, SHAPES y COLORS están hardcodeados en el código del backend (`server/routes/`), no existen como tablas en la base de datos. Solo ORDERS y USERS están almacenados en Supabase PostgreSQL.

### 📋 Definición de Entidades

#### **PRODUCTS** (Collar Base) - Hardcoded

**Estado:** Los productos están hardcodeados en `server/routes/products.ts`, no existe como tabla en la base de datos.

```typescript
// Estructura en código (server/routes/products.ts)
interface Product {
  id: string; // UUID
  name: string; // "Pet Charm Collar"
  description: string;
  price: number; // 15.0 USD
  image_url: string; // "/necklace.jpg"
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}
```

**Campos:**

- `id`: Identificador único (UUID v4)
- `name`: Nombre del collar ("Pet Charm Collar")
- `description`: Descripción del producto
- `price`: Precio base en USD (fijo: $15.00)
- `image_url`: Ruta a la imagen en `/public/`
- `created_at`, `updated_at`: Timestamps ISO

**Nota:** Actualmente solo hay 1 producto hardcodeado. Para agregar más productos, editar `server/routes/products.ts`.

---

#### **SHAPES** (Formas/Charm Shapes) - Hardcoded

**Estado:** Las formas están hardcodeadas en `server/routes/shapes.ts`, no existen como tabla en la base de datos.

```typescript
// Estructura en código (server/routes/shapes.ts)
interface Shape {
  id: string; // "shape-unicorn", "shape-dog-face", etc.
  name: string; // "Unicornio", "Carita de perrito", etc.
  emoji: string; // "🦄", "🐶", etc.
  description: string; // Descripción corta
}
```

**Campos:**

- `id`: Identificador único (string, no UUID)
- `name`: Nombre de la forma en español
- `emoji`: Emoji representativo
- `description`: Descripción corta

**Nota:** Actualmente hay más de 30 formas disponibles (37 formas). Para agregar más, editar `server/routes/shapes.ts`.

---

#### **COLORS** (Colores para Letras) - Hardcoded

**Estado:** Los colores están hardcodeados en `server/routes/shapes.ts`, no existen como tabla en la base de datos.

```typescript
// Estructura en código (server/routes/shapes.ts)
interface Color {
  id: string; // "color-orange", "color-green", etc.
  name: string; // "Orange", "Green", etc.
  hex: string; // "#FF6B35", "#00B359", etc.
  rgb: string; // "255, 107, 53", "0, 179, 89", etc.
}
```

**Campos:**

- `id`: Identificador único (string)
- `name`: Nombre del color en inglés
- `hex`: Código hexadecimal del color
- `rgb`: Valores RGB separados por comas

**Nota:** Actualmente hay 10 colores disponibles. Para agregar más, editar `server/routes/shapes.ts`.

---

#### **USERS** (Usuarios) - Supabase PostgreSQL

**Estado:** Tabla en Supabase PostgreSQL, gestionada por Supabase Auth.

```sql
-- Tabla generada automáticamente por Supabase Auth
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Campos:**

- `id`: UUID del usuario (referencia a `auth.users`)
- `email`: Email único del usuario
- `full_name`: Nombre completo del usuario
- `created_at`, `updated_at`: Timestamps automáticos

**Nota:** La autenticación se maneja completamente por Supabase Auth. Los usuarios se crean automáticamente al registrarse.

---

#### **ORDERS** (Órdenes) - Supabase PostgreSQL

**Estado:** Tabla en Supabase PostgreSQL, creada y gestionada desde el frontend.

```sql
-- Tabla en Supabase PostgreSQL
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  product_id TEXT NOT NULL,
  size TEXT NOT NULL CHECK (size IN ('S', 'M', 'L')),
  collar_color TEXT NOT NULL,
  pet_name TEXT NOT NULL,
  customizations JSONB NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Estructura TypeScript:**

```typescript
interface Order {
  id: string; // UUID generado por Supabase
  user_id: string; // UUID del usuario (FK a users)
  product_id: string; // ID del producto (referencia al producto hardcodeado)
  size: "S" | "M" | "L"; // Tamaño del collar
  collar_color: string; // ID del color del collar (ej: "collar-red")
  pet_name: string; // Nombre de la mascota
  customizations: {
    letters: Array<{
      letter: string; // Letra individual (máximo 12 letras)
      colorId: string; // ID del color de la letra (ej: "color-orange")
    }>;
    shapes: Array<{
      shapeId: string; // ID de la forma seleccionada (ej: "shape-unicorn")
    }>; // Máximo 9 formas
  };
  total_price: number; // Precio total calculado
  status: "pending" | "completed" | "cancelled"; // Estado de la orden
  created_at: string; // ISO timestamp generado por Supabase
  updated_at: string; // ISO timestamp generado por Supabase
}
```

**Campos:**

- `id`: UUID único generado automáticamente por Supabase
- `user_id`: Referencia al usuario que creó la orden (FK a `users`)
- `product_id`: ID del producto (referencia al producto hardcodeado)
- `size`: Tamaño del collar ("S", "M" o "L")
- `collar_color`: ID del color seleccionado para el collar (13 opciones disponibles)
- `pet_name`: Nombre de la mascota ingresado por el usuario
- `customizations`: Objeto JSONB con:
  - `letters`: Array de letras personalizadas (máximo 12 letras)
  - `shapes`: Array de formas/charm shapes seleccionadas (máximo 9 formas)
- `total_price`: Precio total calculado (precio base fijo: $15.00)
- `status`: Estado de la orden (por defecto "pending")
- `created_at`, `updated_at`: Timestamps automáticos generados por Supabase

**Lógica:**

- Una orden = 1 collar base + personalización (tamaño, color, nombre) + letras + formas
- Precio total = precio_base_collar (fijo: $15.00)
- Las órdenes se almacenan en Supabase PostgreSQL y persisten permanentemente
- Row Level Security (RLS) en Supabase asegura que los usuarios solo vean sus propias órdenes

---

### 🔗 Relaciones

| Relación           | Cardinalidad | Descripción                                  |
| ------------------ | ------------ | -------------------------------------------- |
| USERS ↔ ORDERS    | 1 a N        | Un usuario puede tener múltiples órdenes     |
| PRODUCTS ↔ ORDERS | 1 a N        | Un producto puede estar en múltiples órdenes |

**Nota:** PRODUCTS, SHAPES y COLORS no tienen relaciones de base de datos porque están hardcodeados en el código. Solo se referencian por ID en las órdenes.

### 📌 Restricciones y Validaciones

| Entidad  | Restricción                      | Validación                                          |
| -------- | -------------------------------- | --------------------------------------------------- |
| PRODUCTS | Precio ≥ 0                       | Hardcoded en código (precio fijo: $15.00)           |
| ORDERS   | Total ≥ 0, Size válido           | Validación en frontend antes de insertar            |
| ORDERS   | Status válido                    | CHECK constraint en Supabase                        |
| ORDERS   | Customizations estructura válida | Validación en frontend (máximo 12 letras, 9 formas) |

### 💡 Explicación No Técnica

Imagina que tienes una **tienda de collares personalizados:**

- **PRODUCTS** = El collar base disponible (hardcodeado en código, solo 1 producto)
- **SHAPES** = Las formas/charm shapes que puedes agregar (hardcodeadas, más de 30 opciones)
- **COLORS** = Los colores para personalizar letras (hardcodeados, 10 opciones)
- **USERS** = Los usuarios registrados (en Supabase)
- **ORDERS** = Cada orden personalizada que crea un usuario (en Supabase)

Cuando un cliente compra:

1. Elige el collar base (PRODUCTS - solo hay 1 opción)
2. Personaliza tamaño, color del collar, nombre de mascota
3. Selecciona letras personalizadas (hasta 12) con colores
4. Selecciona formas/charm shapes (hasta 9)
5. Crea una ORDEN que se guarda en Supabase con toda la personalización

---

## 6. Diseño de API REST

### ��� Base URL

Base URL para todos los endpoints: `http://localhost:8080/api/v1`

### 📌 Convenciones

- **Métodos HTTP:** GET (leer), POST (crear), PUT/PATCH (actualizar), DELETE (borrar)
- **Status codes:**
  - `200 OK` - Success
  - `400 Bad Request` - Validación falló
  - `404 Not Found` - Recurso no existe
  - `500 Internal Server Error` - Error del servidor
- **Formato de respuesta:** Todas las respuestas siguen el formato estándar con campos `success`, `data` y `error`

### 📚 Endpoints del MVP (Implementados)

**Nota importante:** Las órdenes se manejan directamente a través de Supabase desde el frontend. No hay endpoints de backend para órdenes. Ver sección [Gestión de Órdenes](#gestión-de-órdenes-vía-supabase) más abajo.

---

#### **1. GET /api/v1/products**

Obtener lista de productos (collar base).

**Descripción:**

- Retorna un array con los productos disponibles (actualmente 1 producto: "Pet Charm Collar")
- Cada producto incluye: id (UUID), name, description, price, image_url, created_at, updated_at
- No requiere parámetros ni autenticación
- Datos hardcodeados en `server/routes/products.ts`

**Ejemplo de Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Pet Charm Collar",
      "description": "Personalize your pet's collar with custom letters and charm shapes...",
      "price": 15.0,
      "image_url": "/necklace.jpg",
      "created_at": "2025-01-01T00:00:00.000Z",
      "updated_at": "2025-01-01T00:00:00.000Z"
    }
  ],
  "error": null
}
```

**Notas QA:**

- Verificar que `id` es UUID válido
- `price` debe ser positivo
- `image_url` debe ser URL válida
- Status 200 siempre

---

#### **2. GET /api/v1/shapes**

Obtener lista de formas/charm shapes disponibles.

**Descripción:**

- Retorna un array con más de 30 formas disponibles para personalización
- Cada forma incluye: id (string), name, emoji, description
- Formas incluyen: animales (unicornio, perro, gato, conejo, etc.), corazones, estrellas, flores, objetos mágicos, etc.
- No requiere parámetros ni autenticación
- Datos hardcodeados en `server/routes/shapes.ts`

**Ejemplo de Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "shape-unicorn",
      "name": "Unicornio",
      "emoji": "🦄",
      "description": "Magical unicorn charm"
    },
    {
      "id": "shape-dog-face",
      "name": "Carita de perrito",
      "emoji": "🐶",
      "description": "Dog face charm"
    }
    // ... más de 30 formas
  ],
  "error": null
}
```

**Notas QA:**

- Más de 30 formas disponibles (actualmente 37 formas)
- Cada forma tiene ID único, nombre, emoji y descripción
- Formas incluyen: animales, corazones, estrellas, flores, objetos mágicos, etc.

---

#### **3. GET /api/v1/colors**

Obtener lista de colores disponibles para letras personalizadas.

**Descripción:**

- Retorna un array con 10 colores disponibles para personalizar letras
- Cada color incluye: id (string), name, hex (código hexadecimal), rgb (valores RGB)
- Colores disponibles: Orange, Green, Pink, Blue, Yellow, Purple, Red, Lime, Cyan, Black
- No requiere parámetros ni autenticación
- Datos hardcodeados en `server/routes/shapes.ts`

**Ejemplo de Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "color-orange",
      "name": "Orange",
      "hex": "#FF6B35",
      "rgb": "255, 107, 53"
    },
    {
      "id": "color-green",
      "name": "Green",
      "hex": "#00B359",
      "rgb": "0, 179, 89"
    }
    // ... 10 colores totales
  ],
  "error": null
}
```

**Notas QA:**

- 10 colores disponibles
- Cada color tiene ID único, nombre, hex y rgb
- Colores usados para personalizar letras en el collar

---

#### **4. GET /api/ping**

Endpoint de prueba para verificar que el servidor está funcionando.

**Descripción:**

- Retorna un mensaje de ping simple
- Útil para health checks y debugging
- No requiere parámetros ni autenticación

**Ejemplo de Response:**

```json
{
  "message": "ping"
}
```

O si está configurado `PING_MESSAGE` en variables de entorno:

```json
{
  "message": "custom ping message"
}
```

---

### 📦 Gestión de Órdenes vía Supabase

**Importante:** Las órdenes NO se manejan a través de endpoints de backend. Se gestionan directamente desde el frontend usando el cliente de Supabase.

#### **Crear Orden**

Las órdenes se crean directamente en Supabase desde `CheckoutPage.tsx`:

```typescript
// Código en client/pages/CheckoutPage.tsx
const { data: orderData, error } = await supabase
  .from("orders")
  .insert([
    {
      user_id: userId,
      product_id: cart[0]?.product_id || "",
      size: cart[0]?.size || "M",
      collar_color: cart[0]?.collarColor || "collar-red",
      pet_name: cart[0]?.petName || "Custom",
      customizations: cart[0]?.customizations || {
        letters: [],
        shapes: [],
      },
      total_price: totalPrice,
      status: "pending",
    },
  ])
  .select()
  .single();
```

**Campos de la Orden:**

- `user_id`: ID del usuario autenticado (UUID de Supabase Auth)
- `product_id`: ID del producto (collar base)
- `size`: Tamaño del collar ("S", "M" o "L")
- `collar_color`: ID del color del collar seleccionado
- `pet_name`: Nombre de la mascota
- `customizations.letters`: Array de objetos con `letter` y `colorId`
- `customizations.shapes`: Array de objetos con `shapeId`
- `total_price`: Precio total calculado
- `status`: Estado de la orden ("pending", "completed", etc.)

#### **Obtener Órdenes del Usuario**

Las órdenes se obtienen desde Supabase en `OrdersPage.tsx`:

```typescript
// Código en client/pages/OrdersPage.tsx
const { data: ordersData, error } = await supabase
  .from("orders")
  .select("*")
  .eq("user_id", authData.session.user.id)
  .order("created_at", { ascending: false });
```

**Características:**

- Solo retorna órdenes del usuario autenticado (filtrado por `user_id`)
- Ordenadas por fecha de creación (más recientes primero)
- Requiere autenticación (usuario debe estar logueado)
- Row Level Security (RLS) en Supabase protege los datos

**Ventajas de este enfoque:**

- ✅ No necesita endpoints de backend adicionales
- ✅ Seguridad a nivel de base de datos (RLS)
- ✅ Escalabilidad automática con Supabase
- ✅ Real-time capabilities disponibles (no usado en MVP)
- ✅ Type-safe con TypeScript

---

---

## 7. Diseño Frontend

### 📁 Estructura de Carpetas (Implementada)

```
client/
├── pages/
│   ├── Index.tsx                    # Landing page con productos y shapes
│   ├── ProductPage.tsx              # Personalización completa (tamaño, color, letras, formas)
│   ├── CartPage.tsx                 # Resumen y gestión del carrito
│   ├── CheckoutPage.tsx             # Página de checkout
│   ├── OrderConfirmation.tsx        # Confirmación de orden
│   ├── OrdersPage.tsx               # Historial de órdenes
│   ├── LoginPage.tsx                # Inicio de sesión (Supabase)
│   ├── RegisterPage.tsx              # Registro de usuarios (Supabase)
│   └── NotFound.tsx                 # 404
├── components/
│   ├── Header.tsx                   # Navegación principal
│   └── ui/                          # Componentes shadcn/ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── input.tsx
│       ├── toast.tsx
│       └── ... (más de 40 componentes)
├── hooks/
│   ├── use-mobile.tsx               # Hook para detectar mobile
│   └── use-toast.ts                 # Hook para toasts
├── lib/
│   ├── supabase.ts                  # Cliente Supabase para auth
│   └── utils.ts                     # Utilidades (cn, etc.)
├── App.tsx                          # Router + TanStack Query provider
└── global.css                       # TailwindCSS + estilos globales
```

### 🎨 Tecnologías Frontend Implementadas

- **React Router:** Navegación entre páginas
- **TanStack Query:** Manejo de estado del servidor, cache, refetch automático
- **shadcn/ui:** Componentes UI accesibles y personalizables (basados en Radix UI)
- **TailwindCSS:** Estilos utility-first, diseño responsive
- **Lucide React:** Iconos modernos
- **React Hook Form:** Manejo de formularios (si se usa)
- **Sonner:** Sistema de toasts/notificaciones

### 🎨 Componentes Implementados

#### **Páginas Principales**

- **Index.tsx:** Landing page que muestra el producto base y galería de shapes disponibles
- **ProductPage.tsx:** Página de personalización con selección de tamaño, color de collar, nombre de mascota, letras y formas
- **CartPage.tsx:** Resumen del carrito con opciones de editar y eliminar items
- **CheckoutPage.tsx:** Formulario de checkout con validación y envío de orden a Supabase
- **OrderConfirmation.tsx:** Confirmación de orden con número único y resumen
- **OrdersPage.tsx:** Historial de órdenes del usuario autenticado
- **LoginPage.tsx:** Página de inicio de sesión con Supabase
- **RegisterPage.tsx:** Página de registro de nuevos usuarios

#### **Componentes Reutilizables**

- **Header.tsx:** Navegación principal con links y estado de autenticación
- **Componentes shadcn/ui:** Más de 40 componentes UI accesibles (Button, Card, Checkbox, Input, Toast, Dialog, Select, etc.)

### 🪝 Hooks y State Management Implementados

#### **TanStack Query para Server State**

El proyecto usa TanStack Query (anteriormente React Query) para manejar el estado del servidor. Proporciona:

- Cache automático de datos
- Refetch automático en background
- Estados de loading y error manejados automáticamente
- Optimistic updates para mejor UX
- Uso en páginas para fetch de productos, charms, shapes, colors y órdenes

#### **Estado Local para Carrito**

El carrito se maneja con estado local de React (useState) en cada página que lo necesita. Los datos se persisten en localStorage para mantener el carrito entre sesiones. No se implementó Zustand como estaba planificado.

#### **Supabase para Autenticación y Base de Datos**

- **Autenticación:** Login y registro de usuarios mediante `supabase.auth.signInWithPassword()` y `supabase.auth.signUp()`
- **Base de Datos:** Almacenamiento de órdenes en tabla `orders` de Supabase PostgreSQL
- **Gestión de sesión:** Verificación de usuario autenticado y manejo de estado de auth en Header
- **Integración:** Cliente configurado en `client/lib/supabase.ts` con URL y API key

### 📦 Componentes UI (shadcn/ui)

El proyecto usa shadcn/ui, una colección de componentes reutilizables construidos con Radix UI y TailwindCSS:

- **Accesibles:** Todos los componentes siguen WAI-ARIA guidelines
- **Personalizables:** Fácil de modificar estilos y comportamiento
- **Type-safe:** TypeScript completo
- **Componentes disponibles:** Button, Card, Checkbox, Input, Toast, Dialog, Select, y más de 40 componentes

### 📱 Mobile-First Approach

```css
/* En TailwindCSS, mobile-first significa: */
/* 1. Base styles = mobile */
/* 2. Breakpoints md: (768px+), lg: (1024px+) */

.container {
  /* Mobile */
  padding: 1rem;
  font-size: 1rem;
}

/* Tablet+ */
@media (min-width: 768px) {
  .container {
    max-width: 700px;
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
  }
}
```

### ♿ Accesibilidad Checklist

- [ ] Todos los inputs tienen labels asociados
- [ ] Botones tienen text o aria-label
- [ ] Colores tienen suficiente contraste (WCAG AA)
- [ ] Formularios son navegables por teclado
- [ ] Imágenes tienen alt text
- [ ] Títulos (h1, h2, h3) en orden jerárquico
- [ ] Focus indicators visibles
- [ ] Modales tienen proper focus management

---

## 8. Plan de Testing

### 🏛️ Pirámide de Testing (2024–2025 Best Practice)

```
        /\
       /  \  E2E (Playwright) - 10%
      /____\  "User journey": landing → product → cart → order

     /      \
    / Integ. \ Integration Tests - 30%
   /  Tests   \ "API contracts": endpoint call + response validation
  /____________\

 /              \
/ Unit Tests    \ Unit Tests - 60%
/  (Vitest)      \ "Individual functions": calculatePrice(), validateOrder()
/__________________\
```

### 📝 Qué va en Cada Nivel

#### **Unit Tests (60%)**

Testean funciones aisladas sin dependencias externas.

**Qué testear:**

- Funciones de utilidad (cálculo de precios, validaciones, formateo)
- Lógica de negocio pura (sin llamadas a API o base de datos)
- Componentes React aislados (con mocks de props)
- Validaciones de esquemas Zod
- Funciones de transformación de datos

**Ejemplos de casos:**

- Calcular precio total correctamente (producto + charms)
- Manejar casos edge (charms vacíos, precios negativos)
- Validar formato de UUIDs
- Formatear fechas y monedas

#### **Integration Tests (30%)**

Testean múltiples componentes trabajando juntos (sin UI).

**Qué testear:**

- Endpoints API completos (request → validación → respuesta)
- Integración entre rutas Express y handlers
- Validación de esquemas Zod en requests reales
- Manejo de errores en endpoints
- Respuestas con formato correcto

**Ejemplos de casos:**

- Crear orden con datos válidos retorna 200 y orden creada
- Rechazar orden con IDs inválidos retorna 400
- Validar que todos los campos requeridos están presentes
- Verificar formato de respuesta (success, data, error)
- Testear casos de error (producto no existe, validación falla)

#### **E2E Tests (10%)**

Testean el flujo completo con Playwright (usuario interactúa con UI).

**Qué testear:**

- Flujos completos de usuario (happy paths)
- Navegación entre páginas
- Interacciones de usuario (clicks, formularios, selecciones)
- Estados de la UI (loading, error, success)
- Persistencia de datos (localStorage, carrito)

**Ejemplos de casos:**

- Flujo completo: Landing → Product → Cart → Checkout → Confirmation
- Verificar que el carrito persiste entre páginas
- Validar que los datos se muestran correctamente en cada paso
- Testear formularios (validación, envío, errores)
- Verificar redirecciones y navegación

### 🧪 Test Scenarios por Feature

#### **US-001: Ver Producto**

**Casos a testear:**

- Product page carga y muestra datos correctamente (Unit: componente renderiza, Integration: API retorna datos, E2E: usuario ve imagen, título, precio)
- Manejar imagen faltante gracefully (Unit: fallback image funciona, Integration: 404 image muestra placeholder, E2E: placeholder renderiza sin layout shift)

#### **US-002: Seleccionar Charms**

**Casos a testear:**

- Calcular precio en tiempo real (Unit: calculatePrice() suma correctamente, Integration: selección de charm actualiza precio, E2E: usuario ve cambio de precio al seleccionar)
- Manejar 0 charms seleccionados (Unit: calculatePrice con array vacío = precio producto, Integration: orden puede crearse sin charms, E2E: usuario puede hacer checkout sin charms)

#### **US-005: Crear Orden**

**Casos a testear:**

- Crear orden con datos correctos (Unit: validación de datos del carrito pasa, Integration: Supabase inserta orden correctamente, E2E: página de confirmación muestra número de orden)
- Prevenir órdenes duplicadas (debounce) (Unit: función debounce funciona, Integration: segundo insert es ignorado, E2E: doble click en submit solo crea 1 orden)

### 🚨 Escenarios Negativos (Muy Importante)

**Validación:**

- Rechazar orden con UUID inválido (debe lanzar error "Invalid UUID format")
- Rechazar campos faltantes o tipos incorrectos
- Validar límites de caracteres en campos de texto

**Límites:**

- Manejar selecciones muy grandes de charms (1000+ charms)
- Verificar que el sistema no se rompe con datos extremos
- Testear límites de memoria y rendimiento

**Concurrencia:**

- Manejar órdenes simultáneas sin conflictos (10+ órdenes al mismo tiempo)
- Verificar que todos los IDs generados son únicos
- Testear race conditions en creación de órdenes

**Errores de API:**

- Manejar errores 500 gracefully (mostrar mensaje amigable al usuario)
- Manejar timeouts de red
- Manejar respuestas inesperadas del servidor

### 📊 Criterios de Salida (Definition of Done para Testing)

- [ ] > 70% test coverage (unit + integration + E2E)
- [ ] 0 critical bugs in manual testing
- [ ] All E2E scenarios pass
- [ ] Performance: page load < 3s (Lighthouse)
- [ ] Accessibility: WCAG AA passed
- [ ] No console errors/warnings

---

## 9. CI/CD Pipeline

### 🔄 Pipeline Conceptual

```
┌─────────────────────────┐
│  Developer pushes code   │
│     to feature branch    │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ PR opens (auto trigger) │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ Lint & Format Check     │
│  (ESLint + Prettier)    │
│  ❌ Fails → PR blocked  │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│    TypeScript Check     │
│     (tsc --noEmit)      │
│  ❌ Fails → PR blocked  │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│   Run Tests (Vitest)    │
│   Unit + Integration    │
│  ❌ Fails → PR blocked  │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│  Build Check            │
│  (pnpm build success)   │
│  ❌ Fails → PR blocked  │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│  Preview Deploy         │
│ (Netlify/Vercel PR URL) │
│  👤 Human review        │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│  Code Review            │
│ (Approve or Request     │
│  Changes)               │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│  Merge to main branch   │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ Production Deploy       │
│ (Netlify/Vercel main)   │
│ Auto-deploy live site   │
└─────────────────────────┘
```

---

## 10. 🚀 Despliegue y Producción

### 🌐 **Aplicación en Vivo**

<div align="center">

# 🎉 **[PET CHARMS LOVERS - VISITA LA APLICACIÓN](https://petcharmslovers.netlify.app/)** 🎉

**URL de Producción:** [https://petcharmslovers.netlify.app/](https://petcharmslovers.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/petcharmslovers/deploys)

</div>

### 📋 Información de Despliegue

**Plataforma:** Netlify  
**Tipo de Despliegue:** Serverless Functions + Static Site Hosting  
**Build Command:** `pnpm build:client`  
**Publish Directory:** `dist/spa`  
**Node Version:** 18.x  
**Package Manager:** pnpm 10.14.0

### 🔧 Configuración de Netlify

#### **Archivo `netlify.toml`**

```toml
[build]
  command = "pnpm build:client"
  publish = "dist/spa"

# Redirect all /api/* requests to the serverless function
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api"
  status = 200
  force = true

# SPA fallback - all other routes go to index.html
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### **Variables de Entorno en Netlify**

Las siguientes variables deben estar configuradas en Netlify Dashboard:

- `VITE_SUPABASE_URL`: URL del proyecto Supabase
- `VITE_SUPABASE_ANON_KEY`: Clave anónima pública de Supabase
- `PING_MESSAGE`: Mensaje opcional para endpoint `/api/ping`

**Configuración:**

1. Ve a Netlify Dashboard → Site Settings → Environment Variables
2. Agrega las variables de entorno necesarias
3. Los cambios requieren un nuevo deploy para aplicarse

### 🔄 Proceso de Despliegue

#### **Despliegue Automático**

1. **Push a `main` branch** → Despliegue automático a producción
2. **Pull Request abierto** → Preview deploy automático (URL única por PR)
3. **Build automático** ejecuta:
   ```bash
   pnpm install
   pnpm build:client
   ```
4. **Netlify Functions** se construyen automáticamente desde `netlify/functions/`

#### **Despliegue Manual**

Si necesitas desplegar manualmente:

```bash
# 1. Build del proyecto
pnpm build:client

# 2. Deploy usando Netlify CLI
netlify deploy --prod

# O usando el dashboard web de Netlify
```

### 🔐 Seguridad

- **HTTPS:** Habilitado automáticamente por Netlify
- **CORS:** Configurado en Express para permitir requests desde el dominio de producción
- **Environment Variables:** Secrets almacenados de forma segura en Netlify Dashboard
- **Supabase RLS:** Row Level Security configurado en Supabase para proteger datos

---

## 11. Registro del Uso de IA

### 🤖 Prompts Clave Utilizados

#### **Sección 1: Ficha del Producto**

**Prompt Original:**

> "Genera una ficha de producto para un MVP de e-commerce de collares con charms personalizables. Incluye propuesta de valor, problema resuelto, público objetivo, objetivos del MVP con métricas, flujo E2E claro y métricas iniciales. Usa lenguaje simple pero técnicamente riguroso, alineado con best practices 2024–2025."

**Ajustes Humanos:**

- Enfatizar que es MVP (no full e-commerce)
- Simplificar flujo E2E (solo 4 pasos)
- Agregar métricas realistas (15% conversión es reasonable para MVP)

**Decisión Tomada:**

- Sin pagos reales (reduce complejidad, validación de demanda igual posible)
- SQLite vs PostgreSQL (empezar simple, escalar después)

---

#### **Sección 2: Historias de Usuario**

**Prompt Original:**

> "Genera 5 historias de usuario MUST y 2 SHOULD para el MVP de charms necklace. Cada historia debe incluir: user story format, criterios Given/When/Then, dependencias, riesgos y notas QA. Enfatiza escenarios negativos y edge cases."

**Ajustes Humanos:**

- Reducir "SHOULD" a 2 (evitar scope creep)
- Agregar notas QA muy específicas (ej: "verificar que precio total = collar + suma charms")
- Quitar historias técnicas (DB setup no es user story)

**Decisión Tomada:**

- US-007 (historial) marcada como SHOULD baja prioridad
- Enfoque en flujo core (producto → carrito → orden)

---

#### **Sección 3: Tickets de Trabajo**

**Prompt Original:**

> "Convierte las historias de usuario en 13 tickets de trabajo pequeños (<1 día). Separa backend, frontend, devops. Cada ticket debe tener: descripción técnica clara, criterios de Done (DoD moderna 2025), y checklist QA específico."

**Ajustes Humanos:**

- Agregar estimaciones realistas (horas, no story points)
- Dividir TK-008 (Product Page) en dos tickets (reducir a ~3 horas)
- Enfatizar que Done = "code reviewed + tests pass"

**Decisión Tomada:**

- TK-001 (DB setup) es fundamental, estimar separado
- TK-005 (Error Handling) es cross-cutting, no es feature específica

---

#### **Sección 4: Arquitectura**

**Prompt Original:**

> "Diseña la arquitectura del sistema con diagrama Mermaid. Explica cada capa en lenguaje simple para personas sin experiencia en arquitectura. Incluye flujo de datos E2E, justificación del stack (Node + Express + SQLite + React + Vite), y estrategia de seguridad mínima."

**Ajustes Humanos:**

- Simplificar diagrama (quitar Redis, message queues para MVP)
- Agregar código concreto de seguridad (rate limiting, Zod validation)
- Enfatizar: "Arquitectura escalable sin over-engineering"

**Decisión Tomada:**

- Explicar cuándo "escalamos" a PostgreSQL, Redis, etc.
- Zod > Valibot (TS support mejor)

---

#### **Sección 5: Modelo de Datos**

**Prompt Original:**

> "Genera el modelo de datos completo con 4 tablas: PRODUCTS, CHARMS, ORDERS, ORDER_ITEMS. Incluye diagrama ERD, SQL DDL, explicación no-técnica, constraints, y normalización."

**Ajustes Humanos:**

- Agregar campos auditables (created_at, updated_at)
- UUID vs INT primary keys (UUID recomendado)
- Explicar por qué ORDER_ITEMS existe (snapshot de precios)

**Decisión Tomada:**

- No usar soft deletes (MVP simple)
- Stock en CHARMS (preparar para validación futura)

---

#### **Sección 6: API REST**

**Prompt Original:**

> "Diseña 4 endpoints REST: GET /products, GET /charms, POST /orders, GET /orders/:id. Para cada uno: método, request body, response 200, response errors con ejemplos JSON. Incluye validación Zod, escenarios negativos, y notas QA."

**Ajustes Humanos:**

- Agregar /api/v1 versioning (futura-proof)
- Explicar qué validar en backend (no confiar en cliente)
- Escenarios de error: UUID inválido, charm no existe, price mismatch

**Decisión Tomada:**

- Respuesta consistente: { success, data, error }
- Status codes estrictos: 200, 400, 404, 500 (no crear nuevos)

---

#### **Sección 7: Diseño Frontend**

**Prompt Original:**

> "Diseña la estructura frontend: carpetas, componentes, hooks, state management con Zustand + React Query, móvil-first con TailwindCSS. Incluye ejemplos de código para ProductCard, useCart, cartStore, y accesibilidad checklist."

**Ajustes Humanos:**

- No usar Redux (Zustand suficiente)
- React Query for server state, Zustand for client state
- Mobile-first (320px minimum)

**Decisión Tomada:**

- Persistencia en localStorage (no backend session)
- Estructura plana de componentes (no deep nesting)

---

#### **Sección 8: Testing**

**Prompt Original:**

> "Plan completo de testing: pirámide 60/30/10 (unit/integration/E2E), qué testear en cada nivel, ejemplos con Vitest y Playwright, escenarios negativos, criterios de salida."

**Ajustes Humanos:**

- Enfatizar: no testear cosas innecesarias
- Escenarios negativos (validación, límites, concurrencia)
- Coverage target >70%

**Decisión Tomada:**

- E2E: solo flujo core (landing → product → cart → order)
- Unit: funciones de cálculo, validación
- Integration: endpoints API

---

#### **Sección 9: CI/CD**

**Prompt Original:**

> "Pipeline CI/CD simple con GitHub Actions: lint → test → build → deploy. Diagrama del pipeline."

**Ajustes Humanos:**

- Bloquear merge si test fallan
- Preview deploys en PRs (Netlify)
- Production deploy en main (auto)

**Decisión Tomada:**

- Netlify para frontend (fácil setup)
- Railway/Render para backend (si necesario)

---

#### **Sección 10: Registro de IA**

**Prompt Original:**

> "Documenta el uso de IA: prompts clave por sección, ajustes humanos, decisiones tomadas, riesgos mitigados. Usa lenguaje transparente y profesional."

**Ajustes Humanos:**

- Explicar decisiones técnicas (no solo "IA dijo")
- Identificar riesgos mitigados
- Casos donde se rechazó recomendación de IA

---

---

## 📌 Apéndice: Decisiones Técnicas Clave

### 1. ¿Por Qué SQLite en MVP?

- ✅ Setup instant (no Docker, no server externo)
- ✅ Queries simples para nuestro caso (poco data, sin joins complejos)
- ✅ Testing fácil (reset DB entre tests)
- ❌ No escala a 10k+ usuarios simultáneos
- **Plan:** PostgreSQL cuando usuarios concurrentes > 100

### 2. ¿Por Qué React + Vite?

- ✅ Estándar industria (hiring, comunidad)
- ✅ Vite es x10 más rápido que Webpack/CRA
- ✅ Hot Module Replacement en dev
- ✅ Build producción super optimizado
- ❌ Más setup que frameworks monolíticos (Next.js)

### 3. ¿Por Qué Zustand + React Query?

- ✅ Zustand: ultraligero (2KB), no boilerplate
- ✅ React Query: maneja cache, refetch, offline automáticamente
- ❌ Redux: overkill para MVP
- **Plan:** Migrate a Tanstack si state crece exponencialmente

### 4. ¿Sin Pagos Reales?

- ✅ Validar product-market fit antes de integrar Stripe
- ✅ Reduce complejidad legal (PCI compliance, etc)
- ✅ Testing más rápido
- ✅ MVP en 2 semanas, no 2 meses
- **Plan:** Stripe/Square en Etapa 4 si traction es buena

### 5. ¿Por Qué Supabase para Autenticación y Base de Datos?

- ✅ **Autenticación lista para usar:** No necesitas construir tu propio sistema de auth (JWT, refresh tokens, etc.)
- ✅ **PostgreSQL incluido:** Base de datos real sin configurar servidor propio
- ✅ **API REST automática:** Supabase genera endpoints automáticamente desde las tablas
- ✅ **Real-time subscriptions:** Posibilidad de actualizaciones en tiempo real (no usado en MVP)
- ✅ **Gratis para MVP:** Tier gratuito generoso (500MB DB, 50k usuarios/mes)
- ✅ **TypeScript nativo:** SDK con tipos generados automáticamente
- ✅ **Row Level Security (RLS):** Seguridad a nivel de fila (no implementado en MVP)
- ✅ **Storage incluido:** Para imágenes y archivos (no usado en MVP)
- ❌ **Vendor lock-in:** Dependes de Supabase (pero puedes exportar datos)
- ❌ **Menos control:** No puedes customizar tanto como con solución propia
- **Alternativas consideradas:**
  - **Firebase:** Similar pero más caro, menos flexible (NoSQL)
  - **Auth0:** Solo autenticación, necesitas DB separada
  - **PostgreSQL propio:** Más control pero mucho más setup y mantenimiento
  - **SQLite local:** Simple pero no escala, sin auth integrado
- **Decisión:** Supabase ofrece el mejor balance entre simplicidad y funcionalidad para MVP

---

---
