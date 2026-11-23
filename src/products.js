const play = (id) => ({
  label: 'Google Play',
  store: 'google-play',
  caption: 'Get it on',
  url: `https://play.google.com/store/apps/details?id=${id}&hl=en_AU`,
});

const apple = (listing) => ({
  label: 'App Store',
  store: 'app-store',
  caption: 'Download on the',
  url: `https://apps.apple.com/au/app/${listing}`,
});

const feature = (title, description) => ({ title, description });
const shot = (alt, width, height, file = 'hero', caption) => ({ alt, width, height, file, caption });
const awaitingApple = 'Available on Android. The iOS app is awaiting App Store review.';

export const productGroups = [
  {
    id: 'ai-tools',
    name: 'AI Tools',
    items: [{
      slug: 'joey-mcp-client',
      name: 'Joey MCP Client',
      theme: 'product-mint',
      platforms: 'iOS · macOS · Android',
      headline: 'Give your AI chat the tools to do more.',
      pitch: 'A chat app for developers and power users who want to choose their AI models and connect their own remote MCP tools.',
      description: 'Bring an OpenRouter account and the remote tool servers you already use. Ask for recipes from a food database or review a habit log, then see the results in the same conversation.',
      links: [apple('joey-mcp-client/id6759186174'), play('com.kaiserapps.joey')],
      layout: 'portrait',
      hero: [
        shot('Joey chat showing an ingredient search powered by an MCP tool', 644, 1400, 'hero', 'Look up recipes'),
        shot('Joey chat with a weekly habit table', 644, 1400, 'habits', 'Review a habit log'),
      ],
      gallery: [shot('A preview of multiple Joey app screens', 1260, 754, 'screens', 'Chat, tool calls, and configuration in Joey.')],
      featureHeading: 'Your models. Your tools.',
      features: [
        feature('Pick your model', 'Filter the OpenRouter catalog by modality, price, or context size. Switch models mid-chat and see per-message token counts and costs.'),
        feature('Connect remote tools', 'Add multiple Model Context Protocol (MCP) servers to one conversation. Joey runs tool calls and passes results back to the model.'),
        feature('Work beyond plain text', 'Attach an image or record audio inline. Replies can include tables, highlighted code, and Mermaid diagrams.'),
      ],
      details: {
        heading: 'For people who bring their own tools',
        sections: [
          { title: 'Connect authenticated servers', text: 'Use OAuth where a server requires it. Joey can browse server prompts, resume MCP sessions, and show tool progress while a request runs.', items: ['OAuth', 'Sampling', 'Elicitation', 'Tool schema inspection'] },
          { title: 'Know where the conversation goes', text: 'Joey keeps its conversation history on your device and has no separate Joey backend or analytics. Messages and tool data are still sent to the model and servers you configure.' },
        ],
      },
    }],
  },
  {
    id: 'education',
    name: 'Education',
    items: [
      {
        slug: 'better-spelling-for-adults',
        name: 'Better Spelling for Adults',
        theme: 'product-indigo',
        platforms: 'iOS · Android',
        headline: 'Hear it. Spell it. Remember it.',
        pitch: 'Build spelling confidence with 8,000 words and listen-and-type practice designed for adults.',
        description: 'If you always pause before typing “accommodation”, practise retrieving the spelling instead of relying on autocorrect. Hear each word in a sentence, type it from memory, and review the ones that trip you up.',
        links: [apple('better-spelling-for-adults/id6762339953'), play('com.kaiserapps.betterspelling')],
        layout: 'portrait',
        hero: [
          shot('A listen-and-type spelling exercise with the correct answer revealed', 647, 1400, 'hero', 'Practise in context'),
          shot('Statistics showing accuracy and words in the Practice Bank', 555, 1200, 'feedback', 'See what’s sticking'),
        ],
        gallery: [shot('A Better Spelling practice exercise on an iPad', 1049, 1400, 'tablet', 'Practise on a phone or tablet.')],
        featureHeading: 'Get better at the words you actually miss',
        features: [
          feature('Listen in context', 'Hear the word pronounced and see it used in a sentence.'),
          feature('Start at your level', 'Work through five difficulty levels with British and Australian or American spelling.'),
          feature('Review the tricky ones', 'The Practice Bank brings back missed words at spaced intervals until you spell each correctly three times in a row.'),
        ],
        details: {
          heading: 'From everyday writing to spelling bees',
          sections: [
            { title: 'Five levels, 8,000 words', text: 'Start with everyday words like “definitely”, move on to professional vocabulary like “ophthalmology”, or try competition words like “autochthonous”.', items: ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Spelling Bee'] },
            { title: 'Make practice yours', text: 'Choose British and Australian or American spelling, track your accuracy, and add your own trouble words with the full unlock. The built-in drills work offline.' },
          ],
          note: 'Try 100 words in each level for free. A one-time purchase unlocks the full curriculum and custom words.',
        },
      },
      {
        slug: 'better-grammar-for-adults',
        name: 'Better Grammar for Adults',
        theme: 'product-rose',
        platforms: 'iOS · Android',
        headline: 'Know what sounds right, and why.',
        pitch: 'Write with more confidence by practising 150+ English grammar rules in short drills with plain-English explanations.',
        description: 'Starting with a quick choice such as “affect” versus “effect”, work up to editing a whole sentence yourself. With more than 800 exercises, you’ll practise the same rules in different contexts instead of memorising one answer.',
        links: [apple('better-grammar-for-adults/id6777875563'), play('com.kaiserapps.bettergrammar')],
        layout: 'portrait',
        hero: [
          shot('A multiple-choice exercise on affect versus effect', 675, 1200, 'exercise', 'Choose the right word'),
          shot('The Better Grammar home screen with progress and a Practice Bank', 788, 1400, 'hero', 'Track what needs review'),
        ],
        featureHeading: 'Practise the rules you use every day',
        features: [
          feature('Learn why it works', 'Get an explanation for each rule instead of just being told an answer is wrong.'),
          feature('Practise in different ways', 'Choose the right answer, spot an error, or rewrite a sentence across five levels.'),
          feature('Revisit your mistakes', 'Missed rules return at increasing intervals. Get the rule right three times on different sentences to master it.'),
        ],
        details: {
          heading: 'Build an editor’s eye, one rule at a time',
          sections: [
            { title: 'Recognise, spot, then fix', text: 'Pick the right word from a list, tap the error in a sentence, then rewrite the sentence yourself. Most rules have several example sentences so you can practise applying the pattern.' },
            { title: 'Five levels of grammar', text: 'Start with “their”, “there”, and “they’re”; work through agreement and tense; then tackle professional writing, modifiers, and punctuation.', items: ['Common Mistakes', 'Everyday Grammar', 'Professional Writing', 'Advanced', 'Mastery'] },
          ],
          note: 'The first 10 rules in each level are free. Unlock all 150+ rules with a one-time purchase. Practice works offline.',
        },
      },
      {
        slug: 'better-spelling-for-esl',
        name: 'Better Spelling for ESL',
        theme: 'product-sky',
        platforms: 'iOS · Android',
        headline: 'Make sense of English spelling.',
        pitch: 'Listen-and-type practice for English learners, with translations and spelling tips informed by the language you already speak.',
        description: 'English spelling can be hard to predict: why does “receipt” have a silent p? Practise more than 1,700 words for exams, work, study, and everyday life. Hear each word, type it from memory, and get feedback in a language you know.',
        links: [apple('better-spelling-for-esl/id6802650537'), play('com.kaiserapps.betterspellingesl')],
        layout: 'portrait',
        hero: [
          shot('A spelling exercise with a pronunciation button and a typing field', 555, 1200, 'practice', 'Hear it and type it'),
          shot('A missed answer with the correct spelling and a spelling tip', 555, 1200, 'levels', 'Learn from the feedback'),
        ],
        featureHeading: 'From hearing a word to spelling it on your own',
        features: [
          feature('Listen in context', 'Hear the word and a spoken example. Slow down the audio, replay syllables, or check the pronunciation guide if a sound is unfamiliar.'),
          feature('Type it and see why', 'Spell the word without seeing it first. Get immediate feedback, a translation, and a spelling tip that explains what makes the word tricky.'),
          feature('Review until it sticks', 'Missed words go into your Practice Bank. Spaced repetition brings them back until you spell each one correctly three times in a row.'),
        ],
        details: {
          heading: 'Practise the English you actually need',
          sections: [
            {
              title: '1,700+ words across nine lists',
              text: 'Start with everyday vocabulary or pick a specialist list for your goal. Every list has five levels, from beginner to advanced.',
              items: ['Everyday English', 'IELTS & Exams', 'Healthcare & Nursing', 'Business & Office', 'Academic English', 'IT & Software', 'Trades & Construction', 'Hospitality & Food', 'Legal & Government'],
            },
            {
              title: 'Spelling help in ten languages',
              text: 'Use translations to check meaning and tips in your first language to connect unfamiliar English sounds with the letters that represent them.',
              items: ['Spanish', 'Portuguese', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'French', 'German', 'Hindi', 'Turkish'],
              note: 'Choose British spelling (colour, organise) or American spelling (color, organize).',
            },
          ],
          note: 'Start with Everyday English for free. A one-time purchase unlocks the full curriculum. The app works offline, with no account, ads, or subscription.',
        },
      },
    ],
  },
  {
    id: 'kids',
    name: 'Kids',
    items: [
      {
        slug: 'kids-video-player',
        name: 'Kids Video Player',
        theme: 'product-violet',
        platforms: 'iOS · Android',
        headline: 'Their favourites, without the feed.',
        pitch: 'An offline player for families who want kids to watch a library of parent-chosen videos instead of browsing a streaming feed.',
        description: 'Put family clips or favourite videos on a phone or tablet before a flight or a long drive. Kids choose from big thumbnails and watch full-screen, with no streaming feed or links out of the player.',
        links: [apple('easy-kids-video-player/id6744452630'), play('com.kaiserapps.kids_video_player')],
        layout: 'landscape',
        hero: [
          shot('Kids Video Player browsing local videos in a thumbnail grid', 1120, 630, 'library', 'Browse the local library'),
          shot('A video playing full-screen with playback controls', 1120, 630, 'playback', 'Watch in landscape'),
        ],
        featureHeading: 'Just the videos you put there',
        features: [
          feature('You choose the library', 'Load videos onto the device and give kids a thumbnail-based browser for the collection.'),
          feature('Watch away from Wi-Fi', 'Play already-saved videos without an internet connection, on a trip or at home.'),
          feature('Easy to browse and play', 'Group videos by folder and open them in a full-screen landscape player.'),
        ],
        details: {
          heading: 'Set up the library before you hand over the device',
          sections: [
            { title: 'Android: choose a folder', text: 'Save videos to a folder on the device, then select that folder in the app. You can group clips by folder so a big collection stays easy to browse.' },
            { title: 'iPhone and iPad: use Files', text: 'Copy the videos into the app’s folder in Files so they’re stored on the device and ready to play offline.' },
          ],
          note: 'This is a player, not a video service. Bring your own files; there are no ads, recommendations from an online catalog, or in-app purchases.',
        },
      },
      {
        slug: 'endless-maze',
        name: 'Endless Maze: Kids Puzzle',
        theme: 'product-leaf',
        platforms: 'iOS · Android',
        headline: 'Draw a path. See where it goes.',
        pitch: 'A calm, offline maze game for kids and families, with new paths to explore and no countdown, scores, or game-over screen.',
        description: 'Trace a path to the flag and watch your explorer walk every turn. When they arrive, cross a bridge into a new maze and watch the world grow outward, one puzzle at a time.',
        links: [apple('endless-maze-kids-puzzle/id6819004797'), play('com.kaiserapps.endlessmaze')],
        layout: 'landscape',
        hero: [
          shot('An explorer and a drawn route through a forest maze', 1120, 515, 'hero', 'Draw a route through the forest'),
          shot('An icy maze next to a neighbouring forest maze', 1120, 630, 'world', 'Cross into a new biome'),
        ],
        featureHeading: 'Little adventures at their own pace',
        features: [
          feature('Draw to explore', 'Children trace a route with a finger, then watch their explorer follow it.'),
          feature('Keep finding new paths', 'Generated mazes take explorers through forests, deserts, ice, and beaches.'),
          feature('Play without pressure', 'Choose from three difficulties and undo a turn whenever you want.'),
        ],
        details: {
          heading: 'Made for small hands and unhurried play',
          sections: [
            { title: 'A wrong turn isn’t a reset', text: 'Drawing into a wall gives a gentle haptic bump. A slip only undoes a little of the path, and the explorer walks the route instead of jumping to the end.' },
            { title: 'Keep going from where you left off', text: 'Pick one of two explorers and set the difficulty. New mazes are generated from the local save, so the adventure can continue without an internet connection.', items: ['Easy', 'Medium', 'Hard', 'Forest', 'Desert', 'Ice', 'Beach'] },
          ],
          note: 'No timer, scores, accounts, ads, or in-app purchases.',
        },
      },
      {
        slug: 'kids-checkout',
        name: 'Kids Checkout',
        theme: 'product-sun',
        platforms: 'Android',
        headline: 'The grocery store is open for play.',
        pitch: 'An offline checkout game for kids who love playing shop. Scan real grocery barcodes or tap illustrated foods, then ring up a pretend sale.',
        description: 'Set out a few packets from the pantry and hand over the register. A scan adds the item and a pretend price; scanning it again updates the quantity. At the end, tap Pay for a checkout celebration.',
        links: [play('com.benkaiser.kids_checkout')],
        availability: awaitingApple,
        layout: 'landscape',
        hero: [
          shot('Kids Checkout after scanning yoghurt into a pretend grocery cart', 1120, 630, 'hero', 'Scan and build a cart'),
          shot('Kids Checkout celebrating a completed pretend payment', 1120, 630, 'payment', 'Ring up a pretend sale'),
        ],
        featureHeading: 'From the pantry to the checkout',
        features: [
          feature('Scan real groceries', 'The on-device database recognises more than 145,000 products. Unknown barcodes get a made-up name and a consistent pretend price.'),
          feature('Play without a camera', 'Choose from 48 illustrated foods and use large buttons to change quantities or start a fresh cart.'),
          feature('Make it a pretend sale', 'Ring up a total and celebrate the checkout. No real money changes hands.'),
        ],
        details: {
          heading: 'Let them run the shop, not a real checkout',
          sections: [
            { title: 'Make the game your own', text: 'Take turns shopping and running the register, then compare the cart total before pressing Pay. The app uses your device’s region for the pretend currency.' },
            { title: 'Everything stays offline', text: 'Barcode recognition happens on the device and the food buttons don’t need camera access. There are no accounts, ads, tracking, or in-app purchases.' },
          ],
        },
      },
      {
        slug: 'kids-photo-gallery',
        name: 'Kids Photo Gallery',
        theme: 'product-lilac',
        platforms: 'Android',
        headline: 'A little gallery for big memories.',
        pitch: 'A full-screen photo and video gallery for young children, with parents in charge of which albums appear.',
        description: 'Hand over a gallery of family trips, favourite faces, or clips they love to replay. It’s read-only, so kids can browse the memories you choose without editing or deleting the originals.',
        links: [play('com.benkaiser.kids_photo_gallery')],
        availability: awaitingApple,
        layout: 'portrait',
        hero: [
          shot('A child-friendly grid of sample pictures in Kids Photo Gallery', 788, 1400, 'hero', 'Browse selected albums'),
          shot('A full-screen sample photo above a thumbnail strip', 675, 1200, 'viewer', 'Swipe through memories'),
        ],
        featureHeading: 'Their own corner of the camera roll',
        features: [
          feature('Start with your picks', 'Nothing is shown until a parent chooses the albums to share.'),
          feature('Tap, swipe, and watch', 'Open a photo full-screen, swipe through the album, or replay a video.'),
          feature('Keep settings separate', 'A reading challenge keeps album and media controls out of the way during browsing.'),
        ],
        details: {
          heading: 'A gallery they can explore without changing anything',
          sections: [
            { title: 'Set the boundaries first', text: 'Select which albums and media types appear. Use selected-photo access where supported, and pair the app with Android’s app pinning to help keep children in the gallery.' },
            { title: 'Just the family library', text: 'Swipe or jump through the thumbnail strip, loop videos, and tap the image to hide controls. The app doesn’t upload media; cloud-only items may need to download through the device first.' },
          ],
          note: 'One paid download. No accounts, ads, subscriptions, or in-app purchases.',
        },
      },
    ],
  },
  {
    id: 'christian-software',
    name: 'Christian Software',
    items: [{
      slug: 'ai-bible-plan',
      name: 'AI Bible Plan',
      theme: 'product-slate',
      platforms: 'Web · Android',
      headline: 'A Scripture plan for your season.',
      pitch: 'Find a Bible reading plan for a topic or season of life, read at your own pace, or listen when your hands are busy.',
      description: 'Choose a plan you can come back to tomorrow. Preview the passages, read one day at a time in the Berean Standard Bible, or listen to that day’s narrated readings in sequence.',
      links: [{ label: 'Open AI Bible Plan', url: 'https://aibibleplan.org/' }, play('org.aibibleplan.app')],
      availability: 'Available on the web and Android. The iOS app is awaiting App Store review.',
      layout: 'portrait',
      hero: [
        shot('A day’s Scripture reading and the audio playback control', 675, 1200, 'reading', 'Read or listen'),
        shot('AI Bible Plan showing topic ideas for generating a plan', 675, 1200, 'welcome', 'Explore topics for a plan'),
      ],
      featureHeading: 'Make time for Scripture your way',
      features: [
        feature('Find a place to start', 'Explore and preview included Scripture plans before choosing what to read.'),
        feature('Read or listen', 'Follow the text or listen to narrated readings as you go.'),
        feature('Make it personal', 'Create a plan around a topic or season of life with an optional Pro subscription.'),
      ],
      details: {
        heading: 'From the first passage to a reading rhythm',
        sections: [
          { title: 'Read free, without an account', text: 'Preview an included plan, focus on the assigned verses, or expand to see the full chapter. Checkmarks keep your place and optional reminders help you return. Sign in if you want to sync across devices.' },
          { title: 'Build a custom plan with Pro', text: 'Choose a topic and length, then see each day as it’s generated. AI selects Scripture references; it doesn’t rewrite the Bible. Previously saved plans remain readable after Pro ends.' },
        ],
      },
    }],
  },
  {
    id: 'competitive-games',
    name: 'Competitive Games',
    items: [{
      slug: 'tilde',
      name: 'Tilde',
      theme: 'product-lime',
      platforms: 'Web',
      headline: 'You don’t need to be exact. Just closer.',
      pitch: 'A competitive mental-math game for anyone who likes numbers under a little pressure. Make five quick estimates and try to beat your rival.',
      description: 'If you see 49 × 21, “roughly 1,000” is a useful answer. Tilde turns that instinct into five-round duels where getting closer than your rival matters more than working out every digit.',
      links: [{ label: 'Play Tilde', url: 'https://playtilde.com/' }],
      layout: 'landscape',
      hero: [shot('Tilde game artwork showing a four-second timer and the five-round match format', 1120, 588)],
      featureHeading: 'A numbers duel on your terms',
      features: [
        feature('Closest answer wins', 'Estimate instead of calculating every digit. Each match is five rounds.'),
        feature('Play at your speed', 'Choose everything from four-second Bullet rounds to the slower Zen mode.'),
        feature('Challenge a rival', 'Play ranked or unranked, send a friend a duel, or practise with the shared daily gauntlet.'),
      ],
      details: {
        heading: 'Pick the kind of challenge you want today',
        sections: [
          { title: 'Live duels, from Bullet to Zen', text: 'Play ranked or unranked, with four-second Bullet rounds or up to a minute in Zen. A ghost opponent can step in if nobody is waiting to play.', items: ['Bullet', 'Blitz', 'Rapid', 'Zen'] },
          { title: 'Practise or play on your own time', text: 'Try the shared Daily Gauntlet, train solo, or send a challenge to a friend to play later. You can start in a browser without an account.' },
        ],
      },
    }],
  },
];

export const products = productGroups.flatMap(({ name, items }) =>
  items.map((item) => ({
    ...item,
    category: name,
    canonicalUrl: `https://kaiserapps.com/${item.slug}`,
    shareImage: `https://kaiserapps.com/product-media/${item.slug}/share.jpg?v=frost`,
  })),
);
