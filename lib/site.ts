/**
 * Single source of truth for every visible string and every product fact.
 * Each block cites the page of "Komvitis: Craft Kombucha, conceito de produto
 * e storytelling (Sogrape / step, Agosto de 2026)" it came from.
 * Nothing here is invented: no prices, no nutritional values, no certifications.
 */

export type AccentKey = "rose" | "branco" | "vine";

export const brand = {
  wordmark: "kōmvitis",
  descriptor: "craft kombucha", // deck p.9
  owner: "Sogrape", // deck p.1
  // deck p.12
  claim: "O convite para os bons momentos.",
  // deck p.9 and p.23
  oneLine:
    "Fermentamos folha de videira colhida numa vinha com nome, casta e ano.",
  status: "Conceito em desenvolvimento. Ainda sem venda ao público.",
};

export const nav = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#lotes", label: "Lotes" },
  { href: "#como-se-faz", label: "Como se faz" },
  { href: "#provas", label: "Provas" },
  { href: "#onde", label: "Onde encontrar" },
] as const;

/** deck p.23, "O manifesto" */
export const manifesto = {
  lines: [
    "O vinho nunca foi só uma bebida.",
    "É mesa, é partilha, é ligação à terra.",
    "A kōmvitis nasce para que nada disso se perca quando se tira o álcool da equação.",
  ],
  rule: "Não imitamos o vinho. Reinterpretamos os seus valores.",
  // deck p.17
  footnote: "Herdamos a cultura, não o produto.",
};

/** deck p.10, p.11 (packshots) and p.16 */
export const lotes: {
  id: AccentKey;
  name: string;
  casta: string;
  origem: string;
  note: string;
  image: string | null;
  alt: string;
}[] = [
  {
    id: "rose",
    name: "Rosé",
    casta: "Alicante Bouschet",
    origem: "Quinta do Caêdo, 2025",
    note: "O recorte do rótulo abre sobre o líquido e forma um cacho.",
    image: "/img/garrafa-rose.webp",
    alt: "Garrafa de kōmvitis rosé, rótulo branco com a casta Alicante Bouschet.",
  },
  {
    id: "branco",
    name: "Branco",
    casta: "Alicante Bouschet",
    origem: "Quinta do Caêdo, 2025",
    note: "A casta repete-se na fita do fecho e no rótulo da frente.",
    image: "/img/garrafa-branco.webp",
    alt: "Garrafa de kōmvitis branco, líquido de tom palha e rótulo branco.",
  },
  {
    id: "vine",
    name: "Próximo lote",
    casta: "Por anunciar",
    origem: "Casta, vinha e ano, como sempre",
    note: "Se não sabemos de que vinha veio, não usamos a palavra.",
    image: null,
    alt: "",
  },
];

/** deck p.24 (a segunda colheita), p.18 (provas), p.9, p.5 (formatos) */
export const steps = [
  {
    id: "folha",
    title: "A folha",
    body:
      "A vinha dá mais do que uva. Todos os anos produz folha que ninguém aproveitava. A nossa vem da desponta e da desfolha, operações normais de viticultura.",
    image: null,
    alt: "",
  },
  {
    id: "vinha",
    title: "A vinha",
    body:
      "Casta, vinha e ano identificados em cada lote. O terroir é uma afirmação verificável e não uma palavra de marketing.",
    image: "/img/detalhe-rotulo.jpg",
    alt: "Detalhe do rótulo com a casta Alicante Bouschet e a Quinta do Caêdo, 2025.",
  },
  {
    id: "fermentacao",
    title: "A fermentação",
    body:
      "Fermentamos folha de Vitis vinifera em vez de folha de chá. Fermentação craft, de produção reduzida: o cuidado é real e a escala é intencional.",
    image: "/img/detalhe-liquido.jpg",
    alt: "Detalhe do líquido rosé dentro da garrafa, com gás e sedimento.",
  },
  {
    id: "garrafa",
    title: "A garrafa",
    body:
      "750 ml com fecho bar top, para servir à mesa. 375 ml com carica e fita, para a garrafa pequena. O contra-rótulo explica o projeto e a origem da vinha.",
    image: "/img/formato-750.jpg",
    alt: "Garrafa de 750 ml com fecho bar top em madeira, fotografada em luz natural.",
  },
] as const;

/** deck p.5 (formatos) and p.18 (casta, vinha e ano por lote) */
export const figures = [
  { value: 750, unit: "ml", label: "Fecho bar top, para servir à mesa." },
  { value: 375, unit: "ml", label: "Carica com fita, na garrafa pequena." },
  { value: 1, unit: "casta por lote", label: "Identificada no rótulo, com a vinha e o ano." },
] as const;

/** deck p.18, "Provas: porque é que isto é credível" */
export const provas = [
  {
    title: "Folha de Vitis vinifera, não folha de chá",
    body: "A ligação ao vinho é material, não estética.",
  },
  {
    title: "Casta, vinha e ano identificados em cada lote",
    body: "O terroir é uma afirmação verificável e não uma palavra de marketing.",
  },
  {
    title: "A folha é a segunda colheita da vinha",
    body:
      "Damos valor a um recurso que se perdia. Sustentabilidade sem discurso de sustentabilidade.",
  },
  {
    title: "Fermentação craft e produção reduzida",
    body: "O cuidado é real e a escala é intencional.",
  },
  {
    title: "Formato, fecho e serviço de carta de vinhos",
    body: "A categoria reconhece-nos como par, não como alternativa de recurso.",
  },
] as const;

/** deck p.4, "Onde vive a komvitis" */
export const locais = [
  {
    title: "Bares e restaurantes experimentalistas",
    body: "Cartas de bebidas preparadas para quem não bebe álcool.",
  },
  {
    title: "Mercearia gourmet",
    body: "Espaços focados em pequenos produtores.",
  },
  {
    title: "Locais de price point elevado",
    body: "Onde a garrafa chega à mesa e não ao copo de plástico.",
  },
] as const;

/** deck p.19, the insight line for the audience that came from wine */
export const pullQuote = "Não perdeu a mesa. Mudou de garrafa.";

/** deck p.9, p.11, p.18, p.24. Real vocabulary, no invented stockists. */
export const lexicon = [
  "Alicante Bouschet",
  "Quinta do Caêdo",
  "2025",
  "folha de videira",
  "segunda colheita",
  "fermentação craft",
  "produção reduzida",
  "750 ml bar top",
  "375 ml carica",
  "Vitis vinifera",
] as const;

/** deck p.20, tom de voz: convidativo, concreto, sóbrio */
export const convite = {
  eyebrow: "A lista",
  title: "Entra na lista.",
  body:
    "Avisamos quando o primeiro lote sair da vinha e onde o podes provar. Escrevemos como quem serve a alguém que está à mesa.",
  fieldLabel: "Email",
  fieldHelp: "Usamos o teu email só para avisar do primeiro lote.",
  submit: "Entrar na lista",
  submitting: "A enviar…",
  success: "Ficaste na lista. Falamos quando o lote estiver pronto.",
  errorEmpty: "Escreve o teu email para continuares.",
  errorInvalid: "Esse email não parece completo. Confirma e tenta outra vez.",
};
