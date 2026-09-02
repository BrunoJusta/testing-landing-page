# kōmvitis, landing page

Landing page de uma página para a kōmvitis, craft kombucha de folha de videira
(projeto Sogrape). Todo o conteúdo, paleta, fotografia e tom de voz vêm do deck
"Komvitis: Craft Kombucha, conceito de produto e storytelling" (step / Sogrape,
Agosto de 2026). Nada foi inventado: sem preços, sem valores nutricionais, sem
certificações.

## Correr o projeto

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Para produção: `npm run build && npm run start`.
`npm run typecheck` corre o TypeScript sem emitir.

## Stack

| Camada | Escolha |
| --- | --- |
| Framework | Next.js 15, App Router, TypeScript estrito |
| Estilo | Tailwind CSS 3.4 com `tailwind.config.ts`, tokens em CSS custom properties |
| Animação | Framer Motion, mais um canvas 2D próprio para as bolhas |
| Scroll | Lenis, desligado com `prefers-reduced-motion` |
| Ícones | `@phosphor-icons/react` |
| Tipos de letra | Inter Tight (display), Inter (corpo), Poppins (marca), auto-alojados em `public/fonts` |

Sem UI kit e sem Bootstrap. Todos os componentes são feitos à mão em
`components/`. Não há WebGL: as bolhas são um canvas 2D com um único loop de
`requestAnimationFrame`, que pausa quando o hero sai do ecrã, reduz a densidade
em ecrãs pequenos e nem chega a ser montado com `prefers-reduced-motion`.

## Estrutura

```
app/
  layout.tsx        metadata, preload das duas fontes críticas
  page.tsx          composição das sete secções
  globals.css       tokens, escala fluida de tipos, grão, keyframes
  fonts.css         @font-face auto-alojados (latin e latin-ext)
components/
  SiteNav.tsx       nav fixa que encolhe e ganha vidro depois do hero
  IntroCurtain.tsx  intro de carregamento, a marca dissolve-se no hero
  BlobCursor.tsx    cursor blob, só em ponteiro fino e com motion ativo
  MagneticButton.tsx  botões magnéticos
  BubbleField.tsx   campo de bolhas em canvas, reage ao cursor
  Reveal.tsx        primitiva única de reveal com stagger
  GrapeMark.tsx     o único SVG desenhado à mão, porque é o logótipo
  sections/         uma secção por ficheiro
lib/
  site.ts           todo o conteúdo, com a página do deck citada em cada bloco
  useAccent.ts      troca o acento em <html data-accent>
```

## Conteúdo e cor

`lib/site.ts` é a única fonte de verdade. Cada bloco cita a página do deck de
onde saiu, para que a revisão de marca seja direta. A paleta foi amostrada às
imagens do deck:

| Token | Valor | Origem |
| --- | --- | --- |
| `--paper` | `#f2f2f2` | o fundo de estúdio dos packshots |
| `--ink` | `#121214` | o wordmark |
| acento `rose` | `#b33530` | o líquido rosé de Alicante Bouschet |
| acento `branco` | `#7c6318` | o líquido branco |
| acento `vine` | `#5b21b6` | o cacho que forma o ō da marca |

Há um acento de cada vez. Passar o rato num lote escreve `data-accent` no
`<html>`, por isso a página inteira muda de cor, não só o cartão. Todos os
acentos passam AA sobre `--paper` (5.1:1 ou melhor). Os botões primários são
tinta sobre papel, para não dependerem do acento para contraste.

## Imagens

As imagens em `public/img` são recortes de trabalho tirados do PDF do deck, só
para o layout respirar. Substitui pelos ficheiros finais mantendo os nomes:

| Ficheiro | Onde entra | Formato sugerido |
| --- | --- | --- |
| `garrafa-rose-cacho.webp` | hero | PNG ou WebP com fundo transparente, vertical, mínimo 1200 px de altura |
| `garrafa-rose.webp` | cartão do lote rosé | igual, transparente |
| `garrafa-branco.webp` | cartão do lote branco | igual, transparente |
| `brindar-douro.jpg` | onde encontrar | fotografia, retrato ou quadrado |
| `detalhe-rotulo.jpg` | passo "A vinha" | macro do rótulo |
| `detalhe-liquido.jpg` | passo "A fermentação" | macro do líquido |
| `formato-750.jpg` | passo "A garrafa" | packshot do fecho bar top |

Falta uma fotografia: a folha de videira na vinha, para o primeiro passo de
"Como se faz". Enquanto não existir, o passo mostra um painel tipográfico em vez
de uma imagem emprestada. Quando houver ficheiro, basta preencher `image` e
`alt` nesse passo em `lib/site.ts`.

## Movimento

Cada animação tem uma razão, comentada no componente. Só se animam `transform` e
`opacity`. Os handlers de rato são coalescidos com `requestAnimationFrame` e a
posição vive em motion values, nunca em estado React, para não haver render por
frame. Não existe um único `window.addEventListener("scroll")`: tudo passa por
`useScroll`, `useInView` ou `IntersectionObserver`.

Com `prefers-reduced-motion: reduce`: o Lenis não arranca, a intro não aparece,
o cursor blob e as bolhas não são montados, o gradiente e o marquee param, e os
reveals passam a fades simples.

Em ecrãs pequenos ou ponteiro grosso: sem cursor blob, sem tilt nos cartões, sem
parallax de rato, e o campo de bolhas cai para cerca de um terço da densidade.

## Notas

- Não há dark mode: a página tem um só tema, o claro.
- O formulário é só front-end. `components/sections/Convite.tsx` tem um
  `setTimeout` no lugar do pedido; troca por um `fetch` para o teu endpoint.
- A secção de números chama-se "Provas" e não "Benefícios", porque o deck proíbe
  linguagem de saúde, detox ou probióticos. Os únicos números são os formatos
  impressos na garrafa.
