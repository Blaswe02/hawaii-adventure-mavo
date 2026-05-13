import { LocationData } from './types';

export const LOCATIONS: LocationData[] = [
  {
    id: 'pearlharbor',
    name: 'Pearl Harbor',
    shortDescription: 'Why did Japan attack? What changed forever?',
    introImage: 'https://picsum.photos/seed/pearl-harbor-hawaii/900/600',
    readingText: [
      "Pearl Harbor is a naval base on the island of Oahu, Hawaii.",
      "On December 7, 1941, Japan launched a surprise attack on the American naval base.",
      "Japan wanted to weaken the United States military in the Pacific Ocean.",
      "This would allow Japan to expand its empire across Asia without American interference.",
      "The attack happened early in the morning, when most soldiers were still asleep.",
      "More than 2,400 Americans were killed and nearly 1,200 were wounded.",
      "The USS Arizona was one of the eight battleships that sank during the attack.",
      "President Roosevelt called December 7 'a date which will live in infamy'.",
      "The following day, the United States officially entered World War II.",
      "The attack on Pearl Harbor changed the course of the entire war.",
      "Today, the USS Arizona Memorial stands above the sunken wreck in the harbor.",
      "Oil still slowly rises from the ship, which some call 'black tears'.",
      "More than 1.8 million people visit Pearl Harbor every year.",
      "Some say the souls of the sailors still guard the harbor, unwilling to leave their ship."
    ],
    mysterySentence: "Some say the souls of the sailors still guard the harbor, unwilling to leave their ship.",
    symbol: 'Anchor',
    symbolMeaning: 'Memory & Sacrifice',
    questions: [
      {
        id: 1,
        text: "Why did Japan attack Pearl Harbor?",
        options: ["To steal American ships", "To weaken US military power in the Pacific", "To take control of Hawaii"],
        correctIndex: 1,
        hint: "Japan had a bigger goal in Asia — read sentences 3 and 4."
      },
      {
        id: 2,
        text: "What did President Roosevelt call December 7, 1941?",
        options: ["A day of shame", "A date which will live in infamy", "The worst day in American history"],
        correctIndex: 1,
        hint: "Look for Roosevelt's exact words in the text."
      },
      {
        id: 3,
        text: "What was the consequence of the attack for the USA?",
        options: ["The USA left the Pacific", "The USA officially entered World War II", "The USA surrendered to Japan"],
        correctIndex: 1,
        hint: "Read what happened the day after the attack."
      },
      {
        id: 4,
        text: "What are the 'black tears' mentioned in the text?",
        options: ["Tears from the families of soldiers", "Oil rising from the sunken USS Arizona", "Dark water in the harbor"],
        correctIndex: 1,
        hint: "The text mentions oil rising from the ship."
      },
      {
        id: 5,
        text: "How many Americans were killed in the attack?",
        options: ["More than 1,200", "More than 2,400", "More than 3,600"],
        correctIndex: 1,
        hint: "Look carefully — the text mentions two different numbers."
      }
    ],
    sentenceBuilderTasks: [
      {
        id: 1,
        blocks: ["Japan", "wanted to weaken", "the US military", "in the Pacific"]
      },
      {
        id: 2,
        blocks: ["The attack on Pearl Harbor", "changed", "the course", "of the entire war"]
      }
    ],
    missingWordsTasks: [
      {
        id: 1,
        sentenceParts: ["Japan wanted to expand its empire across", "without American interference."],
        options: ["Asia", "Europe", "Africa"],
        correctOption: "Asia"
      },
      {
        id: 2,
        sentenceParts: ["President Roosevelt called it 'a date which will live in", "'."],
        options: ["infamy", "history", "shame"],
        correctOption: "infamy"
      },
      {
        id: 3,
        sentenceParts: ["The USS Arizona was one of the eight", "that sank during the attack."],
        options: ["battleships", "submarines", "aircraft carriers"],
        correctOption: "battleships"
      }
    ]
  },
  {
    id: 'volcanoes',
    name: 'Volcanoes National Park',
    shortDescription: 'Creation and destruction. Pele and power.',
    introImage: 'https://picsum.photos/seed/hawaii-volcano-lava/900/600',
    readingText: [
      "Hawaii Volcanoes National Park is located on the Big Island of Hawaii.",
      "It is home to two of the world's most active volcanoes: Kilauea and Mauna Loa.",
      "Kilauea has been erupting almost continuously since 1983, making it one of the most active volcanoes on Earth.",
      "Mauna Loa is the largest volcano on Earth when measured by its total volume.",
      "When hot lava flows from the volcanoes and reaches the ocean, it creates new land.",
      "This process has continued for millions of years and is how the Hawaiian Islands were formed.",
      "The park contains craters, lava tubes, and steam vents that visitors can explore safely.",
      "At night, visitors can sometimes see the glow of molten lava from safe viewpoints.",
      "The Hawaiian goddess Pele is believed to live inside the Kilauea volcano.",
      "Pele is seen as the creator of the Hawaiian Islands and is deeply respected.",
      "Scientists study the volcanoes closely to understand how the Earth changes over time.",
      "An eruption in 2018 destroyed more than 700 homes and changed the landscape forever.",
      "Despite the danger, people rebuild near the volcanoes because the land is incredibly fertile.",
      "Nobody can predict exactly when or where the next eruption will strike."
    ],
    mysterySentence: "Nobody can predict exactly when or where the next eruption will strike.",
    symbol: 'Flame',
    symbolMeaning: 'Fire & Creation',
    questions: [
      {
        id: 1,
        text: "How were the Hawaiian Islands formed?",
        options: ["By earthquakes under the sea", "By volcanic activity over millions of years", "By glaciers melting"],
        correctIndex: 1,
        hint: "Read sentences 5 and 6 carefully."
      },
      {
        id: 2,
        text: "What happened during the 2018 eruption?",
        options: ["A tsunami destroyed the coast", "More than 700 homes were destroyed", "The volcano went dormant"],
        correctIndex: 1,
        hint: "Look for the year 2018 in the text."
      },
      {
        id: 3,
        text: "Why do people continue to live near the volcanoes despite the danger?",
        options: ["They have nowhere else to go", "The land is incredibly fertile", "It is required by law"],
        correctIndex: 1,
        hint: "The last part of sentence 13 explains this."
      },
      {
        id: 4,
        text: "Who is the goddess Pele?",
        options: ["The last queen of Hawaii", "The creator of the Hawaiian Islands", "The goddess of the ocean"],
        correctIndex: 1,
        hint: "Read what the text says about Pele's role."
      },
      {
        id: 5,
        text: "What makes Mauna Loa special?",
        options: ["It is the tallest volcano above sea level", "It is the largest volcano on Earth by volume", "It erupts every single year"],
        correctIndex: 1,
        hint: "Look at how Mauna Loa is measured."
      }
    ],
    sentenceBuilderTasks: [
      {
        id: 1,
        blocks: ["When lava", "reaches the ocean", "it creates", "new land"]
      },
      {
        id: 2,
        blocks: ["Pele", "is seen as", "the creator", "of the Hawaiian Islands"]
      }
    ],
    missingWordsTasks: [
      {
        id: 1,
        sentenceParts: ["The Hawaiian Islands were formed by volcanic activity over millions of", "."],
        options: ["years", "days", "centuries"],
        correctOption: "years"
      },
      {
        id: 2,
        sentenceParts: ["Kilauea has been erupting almost", "since 1983."],
        options: ["continuously", "occasionally", "dangerously"],
        correctOption: "continuously"
      },
      {
        id: 3,
        sentenceParts: ["Despite the danger, people rebuild because the land is incredibly", "."],
        options: ["fertile", "beautiful", "cheap"],
        correctOption: "fertile"
      }
    ]
  },
  {
    id: 'waikiki',
    name: 'Waikiki Beach',
    shortDescription: 'Ancient sport. Olympic champion. Shark Gods.',
    introImage: 'https://picsum.photos/seed/waikiki-beach-surf/900/600',
    readingText: [
      "Waikiki Beach is one of the most famous beaches in the world, located in Honolulu.",
      "The beach stretches for about 3.2 kilometers along the southern coast of Oahu.",
      "Surfing has been part of Hawaiian culture for more than a thousand years.",
      "Ancient Hawaiians surfed on heavy wooden boards called 'olo' boards, some up to 6 meters long.",
      "Surfing was not just a sport — it was also a spiritual practice connected to the ocean gods.",
      "Waikiki was the playground of Hawaiian royalty for centuries before tourists arrived.",
      "Duke Kahanamoku was born in Waikiki in 1890 and became a legendary surfer and swimmer.",
      "He won Olympic gold medals in swimming and introduced surfing to the rest of the world.",
      "Today he is honoured as the 'Father of Modern Surfing'.",
      "Behind the beach stands Diamond Head, a volcanic crater that last erupted 150,000 years ago.",
      "Diamond Head is called 'Le'ahi' in Hawaiian, which means 'the brow of the tuna fish'.",
      "Millions of tourists visit Waikiki every year, making it one of the busiest beaches on Earth.",
      "However, many Hawaiian people have mixed feelings about the impact of so much tourism.",
      "Old stories say the beach was once watched over by powerful ocean spirits called 'Shark Gods'."
    ],
    mysterySentence: "Old stories say the beach was once watched over by powerful ocean spirits called 'Shark Gods'.",
    symbol: 'Waves',
    symbolMeaning: 'Surf & Spirit',
    questions: [
      {
        id: 1,
        text: "What were ancient Hawaiian surfboards called?",
        options: ["Koa boards", "Olo boards", "Le'ahi boards"],
        correctIndex: 1,
        hint: "Look for the specific name in sentence 4."
      },
      {
        id: 2,
        text: "What was surfing for ancient Hawaiians?",
        options: ["Only a sport", "A sport and a spiritual practice connected to ocean gods", "Only a way to travel between islands"],
        correctIndex: 1,
        hint: "Sentence 5 explains this clearly."
      },
      {
        id: 3,
        text: "What did Duke Kahanamoku achieve?",
        options: ["He became a Hawaiian king", "He won Olympic gold medals and introduced surfing to the world", "He built the first hotel on Waikiki"],
        correctIndex: 1,
        hint: "Read sentences 7 and 8."
      },
      {
        id: 4,
        text: "What does 'Le'ahi' (Diamond Head) mean in Hawaiian?",
        options: ["The brow of the tuna fish", "The peak of the gods", "The golden mountain"],
        correctIndex: 0,
        hint: "The text gives the exact translation."
      },
      {
        id: 5,
        text: "Why do some Hawaiians have mixed feelings about tourism?",
        options: ["Because tourists are sometimes rude", "Because so much tourism affects their culture and environment", "Because they prefer the beach to be empty"],
        correctIndex: 1,
        hint: "Sentence 13 explains this — think about what 'impact' means."
      }
    ],
    sentenceBuilderTasks: [
      {
        id: 1,
        blocks: ["Surfing", "was not just a sport", "but also", "a spiritual practice"]
      },
      {
        id: 2,
        blocks: ["Duke Kahanamoku", "introduced surfing", "to the rest", "of the world"]
      }
    ],
    missingWordsTasks: [
      {
        id: 1,
        sentenceParts: ["Ancient Hawaiians surfed on heavy wooden boards called '", "' boards."],
        options: ["olo", "koa", "tuna"],
        correctOption: "olo"
      },
      {
        id: 2,
        sentenceParts: ["Duke Kahanamoku is honoured as the 'Father of Modern", "'."],
        options: ["Surfing", "Swimming", "Tourism"],
        correctOption: "Surfing"
      },
      {
        id: 3,
        sentenceParts: ["Diamond Head is called 'Le'ahi', which means the brow of the", "."],
        options: ["tuna fish", "whale", "shark"],
        correctOption: "tuna fish"
      }
    ]
  },
  {
    id: 'iolani',
    name: 'Iolani Palace',
    shortDescription: 'The only royal palace in the USA. Overthrow. Apology.',
    introImage: 'https://picsum.photos/seed/iolani-palace-hawaii/900/600',
    readingText: [
      "Iolani Palace is located in downtown Honolulu, the capital of Hawaii.",
      "It is the only royal palace in the United States of America.",
      "The palace was built in 1882 and served as the official home of Hawaiian kings and queens.",
      "King Kalakaua had electricity and a telephone installed — before the White House had them.",
      "Queen Liliuokalani was the last monarch to live in the palace.",
      "In 1893, American businessmen, supported by U.S. Marines, overthrew Queen Liliuokalani.",
      "They wanted to protect their business interests and bring Hawaii under U.S. control.",
      "The queen gave up her throne peacefully to avoid violence and protect her people.",
      "After the overthrow, she was put under house arrest in her own palace for eight months.",
      "In 1898, Hawaii became a U.S. territory and the palace lost its royal function.",
      "Today, Iolani Palace is a museum and a powerful symbol of Hawaiian identity and resistance.",
      "In 1993, exactly 100 years after the overthrow, the U.S. government officially apologized.",
      "Native Hawaiians gathered at the palace to hear the apology and remember their queen.",
      "Some Hawaiians believe the spirit of Queen Liliuokalani still walks through the palace halls."
    ],
    mysterySentence: "Some Hawaiians believe the spirit of Queen Liliuokalani still walks through the palace halls.",
    symbol: 'Landmark',
    symbolMeaning: 'Royalty & Resistance',
    questions: [
      {
        id: 1,
        text: "What makes Iolani Palace unique in the USA?",
        options: ["It is the largest palace in America", "It is the only royal palace in the United States", "It is the oldest building in Hawaii"],
        correctIndex: 1,
        hint: "Sentence 2 answers this directly."
      },
      {
        id: 2,
        text: "Why did American businessmen overthrow Queen Liliuokalani?",
        options: ["Because she refused to speak English", "To protect their business interests and bring Hawaii under US control", "Because she declared war on the USA"],
        correctIndex: 1,
        hint: "Sentences 6 and 7 explain their reasons."
      },
      {
        id: 3,
        text: "Why did the queen give up her throne without fighting?",
        options: ["She had no army", "To avoid violence and protect her people", "She agreed with the businessmen"],
        correctIndex: 1,
        hint: "Sentence 8 gives her reason."
      },
      {
        id: 4,
        text: "What happened to the queen after the overthrow?",
        options: ["She was sent to prison on another island", "She was put under house arrest in her own palace", "She escaped to the United States"],
        correctIndex: 1,
        hint: "Sentence 9 explains what happened next."
      },
      {
        id: 5,
        text: "What happened in 1993 at the palace?",
        options: ["Hawaii became a US state", "The palace became a museum", "The US government apologized for the overthrow"],
        correctIndex: 2,
        hint: "Sentences 12 and 13 describe this event."
      }
    ],
    sentenceBuilderTasks: [
      {
        id: 1,
        blocks: ["Queen Liliuokalani", "gave up her throne", "to avoid violence", "and protect her people"]
      },
      {
        id: 2,
        blocks: ["Iolani Palace", "is the only", "royal palace", "in the United States"]
      }
    ],
    missingWordsTasks: [
      {
        id: 1,
        sentenceParts: ["Iolani Palace is the only royal palace in the United", "."],
        options: ["States", "Kingdom", "Islands"],
        correctOption: "States"
      },
      {
        id: 2,
        sentenceParts: ["The queen was put under", "arrest in her own palace for eight months."],
        options: ["house", "prison", "military"],
        correctOption: "house"
      },
      {
        id: 3,
        sentenceParts: ["In 1993, the U.S. government officially", "for the overthrow."],
        options: ["apologized", "celebrated", "forgot"],
        correctOption: "apologized"
      }
    ]
  },
  {
    id: 'hanauma',
    name: 'Haunauma Bay',
    shortDescription: 'Volcanic crater. Monk seals. Ancient secrets.',
    introImage: 'https://picsum.photos/seed/hanauma-bay-turtle/900/600',
    readingText: [
      "Haunauma Bay is a stunning bay formed inside an ancient volcanic crater on Oahu.",
      "The word 'Haunauma' means 'curved bay' in Hawaiian.",
      "The bay is one of the best snorkeling spots in Hawaii, with over 400 species of fish.",
      "The clear water and shallow coral reef make it ideal for both beginners and experienced snorkelers.",
      "Green sea turtles, called Honu in Hawaiian, are often seen swimming in the bay.",
      "The Hawaiian Monk Seal is one of the most endangered marine mammals in the world.",
      "These seals are found only in Hawaii and are strictly protected by law.",
      "In Hawaiian culture, the Monk Seal is seen as a guardian of the souls of the dead.",
      "Touching sea turtles or monk seals is illegal and can result in heavy fines.",
      "Lava rocks may never be removed — Hawaiians believe this brings a curse upon the person.",
      "Because of damage caused by too many visitors, the bay was temporarily closed in 2020.",
      "Now, the number of daily visitors is strictly limited and all must watch an educational video first.",
      "Scientists continue to monitor the coral reef, which is slowly recovering.",
      "Nobody knows how many secrets the ancient volcanic crater still hides beneath the surface."
    ],
    mysterySentence: "Nobody knows how many secrets the ancient volcanic crater still hides beneath the surface.",
    symbol: 'Droplets',
    symbolMeaning: 'Ocean & Life',
    questions: [
      {
        id: 1,
        text: "What does 'Haunauma' mean in Hawaiian?",
        options: ["Beautiful bay", "Curved bay", "Turtle bay"],
        correctIndex: 1,
        hint: "Sentence 2 gives the direct translation."
      },
      {
        id: 2,
        text: "What is the cultural significance of the Hawaiian Monk Seal?",
        options: ["It predicts storms", "It is seen as a guardian of the souls of the dead", "It brings good luck to fishermen"],
        correctIndex: 1,
        hint: "Sentence 8 explains the Hawaiian cultural belief."
      },
      {
        id: 3,
        text: "What happened to Haunauma Bay in 2020?",
        options: ["It was destroyed by a volcanic eruption", "It was temporarily closed due to visitor damage", "It was turned into a private resort"],
        correctIndex: 1,
        hint: "Sentence 11 mentions the year 2020."
      },
      {
        id: 4,
        text: "What can happen if you touch sea turtles or monk seals?",
        options: ["You receive a warning letter", "You can receive heavy fines", "You are asked to leave the island"],
        correctIndex: 1,
        hint: "Sentence 9 is very specific about the consequence."
      },
      {
        id: 5,
        text: "How many species of fish live in Haunauma Bay?",
        options: ["Over 100", "Over 200", "Over 400"],
        correctIndex: 2,
        hint: "Sentence 3 gives the exact number."
      }
    ],
    sentenceBuilderTasks: [
      {
        id: 1,
        blocks: ["The Hawaiian Monk Seal", "is seen as", "a guardian", "of the souls of the dead"]
      },
      {
        id: 2,
        blocks: ["The number", "of daily visitors", "is now", "strictly limited"]
      }
    ],
    missingWordsTasks: [
      {
        id: 1,
        sentenceParts: ["Haunauma Bay was formed inside an ancient volcanic", "."],
        options: ["crater", "cave", "reef"],
        correctOption: "crater"
      },
      {
        id: 2,
        sentenceParts: ["The Hawaiian Monk Seal is found only in Hawaii and is strictly", "by law."],
        options: ["protected", "hunted", "studied"],
        correctOption: "protected"
      },
      {
        id: 3,
        sentenceParts: ["All visitors must watch an", "video before entering the bay."],
        options: ["educational", "safety", "short"],
        correctOption: "educational"
      }
    ]
  },
  {
    id: 'napali',
    name: 'Na Pali Coast',
    shortDescription: 'Prehistoric cliffs. The Crown Jewel. Ancient spirits.',
    introImage: 'https://picsum.photos/seed/napali-coast-cliffs/900/600',
    readingText: [
      "The Na Pali Coast is one of the most dramatic and untouched coastlines in the world.",
      "Located on the island of Kauai, its name simply means 'the cliffs' in Hawaiian.",
      "The green cliffs rise up to 1,200 meters above the Pacific Ocean.",
      "They were carved by rivers and heavy rainfall over millions of years of erosion.",
      "The coast is so steep and remote that there are no roads along it.",
      "The only ways to reach it are by boat, helicopter, or hiking the Kalalau Trail.",
      "The Kalalau Trail stretches 18 kilometers and is considered one of the world's most dangerous hikes.",
      "Hollywood directors chose Na Pali Coast as a location because of its prehistoric appearance.",
      "Parts of Jurassic Park, King Kong, and Pirates of the Caribbean were filmed here.",
      "Ancient Hawaiians once lived in the hidden valleys of Na Pali for centuries.",
      "The Mauna Keia Silversword is a highly endangered plant found only on Hawaii's volcanic mountains.",
      "It is nicknamed 'the Crown Jewel of the Volcanic Mountain' for its stunning silver leaves.",
      "The Silversword blooms only once in its entire lifetime, then dies after producing seeds.",
      "Some people believe the hidden valleys of Na Pali are still guarded by the spirits of the ancient people."
    ],
    mysterySentence: "Some people believe the hidden valleys of Na Pali are still guarded by the spirits of the ancient people.",
    symbol: 'Leaf',
    symbolMeaning: 'Wild & Wonder',
    questions: [
      {
        id: 1,
        text: "How were the Na Pali cliffs formed?",
        options: ["By volcanic eruptions", "By rivers and heavy rainfall eroding the rock over millions of years", "By earthquakes shifting the land"],
        correctIndex: 1,
        hint: "Sentence 4 gives the scientific explanation."
      },
      {
        id: 2,
        text: "Why did Hollywood choose Na Pali Coast as a filming location?",
        options: ["Because it is easy to reach", "Because of its prehistoric appearance", "Because it is the cheapest location in Hawaii"],
        correctIndex: 1,
        hint: "Sentence 8 explains the reason."
      },
      {
        id: 3,
        text: "What makes the Mauna Keia Silversword unique?",
        options: ["It blooms every spring", "It only grows in water", "It blooms only once in its lifetime and then dies"],
        correctIndex: 2,
        hint: "Sentence 13 describes its remarkable life cycle."
      },
      {
        id: 4,
        text: "Which of these films was NOT mentioned as filmed at Na Pali Coast?",
        options: ["Jurassic Park", "Pirates of the Caribbean", "Avatar"],
        correctIndex: 2,
        hint: "Sentence 9 lists the films — check which one is missing."
      },
      {
        id: 5,
        text: "Why is the Kalalau Trail considered dangerous?",
        options: ["It goes through active lava fields", "It is 18 km long along steep cliffs with no roads nearby", "It is only open one month per year"],
        correctIndex: 1,
        hint: "Think about what makes a trail dangerous based on sentence 7."
      }
    ],
    sentenceBuilderTasks: [
      {
        id: 1,
        blocks: ["The cliffs", "were carved", "by rivers and rainfall", "over millions of years"]
      },
      {
        id: 2,
        blocks: ["The Silversword", "blooms only", "once in its lifetime", "then dies"]
      }
    ],
    missingWordsTasks: [
      {
        id: 1,
        sentenceParts: ["The Na Pali Coast is on the island of", "."],
        options: ["Kauai", "Oahu", "Maui"],
        correctOption: "Kauai"
      },
      {
        id: 2,
        sentenceParts: ["The Silversword is nicknamed 'the Crown", "of the Volcanic Mountain'."],
        options: ["Jewel", "Plant", "Flower"],
        correctOption: "Jewel"
      },
      {
        id: 3,
        sentenceParts: ["Parts of Jurassic Park and King Kong were", "here."],
        options: ["filmed", "written", "discovered"],
        correctOption: "filmed"
      }
    ]
  }
];
