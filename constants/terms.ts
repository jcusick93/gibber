export interface Term {
  id: string;
  term: string;
  definition: string;
  category?: string;
}

export const terms: Term[] = [
  {
    id: "bussin",
    term: "Bussin'",
    definition:
      'This refers to the act of pressing the tongue against the roof of the mouth to define the jawline. Originally popularized as a facial exercise, it\'s now a meme where people "mew" in photos to look their best.',
    category: "slang",
  },
  {
    id: "hype",
    term: "Hype",
    definition:
      "Extreme excitement or enthusiasm, often used to describe something that's really good or exciting. Can also refer to excessive promotion or marketing.",
    category: "slang",
  },
  {
    id: "mogging",
    term: "Mogging",
    definition:
      "A term from online communities referring to being significantly more attractive or successful than someone else. Often used in a competitive context.",
    category: "slang",
  },
  {
    id: "cap",
    term: "Cap",
    definition:
      "A lie or something that's not true. When someone says \"no cap\" they mean they're being completely honest.",
    category: "slang",
  },
  {
    id: "bet",
    term: "Bet",
    definition:
      'An expression of agreement or confirmation, similar to saying "okay" or "sounds good."',
    category: "slang",
  },
  {
    id: "fire",
    term: "Fire",
    definition:
      "Something that's really good, excellent, or impressive. Used to describe music, food, or anything that's particularly great.",
    category: "slang",
  },
  {
    id: "slay",
    term: "Slay",
    definition:
      "To do something exceptionally well or look amazing. Often used to express admiration for someone's performance or appearance.",
    category: "slang",
  },
  {
    id: "periodt",
    term: "Periodt",
    definition:
      "An emphatic way to end a statement, meaning 'that's final' or 'end of discussion.' The 't' at the end adds extra emphasis.",
    category: "slang",
  },
  {
    id: "main-character",
    term: "Main Character",
    definition:
      "Someone who acts like they're the protagonist of their own story, often in a self-centered or dramatic way.",
    category: "slang",
  },
  {
    id: "stan",
    term: "Stan",
    definition:
      "To be an extremely enthusiastic and devoted fan of someone or something. Originally from Eminem's song 'Stan.'",
    category: "slang",
  },
  {
    id: "ghosted",
    term: "Ghosted",
    definition:
      "When someone suddenly stops responding to messages or calls without explanation, essentially disappearing from your life.",
    category: "slang",
  },
  {
    id: "flex",
    term: "Flex",
    definition:
      "To show off or boast about something, usually possessions, achievements, or abilities.",
    category: "slang",
  },
  {
    id: "salty",
    term: "Salty",
    definition:
      "Being bitter, upset, or resentful about something, often used when someone is being petty or holding a grudge.",
    category: "slang",
  },
  {
    id: "mood",
    term: "Mood",
    definition:
      "Something that perfectly captures how you're feeling or what you're experiencing at the moment.",
    category: "slang",
  },
  {
    id: "vibe",
    term: "Vibe",
    definition:
      "The atmosphere, feeling, or energy of a situation, place, or person. Can also mean to get along well with someone.",
    category: "slang",
  },
  {
    id: "sus",
    term: "Sus",
    definition:
      "Short for 'suspicious.' Something or someone that seems questionable, sketchy, or not quite right.",
    category: "slang",
  },
  {
    id: "noob",
    term: "Noob",
    definition:
      "A beginner or someone who is inexperienced at something, often used in gaming contexts.",
    category: "slang",
  },
  {
    id: "clout",
    term: "Clout",
    definition:
      "Influence, power, or social media fame. Often associated with popularity and social status.",
    category: "slang",
  },
  {
    id: "tea",
    term: "Tea",
    definition:
      "Gossip, drama, or juicy information. When someone has 'tea' they have interesting news or secrets to share.",
    category: "slang",
  },
  {
    id: "snatched",
    term: "Snatched",
    definition:
      "Looking amazing, perfect, or on point. Often used to describe someone's appearance or style.",
    category: "slang",
  },
  {
    id: "period",
    term: "Period",
    definition:
      "Used to emphasize a statement, meaning 'that's it' or 'end of story.' Similar to 'periodt' but without the extra 't.'",
    category: "slang",
  },
  {
    id: "goals",
    term: "Goals",
    definition:
      "Something to aspire to or something that represents your ideal situation. Often used to express admiration.",
    category: "slang",
  },
  {
    id: "basic",
    term: "Basic",
    definition:
      "Someone or something that is mainstream, unoriginal, or follows popular trends without much individuality.",
    category: "slang",
  },
  {
    id: "extra",
    term: "Extra",
    definition:
      "Being over the top, dramatic, or doing too much. Often used when someone is being unnecessarily excessive.",
    category: "slang",
  },
  {
    id: "lowkey",
    term: "Lowkey",
    definition:
      "Something that is subtle, understated, or not obvious. Can also mean 'kind of' or 'sort of.'",
    category: "slang",
  },
  {
    id: "highkey",
    term: "Highkey",
    definition:
      "Something that is obvious, obvious, or not subtle at all. The opposite of 'lowkey.'",
    category: "slang",
  },
];

export const defaultSuggestions = ["Bussin'", "Hype", "Mogging"];

export const getTermById = (id: string): Term | undefined => {
  return terms.find((term) => term.id === id);
};

export const getTermByTerm = (termName: string): Term | undefined => {
  return terms.find(
    (term) => term.term.toLowerCase() === termName.toLowerCase()
  );
};

export const searchTerms = (query: string): Term[] => {
  if (!query.trim()) return terms;

  const lowercaseQuery = query.toLowerCase();
  return terms.filter(
    (term) =>
      term.term.toLowerCase().includes(lowercaseQuery) ||
      term.definition.toLowerCase().includes(lowercaseQuery)
  );
};
