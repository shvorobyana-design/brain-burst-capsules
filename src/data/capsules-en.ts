// English translations for all capsule text content, keyed by capsule ID
export interface CapsuleTranslation {
  title: string;
  shortDescription: string;
  introduction: string;
  theory?: string;
  beginnerExplanation: string;
  detailedExplanation: string;
  simpleExplanation: string;
  quickSummary: string;
  keyTerms?: { term: string; definition: string }[];
  formulas?: string[];
  examples?: string[];
  problemSolving?: { problem: string; solution: string }[];
  facts: string[];
  quiz: { question: string; options: string[]; answer: number }[];
}

function q(question: string, options: string[], answer: number) {
  return { question, options, answer };
}

export const capsuleTranslationsEn: Record<string, CapsuleTranslation> = {
  "what-is-biology": {
    title: "What is Biology",
    shortDescription: "The science of life: from bacteria to whales",
    introduction: "Biology is one of the oldest and most important sciences, studying all forms of life on our planet. From microscopic bacteria to giant blue whales, from forest mushrooms to brain neurons — biology helps us understand how the living world works.",
    theory: "Biology (from Greek bios — life, logos — science) is a complex science covering dozens of disciplines. Botany studies plants, zoology — animals, microbiology — microorganisms, genetics — heredity, ecology — organism-environment interactions, physiology — organ and system functions.\n\nModern biology is closely linked to chemistry (biochemistry), physics (biophysics), mathematics (bioinformatics), and medicine. Molecular biology methods allow reading DNA, genetic engineering — modifying organisms, and synthetic biology — creating new life forms.\n\nMain characteristics of life: metabolism, growth and development, reproduction, irritability, self-regulation, heredity and variability. Every living being has cellular structure (except viruses, which are on the boundary of living and non-living).",
    beginnerExplanation: "Biology is the science of all living things. It studies plants, animals, fungi, bacteria, and humans. Biologists research how organisms are born, grow, reproduce, and interact with each other and the environment.",
    detailedExplanation: "Biology covers many branches: botany, zoology, microbiology, genetics, ecology, physiology. Modern biology uses molecular methods, genetic engineering, and bioinformatics. Main features of life: metabolism, growth, reproduction, irritability, self-regulation.",
    simpleExplanation: "Biology is when you study everything alive: flowers, bugs, fish, and even yourself!",
    keyTerms: [
      { term: "Biology", definition: "The science of living organisms, their structure, functions, development, and interactions" },
      { term: "Organism", definition: "A living being that has all the characteristics of life" },
      { term: "Cell", definition: "The smallest structural unit of a living organism" },
      { term: "Metabolism", definition: "The set of chemical reactions in an organism to sustain life" },
      { term: "Heredity", definition: "The ability to pass traits from parents to offspring" },
    ],
    examples: [
      "Botany: studying the structure of a daisy flower — petals, stamens, pistil",
      "Zoology: researching dolphin behavior — social structure, communication",
      "Genetics: determining why a child has brown eyes when both parents are brown-eyed",
      "Ecology: studying the impact of deforestation on fox populations in a region",
    ],
    quickSummary: "Biology — the science of all living things. Studies plants, animals, fungi, bacteria, and humans. Main features: metabolism, growth, reproduction, heredity. Branches: botany, zoology, genetics, ecology.",
    facts: ["Over 8.7 million species of living organisms are known on Earth", "Biology as a science emerged in the 19th century", "The smallest organisms — viruses — are less than 100 nanometers", "About 150 species go extinct daily on Earth", "The human body contains more bacteria than its own cells"],
    quiz: [q("What does biology study?", ["Stars", "Living organisms", "Rocks", "Weather"], 1), q("Who is the subject of biology?", ["Only humans", "Only animals", "All living things", "Only plants"], 2), q("Which branch studies plants?", ["Zoology", "Botany", "Ecology", "Genetics"], 1), q("Which is NOT a feature of life?", ["Growth", "Reproduction", "Magnetism", "Metabolism"], 2), q("What is metabolism?", ["Movement", "Exchange of substances", "Reproduction", "Heredity"], 1)],
  },

  "levels-of-life": {
    title: "Levels of Life Organization",
    shortDescription: "From molecules to the biosphere",
    introduction: "Life on Earth is organized as a complex hierarchical system — from the simplest molecules to the entire biosphere. Understanding these levels helps realize how all living beings are connected to each other and the environment.",
    theory: "Hierarchy of life organization levels:\n\n1. **Molecular** — DNA, proteins, lipids, carbohydrates. Biochemical reactions occur at this level.\n2. **Cellular** — the cell is the elementary unit of life. Prokaryotes (bacteria) and eukaryotes (plants, animals, fungi).\n3. **Tissue** — a group of cells with similar structure and function (epithelial, connective, muscle, nervous).\n4. **Organ** — an organ consists of several tissues (heart, lungs, brain).\n5. **Organismal** — the whole organism as a single system.\n6. **Population-species** — a group of individuals of the same species in a territory.\n7. **Ecosystem** — a community of organisms + their habitat.\n8. **Biosphere** — all living organisms on Earth and their environment.\n\nNew properties emerge at each level (emergence).",
    beginnerExplanation: "Life is organized at different levels: molecules → cells → tissues → organs → organisms → populations → ecosystems → biosphere. Each level has its own features.",
    detailedExplanation: "Hierarchy of life organization: molecular (DNA, proteins), cellular, tissue, organ, organismal, population-species, ecosystem, biosphere. New properties emerge at each level (emergence).",
    simpleExplanation: "Imagine steps: tiny bricks form cells, cells form organs, organs form you, and you live in nature with everyone else!",
    keyTerms: [
      { term: "Emergence", definition: "The appearance of new properties at a higher level of organization that didn't exist at the lower one" },
      { term: "Biosphere", definition: "The shell of Earth inhabited by living organisms" },
      { term: "Population", definition: "A group of individuals of the same species living in one territory" },
      { term: "Ecosystem", definition: "A combination of living organisms and their environmental conditions" },
    ],
    examples: [
      "Molecular level: a DNA molecule stores genetic information",
      "Cellular: a neuron transmits an electrical signal",
      "Organismal: a human as a complete system",
      "Ecosystem: a forest — trees, animals, fungi, bacteria, soil, water",
    ],
    quickSummary: "8 levels: molecular → cellular → tissue → organ → organismal → population → ecosystem → biosphere. Each level has new properties (emergence).",
    facts: ["The biosphere is a thin shell of Earth where life exists", "Each level has properties the previous one doesn't", "The human body consists of approximately 37 trillion cells", "The biosphere extends from ocean depths to upper atmosphere layers"],
    quiz: [q("Which level is smallest?", ["Organismal", "Molecular", "Cellular", "Tissue"], 1), q("What is the biosphere?", ["One organism", "All Earth's ecosystems", "One cell", "One organ"], 1), q("How many cells in a human body?", ["1 million", "37 trillion", "1000", "100 billion"], 1), q("What is emergence?", ["Disappearance of properties", "Appearance of new properties", "Destruction of a system", "Growth of an organism"], 1)],
  },

  "microscope": {
    title: "Microscope and Its Structure",
    shortDescription: "How to see the invisible",
    introduction: "The microscope is one of the most important tools in biology. Without it, we would never have learned about the existence of cells, bacteria, and viruses.",
    theory: "Two main types of microscopes:\n\n**Optical (light) microscope** — uses visible light and a lens system. Magnification: up to 2000×. Resolution: ~0.2 µm.\n\n**Electron microscope** — uses electron beams instead of light. Magnification: up to 500,000× and more.\n\n**Structure of optical microscope:**\n- Eyepiece — lens the observer looks through\n- Objective — lens near the sample (usually several: ×4, ×10, ×40, ×100)\n- Condenser — focuses light on the sample\n- Diaphragm — controls the amount of light\n- Stage — holds the specimen\n- Tube — connects eyepiece and objective\n- Coarse and fine focus knobs\n\nMagnification = eyepiece × objective.",
    beginnerExplanation: "A microscope is a device that magnifies small objects. It has an eyepiece (where you look), an objective (lens near the object), and a stage.",
    detailedExplanation: "Optical microscope gives up to 2000× magnification. Electron — up to 500,000×. Components: eyepiece, objective, condenser, diaphragm, stage, tube, stand, fine focus knob.",
    simpleExplanation: "A microscope is like super-glasses that let you see tiny things: cells, bacteria, and even blood particles!",
    keyTerms: [
      { term: "Eyepiece", definition: "The microscope lens through which the observer looks" },
      { term: "Objective", definition: "The lens located near the sample being studied" },
      { term: "Resolution", definition: "The minimum distance between two points that can be distinguished" },
      { term: "Specimen", definition: "A thin slice or smear on a glass slide for examination" },
    ],
    formulas: [
      "Microscope magnification = eyepiece magnification × objective magnification",
      "If eyepiece ×10 and objective ×40, then total magnification = 400×",
    ],
    examples: [
      "Eyepiece ×10, objective ×4 → 40× magnification (for viewing large structures)",
      "Eyepiece ×10, objective ×100 → 1000× magnification (for bacteria, requires immersion oil)",
    ],
    quickSummary: "A microscope magnifies small objects. Optical — up to 2000×, electron — up to 500,000×. Magnification = eyepiece × objective. Main parts: eyepiece, objective, stage, focus knobs.",
    facts: ["Antonie van Leeuwenhoek created the first microscope in the 17th century", "An electron microscope can show individual atoms", "Robert Hooke first saw cells through a microscope", "Modern cryo-electron microscopes can see individual protein molecules"],
    quiz: [q("Who invented the microscope?", ["Newton", "Leeuwenhoek", "Einstein", "Darwin"], 1), q("What is the eyepiece?", ["Lens near object", "Lens for the eye", "Microscope handle", "Stage"], 1), q("Max magnification of optical microscope?", ["100×", "2000×", "1,000,000×", "10×"], 1), q("Magnification = ?", ["Eyepiece + objective", "Eyepiece × objective", "Only objective", "Only eyepiece"], 1)],
  },

  "cell-structure": {
    title: "Cell Structure",
    shortDescription: "What the smallest unit of life is made of",
    introduction: "The cell is the fundamental unit of life. Every living organism consists of one or many cells. Understanding cell structure is key to understanding how all living things work.",
    theory: "Two fundamentally different types of cells:\n\n**Prokaryotic cells** (bacteria, archaea) — simple, no nucleus, DNA in nucleoid.\n\n**Eukaryotic cells** (plants, animals, fungi) — complex, with nucleus and membrane organelles.\n\n**Main components:**\n• **Plasma membrane** — semi-permeable envelope of phospholipid bilayer and proteins.\n• **Nucleus** — control center, contains DNA (chromosomes).\n• **Mitochondria** — \"power stations of the cell.\" Cellular respiration: glucose + oxygen → ATP + CO₂ + H₂O.\n• **Endoplasmic reticulum (ER)** — Rough ER (with ribosomes) — protein synthesis. Smooth ER — lipid synthesis.\n• **Golgi apparatus** — \"cell's post office.\" Modifies, sorts, and packages proteins.\n• **Ribosomes** — molecular machines for protein synthesis.\n• **Lysosomes** — \"cell's stomach.\" Contain digestive enzymes.\n\n**Only in plant cells:**\n• Cell wall (cellulose)\n• Chloroplasts — photosynthesis\n• Large central vacuole",
    beginnerExplanation: "A cell is the smallest living unit. It has a membrane (envelope), cytoplasm (liquid inside), and a nucleus (control center). The cell has many small organelles, each doing its job.",
    detailedExplanation: "A eukaryotic cell contains: plasma membrane, nucleus with DNA, mitochondria (energy), endoplasmic reticulum (synthesis), Golgi apparatus (packaging), ribosomes (protein synthesis), lysosomes (digestion). Plant cells additionally have cell wall, chloroplasts, and vacuole.",
    simpleExplanation: "A cell is like a small city! The nucleus is city hall, mitochondria are power stations, the membrane is the city wall. Everything works together!",
    keyTerms: [
      { term: "Cytology", definition: "The science of cells" },
      { term: "Organelle", definition: "A specialized structure inside the cell with a specific function" },
      { term: "Mitochondria", definition: "An organelle that produces energy (ATP) through cellular respiration" },
      { term: "Chloroplast", definition: "A plant cell organelle where photosynthesis occurs" },
      { term: "Nucleus", definition: "An organelle containing DNA that controls cell activity" },
      { term: "Plasma membrane", definition: "A semi-permeable cell envelope made of phospholipids and proteins" },
    ],
    examples: [
      "Animal cell: erythrocyte (red blood cell) — biconcave disc without nucleus, carries oxygen",
      "Plant cell: leaf cell — has chloroplasts, performs photosynthesis",
      "Bacterial cell: E. coli — no nucleus, DNA in nucleoid, has flagellum for movement",
    ],
    problemSolving: [
      { problem: "How does a plant cell differ from an animal cell?", solution: "Plant cell has: 1) cellulose cell wall, 2) chloroplasts for photosynthesis, 3) large central vacuole. Animal cell lacks these but has centrioles (for division)." },
    ],
    quickSummary: "Cell — the smallest living unit. Has membrane, nucleus (DNA), mitochondria (energy), ER, ribosomes. Plant cells + wall, chloroplasts, vacuole. Prokaryotes — no nucleus, eukaryotes — with nucleus.",
    facts: ["The largest cell is an ostrich egg (15 cm)", "Bacterial cells are 10 times smaller than human ones", "A nerve cell can be up to 1 meter long", "Mitochondria have their own DNA — proof of endosymbiosis"],
    quiz: [q("What is the cell's control center?", ["Mitochondria", "Nucleus", "Membrane", "Ribosome"], 1), q("Where is energy produced?", ["In the nucleus", "In mitochondria", "In the membrane", "In the vacuole"], 1), q("What do only plant cells have?", ["Nucleus", "Chloroplasts", "Mitochondria", "Ribosomes"], 1), q("What are ribosomes?", ["Food storage", "Protein synthesis machines", "Protective shell", "Power stations"], 1), q("Prokaryotes differ in that they:", ["Have a nucleus", "Don't have a nucleus", "Are bigger than eukaryotes", "Have chloroplasts"], 1)],
  },

  "photosynthesis": {
    title: "Photosynthesis",
    shortDescription: "How plants turn sunlight into food",
    introduction: "Photosynthesis is one of the most important processes on Earth. Without it, there would be no oxygen in the atmosphere, and animal life would be impossible.",
    theory: "**General equation:**\n6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂\n\nPhotosynthesis occurs in chloroplasts and has two phases:\n\n**1. Light phase** (on thylakoid membranes):\n- Chlorophyll absorbs light photons\n- Photolysis of water: 2H₂O → 4H⁺ + 4e⁻ + O₂ (that's where oxygen comes from!)\n- ATP and NADPH are synthesized\n\n**2. Dark phase (Calvin cycle)** (in chloroplast stroma):\n- Doesn't directly require light, but uses ATP and NADPH\n- CO₂ fixation\n- Glucose and other organic substances are formed",
    beginnerExplanation: "Plants can make their own food! They use sunlight, water, and carbon dioxide from the air. The plant gets sugar (glucose) for growth and releases oxygen.",
    detailedExplanation: "Photosynthesis is a biochemical process in chloroplasts. Chlorophyll absorbs photons, triggering the light phase (water photolysis, ATP and NADPH synthesis) and dark phase (Calvin cycle), where CO₂ is fixed into organic molecules.",
    simpleExplanation: "The plant drinks water, breathes air, and catches sunshine. From this, it makes food for itself and releases oxygen for us!",
    keyTerms: [
      { term: "Chloroplast", definition: "A plant cell organelle where photosynthesis occurs" },
      { term: "Chlorophyll", definition: "A green pigment that absorbs light energy" },
      { term: "Photolysis", definition: "The splitting of a water molecule by light" },
      { term: "Calvin cycle", definition: "The dark phase of photosynthesis where CO₂ is fixed" },
      { term: "ATP", definition: "Adenosine triphosphate — the universal energy molecule of the cell" },
    ],
    formulas: [
      "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂",
      "Photolysis: 2H₂O → 4H⁺ + 4e⁻ + O₂",
    ],
    quickSummary: "6CO₂ + 6H₂O + light → glucose + 6O₂. Light phase: in thylakoids (photolysis, ATP). Dark phase: Calvin cycle (CO₂ fixation). Chlorophyll absorbs red and blue light.",
    facts: ["A large tree produces about 100 kg of oxygen per year", "Photosynthesis efficiency is only about 1-2%", "Cyanobacteria first produced oxygen 2.4 billion years ago", "Without photosynthesis, all oxygen would disappear in ~2000 years"],
    quiz: [q("Where does photosynthesis occur?", ["Mitochondria", "Chloroplasts", "Nucleus", "Ribosome"], 1), q("What is released?", ["CO₂", "Oxygen", "Nitrogen", "Hydrogen"], 1), q("What is needed?", ["Oxygen", "Light + CO₂ + H₂O", "Only water", "Only soil"], 1), q("In what phase is oxygen released?", ["Dark", "Light", "Both", "Neither"], 1)],
  },

  "cell-division": {
    title: "Cell Division (Mitosis)",
    shortDescription: "How cells multiply",
    introduction: "Cell division is the foundation of growth, development, and repair. Without mitosis, a wound wouldn't heal and an organism couldn't grow.",
    beginnerExplanation: "Mitosis — cell division with DNA duplication. 4 phases: prophase, metaphase, anaphase, telophase. Result: 2 identical cells.",
    detailedExplanation: "Interphase: DNA replication. Prophase: chromosome condensation. Metaphase: alignment. Anaphase: separation. Telophase: two nuclei. Cytokinesis: cell splitting.",
    simpleExplanation: "Cells divide in two to grow and repair damage!",
    keyTerms: [
      { term: "Mitosis", definition: "Cell division resulting in two genetically identical daughter cells" },
      { term: "Chromosome", definition: "A condensed DNA molecule with proteins" },
      { term: "Interphase", definition: "Period between divisions when DNA replicates" },
    ],
    quickSummary: "Mitosis: 1 cell → 2 identical. Phases: prophase → metaphase → anaphase → telophase + cytokinesis. Before: DNA replication in interphase. Purpose: growth, repair.",
    facts: ["The human body produces millions of cells every second", "Some cells never divide (neurons)", "Cancer is uncontrolled mitosis"],
    quiz: [q("The result of mitosis?", ["1 cell", "2 identical cells", "4 cells", "8 cells"], 1), q("In what phase do chromosomes align?", ["Prophase", "Metaphase", "Anaphase", "Telophase"], 1), q("When is DNA copied?", ["Interphase", "Metaphase", "During division", "Anaphase"], 0)],
  },

  "cell-respiration": {
    title: "Cellular Respiration",
    shortDescription: "How cells obtain energy",
    introduction: "Cellular respiration is the opposite process of photosynthesis. While photosynthesis stores energy in glucose, cellular respiration releases this energy to power the cell's work. This process occurs in every cell of every living organism — from bacteria to humans.",
    theory: "**General equation:**\nC₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 36-38 ATP\n\n**Three stages of cellular respiration:**\n\n**1. Glycolysis** (in the cytoplasm):\n- Glucose (6C) → 2 molecules of pyruvic acid (3C)\n- Output: 2 ATP + 2 NADH\n- Does not require oxygen (anaerobic)\n\n**2. Krebs Cycle** (in the mitochondrial matrix):\n- Pyruvate → acetyl-CoA → series of reactions\n- Output: 2 ATP + 8 NADH + 2 FADH₂ + 6CO₂\n- Requires oxygen\n\n**3. Electron Transport Chain (ETC)** (on the inner mitochondrial membrane):\n- NADH and FADH₂ donate electrons\n- Electrons pass through a chain of proteins\n- H⁺ gradient is used by ATP synthase\n- Output: 32-34 ATP\n- Oxygen is the final electron acceptor\n\n**Anaerobic respiration (fermentation):**\nWithout oxygen: glycolysis → lactic acid fermentation (in muscles) or alcoholic fermentation (in yeast). Output: only 2 ATP.",
    beginnerExplanation: "Cellular respiration is the process by which cells 'burn' glucose to obtain energy (ATP). Oxygen is required for this process to be most efficient.",
    detailedExplanation: "Cellular respiration includes glycolysis, the Krebs cycle, and the electron transport chain. The general equation is: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 36-38 ATP.",
    simpleExplanation: "When you eat a candy, your cells take the sugar and, with the help of oxygen, turn it into energy. It's like a tiny motor running inside every cell!",
    keyTerms: [
      { term: "Glycolysis", definition: "The breakdown of glucose into 2 molecules of pyruvic acid" },
      { term: "Krebs Cycle", definition: "A series of chemical reactions used by all aerobic organisms to generate energy" },
      { term: "ATP synthase", definition: "An enzyme that creates the energy storage molecule ATP" },
      { term: "Fermentation", definition: "An anaerobic process of energy production without oxygen" },
    ],
    formulas: [
      "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 36-38 ATP",
      "Glycolysis: C₆H₁₂O₆ → 2C₃H₄O₃ + 2ATP + 2NADH",
      "Alcoholic fermentation: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + 2ATP",
    ],
    examples: [
      "During a sprint, muscles need a lot of ATP. When oxygen is low, lactic acid fermentation begins → lactic acid accumulates → muscle soreness",
      "Yeast in baking: fermentation releases CO₂ → the dough rises",
    ],
    problemSolving: [
      { 
        problem: "Why do muscles ache after intense exercise?", 
        solution: "During rapid exertion, there isn't enough oxygen for aerobic respiration. Cells switch to lactic acid fermentation: glucose → lactic acid + 2 ATP. Lactic acid builds up in the muscles and causes pain." 
      },
    ],
    quickSummary: "Cellular respiration: glucose + O₂ → CO₂ + H₂O + 36-38 ATP. Three stages: glycolysis (cytoplasm), Krebs cycle (mitochondria), ETC (mitochondrial membrane). Without O₂ — fermentation (2 ATP).",
    facts: [
      "One glucose molecule provides up to 38 ATP molecules", 
      "Without oxygen, cells switch to fermentation", 
      "Mitochondria have their own DNA", 
      "ATP is recycled in the body ~500 times a day"
    ],
    quiz: [
      q("What is required for cellular respiration?", ["Only water", "Glucose and oxygen", "Only light", "CO₂"], 1), 
      q("Where does the main stage occur?", ["In the nucleus", "In the mitochondria", "In the membrane", "In the vacuole"], 1), 
      q("What is the main product?", ["DNA", "ATP (energy)", "Protein", "Fat"], 1), 
      q("How much ATP does fermentation yield?", ["38", "2", "10", "0"], 1)
    ],
  },

  "tissue-types": {
    title: "Human Tissue Types",
    shortDescription: "The four primary types of tissue",
    introduction: "A tissue is a group of cells with a similar structure that work together to perform a specific function. Understanding tissues is the foundation of anatomy and medicine. All body organs are constructed from combinations of four basic tissue types.",
    theory: "**The 4 Types of Tissue:**\n\n**1. Epithelial Tissue:**\n- Covers body surfaces and lines internal cavities.\n- Consists of tightly packed cells with minimal intercellular substance.\n- Types: simple, stratified, glandular.\n- Examples: skin, mouth lining, blood vessel walls.\n- Functions: protection, absorption, secretion.\n\n**2. Connective Tissue:**\n- The most diverse type! Contains a large amount of intercellular matrix.\n- Subtypes: loose and dense fibrous, cartilage, bone, blood, adipose (fat).\n- Examples: bones, tendons, blood, fat tissue.\n- Functions: support, protection, transport, energy storage.\n\n**3. Muscle Tissue:**\n- Specialized for contraction and movement.\n- Skeletal (striated): voluntary control, attached to bones, enables movement.\n- Smooth: involuntary, lines organ walls (stomach, intestines, vessels).\n- Cardiac: automatic, found only in the heart, highly resistant to fatigue.\n\n**4. Nervous Tissue:**\n- Composed of neurons and glial cells.\n- Neuron structure: dendrites (receive signals) → cell body → axon (transmits signals).\n- Synapses: specialized junctions for communication between neurons.\n- Function: receiving, processing, and transmitting information throughout the body.",
    beginnerExplanation: "The human body is made of four main types of tissue: epithelial (covering surfaces), connective (linking and supporting), muscle (enabling movement), and nervous (transmitting signals).",
    detailedExplanation: "Epithelial tissue lines surfaces and cavities. Connective tissue includes specialized forms like blood, bone, and cartilage. Muscle tissue is categorized into skeletal, smooth, and cardiac types. Nervous tissue consists of signal-conducting neurons and supporting glial cells.",
    simpleExplanation: "Tissue is like a team of identical cells working together. Think of them as specialized units: some protect, some move, and others send messages!",
    keyTerms: [
      { term: "Tissue", definition: "A group of cells with similar structure and function" },
      { term: "Epithelium", definition: "Tissue that covers body surfaces and lines internal cavities" },
      { term: "Neuron", definition: "A specialized nerve cell that transmits electrical impulses" },
      { term: "Intercellular matrix", definition: "The substance found between cells, especially prominent in connective tissue" },
    ],
    examples: [
      "Skin — stratified squamous epithelium: protects against mechanical damage and microbes",
      "Blood — a liquid connective tissue: erythrocytes carry oxygen, while leukocytes fight infection",
      "Biceps — skeletal muscle: contracts to bend the arm",
    ],
    quickSummary: "The 4 tissue types are: 1) Epithelial — protection and lining. 2) Connective — support and transport (bones, blood). 3) Muscle — movement (skeletal, smooth, cardiac). 4) Nervous — signal transmission.",
    facts: [
      "Blood is technically a specialized type of connective tissue", 
      "The cardiac muscle works continuously without rest for a lifetime", 
      "Nerve impulses can travel at speeds up to 120 m/s"
    ],
    quiz: [
      q("How many primary tissue types are in the human body?", ["2", "4", "6", "8"], 1), 
      q("Which tissue is responsible for transmitting signals?", ["Muscle", "Nervous", "Epithelial", "Connective"], 1), 
      q("Which of the following is a type of connective tissue?", ["Skin", "Blood", "Muscle", "Nerve"], 1), 
      q("Which muscle type does not get fatigued?", ["Skeletal", "Smooth", "Cardiac", "All of them"], 2)
    ],
  },

  "nervous-system": {
    title: "The Nervous System",
    shortDescription: "The body's main computer",
    introduction: "The nervous system is the most complex system in the body. It coordinates all functions: from heartbeat to thinking, from movement to emotions. The human brain remains the most complex object in the known universe.",
    theory: "**Structure of the Nervous System:**\n\n**Central NS (CNS):**\n- Brain: cerebral hemispheres (cortex — thinking, memory), cerebellum (coordination), brainstem (vital functions)\n- Spinal cord: responsible for reflexes and acts as a conductor between the brain and the body\n\n**Peripheral NS (PNS):**\n- Somatic: controls voluntary movements (e.g., deciding to raise your hand)\n- Autonomic (autonomic): controls involuntary functions\n  - Sympathetic: 'fight or flight' (accelerates heart rate, dilates pupils)\n  - Parasympathetic: 'rest and digest' (slows heart rate, stimulates digestion)\n\n**The Neuron:**\n- Dendrites → cell body → axon (can be up to 1 meter long!)\n- Myelin sheath: an insulating layer that accelerates impulse transmission\n- Synapse: the junction between an axon and a dendrite. Neurotransmitters (dopamine, serotonin, acetylcholine) transmit signals chemically across the synaptic cleft.\n\n**Reflex Arc:**\nReceptor → afferent nerve → CNS → efferent nerve → effector (muscle or gland)",
    beginnerExplanation: "The nervous system is a network of nerves and the brain that controls your entire body. The brain receives information from the senses, processes it, and sends commands to muscles and organs.",
    detailedExplanation: "The system is divided into the CNS (brain and spinal cord) and the PNS (nerves). Neurons consist of dendrites, a cell body, and an axon. Communication occurs at synapses using chemical messengers called neurotransmitters.",
    simpleExplanation: "The nervous system is like the body's internet. The brain is the server, and the nerves are the wires carrying messages to your hands, feet, and eyes!",
    keyTerms: [
      { term: "CNS", definition: "Central Nervous System — consisting of the brain and spinal cord" },
      { term: "Synapse", definition: "The junction where signals are transmitted from one neuron to another" },
      { term: "Neurotransmitter", definition: "A chemical substance that transmits signals across a synapse" },
      { term: "Reflex", definition: "An automatic, involuntary response to a stimulus" },
      { term: "Myelin sheath", definition: "An insulating cover for axons that speeds up electrical impulses" },
    ],
    examples: [
      "The withdrawal reflex: pulling your hand away from a hot surface (receptor in skin → spinal cord → arm muscle) without involving the brain!",
      "Dopamine release: triggered when you experience something pleasant, creating motivation to repeat the action",
    ],
    quickSummary: "NS = CNS (brain + spinal cord) + PNS (nerves). Neuron structure: dendrites → body → axon. Signals are transmitted via electrical impulses and chemical neurotransmitters at synapses. There are 86 billion neurons in the brain.",
    facts: [
      "The brain uses 20% of the body's total energy", 
      "The total length of all nerves in the body is about 75 km", 
      "Nerve signals travel in milliseconds", 
      "The brain processes information faster than any current computer"
    ],
    quiz: [
      q("What is the center of the nervous system?", ["Heart", "Brain", "Liver", "Stomach"], 1), 
      q("How is a nerve signal transmitted?", ["Through blood", "By electrical impulses", "Through the air", "By water"], 1), 
      q("Approximately how many neurons are in the brain?", ["1 million", "86 billion", "100 thousand", "1 trillion"], 1), 
      q("What is a synapse?", ["A type of cell", "The site of signal transmission", "A part of the brain", "A hormone"], 1)
    ],
  },
  "immune-system": {
    title: "The Immune System",
    shortDescription: "The body's protective army",
    introduction: "The immune system is a complex network of cells, tissues, and organs that protects the body from pathogenic microorganisms. Every day, it fends off attacks from thousands of viruses and bacteria attempting to penetrate the body.",
    theory: "**Components of the Immune System:**\n\n**1. Innate Immunity (Non-specific):**\n- Your first line of defense.\n- Includes physical barriers (skin, mucous membranes) and specialized cells like phagocytes and natural killer (NK) cells.\n- Acts immediately but doesn't 'remember' specific threats.\n\n**2. Adaptive Immunity (Specific):**\n- Targeted defense that develops over time.\n- **B-lymphocytes**: Produce antibodies to neutralize pathogens.\n- **T-lymphocytes**: Directly destroy infected cells (cytotoxic T-cells) or coordinate the immune response (helper T-cells).\n- Creates **Immune Memory**, allowing the body to react faster upon re-exposure.\n\n**3. Organs of the Immune System:**\n- Bone marrow (site of cell production).\n- Thymus (where T-cells mature).\n- Lymph nodes and spleen (filtration and activation centers).",
    beginnerExplanation: "The immune system is the body's defender against disease. White blood cells act like soldiers, constantly patrolling for viruses and bacteria to find and destroy them.",
    detailedExplanation: "Immunity is divided into innate (skin, phagocytes, NK cells) and adaptive (T and B-lymphocytes). Adaptive immunity relies on antibodies and immune memory, which is the scientific basis for vaccination.",
    simpleExplanation: "Imagine your body has tiny soldiers inside. When an enemy virus enters, they hunt it down and eliminate it to keep you healthy!",
    keyTerms: [
      { term: "Antibody", definition: "A protein produced by B-cells that recognizes and binds to a specific antigen" },
      { term: "Antigen", definition: "A foreign molecule or substance that triggers an immune response" },
      { term: "Phagocytosis", definition: "The process by which certain cells engulf and digest microbes or cellular debris" },
      { term: "Vaccination", definition: "Introducing a weakened or inactivated pathogen to train the immune system and create memory" },
    ],
    quickSummary: "Immunity = Innate (general protection) + Adaptive (specific memory). B-cells produce antibodies, while T-cells handle cellular defense. Immune memory is what makes vaccines effective.",
    facts: [
      "Every day, your immune system identifies and destroys potentially cancerous cells", 
      "An antibody can distinguish one specific virus from millions of other molecules", 
      "Vaccination saves between 3.5 and 5 million lives globally every year"
    ],
    quiz: [
      q("What protects the body from diseases?", ["Bones", "Immune system", "Muscles", "Skin"], 1), 
      q("Which cells are primarily responsible for fighting infections?", ["Erythrocytes", "Leukocytes", "Platelets", "Neurons"], 1), 
      q("What is the scientific principle behind vaccination?", ["Antibiotics", "Immune memory", "Surgery", "Special diet"], 1)
    ],
  },

  "hormones": {
    title: "Human Hormones",
    shortDescription: "The body's chemical messengers",
    introduction: "Hormones are chemical substances that regulate virtually all processes in the body: from growth to mood, from sleep to reproduction. The endocrine system works more slowly than the nervous system, but its effects are long-lasting and global.",
    theory: "**The Endocrine System and Its Functions:**\n\n**1. Major Glands:**\n- **Hypothalamus & Pituitary**: The control centers. The pituitary is often called the 'master gland' because it regulates other endocrine glands.\n- **Thyroid**: Regulates metabolism and energy levels.\n- **Adrenal Glands**: Produce adrenaline (epinephrine) for stress response.\n- **Pancreas**: Secretes insulin to regulate blood sugar.\n- **Gonads**: Produce sex hormones (estrogen, testosterone).\n\n**2. Mechanism of Action:**\n- Hormones are secreted into the bloodstream and travel to target organs.\n- They act by binding to specific receptors on target cells, similar to a key fitting into a lock.\n\n**3. Regulation:**\n- Most hormones are regulated by **Negative Feedback Loops**. When the level of a hormone is high enough, the system shuts down its production to maintain balance (homeostasis).",
    beginnerExplanation: "Hormones are chemical substances produced by glands that travel through your blood, controlling various processes like growth, mood, appetite, and sleep.",
    detailedExplanation: "The endocrine system includes the hypothalamus, pituitary, thyroid, adrenals, pancreas, and gonads. Hormones act via specific receptors on target cells, and their levels are primarily regulated through feedback mechanisms.",
    simpleExplanation: "Hormones are like mail carriers delivering messages throughout your body. One says 'grow!', another says 'time to sleep!'",
    keyTerms: [
      { term: "Endocrine system", definition: "The network of glands that produce and secrete hormones directly into the blood" },
      { term: "Pituitary gland", definition: "A small, pea-sized gland at the base of the brain that acts as the 'master gland' controlling others" },
      { term: "Insulin", definition: "A hormone produced by the pancreas that lowers blood glucose levels" },
      { term: "Feedback loop", definition: "A biological mechanism where the output of a process regulates the process itself" },
    ],
    quickSummary: "Hormones are chemical messengers traveling via the blood. Key glands include the pituitary (master), thyroid, adrenals, and pancreas. Regulation occurs primarily through feedback loops to maintain homeostasis.",
    facts: [
      "Adrenaline can significantly increase physical strength during a life-or-death crisis", 
      "Serotonin influences mood and is often called the 'happiness hormone'", 
      "The pituitary gland is about the size of a pea but controls almost all other glands"
    ],
    quiz: [
      q("How do hormones travel through the body?", ["Via nerves", "Through the blood", "Through the skin", "Through the air"], 1), 
      q("Which hormone regulates blood sugar levels?", ["Adrenaline", "Insulin", "Melatonin", "Serotonin"], 1), 
      q("Which gland is referred to as the 'master gland'?", ["Thyroid", "Pituitary", "Adrenals", "Pancreas"], 1)
    ],
  },

  "dna": {
    title: "DNA Structure",
    shortDescription: "The code of life in every cell",
    introduction: "DNA (deoxyribonucleic acid) is the molecule that stores all genetic information of a living organism. It determines eye color, height, disease predisposition, and thousands of other traits.",
    theory: "**DNA structure:**\n- Double helix of two antiparallel chains\n- Monomer — nucleotide: deoxyribose sugar + phosphate group + nitrogenous base\n\n**4 bases:** Adenine (A), Thymine (T), Guanine (G), Cytosine (C)\n\n**Chargaff's rule:** A=T, G=C (complementarity)\n\n**Gene** — a DNA segment coding for a protein\n**Human genome** — 3.2 billion base pairs, ~20,000 genes\n\n**Replication** — DNA copying before cell division (semiconservative)",
    beginnerExplanation: "DNA is a molecule that stores your body's instructions. It looks like a twisted ladder. Letters A, T, G, C — a code that defines everything about you.",
    detailedExplanation: "Double helix of nucleotides (sugar + phosphate + base). Complementarity: A-T, G-C. Gene codes a protein. Replication — copying. Human genome = 3.2 billion base pairs.",
    simpleExplanation: "DNA is like a recipe book for your body. It describes how to make every part of you!",
    keyTerms: [
      { term: "Nucleotide", definition: "DNA monomer: sugar + phosphate + nitrogenous base" },
      { term: "Complementarity", definition: "Base pairing principle: A-T, G-C" },
      { term: "Gene", definition: "A DNA segment coding for a protein or functional RNA" },
      { term: "Replication", definition: "The process of DNA copying before cell division" },
      { term: "Genome", definition: "The complete set of an organism's genetic information" },
    ],
    formulas: [
      "Chargaff's rule: A = T, G = C",
      "A + G = T + C (purines = pyrimidines)",
      "If A = 30%, then T = 30%, G = 20%, C = 20%",
    ],
    problemSolving: [
      { problem: "If a DNA molecule has 20% adenine, how much of the other bases?", solution: "By Chargaff's rule: A = T, so T = 20%. A + T = 40%. Remainder: G + C = 60%. G = C, so G = 30%, C = 30%." },
    ],
    quickSummary: "DNA — double helix of nucleotides (A-T, G-C). Stores genetic info. Gene codes protein. Replication creates copy. Human genome = 3.2B base pairs. Chargaff's rule: A=T, G=C.",
    facts: ["Uncoiling the DNA of one cell yields 2 meters", "Humans share 99.9% identical DNA", "Scientists read mammoth DNA!", "DNA from all body cells stretched out would reach Pluto"],
    quiz: [q("What shape does DNA have?", ["Sphere", "Double helix", "Ring", "Star"], 1), q("Where is DNA found?", ["Only in the brain", "In every cell", "Only in blood", "In skin"], 1), q("If A=30%, G=?", ["30%", "20%", "10%", "40%"], 1), q("What is a gene?", ["Chromosome", "DNA segment", "Cell", "Protein"], 1)],
  },

  "genetics-mendel": {
    title: "Mendel's Laws",
    shortDescription: "How traits are inherited",
    introduction: "Gregor Mendel — a monk who became the father of genetics. His experiments with peas in the 19th century laid the foundation for understanding how traits pass from parents to offspring.",
    beginnerExplanation: "Mendel discovered how traits pass from parents to children. Some traits are dominant (expressed), others recessive (hidden).",
    detailedExplanation: "First law: crossing homozygotes gives uniform F1. Second: F2 splits 3:1. Third: alleles of different genes combine independently.",
    simpleExplanation: "Mendel planted peas of different colors and watched what color the 'children' were. He figured out the rules of heredity!",
    keyTerms: [
      { term: "Dominant allele", definition: "An allele expressed in the phenotype even in one copy" },
      { term: "Recessive allele", definition: "An allele expressed only in homozygous state" },
      { term: "Homozygote", definition: "An organism with two identical alleles (AA or aa)" },
      { term: "Heterozygote", definition: "An organism with two different alleles (Aa)" },
      { term: "Phenotype", definition: "The external expression of a trait" },
      { term: "Genotype", definition: "The set of alleles of an organism" },
    ],
    formulas: [
      "P: AA × aa → F1: 100% Aa (all dominant)",
      "F1: Aa × Aa → F2: 1AA : 2Aa : 1aa (phenotype 3:1)",
      "Punnett square for dihybrid: 9:3:3:1",
    ],
    problemSolving: [
      { problem: "Brown eyes (B) dominate over blue (b). Both parents Bb. What's the probability of blue eyes?", solution: "Bb × Bb → BB : Bb : Bb : bb = 3 brown : 1 blue. Probability of blue = 1/4 = 25%." },
    ],
    quickSummary: "3 laws: 1) F1 uniformity. 2) F2 splitting = 3:1. 3) Independent assortment. Dominant (A) always expressed, recessive (a) only in homozygote (aa).",
    facts: ["Mendel worked with 28,000 pea plants", "His work wasn't recognized for 35 years", "Mendel is the founder of genetics"],
    quiz: [q("Who is the father of genetics?", ["Darwin", "Mendel", "Watson", "Crick"], 1), q("What is the F2 ratio?", ["1:1", "3:1", "2:1", "4:1"], 1), q("Which traits appear in F1?", ["Recessive", "Dominant", "Both", "None"], 1), q("Aa is...", ["Homozygote", "Heterozygote", "Recessive", "Mutation"], 1)],
  },

  "mutations": {
    title: "Mutations",
    shortDescription: "DNA errors that change life",
    introduction: "Mutations are changes in the DNA sequence. They can be neutral, harmful, or even beneficial. Mutations are the 'raw material' for evolution.",
    beginnerExplanation: "Mutations are changes in DNA. They can be harmful, beneficial, or neutral.",
    detailedExplanation: "Gene mutations: substitution, insertion, deletion of nucleotides. Chromosomal: deletion, duplication, inversion. Genomic: polyploidy, aneuploidy.",
    simpleExplanation: "Imagine a typo in a recipe. Sometimes the dish even tastes better!",
    keyTerms: [
      { term: "Mutagen", definition: "A factor that causes mutations (radiation, chemicals)" },
      { term: "Point mutation", definition: "Replacement of one nucleotide with another" },
      { term: "Deletion", definition: "Loss of a chromosome segment" },
      { term: "Polyploidy", definition: "A multiple increase in chromosome sets" },
    ],
    quickSummary: "Mutations — changes in DNA. Types: gene (one nucleotide), chromosomal (part of chromosome), genomic (chromosome number). Mutagens: radiation, chemicals. Most mutations are neutral.",
    facts: ["Most mutations are neutral", "Blue eyes appeared from a mutation 6,000-10,000 years ago", "One gene mutation can cause sickle cell anemia"],
    quiz: [q("What is a mutation?", ["Disease", "DNA change", "Cell type", "Hormone"], 1), q("Are all mutations harmful?", ["Yes", "No, can be beneficial or neutral", "Only neutral", "Only beneficial"], 1), q("What can cause a mutation?", ["Sleep", "Radiation", "Water", "Air"], 1)],
  },

  "evolution-darwin": {
    title: "Darwin's Theory of Evolution",
    shortDescription: "How the diversity of life appeared",
    introduction: "The theory of evolution explains how all the diversity of life on Earth appeared. Charles Darwin proposed the mechanism — natural selection.",
    beginnerExplanation: "Darwin explained that all living organisms change over time. Those better adapted survive and pass their traits to offspring.",
    detailedExplanation: "Main principles: variability, heredity, struggle for existence, natural selection. Microevolution — within species, macroevolution — new taxa.",
    simpleExplanation: "Whoever hides better from predators survives. After millions of years — everyone learned to hide!",
    keyTerms: [
      { term: "Natural selection", definition: "Survival and reproduction of the best-adapted organisms" },
      { term: "Adaptation", definition: "An organism's adjustment to environmental conditions" },
      { term: "Species", definition: "A group of organisms capable of free interbreeding" },
    ],
    quickSummary: "Evolution: organisms change over time through natural selection. 4 conditions: variability, heredity, struggle for existence, survival of the fittest. Evidence: fossils, comparative anatomy, molecular biology.",
    facts: ["Darwin traveled on the Beagle for 5 years", "Humans and bananas share 60% DNA", "Evolution is happening right now"],
    quiz: [q("What is natural selection?", ["Artificial breeding", "Survival of the fittest", "Mutation", "Cloning"], 1), q("Who formulated the theory?", ["Mendel", "Lamarck", "Darwin", "Newton"], 2), q("How much DNA do humans and bananas share?", ["0%", "60%", "99%", "10%"], 1)],
  },

  "natural-selection": {
    title: "Natural Selection",
    shortDescription: "The engine of evolution",
    introduction: "Natural selection is the main driving force of evolution — organisms with beneficial traits have more chances to survive and leave offspring.",
    beginnerExplanation: "Giraffes with longer necks get more food. They survive and pass the 'long neck' to children.",
    detailedExplanation: "Forms: directional, stabilizing, disruptive. Sexual selection. Selection acts on phenotype, changes the gene pool of a population.",
    simpleExplanation: "Nature 'chooses' those who are better adapted!",
    keyTerms: [
      { term: "Directional selection", definition: "Shifting the average trait value in one direction" },
      { term: "Stabilizing selection", definition: "Preserving the average trait value" },
      { term: "Sexual selection", definition: "Choosing a partner based on attractive traits" },
    ],
    quickSummary: "Natural selection — survival of the fittest. Forms: directional (changes average), stabilizing (preserves average), disruptive (extreme forms). Acts on phenotype.",
    facts: ["Bacteria evolve antibiotic resistance within years", "The peppered moth changed color due to the Industrial Revolution"],
    quiz: [q("What is natural selection?", ["Human selection", "Survival of the fittest", "Mutation", "Migration"], 1), q("Which form preserves the average trait?", ["Directional", "Stabilizing", "Disruptive", "Sexual"], 1)],
  },

  "ecosystem": {
    title: "Ecosystem",
    shortDescription: "How organisms and nature work together",
    introduction: "An ecosystem is a complex system of interactions between living organisms and their environment. Understanding ecosystems is critical for nature conservation.",
    beginnerExplanation: "An ecosystem is a community of living organisms and their environment. Forest, lake, desert — all are ecosystems.",
    detailedExplanation: "Components: biotic (producers, consumers, decomposers) and abiotic (light, water, soil). Food chains. Cycling of substances and energy flow.",
    simpleExplanation: "An ecosystem is like a big house where all residents depend on each other!",
    keyTerms: [
      { term: "Producers", definition: "Organisms that produce organic substances (plants)" },
      { term: "Consumers", definition: "Organisms that consume others (animals)" },
      { term: "Decomposers", definition: "Organisms that break down dead organic matter (fungi, bacteria)" },
      { term: "Food chain", definition: "A sequence of organisms where each is food for the next" },
    ],
    quickSummary: "Ecosystem = living organisms + environment. Producers (plants) → consumers (animals) → decomposers (fungi). Energy flows, matter cycles. Every species matters.",
    facts: ["The disappearance of one species can destroy an ecosystem", "The ocean produces 70% of oxygen", "Tropical forests are the richest ecosystems"],
    quiz: [q("What is an ecosystem?", ["Only animals", "Organisms + environment", "Only forest", "Only water"], 1), q("Who are producers?", ["Animals", "Plants", "Fungi", "Bacteria"], 1), q("What do decomposers do?", ["Photosynthesis", "Break down dead organic matter", "Hunt", "Grow"], 1)],
  },

  "food-chains": {
    title: "Food Chains and Webs",
    shortDescription: "Who eats whom in nature",
    introduction: "Food chains show how energy and matter are transferred from one organism to another. This is the foundation of understanding ecological connections.",
    beginnerExplanation: "Grass → rabbit → fox → eagle. Each organism is food for the next. This is a food chain.",
    detailedExplanation: "Trophic levels: producers, primary, secondary, tertiary consumers. 10% rule: only 10% of energy transfers to the next level. Ecological pyramid.",
    simpleExplanation: "It's like the game 'who eats whom': grass feeds the rabbit, rabbit feeds the fox, and fox feeds the eagle!",
    keyTerms: [
      { term: "Trophic level", definition: "An organism's position in the food chain" },
      { term: "10% rule", definition: "Only about 10% of energy transfers to the next trophic level" },
    ],
    quickSummary: "Food chain: producers → primary consumers → secondary → tertiary. Only 10% of energy passes to the next level. Ecological pyramid. Food web = interconnected chains.",
    facts: ["An ecosystem may contain hundreds of food chains", "Losing one species disrupts the entire web", "Humans are at the top of most food chains"],
    quiz: [q("What is a trophic level?", ["Species", "Position in food chain", "Ecosystem type", "Population"], 1), q("How much energy passes to the next level?", ["100%", "10%", "50%", "1%"], 1)],
  },

  "natural-numbers": {
    title: "Natural Numbers",
    shortDescription: "The simplest and first numbers",
    introduction: "Natural numbers are the first numbers we learn: 1, 2, 3, 4, 5... They're used for counting and ordering.",
    beginnerExplanation: "Natural numbers: 1, 2, 3, 4, 5... Used for counting. The smallest is 1. There's no largest — they go to infinity.",
    detailedExplanation: "N = {1, 2, 3, ...}. Properties: closure under + and ×. Digit systems: decimal, binary. Even: divisible by 2. Odd: not divisible. Prime: divisible only by 1 and itself.",
    simpleExplanation: "Natural numbers are what you count on your fingers: 1, 2, 3, 4, 5!",
    keyTerms: [
      { term: "Natural number", definition: "A positive integer used for counting: 1, 2, 3..." },
      { term: "Prime number", definition: "A number divisible only by 1 and itself" },
      { term: "Digit", definition: "A symbol for writing numbers: 0, 1, 2...9" },
    ],
    quickSummary: "N = {1, 2, 3, ...}. Even: 2,4,6... Odd: 1,3,5... Primes: 2,3,5,7,11... Divisibility rules. Decimal system.",
    facts: ["0 is not a natural number (in most conventions)", "There are infinitely many prime numbers", "Eratosthenes' sieve finds primes"],
    quiz: [q("The smallest natural number?", ["0", "1", "-1", "2"], 1), q("7 — is it prime?", ["Yes", "No", "Maybe", "It's even"], 0), q("12 is divisible by...", ["5", "7", "3", "8"], 2)],
  },

  "fractions-basics": {
    title: "Fractions",
    shortDescription: "Parts of a whole",
    introduction: "Fractions allow us to express parts of a whole. Half a pizza, a quarter of an hour, three-fifths of the way — these are all fractions.",
    beginnerExplanation: "A fraction a/b: numerator (a) — how many parts taken, denominator (b) — how many parts total. 1/2 is half.",
    detailedExplanation: "Proper fraction: numerator < denominator. Improper: numerator ≥ denominator. Addition: common denominator. Multiplication: multiply numerator × numerator, denominator × denominator.",
    simpleExplanation: "Fractions — like pieces of pizza. Cut into 4 pieces, took 1 — that's 1/4!",
    keyTerms: [
      { term: "Numerator", definition: "The top number of a fraction — how many parts taken" },
      { term: "Denominator", definition: "The bottom number — how many equal parts total" },
      { term: "Common denominator", definition: "A denominator that's the same for two fractions (for addition)" },
    ],
    formulas: [
      "a/b + c/d = (ad + bc) / bd",
      "a/b × c/d = ac / bd",
      "a/b ÷ c/d = a/b × d/c",
    ],
    problemSolving: [
      { problem: "1/3 + 1/4 = ?", solution: "Common denominator = 12. 4/12 + 3/12 = 7/12" },
    ],
    quickSummary: "Fraction a/b. Numerator — parts taken, denominator — total parts. Addition: find common denominator. Multiplication: top×top, bottom×bottom. Division: multiply by reciprocal.",
    facts: ["Egyptians used only unit fractions (1/n)", "0.5 = 1/2 = 50%", "Fractions are thousands of years old"],
    quiz: [q("1/2 + 1/3 = ?", ["2/5", "5/6", "1/5", "3/6"], 1), q("3/4 of 100 = ?", ["25", "50", "75", "34"], 2), q("What is the numerator?", ["Bottom", "Top number", "Sign", "Whole part"], 1)],
  },

  "percentages": {
    title: "Percentages",
    shortDescription: "A part of 100",
    introduction: "Percentages are everywhere: store discounts, test scores, and interest rates on loans. They provide a universal way to compare parts of a whole.",
    theory: "A **percentage** is a way of expressing a number as a fraction of 100. The symbol **%** is used to denote it.\n\n**Basic Operations:**\n* **Finding a percentage of a number**: To find $a\%$ of $b$, use the formula: $\\frac{a \\times b}{100}$.\n* **Finding a number from its percentage**: If $a\\%$ of a number is $x$, the whole number is $x \\times \\frac{100}{a}$.\n* **Percentage ratio**: To find what percentage $a$ is of $b$: $\\frac{a}{b} \\times 100\\%$.",
    beginnerExplanation: "A percentage is one-hundredth of a number. For example, 50% is half, 25% is a quarter, and 100% is the entire whole.",
    detailedExplanation: "1% equals 1/100. To find a percentage: $a\\% \\text{ of } b = \\frac{a}{100} \\times b$. To find the total value from a percentage: if $a\\% = x$, then $100\\% = x \\times \\frac{100}{a}$.",
    simpleExplanation: "A percentage is like dividing something into 100 tiny pieces. 50% means you have 50 pieces out of 100!",
    keyTerms: [
      { term: "Percentage", definition: "One-hundredth part of a number, denoted by the % symbol" },
    ],
    formulas: [
      "$a\\% \\text{ of number } b = \\frac{a \\times b}{100}$",
      "$\\text{What part } a \\text{ is of } b: (\\frac{a}{b}) \\times 100\\%$",
      "$\\text{Discount: new price} = \\text{price} \\times (1 - \\frac{\\text{discount}}{100})$",
    ],
    problemSolving: [
      { 
        problem: "Find 15% of 200", 
        solution: "$15\\% \\text{ of } 200 = \\frac{15}{100} \\times 200 = 0.15 \\times 200 = 30$" 
      },
      { 
        problem: "An item costs 500 UAH with a 20% discount. What is the new price?", 
        solution: "Discount = $20\\% \\text{ of } 500 = 100$ UAH. New price = $500 - 100 = 400$ UAH. Alternatively: $500 \\times 0.8 = 400$ UAH." 
      },
    ],
    quickSummary: "1% = 1/100. Percentage of a number: $(\\% \\times \\text{number}) / 100$. Used for discounts, taxes, and statistics.",
    facts: [
      "The % symbol appeared in 15th-century Italy", 
      "Banks calculate interest rates on a daily basis", 
      "100% represents the whole, while 200% means double the amount"
    ],
    quiz: [
      q("50% of 80 = ?", ["40", "50", "30", "60"], 0), 
      q("What is 1%?", ["One tenth", "One hundredth", "One thousandth", "The whole"], 1), 
      q("A 25% discount on 400 UAH =", ["100 UAH", "200 UAH", "75 UAH", "300 UAH"], 0)
    ],
  },

"equations-linear": {
    title: "Linear Equations",
    shortDescription: "Find the unknown x",
    introduction: "Equations are the foundation of algebra. A linear equation is the simplest type: find the value of x where the left side equals the right. This is an essential skill for math, physics, chemistry, and everyday logic.",
    theory: "**Linear equation** — an equation of the form ax + b = 0 or ax + b = cx + d.\n\n**Solving rules:**\n1. Move all x-terms to one side and numbers to the other (remember to change the sign when crossing the '=').\n2. Combine like terms on both sides.\n3. Divide both sides of the equation by the coefficient of x.\n\n**Number of solutions:**\n- One solution: a ≠ 0 → x = -b/a\n- Infinitely many solutions: occurs when a = 0 and b = 0 (e.g., 0 = 0)\n- No solutions: occurs when a = 0 and b ≠ 0 (e.g., 0 = 5)\n\n**Verification:** Always substitute the found value of x back into the original equation to ensure the identity holds true.",
    beginnerExplanation: "A linear equation is a mathematical statement with an unknown x, like 2x + 3 = 7. Your goal is to find what number x represents to make the statement true.",
    detailedExplanation: "For the standard form ax + b = 0, the solution is x = -b/a. The process involves transposing terms with the opposite sign and simplifying the expression through basic arithmetic.",
    simpleExplanation: "An equation is like a riddle: 'I thought of a number, added 3, and got 7. What was the number?' In this case, x = 4!",
    keyTerms: [
      { term: "Equation", definition: "A mathematical statement that asserts the equality of two expressions" },
      { term: "Root of an equation", definition: "The specific value of the unknown that makes the equation true" },
    ],
    formulas: [
      "ax + b = 0 → x = -b/a (a ≠ 0)",
      "ax + b = cx + d → (a-c)x = d-b → x = (d-b)/(a-c)",
    ],
    problemSolving: [
      { 
        problem: "Solve: 3x - 7 = 2x + 5", 
        solution: "1. Move terms: 3x - 2x = 5 + 7\n2. Simplify: x = 12\nCheck: 3(12) - 7 = 29, 2(12) + 5 = 29 ✓" 
      },
      { 
        problem: "Solve: 2(x + 3) = 5x - 9", 
        solution: "1. Expand: 2x + 6 = 5x - 9\n2. Move terms: 6 + 9 = 5x - 2x\n3. Simplify: 15 = 3x\n4. Divide: x = 5\nCheck: 2(5+3) = 16, 5(5)-9 = 16 ✓" 
      },
    ],
    quickSummary: "Linear equation: ax + b = 0 → x = -b/a. Core rules: transpose with sign change, combine terms, divide by the coefficient. Always verify your solution.",
    facts: [
      "Algebra originated in the 9th century thanks to the scholar al-Khwarizmi", 
      "The '=' sign was first introduced by Robert Recorde in 1557", 
      "Linear equations are used in computer programming logic every single day"
    ],
    quiz: [
      q("x + 5 = 12, what is x?", ["5", "7", "12", "17"], 1), 
      q("2x = 10, what is x?", ["2", "5", "10", "20"], 1), 
      q("Solve 3x - 6 = 0:", ["2", "3", "6", "-2"], 0)
    ],
  },

  "quadratic-equations": {
    title: "Quadratic Equations",
    shortDescription: "ax² + bx + c = 0",
    introduction: "Quadratic equations are one of the fundamental topics in algebra. They describe projectile trajectories, area optimization, and many other phenomena.",
    theory: "**Standard form:** ax² + bx + c = 0 (a ≠ 0)\n\n**Discriminant:** D = b² − 4ac\n\n**Roots:**\n- D > 0: x₁,₂ = (−b ± √D) / 2a — two roots\n- D = 0: x = −b / 2a — one root\n- D < 0: no real roots\n\n**Vieta's formulas:** x₁ + x₂ = −b/a, x₁ · x₂ = c/a",
    beginnerExplanation: "ax² + bx + c = 0. Find discriminant D = b²−4ac. If D ≥ 0, there are roots. Formula: x = (−b ± √D) / 2a.",
    detailedExplanation: "D = b²−4ac. D>0: 2 roots. D=0: 1 root. D<0: no real roots. Vieta: x₁+x₂ = −b/a, x₁·x₂ = c/a. Incomplete: no b or c.",
    simpleExplanation: "Quadratic equation — find the number that, when squared and added, gives the right answer!",
    keyTerms: [
      { term: "Discriminant", definition: "D = b²−4ac — determines the number and type of roots" },
      { term: "Vieta's formulas", definition: "x₁+x₂ = −b/a and x₁·x₂ = c/a" },
    ],
    formulas: [
      "ax² + bx + c = 0",
      "D = b² − 4ac",
      "x = (−b ± √D) / 2a",
      "Vieta: x₁ + x₂ = −b/a, x₁ · x₂ = c/a",
    ],
    problemSolving: [
      { problem: "Solve x² − 5x + 6 = 0", solution: "a=1, b=−5, c=6. D = 25−24 = 1. x₁ = (5+1)/2 = 3, x₂ = (5−1)/2 = 2." },
    ],
    quickSummary: "ax²+bx+c=0. D=b²−4ac. D>0 → 2 roots. D=0 → 1 root. D<0 → none. x=(−b±√D)/2a. Vieta: sum=−b/a, product=c/a.",
    facts: ["Ancient Babylonians solved quadratics ~2000 BC", "The discriminant immediately shows the number of roots", "The parabola — the graph of a quadratic function"],
    quiz: [q("D = b²−4ac. If D < 0?", ["2 roots", "1 root", "No real roots", "Infinitely many"], 2), q("x²−4 = 0. x = ?", ["±2", "±4", "2", "4"], 0), q("What does D determine?", ["Coefficients", "Number of roots", "Parabola direction", "Vertex"], 1)],
  },

  "linear-function": {
    title: "Linear Function",
    shortDescription: "The simplest function — a straight line",
    introduction: "A linear function is the simplest function whose graph is a straight line. It describes uniform motion and directly proportional relationships.",
    beginnerExplanation: "Linear function y = kx + b gives a straight line. k — slope, b — y-intercept.",
    detailedExplanation: "y = kx + b. k — slope (tangent of inclination angle). b — y-intercept. k > 0 — increasing, k < 0 — decreasing. k = 0 — horizontal.",
    simpleExplanation: "A linear function is a straight line. The bigger k — the steeper it goes up!",
    keyTerms: [
      { term: "Slope k", definition: "Shows the line's inclination: tangent of angle with Ox axis" },
      { term: "Y-intercept b", definition: "The point where the graph crosses the Oy axis" },
    ],
    formulas: [
      "y = kx + b",
      "k = (y₂ - y₁) / (x₂ - x₁)",
      "Zeros: x = -b/k",
    ],
    problemSolving: [
      { problem: "Graph y = 2x - 1", solution: "At x=0: y=-1 (point (0,-1)). At x=1: y=1 (point (1,1)). Connect — line with slope 2." },
    ],
    quickSummary: "y = kx + b. k — slope, b — y-intercept. k>0 increases, k<0 decreases. Graph is a straight line.",
    facts: ["René Descartes introduced the coordinate system in the 17th century", "Linear function is the basis of linear programming"],
    quiz: [q("Graph of y = kx + b is...", ["Parabola", "Straight line", "Hyperbola", "Circle"], 1), q("In y = 3x + 2, k = ?", ["2", "3", "5", "6"], 1), q("If k > 0, function...", ["Decreases", "Increases", "Constant", "Doesn't exist"], 1)],
  },

  "pythagorean-theorem": {
    title: "Pythagorean Theorem",
    shortDescription: "a² + b² = c²",
    introduction: "The Pythagorean theorem is one of the most famous theorems in mathematics. It connects the sides of a right triangle.",
    theory: "**Theorem:** In a right triangle, the square of the hypotenuse equals the sum of squares of the legs.\n\n**a² + b² = c²**\n\nwhere c — hypotenuse (longest side, opposite the right angle), a and b — legs.\n\n**Pythagorean triples:** (3,4,5), (5,12,13), (8,15,17)\n\n**Distance formula:** d = √((x₂-x₁)² + (y₂-y₁)²)",
    beginnerExplanation: "In a right triangle: a² + b² = c², where c is the longest side (hypotenuse).",
    detailedExplanation: "a² + b² = c². Pythagorean triples: (3,4,5), (5,12,13). Distance: d = √((x₂-x₁)² + (y₂-y₁)²).",
    simpleExplanation: "If a triangle has a right angle, then the square of the long side = sum of squares of the two short sides!",
    keyTerms: [
      { term: "Hypotenuse", definition: "The longest side of a right triangle, opposite the right angle" },
      { term: "Leg", definition: "One of two sides forming the right angle" },
    ],
    formulas: [
      "a² + b² = c²",
      "c = √(a² + b²)",
      "a = √(c² - b²)",
      "Distance: d = √((x₂-x₁)² + (y₂-y₁)²)",
    ],
    problemSolving: [
      { problem: "Legs = 3 and 4. Find hypotenuse.", solution: "c² = 3² + 4² = 9 + 16 = 25.\nc = √25 = 5." },
      { problem: "Hypotenuse = 13, leg = 5. Find the other leg.", solution: "a² = 13² - 5² = 169 - 25 = 144.\na = √144 = 12." },
    ],
    quickSummary: "a²+b²=c². Hypotenuse — longest side of right triangle. Pythagorean triples: (3,4,5), (5,12,13). Distance: d=√((Δx)²+(Δy)²).",
    facts: ["The theorem is over 2500 years old", "Over 400 proofs exist", "Pythagoras was also a philosopher and mystic"],
    quiz: [q("a²+b²=c². If a=6, b=8, c=?", ["10", "14", "100", "48"], 0), q("What is the hypotenuse?", ["Shortest side", "Longest side", "Middle side", "Height"], 1), q("(3,4,5) is a...", ["Prime number", "Pythagorean triple", "Arithmetic progression", "Sequence"], 1)],
  },

  "sin-cos-tan": {
    title: "Sine, Cosine, Tangent",
    shortDescription: "Trigonometric functions",
    introduction: "Trigonometry studies the relationships between sides and angles of triangles. The three main functions — sine, cosine, and tangent — are hugely important in physics, engineering, and computer graphics.",
    theory: "**In a right triangle:**\n- **sin α** = opposite / hypotenuse\n- **cos α** = adjacent / hypotenuse\n- **tan α** = opposite / adjacent\n\n**Fundamental identity:** sin²α + cos²α = 1\n\n**Key angles:**\nsin 30° = 0.5, sin 45° = √2/2, sin 60° = √3/2, sin 90° = 1",
    beginnerExplanation: "Sin, cos, tan — functions connecting angles and sides of right triangles. sin = opposite/hypotenuse, cos = adjacent/hypotenuse.",
    detailedExplanation: "sin α = a/c, cos α = b/c, tan α = a/b. sin²α + cos²α = 1. The unit circle extends definitions to any angle.",
    simpleExplanation: "Sin, cos, tan are 'proportions' of triangle sides relative to the angle. Know the angle and one side — find the rest!",
    keyTerms: [
      { term: "Sine", definition: "Ratio of opposite leg to hypotenuse" },
      { term: "Cosine", definition: "Ratio of adjacent leg to hypotenuse" },
      { term: "Tangent", definition: "Ratio of opposite leg to adjacent leg" },
    ],
    formulas: [
      "sin α = opposite / hypotenuse",
      "cos α = adjacent / hypotenuse",
      "tan α = sin α / cos α",
      "sin²α + cos²α = 1",
    ],
    problemSolving: [
      { problem: "Right triangle, hypotenuse = 10, angle α = 30°. Find opposite leg.", solution: "sin 30° = a/10 → a = 10 × sin 30° = 10 × 0.5 = 5." },
    ],
    quickSummary: "sin=opposite/hypotenuse, cos=adjacent/hypotenuse, tan=sin/cos. sin²+cos²=1. Values: sin30°=0.5, sin45°=√2/2, sin60°=√3/2.",
    facts: ["Ancient Babylonians used trigonometry", "GPS uses trigonometry to determine position", "sin and cos are the basis of audio and image processing"],
    quiz: [q("sin 30° = ?", ["1", "0.5", "√2/2", "0"], 1), q("sin²α + cos²α = ?", ["0", "1", "2", "α"], 1), q("tan α = ?", ["sin/cos", "cos/sin", "sin+cos", "sin-cos"], 0)],
  },

  "derivatives": {
    title: "Derivatives",
    shortDescription: "Rate of change of a function",
    introduction: "The derivative is a fundamental concept of calculus. It shows how quickly a function changes at each point.",
    theory: "**Derivative** f'(x) = lim[Δx→0] (f(x+Δx) - f(x)) / Δx\n\n**Table of derivatives:**\n- (xⁿ)' = nxⁿ⁻¹\n- (sin x)' = cos x\n- (cos x)' = -sin x\n- (eˣ)' = eˣ\n- (ln x)' = 1/x\n\n**Rules:**\n- (f ± g)' = f' ± g'\n- (f·g)' = f'g + fg'\n- Chain rule: (f(g(x)))' = f'(g(x))·g'(x)\n\nf'(x) = 0 → possible extremum. f'>0 → increasing. f'<0 → decreasing.",
    beginnerExplanation: "The derivative shows how fast a function changes. If f(x) is distance, then f'(x) is speed.",
    detailedExplanation: "f'(x) = lim (f(x+Δx)-f(x))/Δx. Main: (xⁿ)' = nxⁿ⁻¹, (sin x)' = cos x.",
    simpleExplanation: "A derivative is the 'speed' of a function. Like a speedometer shows a car's speed at every moment!",
    keyTerms: [
      { term: "Derivative", definition: "The limit of the ratio of function increment to argument increment as Δx→0" },
      { term: "Tangent line", definition: "A line that touches the graph at one point" },
      { term: "Extremum", definition: "A maximum or minimum of a function" },
    ],
    formulas: [
      "f'(x) = lim[Δx→0] (f(x+Δx) - f(x)) / Δx",
      "(xⁿ)' = nxⁿ⁻¹",
      "(sin x)' = cos x, (cos x)' = -sin x",
      "(eˣ)' = eˣ, (ln x)' = 1/x",
    ],
    problemSolving: [
      { problem: "Find f'(x) for f(x) = 3x² + 2x - 5", solution: "f'(x) = 3·2x + 2·1 - 0 = 6x + 2." },
    ],
    quickSummary: "Derivative = rate of change. (xⁿ)'=nxⁿ⁻¹. f'=0 → extremum. f'>0 — increasing, f'<0 — decreasing. Geometrically: slope of tangent.",
    facts: ["Newton and Leibniz independently invented the derivative", "Derivatives are used in machine learning (gradient descent)", "The formula E=mc² was derived through differentiation"],
    quiz: [q("(x³)' = ?", ["3x", "3x²", "x²", "x⁴/4"], 1), q("If f'(x)>0, the function:", ["Decreases", "Increases", "Constant", "Doesn't exist"], 1), q("(sin x)' = ?", ["-sin x", "cos x", "tan x", "1"], 1)],
  },

  "integrals": {
    title: "Integrals",
    shortDescription: "Area under a curve",
    introduction: "An integral is the reverse operation to a derivative. If the derivative shows speed, the integral 'collects' those speeds back into distance.",
    beginnerExplanation: "An integral is the area under a function's graph. The reverse of a derivative.",
    detailedExplanation: "Indefinite: ∫f(x)dx = F(x)+C. Definite: ∫[a,b]f(x)dx = F(b)-F(a). Main: ∫xⁿdx = xⁿ⁺¹/(n+1)+C.",
    simpleExplanation: "An integral is like counting the area of an unusual shape under a curved line!",
    keyTerms: [
      { term: "Antiderivative", definition: "A function F(x) whose derivative equals f(x)" },
      { term: "Indefinite integral", definition: "The set of all antiderivatives: ∫f(x)dx = F(x) + C" },
      { term: "Definite integral", definition: "The numerical value of area under the curve from a to b" },
    ],
    formulas: [
      "∫xⁿdx = xⁿ⁺¹/(n+1) + C (n ≠ -1)",
      "∫sin x dx = -cos x + C",
      "∫cos x dx = sin x + C",
      "Newton-Leibniz formula: ∫[a,b]f(x)dx = F(b) - F(a)",
    ],
    problemSolving: [
      { problem: "∫(3x² + 2)dx = ?", solution: "∫3x²dx + ∫2dx = 3·x³/3 + 2x + C = x³ + 2x + C" },
    ],
    quickSummary: "Integral — reverse of derivative. ∫xⁿdx = xⁿ⁺¹/(n+1)+C. Definite integral: F(b)-F(a) = area under curve.",
    facts: ["Integrals are used to calculate volumes", "Newton and Leibniz found the formula in the 17th century", "Integrals are applied in physics, economics, and engineering"],
    quiz: [q("Integral is the reverse of?", ["Addition", "Multiplication", "Derivative", "Division"], 2), q("∫x dx = ?", ["x²", "x²/2 + C", "2x", "1"], 1), q("What does a definite integral calculate?", ["Volume", "Area under the graph", "Speed", "Mass"], 1)],
  },

  "ua-sounds": {
    title: "Sounds of the Ukrainian Language",
    shortDescription: "Vowels and consonants",
    introduction: "Phonetics studies the sounds of language. Knowledge of the Ukrainian sound system helps with correct pronunciation and spelling rules.",
    beginnerExplanation: "Ukrainian has 38 sounds: 6 vowels and 32 consonants. Letters represent sounds in writing.",
    detailedExplanation: "Vowels: [a], [o], [u], [e], [y], [i]. Consonants: voiced and voiceless, hard and soft. Я, ю, є, ї represent 2 sounds each.",
    simpleExplanation: "Sounds are what we pronounce. Vowels: a-a-a! Consonants: b, d, z!",
    keyTerms: [
      { term: "Vowel sound", definition: "A sound produced by free passage of air" },
      { term: "Consonant sound", definition: "A sound produced with an obstruction to air flow" },
      { term: "Phoneme", definition: "The smallest sound unit that distinguishes word meaning" },
    ],
    quickSummary: "38 sounds: 6 vowels (а,о,у,е,и,і) + 32 consonants. Letters я,ю,є,ї = 2 sounds each. 33 letters in alphabet. Ь softens.",
    facts: ["The Ukrainian alphabet has 33 letters", "The letter ґ returned in 1990", "Ukrainian is one of the most melodic languages"],
    quiz: [q("How many vowel sounds?", ["5", "6", "7", "10"], 1), q("How many letters in the alphabet?", ["26", "33", "30", "36"], 1)],
  },

  "ua-stress": {
    title: "Word Stress in Ukrainian",
    shortDescription: "Which syllable is pronounced more strongly",
    introduction: "Word stress is one of the most challenging topics to master in Ukrainian. Unlike languages with fixed stress, Ukrainian stress is 'free' (it can fall on any syllable) and 'mobile' (it can shift when the word changes form).",
    theory: "**Characteristics of Ukrainian Word Stress:**\n\n1. **Dynamic**: The stressed syllable is pronounced with greater force, duration, and clarity compared to unstressed ones.\n2. **Free**: Stress is not fixed to a specific position (like the first or last syllable). It can appear anywhere: **мОре** (sea), **дорОга** (road), **молокО** (milk).\n3. **Mobile**: Stress can move to a different syllable when a word is inflected (declined or conjugated): **рУка** (hand) → **рукИ** (of the hand).\n4. **Meaning-Distinguishing**: Changing the stress can completely change the meaning of a word (**semantic role**) or its grammatical form.\n\n**Double Stress:**\nSome words in Ukrainian officially allow two correct stress positions, for example: **зАвжди** and **завждИ** (always), **пОмилка** and **помИлка** (mistake).",
    beginnerExplanation: "Word stress is when we emphasize one syllable in a word by saying it louder and longer. In Ukrainian, this stress can move around depending on how the word is used.",
    detailedExplanation: "Ukrainian stress is characterized by being dynamic, free, and mobile. Its mobility means it can shift between the root and the ending during declension. Crucially, stress serves a phonological function, distinguishing homographs like **зАмок** (castle) and **замОк** (lock).",
    simpleExplanation: "Stress is like a spotlight on one part of a word. You say that part louder than the others!",
    keyTerms: [
      { term: "Free Stress", definition: "Stress that can fall on any syllable of a word" },
      { term: "Mobile Stress", definition: "Stress that changes its position depending on the word form" },
      { term: "Homographs", definition: "Words that are spelled the same but have different meanings and pronunciations" },
    ],
    examples: [
      "Distinguishing meaning: **зАмок** (castle) vs. **замОк** (lock)",
      "Distinguishing meaning: **мУка** (torment) vs. **мукА** (flour)",
      "Mobile stress: **нОга** (foot) — **ногИ** (of the foot) — **нОги** (feet)",
    ],
    quickSummary: "Ukrainian stress is free (can be on any syllable) and mobile (shifts between word forms). It is dynamic (force-based) and can change the meaning of a word (e.g., mUka vs. mukA).",
    facts: [
      "Incorrect stress can completely change the meaning of a word", 
      "Some Ukrainian words officially allow two different stress positions", 
      "Stress is considered one of the hardest topics for foreigners learning Ukrainian"
    ],
    quiz: [
      q("Word stress in the Ukrainian language is...", ["Always on the first syllable", "Free and mobile", "On the last syllable", "Non-existent"], 1), 
      q("What can word stress change in Ukrainian?", ["Letters", "Word meaning", "Number of syllables", "The language itself"], 1),
      q("Which word can have two correct stress positions?", ["Молоко", "Завжди", "Книга", "Дерево"], 1)
    ],
  },

  "ua-synonyms": {
    title: "Synonyms, Antonyms, and Homonyms",
    shortDescription: "The richness of word meanings",
    introduction: "Lexicology studies the vocabulary of a language. Understanding synonyms, antonyms, and homonyms enriches your speech and helps you express thoughts with much greater precision.",
    theory: "**Basic Lexical Groups:**\n\n1. **Synonyms**: Words with identical or very similar meanings but different sounds and spellings. They help avoid repetition and add subtle nuances to speech. Example: *brave* — *courageous*.\n2. **Antonyms**: Words with opposite meanings. They are used to contrast ideas and emphasize differences. Example: *day* — *night*.\n3. **Homonyms**: Words that sound or are spelled the same but have completely different, unrelated meanings.\n   - **Homophones**: Sound the same but have different spellings (e.g., *sun* — *son*).\n   - **Homographs**: Spelled the same but may have different pronunciations or meanings (e.g., *lead* as a metal vs. *lead* as a verb).\n   - **Homoforms**: Words that coincide only in specific grammatical forms.",
    beginnerExplanation: "Synonyms are 'word friends' with the same meaning. Antonyms are 'word rivals' with opposite meanings. Homonyms are 'word twins'—they look or sound the same but mean totally different things!",
    detailedExplanation: "Synonyms can be absolute (total) or relative (partial). Antonyms are categorized as lexical or grammatical. Homonyms include full homonyms and partial varieties like homophones, homographs, and homoforms.",
    simpleExplanation: "Synonyms mean the same thing, antonyms are the exact opposite, and homonyms are words that look identical but have a secret second meaning!",
    keyTerms: [
      { term: "Synonyms", definition: "Words with identical or very similar meanings" },
      { term: "Antonyms", definition: "Words with opposite meanings" },
      { term: "Homonyms", definition: "Words that sound or are spelled the same but differ in meaning" },
    ],
    quickSummary: "Synonyms: same meaning (brave = courageous). Antonyms: opposite meaning (day ≠ night). Homonyms: same sound/spelling but different meaning (e.g., a river 'bank' vs. a financial 'bank').",
    facts: [
      "The Ukrainian language contains over 200,000 words",
      "The word 'to go' (йти) has one of the highest numbers of synonyms in the Ukrainian language"
    ],
    quiz: [
      q("Synonyms are words with...", ["Opposite meanings", "The same meaning", "The same sound", "The same spelling"], 1), 
      q("Day and Night are examples of...", ["Synonyms", "Antonyms", "Homonyms", "Paronyms"], 1), 
      q("A 'bank' (of a river) and a 'bank' (financial) are...", ["Synonyms", "Antonyms", "Homonyms", "Paronyms"], 2)
    ],
  },

"ua-phraseology": {
    title: "Ukrainian Idioms (Phraseologisms)",
    shortDescription: "Fixed expressions with unique meanings",
    introduction: "Idioms are the pearls of a language. These are fixed expressions whose meaning cannot be determined by looking at the individual words alone. They make speech vivid, colorful, and deeply cultural.",
    theory: "**Types of Phraseological Units:**\n\n1. **Phraseological Fusions (Zroshchennia)**: Expressions where the meaning is completely detached from the literal words (e.g., 'to beat the thumbs' — to idle).\n2. **Phraseological Unities (Yednosti)**: Expressions with a figurative meaning that still has a visible link to the literal sense (e.g., 'to hold a stone in one's bosom' — to harbor a grudge).\n3. **Phraseological Combinations (Spoluchennia)**: Words that can only be used together in specific contexts.\n\n**Sources of Ukrainian Idioms:**\n- **Folk origin**: Derived from ancient crafts and daily life.\n- **Biblical and Mythological**: From world culture and religion.\n- **Literature**: Famous quotes that became fixed expressions.",
    beginnerExplanation: "Idioms are set phrases that mean something different from the literal words. For example, 'to beat the thumbs' means to be lazy, and 'to sit in a puddle' means to disgrace yourself.",
    detailedExplanation: "Ukrainian phraseology is classified into fusions, unities, and combinations. Their etymology often traces back to historical trades, Cossack traditions, or classic literature, reflecting the unique worldview of the Ukrainian people.",
    simpleExplanation: "Idioms are like secret codes! When someone says they are 'biting their tongue,' they aren't actually hurting themselves—they are just staying quiet!",
    keyTerms: [
      { term: "Phraseology", definition: "The study of set expressions and idioms in a language" },
      { term: "Fixed Expression", definition: "A phrase whose words cannot be changed without losing its special meaning" },
      { term: "Etymology", definition: "The origin and historical development of a word or expression" },
    ],
    examples: [
      "Бити байдики (To beat the thumbs) — To waste time or do nothing.",
      "Пекти раків (To bake crawfish) — To blush from embarrassment.",
      "Як кіт наплакав (As much as a cat cried) — A very tiny amount of something.",
    ],
    quickSummary: "Idioms (phraseologisms) are stable expressions with figurative meanings. They enrich speech and make it more expressive. Examples include 'biting your tongue' (to shut up) or 'beating the thumbs' (to idle).",
    facts: [
      "There are over 5,000 unique idioms in the Ukrainian language",
      "The word 'pankatysia' (to fuss over someone) is a unique Ukrainian term often found in idioms"
    ],
    quiz: [
      q("What does the idiom 'to beat the thumbs' (бити байдики) mean?", ["To break objects", "To be lazy", "To work hard", "To play music"], 1), 
      q("An idiom (phraseologism) is best described as...", ["A single word", "A fixed expression", "A long sentence", "A whole paragraph"], 1)
    ],
  },

  "ua-word-parts": {
    title: "Word Structure (Morphemics)",
    shortDescription: "Root, prefix, suffix, and ending",
    introduction: "Morphemics is the branch of linguistics that studies the internal structure of words. Understanding morphemes helps you grasp the meaning of unfamiliar words, spell correctly, and create new words using established patterns.",
    theory: "**Basic Components of a Word (Morphemes):**\n\n1. **Root (Корінь)**: The primary part of a word that carries its fundamental lexical meaning. All related (cognate) words share the same root. Example: *read*, *reader*, *reading*.\n2. **Prefix (Префікс)**: A part placed before the root to modify its meaning or create a new word. Examples: *un-*, *re-*, *pre-*.\n3. **Suffix (Суфікс)**: A part placed after the root. It often determines the word's grammatical category (like turning a verb into a noun). Examples: *-er*, *-ist*, *-ness*.\n4. **Ending/Inflection (Закінчення)**: The variable part at the end of a word that indicates its grammatical relationship to other words (case, number, gender, person). **The Stem (Основа)** is the entire word minus the ending.\n\n**Additional Morphemes:**\n- **Postfix**: A morpheme following the ending (e.g., *-ся* in Ukrainian verbs).\n- **Interfix**: A linking element used to combine two roots (e.g., the *o* in *speedometer*).",
    beginnerExplanation: "A word is made of building blocks: the root (the main idea), a prefix (comes before), a suffix (comes after), and an ending (the part that changes).",
    detailedExplanation: "Words consist of morphemes: the root, prefix, suffix, and ending. Some words also include postfixes and interfixes. The 'Stem' is the core part of the word that excludes the inflection (ending).",
    simpleExplanation: "A word is like a LEGO set: the root is the main brick, and prefixes or suffixes are extra pieces you snap on to change what it does!",
    keyTerms: [
      { term: "Root", definition: "The core part of a word that holds its main meaning" },
      { term: "Prefix", definition: "A morpheme added to the beginning of a word" },
      { term: "Suffix", definition: "A morpheme added to the end of a word stem" },
      { term: "Stem", definition: "The part of a word that remains after removing the ending" },
    ],
    examples: [
      "при-літ-н-ій: при- (prefix), -літ- (root), -н- (suffix), -ій (ending)",
      "пере-біг-ти: пере- (prefix), -біг- (root), -ти (infinitive suffix/ending)",
    ],
    quickSummary: "Morphemes: Root (meaning), Prefix (before), Suffix (after), Ending (variable part). The Stem is the word without its ending. Cognate words share the same root.",
    facts: [
      "The root is a mandatory part of every word", 
      "Related (cognate) words must share the same root and have a semantic connection"
    ],
    quiz: [
      q("Which part of a word is mandatory?", ["Prefix", "Suffix", "Root", "Ending"], 2), 
      q("Where is the prefix located?", ["After the root", "Before the root", "At the very end", "In the middle"], 1), 
      q("The Stem is everything in a word except for the...", ["Root", "Suffix", "Ending", "Prefix"], 2)
    ],
  },

  "ua-nouns": {
    title: "The Noun",
    shortDescription: "Who? What? — names of objects and phenomena",
    introduction: "The noun is the fundamental part of speech upon which all communication rests. Without nouns, it is impossible to name objects, physical phenomena, or abstract feelings. It is statistically the most frequent part of speech in any text.",
    theory: "**Grammatical Categories of the Ukrainian Noun:**\n\n1. **Gender (Рід)**: Every noun has a fixed gender: Masculine (**чоловічий**), Feminine (**жіночий**), or Neuter (**середній**). Unlike English, gender is grammatical, not just biological.\n2. **Number (Число)**: Nouns change their forms to indicate Singular (**однина**) or Plural (**множина**).\n3. **Case (Відмінок)**: Ukrainian has **7 cases** that indicate the noun's function in a sentence. \n   - Nominative (Who? What?)\n   - Genitive\n   - Dative\n   - Accusative\n   - Instrumental\n   - Locative\n   - **Vocative (Кличний)** — used for direct address, a unique and beautiful feature of the Ukrainian language.\n4. **Declension (Відміна)**: All nouns are grouped into 4 declension types based on their gender and endings.",
    beginnerExplanation: "A noun is a word that names a person, place, thing, or idea, answering the questions 'who?' or 'what?'. Nouns can be proper (like 'Kyiv') or common (like 'city').",
    detailedExplanation: "Ukrainian nouns possess gender, number, and case. There are 7 cases and 4 main declension groups. Some nouns remain indeclinable (e.g., 'kafe', 'metro'), maintaining the same form regardless of their role in the sentence.",
    simpleExplanation: "A noun is a 'name' for everything around you! Cat, book, rain, and friend—these are all nouns!",
    keyTerms: [
      { term: "Case", definition: "A grammatical category of a noun that shows its relationship to other words in a sentence" },
      { term: "Declension", definition: "A group of nouns that share similar patterns of case endings" },
      { term: "Vocative Case", definition: "The 7th case in Ukrainian used specifically for calling or addressing someone" },
    ],
    quickSummary: "Noun answers 'who?' or 'what?'. It has gender (M/F/N), number (Sing/Pl), and 7 cases. There are 4 declension groups. Proper nouns are capitalized. The Vocative case is used for addressing people.",
    facts: [
      "Ukrainian has 7 grammatical cases, while English largely relies on word order", 
      "The noun is the most frequently used part of speech in the Ukrainian language", 
      "The Vocative case is a distinctive feature that sets Ukrainian apart from many other Slavic languages"
    ],
    quiz: [
      q("What questions does a noun answer?", ["Which?", "Who? What?", "What to do?", "Where?"], 1), 
      q("How many cases are there in the Ukrainian language?", ["4", "6", "7", "5"], 2), 
      q("Is 'Kyiv' a proper or a common noun?", ["Common", "Proper", "Collective", "Abstract"], 1)
    ],
  },

  "ua-verbs": {
    title: "The Verb",
    shortDescription: "What to do? — action words",
    introduction: "The verb is the 'engine' of the sentence. It provides dynamic movement, describing actions, states, and processes. Without a verb, a sentence is often incomplete and lacks direction.",
    theory: "**Grammatical Categories of the Ukrainian Verb:**\n\n1. **Infinitive (Інфінітив)**: The initial, non-finite form that answers the question 'what to do?' or 'what to have done?'. Ends in **-ти** or **-тись/-ться**.\n2. **Aspect (Вид)**:\n   - **Imperfective**: Ongoing or repeated actions (*писати* — to write).\n   - **Perfective**: Completed actions with a result (*написати* — to have written).\n3. **Tense (Час)**:\n   - **Past**: Action occurred before the moment of speech.\n   - **Present**: Action occurring now (only for imperfective verbs).\n   - **Future**: Action that will occur later.\n4. **Mood (Спосіб)**:\n   - **Indicative**: Real actions.\n   - **Conditional**: Possible actions under certain conditions (*писав би*).\n   - **Imperative**: Commands or requests (*пиши*).\n5. **Conjugation (Дієвідміна)**: Verbs are grouped into two main conjugation classes (I and II) based on their endings in the 3rd person plural.",
    beginnerExplanation: "A verb is a word that describes an action or a state, like 'to run' or 'to think'. It changes depending on when the action happens and who is doing it.",
    detailedExplanation: "Ukrainian verbs possess categories of aspect, tense, mood, person, number, and gender (in the past tense). There are two main conjugation classes. The system also includes verbal forms like participles and gerunds.",
    simpleExplanation: "A verb is an 'action word'! Jump, sing, eat—anything you can DO is a verb!",
    keyTerms: [
      { term: "Infinitive", definition: "The basic form of a verb that does not indicate tense or person" },
      { term: "Conjugation", definition: "The variation of the form of a verb by which the voice, mood, tense, number, and person are identified" },
      { term: "Aspect", definition: "A category that indicates whether an action is completed or ongoing" },
    ],
    quickSummary: "Verb answers 'what to do?'. Tenses: Past, Present, Future. Moods: Indicative, Conditional, Imperative. There are 2 conjugation classes and 2 aspects (perfective/imperfective).",
    facts: [
      "The verb is the second most frequently used part of speech in Ukrainian", 
      "Ukrainian verbs have two main conjugation patterns based on their vowel endings"
    ],
    quiz: [
      q("What does a verb signify?", ["An object", "A characteristic", "An action or state", "A quantity"], 2), 
      q("How many primary tenses are there in Ukrainian?", ["2", "3", "4", "5"], 1), 
      q("The Ukrainian infinitive typically ends in...", ["-ий", "-ти", "-но", "-ся"], 1)
    ],
  },

  "ua-sentence-members": {
    title: "Sentence Members (Syntax)",
    shortDescription: "Subject, predicate, object, and more",
    introduction: "Syntax is the study of how words combine to form sentences. Understanding sentence members is the absolute foundation for grammatical writing and correct punctuation.",
    theory: "**Classification of Sentence Members:**\n\n**1. Principal Members (The Grammatical Base):**\n- **Subject (Підмет)**: The main character of the sentence. Answers: *Who? What?* Usually a noun or pronoun in the Nominative case.\n- **Predicate (Присудок)**: What the subject does or what is said about it. Answers: *What is the subject doing? What is it like?*\n\n**2. Secondary Members:**\n- **Object (Додаток)**: An object affected by the action. Answers oblique cases: *Whom? What? To whom? By what?*\n- **Modifier/Attribute (Означення)**: Describes a noun. Answers: *Which? What kind of? Whose?*\n- **Adverbial (Обставина)**: Describes the circumstances of an action. Answers: *Where? When? Why? How?*\n\n**Word Order:** In Ukrainian, word order is relatively free, but changing it often shifts the emphasis (logical stress) of the sentence.",
    beginnerExplanation: "A sentence is built from main parts: the Subject (who/what?) and the Predicate (the action). Extra parts like Objects and Modifiers add more detail to the story.",
    detailedExplanation: "The grammatical core consists of the Subject (Nominative) and the Predicate (simple or compound). Secondary members include Objects (direct/indirect), Modifiers (agreed/unagreed), and various types of Adverbials.",
    simpleExplanation: "A sentence is like a theater play: the Subject is the actor, and the Predicate is what the actor is doing on stage!",
    keyTerms: [
      { term: "Subject", definition: "The principal member of a sentence that identifies who or what performs the action" },
      { term: "Predicate", definition: "The principal member that tells something about the subject (action or state)" },
      { term: "Grammatical Base", definition: "The core of the sentence consisting of the subject and the predicate" },
      { term: "Modifier", definition: "A secondary member that characterizes an object or person" },
    ],
    examples: [
      "The boy (subject) reads (predicate) an interesting (modifier) book (object) at home (adverbial).",
    ],
    quickSummary: "Principal members: Subject + Predicate = Grammatical Base. Secondary members: Object (whom? what?), Modifier (which?), Adverbial (where? when? how?).",
    facts: [
      "The subject and predicate together form the grammatical core of a sentence", 
      "Ukrainian has a flexible word order, but the meaning can change depending on which word you put first"
    ],
    quiz: [
      q("Which members form the grammatical base?", ["Object and Modifier", "Subject and Predicate", "Adverbial and Object", "Modifier and Predicate"], 1), 
      q("What question does a Modifier (Attribute) answer?", ["Who?", "What to do?", "Which / What kind of?", "Where?"], 2)
    ],
  },

"ua-comma-rules": {
    title: "Comma Rules (Punctuation)",
    shortDescription: "When and where to place a comma",
    introduction: "Punctuation is a system of marks that clarifies the structure and meaning of sentences. The comma is the most frequently used punctuation mark in Ukrainian. Correct usage ensures your text is professional and prevents misunderstandings.",
    theory: "**Key Comma Rules in Ukrainian:**\n\n1. **Homogeneous Members (Enumeration)**: Commas are placed between items in a list. *Example: Apples, pears, and plums grew in the garden.*\n2. **Conjunctions 'a', 'ale', 'protest'**: A comma is **always** placed before these contrasting conjunctions.\n3. **Vocatives (Addressing someone)**: Use a comma to set off the name or title of the person you are speaking to. *Example: Mother, look! or Look, mother, at this!*\n4. **Introductory Words (Vstavni Slova)**: Words like 'perhaps', 'unfortunately', or 'of course' are set off by commas. *Example: Perhaps, it will rain.*\n5. **Complex Sentences**:\n   - **Compound**: Between parts of a sentence joined by conjunctions like 'and', 'but', 'or' (if they have different subjects).\n   - **Complex**: Before subordinating conjunctions like 'that', 'because', 'which', 'if'. *Example: I know that you will come.*\n6. **Participial & Adverbial Phrases**: To set off descriptive phrases that provide extra information about an action or a noun.",
    beginnerExplanation: "A comma is used between items in a list, before words like 'but', and when you are calling someone by name or using 'filler' words like 'maybe'.",
    detailedExplanation: "Ukrainian punctuation requires commas for: 1) lists; 2) compound and complex sentence structures; 3) isolated secondary members; 4) direct address (vocatives); 5) parenthetical/introductory words; 6) comparative constructions starting with 'as' (як).",
    simpleExplanation: "A comma is like a tiny pause in a sentence. It helps the reader see where one thought ends and another begins!",
    keyTerms: [
      { term: "Punctuation", definition: "The marks used in writing to separate sentences and clarify meaning" },
      { term: "Homogeneous members", definition: "Words in a sentence that perform the same function and answer the same question" },
      { term: "Vocative", definition: "A word or phrase used to address someone directly" },
      { term: "Introductory words", definition: "Words that express the speaker's attitude or provide context but aren't part of the core grammar" },
    ],
    examples: [
      "Enumeration: Apples, pears, plums.",
      "Direct address: Mother, look!",
      "Introductory word: Perhaps, it will rain.",
      "Complex sentence: I know that you will come.",
    ],
    quickSummary: "Use commas: between list items, before 'but' (а, але, проте), before 'that/because' (що, бо, щоб), for direct addresses (Mom,...), and for introductory words (maybe, of course).",
    facts: [
      "The classic 'Execute, not possible to pardon' is a prime example of how one comma changes everything", 
      "There are over 20 distinct sets of rules for comma usage in the Ukrainian language"
    ],
    quiz: [
      q("A comma is always placed before...", ["Every single word", "Conjunctions 'a', 'ale'", "A period", "Every verb"], 1), 
      q("Where should the comma be in 'Mother look'?", ["Before Mother", "After Mother", "After look", "Not needed"], 1)
    ],
  },



  "en-articles": {
    title: "Articles (a, an, the)",
    shortDescription: "Small words with big meaning",
    introduction: "Articles are one of the most difficult topics for Ukrainian speakers because Ukrainian doesn't have them. But articles are very important in English.",
    beginnerExplanation: "A/an — indefinite (any): a cat. The — definite (specific): the cat. A before consonant, an before vowel.",
    detailedExplanation: "A/an: first mention, one of many, profession. The: unique, previously mentioned, with of-phrases. Zero: general plural, uncountable.",
    simpleExplanation: "A/an — 'some one': a cat = some cat. The — 'that one': the cat = that cat!",
    keyTerms: [
      { term: "Definite article (the)", definition: "Used with a specific, known object" },
      { term: "Indefinite article (a/an)", definition: "Used with an unspecified, one of many" },
      { term: "Zero article", definition: "Absence of article (general plural, uncountable)" },
    ],
    examples: [
      "I saw A dog. THE dog was big. (first mention → a, second → the)",
      "She is A teacher. (profession)",
      "THE sun is bright. (unique)",
      "AN hour (vowel SOUND, despite letter h)",
    ],
    quickSummary: "A/an — first mention, any. The — specific, mentioned, unique. An before vowel SOUND. No article: general plural, uncountable.",
    facts: ["'The' is the most used word in English", "Ukrainian has no articles", "An hour — 'an' before vowel SOUND"],
    quiz: [q("When 'the'?", ["Always", "For specific", "For any", "Never"], 1), q("_ apple", ["a", "an", "the", "-"], 1), q("I am _ student", ["the", "an", "a", "-"], 2)],
  },

  "en-to-be": {
    title: "The Verb 'to be'",
    shortDescription: "I am, you are, he is...",
    introduction: "To be is the most important verb in English. It's needed in practically every sentence.",
    beginnerExplanation: "To be = to be/exist. I am, you are, he/she/it is, we/they are. Negative: am not, isn't, aren't. Question: Is he...?",
    detailedExplanation: "Present: am/is/are. Past: was/were. To be as: main verb (exist), auxiliary (Continuous), linking (He is tall).",
    simpleExplanation: "To be — 'to exist'. I am happy = I exist happy. Can't skip it!",
    keyTerms: [
      { term: "To be", definition: "The verb 'to be' — am, is, are (present), was, were (past)" },
    ],
    formulas: [
      "I am (I'm) / You are (You're) / He-She-It is (He's)",
      "We are (We're) / They are (They're)",
      "Past: I/He/She/It was, You/We/They were",
      "Questions: Am I? Is he? Are they?",
    ],
    quickSummary: "To be: am (I), is (he/she/it), are (you/we/they). Past: was/were. Questions: inversion (Is he...?). Negative: isn't, aren't.",
    facts: ["To be is the most irregular verb", "Shakespeare: 'To be or not to be'", "'Am' is only used with 'I'"],
    quiz: [q("She __ a teacher", ["am", "is", "are", "be"], 1), q("They __ students", ["am", "is", "are", "be"], 2), q("How to form a question?", ["Add do", "Invert the verb", "Add not", "Nothing"], 1)],
  },

  "en-present-simple": {
    title: "Present Simple",
    shortDescription: "The simple present tense",
    introduction: "Present Simple is the most used tense in English. It describes habits, facts, schedules — everything that happens regularly or is always true.",
    theory: "**Formula:**\n+ S + V (V-s/es for 3rd person singular)\n- S + don't/doesn't + V\n? Do/Does + S + V?\n\n**Usage:**\n1. Habits: I drink coffee every morning.\n2. Facts: Water boils at 100°C.\n3. Schedules: The train leaves at 5.\n\n**Markers:** always, usually, often, sometimes, rarely, never, every day/week.\n\n**-s/-es rule for 3rd person:**\n- General: + s (plays, reads)\n- After s, x, sh, ch, o: + es (watches, goes)\n- y after consonant: y → ies (studies)",
    beginnerExplanation: "Present Simple — habitual actions, facts. I work. He works (+s). Do you work? He doesn't work.",
    detailedExplanation: "S + V (V-s/es for 3rd person). Markers: always, usually, every day. Do/Does for questions and negatives.",
    simpleExplanation: "Present Simple — what you do always: I play, you play, he plays!",
    keyTerms: [
      { term: "Present Simple", definition: "Tense for habitual actions, facts, and schedules" },
      { term: "Time markers", definition: "Signal words: always, usually, often, never, every day" },
    ],
    formulas: [
      "+: S + V (he/she/it + V-s/es)",
      "-: S + don't/doesn't + V",
      "?: Do/Does + S + V?",
    ],
    examples: [
      "I play tennis every Sunday. (habit)",
      "She works in a bank. (fact)",
      "The movie starts at 8 pm. (schedule)",
      "Water freezes at 0°C. (scientific fact)",
    ],
    quickSummary: "Present Simple: habits, facts. +V (-s for he/she/it). Questions: Do/Does. Negatives: don't/doesn't. Markers: always, every day, usually.",
    facts: ["Present Simple is the most used tense", "Does 'takes away' -s: Does he play?", "For he/she/it +s: plays, reads"],
    quiz: [q("She __ every day (read)", ["read", "reads", "reading", "is read"], 1), q("__ you like coffee?", ["Does", "Do", "Is", "Are"], 1), q("When is it used?", ["Right now", "Habitual actions", "Past", "Plans"], 1)],
  },

  "en-present-continuous": {
    title: "Present Continuous",
    shortDescription: "What's happening right now",
    introduction: "Present Continuous describes what's happening at this very moment.",
    beginnerExplanation: "Formula: am/is/are + V-ing. I am reading (reading now). Markers: now, right now, at the moment.",
    detailedExplanation: "S + am/is/are + V-ing. Usage: right now, temporary, planned, with always (annoyance). State verbs not used.",
    simpleExplanation: "Present Continuous — 'right now': I am playing!",
    keyTerms: [
      { term: "Present Continuous", definition: "Tense for actions happening at the moment of speaking" },
      { term: "State verbs", definition: "Verbs of state (know, love, want) not used in Continuous" },
    ],
    formulas: [
      "+: S + am/is/are + V-ing",
      "-: S + am not/isn't/aren't + V-ing",
      "?: Am/Is/Are + S + V-ing?",
    ],
    quickSummary: "am/is/are + V-ing. Right now, temporary, planned. Markers: now, at the moment. State verbs (know, love) — NOT used.",
    facts: ["State verbs don't have Continuous", "Can mean future: I'm leaving tomorrow"],
    quiz: [q("I __ now (study)", ["study", "am studying", "studies", "studied"], 1), q("She __ at the moment (sleep)", ["sleeps", "is sleeping", "sleep", "slept"], 1), q("Marker?", ["Yesterday", "Always", "Now", "Last week"], 2)],
  },

  "en-past-simple": {
    title: "Past Simple",
    shortDescription: "The simple past tense",
    introduction: "Past Simple is the tense for completed actions in the past.",
    beginnerExplanation: "Regular: +ed (worked). Irregular: go→went. Negative: didn't + base form. Question: Did you...?",
    detailedExplanation: "S + V2 (past form). Regular: +ed. Irregular: special form. Markers: yesterday, last week, ago.",
    simpleExplanation: "Past Simple — 'once upon a time': Yesterday I played. He went.",
    keyTerms: [
      { term: "Regular verb", definition: "Forms past tense with -ed (work → worked)" },
      { term: "Irregular verb", definition: "Has a special past form (go → went)" },
    ],
    formulas: [
      "+: S + V2 (worked / went)",
      "-: S + didn't + V (base form)",
      "?: Did + S + V (base form)?",
    ],
    quickSummary: "Past Simple: completed past action. Regular +ed, irregular — special form. Did for questions/negatives. Markers: yesterday, ago, last.",
    facts: ["~200 irregular verbs", "Did 'removes' V2: Did he go?", "to be: was/were"],
    quiz: [q("She __ to school yesterday (go)", ["goes", "went", "going", "goed"], 1), q("__ you see the movie?", ["Do", "Did", "Does", "Are"], 1)],
  },

  "en-future-simple": {
    title: "Future Simple (will)",
    shortDescription: "Future tense with will",
    introduction: "Future Simple is the simplest way to talk about the future. Will is used for predictions, promises, and spontaneous decisions.",
    beginnerExplanation: "will + base verb. I will go. Won't = will not. Will you come?",
    detailedExplanation: "S + will + V. Contraction: I'll. Won't. Usage: spontaneous decision, prediction, promise. Going to — for plans.",
    simpleExplanation: "Will — 'I will': I will eat. Tomorrow I will play!",
    formulas: [
      "+: S + will + V",
      "-: S + won't (will not) + V",
      "?: Will + S + V?",
    ],
    quickSummary: "will + V (base). Contractions: I'll, won't. For: spontaneous decisions, predictions, promises. Going to — for plans.",
    facts: ["Will is the same for all persons", "Going to — for planned actions"],
    quiz: [q("I __ you tomorrow (call)", ["will call", "called", "calling", "calls"], 0), q("She __ come (negative)", ["will not", "don't", "doesn't", "isn't"], 0)],
  },

  "en-present-perfect": {
    title: "Present Perfect",
    shortDescription: "Past action, relevant now",
    introduction: "Present Perfect links past with present: the action happened in the past, but its result matters now.",
    beginnerExplanation: "have/has + V3. I have seen this film. Markers: already, yet, just, ever, never, since, for.",
    detailedExplanation: "S + have/has + V3. Experience, result, with since/for. Already — affirmative, yet — question/negative.",
    simpleExplanation: "I have already eaten! — the action is past, but the result is now!",
    keyTerms: [
      { term: "Present Perfect", definition: "Tense linking past with present" },
      { term: "Past Participle (V3)", definition: "Third form of a verb (worked, seen, gone)" },
    ],
    formulas: [
      "+: S + have/has + V3",
      "-: S + haven't/hasn't + V3",
      "?: Have/Has + S + V3?",
    ],
    quickSummary: "have/has + V3. Experience, result, with since/for. Already/just — affirmative. Yet — question/negative. Never — never. NOT with yesterday!",
    facts: ["Present Perfect doesn't exist in Ukrainian", "Not used with yesterday, last week"],
    quiz: [q("I __ this movie (see)", ["have seen", "saw", "seeing", "see"], 0), q("She has __ arrived", ["yet", "already", "just", "never"], 2), q("__ you ever been to London?", ["Do", "Did", "Have", "Are"], 2)],
  },

  "en-false-friends": {
    title: "False Friends of the Translator",
    shortDescription: "Words that sound familiar but mean something else",
    introduction: "False friends are words that sound similar in different languages but have completely different meanings.",
    beginnerExplanation: "Magazine — not a store, but a journal. Accurate — not neat, but precise. Cabinet — not an office, but a cupboard.",
    detailedExplanation: "False cognates: magazine (journal), sympathetic (compassionate), accurate (precise), fabric (cloth), actually (in fact), prospect (perspective).",
    simpleExplanation: "These words seem familiar but they deceive! Magazine — not a store, but a journal!",
    examples: [
      "Magazine ≠ store → journal/magazine (store = shop/store)",
      "Accurate ≠ neat → precise (neat = tidy)",
      "Fabric ≠ factory → cloth/material (factory = factory)",
      "Actually ≠ currently → in fact (currently = relevant)",
      "Sympathetic ≠ attractive → compassionate (attractive = nice/pretty)",
    ],
    quickSummary: "False friends: magazine=journal, accurate=precise, fabric=cloth, actually=in fact, sympathetic=compassionate. Always check the real meaning!",
    facts: ["'Magazine' comes from Arabic 'makhāzin'", "'Actual' means real, genuine", "'Sympathy' means compassion"],
    quiz: [q("Magazine is...", ["Store", "Journal", "Newspaper", "Book"], 1), q("Accurate is...", ["Neat", "Precise", "Fast", "Beautiful"], 1), q("Fabric is...", ["Factory", "Cloth", "Building", "Machine"], 1)],
  },

  "en-pronunciation-basics": {
    title: "English Pronunciation Basics",
    shortDescription: "How to correctly pronounce English sounds",
    introduction: "English pronunciation is a real challenge because spelling and pronunciation often don't match.",
    beginnerExplanation: "44 sounds, 26 letters! One letter can be read differently: 'a' in cat, cake, car. Some sounds don't exist in Ukrainian: /θ/ (think), /ð/ (this).",
    detailedExplanation: "12 vowels + 8 diphthongs + 24 consonants = 44 sounds. Stress affects meaning. Linking — connecting words in speech.",
    simpleExplanation: "English pronunciation is like a puzzle: letters don't always sound the way they look!",
    keyTerms: [
      { term: "Phoneme", definition: "The smallest sound unit that distinguishes meaning" },
      { term: "Diphthong", definition: "Two vowel sounds merged into one syllable" },
      { term: "Stress", definition: "Emphasizing a syllable in a word" },
    ],
    quickSummary: "44 sounds from 26 letters. Spelling ≠ pronunciation. /θ/ and /ð/ — unique English sounds. Stress can change meaning. Linking connects words in speech.",
    facts: ["'Ghoti' can be read as 'fish' (gh=f, o=i, ti=sh)", "'Read' is pronounced differently in present and past", "Received Pronunciation (RP) — standard British accent"],
    quiz: [q("How many sounds in English?", ["26", "33", "44", "52"], 2), q("'Th' in 'think' is...", ["/t/", "/s/", "/θ/", "/f/"], 2)],
  },

  "primitive-humans": {
    title: "Primitive Humans",
    shortDescription: "From early hominids to Homo sapiens",
    introduction: "The history of humanity began millions of years ago in Africa. The journey from the first human-like creatures to modern humans is a fascinating evolutionary process filled with discoveries, adaptations, and survival.",
    theory: "**Stages of Human Evolution:**\n\n1. **Australopithecus** (4–2 million years ago): The first creatures to walk upright (bipedalism). Brain size: ~500 cm³.\n2. **Homo habilis** (2.4 million years ago): 'Handy man.' The first to create and use primitive stone tools.\n3. **Homo erectus** (1.9 million years ago): 'Upright man.' Mastered fire and was the first to migrate out of Africa into Eurasia.\n4. **Neanderthals** (400,000–40,000 years ago): Inhabited Europe and Asia. They had large brains, complex tools, and were the first to bury their dead.\n5. **Homo sapiens** (~300,000 years ago): 'Wise man' or modern humans. Characterized by complex speech, art, and abstract thinking.\n\n**The Stone Age:**\n- **Paleolithic** (Old Stone Age): Humans lived as hunter-gatherers, moving constantly and using basic stone tools.\n- **Mesolithic** (Middle Stone Age): Development of the bow and arrow, and the domestication of the first animal—the dog.\n- **Neolithic** (New Stone Age): **The Neolithic Revolution** — the monumental shift from gathering and hunting to agriculture and cattle breeding (~10,000 years ago). This led to a sedentary lifestyle and the first permanent settlements.",
    beginnerExplanation: "Human history started in Africa. Over millions of years, early humans learned to walk on two legs, use tools, and control fire. Modern humans (Homo sapiens) appeared about 300,000 years ago.",
    detailedExplanation: "Human evolution progressed through key species: Australopithecus, Homo habilis, Homo erectus, and Neanderthals, culminating in Homo sapiens. The Stone Age is divided into the Paleolithic, Mesolithic, and Neolithic periods, with the Neolithic Revolution marking the birth of farming.",
    simpleExplanation: "A long time ago, people lived in caves and hunted mammoths. Later, they learned how to grow their own food, and that changed everything!",
    keyTerms: [
      { term: "Neolithic Revolution", definition: "The transition from hunting and gathering to farming and permanent settlements (~10,000 years ago)" },
      { term: "Homo sapiens", definition: "The species name for modern humans ('Wise Man')" },
      { term: "Paleolithic", definition: "The earliest period of the Stone Age, characterized by the use of chipped stone tools" },
    ],
    quickSummary: "Evolutionary path: Australopithecus → Homo habilis → Homo erectus → Homo sapiens. The Stone Age stages: Paleolithic, Mesolithic, Neolithic. The Neolithic Revolution brought agriculture. Homo sapiens appeared ~300,000 years ago.",
    facts: [
      "The oldest known stone tools are about 3.3 million years old", 
      "Humans began controlling fire approximately 1 million years ago", 
      "The Neolithic Revolution is considered the most important turning point in human history"
    ],
    quiz: [
      q("Where did the first humans appear?", ["In Europe", "In Africa", "In Asia", "In America"], 1), 
      q("Approximately when did Homo sapiens appear?", ["1 million years ago", "300,000 years ago", "10,000 years ago", "5,000 years ago"], 1), 
      q("What was the 'Neolithic Revolution'?", ["A great war", "The transition to agriculture", "The discovery of fire", "The invention of the wheel"], 1)
    ],
  },

  "ancient-egypt": {
    title: "Ancient Egypt",
    shortDescription: "Civilization on the banks of the Nile",
    introduction: "Ancient Egypt is one of the oldest and most mysterious civilizations, which existed for over 3000 years on the banks of the Nile.",
    beginnerExplanation: "Egypt — a civilization on the Nile (3100-30 BC). Pharaohs, pyramids, hieroglyphs. Agriculture depended on the Nile's floods.",
    detailedExplanation: "Periods: Old Kingdom (pyramids), Middle Kingdom, New Kingdom (expansion). Social structure: pharaoh → priests → scribes → farmers → slaves. Religion: polytheistic.",
    simpleExplanation: "Pyramids, pharaohs, and mummies — this is Ancient Egypt! They built amazing things without machines!",
    keyTerms: [
      { term: "Pharaoh", definition: "The ruler of ancient Egypt, considered a living god" },
      { term: "Hieroglyphs", definition: "Egyptian pictographic writing" },
      { term: "Pyramid", definition: "A monumental tomb for a pharaoh" },
    ],
    quickSummary: "Egypt: 3100-30 BC. The Nile — source of life. Pharaohs, pyramids, hieroglyphs. Society: pharaoh → priests → scribes → farmers. Religion: many gods. Achievements: pyramids, medicine, mathematics.",
    facts: ["The Great Pyramid contained 2.3 million stone blocks", "Cleopatra lived closer to our time than to the building of the pyramids", "Egyptians invented the 365-day calendar"],
    quiz: [q("The main river of Egypt?", ["Tigris", "Nile", "Amazon", "Danube"], 1), q("Who ruled Egypt?", ["Kings", "Pharaohs", "Emperors", "Presidents"], 1), q("What did Egyptians invent?", ["Compass", "365-day calendar", "Printing", "Gunpowder"], 1)],
  },

  "ancient-rome": {
    title: "The Roman Empire",
    shortDescription: "From a small city-state to the world's greatest empire",
    introduction: "Rome is a civilization that fundamentally reshaped the world. Roman law, the Latin language, innovative architecture, and disciplined military organization left an indelible mark on history that still influences modern society today.",
    theory: "**The Three Eras of Rome:**\n\n1. **The Kingdom (753–509 BC)**: The legendary period of the seven kings. It ended when the Romans overthrew the monarchy to establish self-rule.\n2. **The Republic (509–27 BC)**: A period of massive expansion and internal power struggles between the **Patricians** (aristocrats) and **Plebeians** (commoners). This era saw the Punic Wars against Carthage and the rise of powerful generals like Julius Caesar.\n3. **The Empire (27 BC – 476 AD)**: Started by Augustus, the first Emperor. This period included the **Pax Romana** (Roman Peace)—two centuries of relative stability and peak territorial expansion.\n\n**Key Achievements:**\n- **Roman Law**: The basis for most modern legal systems (Twelve Tables, Justinian Code).\n- **Engineering**: Aqueducts, concrete, and a vast network of roads (50,000 miles) that connected the empire.\n- **Architecture**: Mastery of the arch and dome, exemplified by the Colosseum and the Pantheon.\n- **Language**: Latin became the foundation for the Romance languages (Italian, French, Spanish, etc.).",
    beginnerExplanation: "Rome started as a small village in Italy and grew into a massive empire covering three continents. The Romans were master builders, lawmakers, and soldiers who created roads and buildings that still stand today.",
    detailedExplanation: "Roman history is divided into three distinct phases: the Monarchy, the Republic, and the Empire. Key figures like Julius Caesar paved the way for emperors like Augustus. The Western Roman Empire eventually fell in 476 AD, but its cultural and legal legacy endured in the East (Byzantium) and Western Europe.",
    simpleExplanation: "Ancient Rome was the superpower of the ancient world! They conquered almost everything around them and built amazing things like the Colosseum and roads that people still use today!",
    keyTerms: [
      { term: "Republic", definition: "A form of government where power is held by the people and their elected representatives" },
      { term: "Legion", definition: "The basic military unit of the Roman army, consisting of roughly 5,000 heavy infantrymen" },
      { term: "Pax Romana", definition: "A long period of relative peace and stability across the Roman Empire" },
      { term: "Senate", definition: "A political institution in ancient Rome, one of the most enduring institutions in Roman history" },
    ],
    quickSummary: "Timeline: 753 BC - 476 AD. Evolution: Kingdom → Republic → Empire. Key figures: Julius Caesar, Augustus. Legacy: Civil law, Latin, engineering (roads, aqueducts), and military tactics.",
    facts: [
      "Many Roman roads are still in use after 2,000 years because of their advanced multi-layer construction", 
      "The Colosseum could hold over 50,000 spectators and had a retractable roof (velarium)", 
      "Latin is the ancestor of all Romance languages and is still used in scientific and legal terminology"
    ],
    quiz: [
      q("When did the Western Roman Empire formally fall?", ["100 AD", "476 AD", "1000 AD", "1453 AD"], 1), 
      q("Who was Julius Caesar?", ["A famous philosopher", "A brilliant general and statesman", "An Egyptian Pharaoh", "A Greek scientist"], 1),
      q("What was the main combat unit of the Roman Army?", ["Phalanx", "Legion", "Horde", "Knight"], 1)
    ],
  },

  "medieval-europe": {
    title: "Medieval Europe",
    shortDescription: "Knights, castles, and feudalism",
    introduction: "The Middle Ages span a thousand years between the fall of Rome and the beginning of the Modern Era. It was an era of knights, crusades, the Black Death, and the birth of the first universities.",
    theory: "**The Structure of the Middle Ages:**\n\n**1. Feudalism**: The dominant social and economic system. It was a hierarchy: \n- **King**: The supreme landowner.\n- **Vassals (Lords/Barons)**: Received land (fiefs) from the king in exchange for military service.\n- **Knights**: Professional warriors who protected the lords' lands.\n- **Peasants (Serfs)**: Worked the land and provided food in exchange for protection.\n\n**2. The Role of the Church**: The Catholic Church was the most powerful institution in Europe, controlling education, art, and politics. It was the only force that unified the fragmented European kingdoms.\n\n**3. Key Events:**\n- **The Crusades (1096–1291)**: Military expeditions to the Holy Land that significantly changed trade and cultural exchange between East and West.\n- **The Black Death (1347–1351)**: A devastating bubonic plague pandemic that wiped out roughly one-third of Europe's population, leading to massive social and economic shifts.\n- **The Rise of Universities**: Despite the 'Dark Ages' label, the 11th-12th centuries saw the founding of legendary universities in Bologna, Paris, and Oxford.",
    beginnerExplanation: "The Middle Ages (5th–15th centuries) was a time of knights, grand castles, and strict social order. The Church held immense power, and the society was organized like a pyramid with the king at the top and peasants at the bottom.",
    detailedExplanation: "Historians divide this era into the Early, High, and Late Middle Ages. It is defined by the feudal system, the dominance of Christianity, the Crusades, and the catastrophic impact of the Black Death. The period ended with the Fall of Constantinople in 1453 and the dawn of the Renaissance.",
    simpleExplanation: "A time of knights in shining armor, stone castles, and... the plague. It was a long thousand-year bridge between the ancient world and our modern times!",
    keyTerms: [
      { term: "Feudalism", definition: "A social system in which people worked and fought for nobles who gave them protection and land in return" },
      { term: "Serf", definition: "An agricultural laborer bound under the feudal system to work on his lord's estate" },
      { term: "Vassal", definition: "A person who held land under the feudal system on conditions of homage and allegiance" },
      { term: "The Black Death", definition: "A plague pandemic that killed millions in the mid-14th century" },
    ],
    quickSummary: "5th–15th centuries. Key features: Feudalism hierarchy (King → Lords → Knights → Peasants), dominance of the Church, Crusades, and the Black Death (1/3 population died). The era ended around 1453.",
    facts: [
      "The Black Death killed between 75 and 200 million people across Eurasia", 
      "A full suit of plate armor could weigh up to 30 kg, but knights were trained to be surprisingly agile in it", 
      "Most medieval peasants never traveled further than 10 km from their place of birth in their entire lives"
    ],
    quiz: [
      q("Approximately how long did the Middle Ages last?", ["100 years", "~1000 years", "50 years", "2000 years"], 1), 
      q("What was the 'Black Death'?", ["A great war", "A plague epidemic", "A period of famine", "A massive flood"], 1),
      q("Who was at the bottom of the feudal hierarchy?", ["Knights", "Lords", "Peasants", "Kings"], 2)
    ],
  },

  "industrial-revolution": {
    title: "The Industrial Revolution",
    shortDescription: "When machines changed the world",
    introduction: "The Industrial Revolution was one of the most significant turning points in human history. It transformed agrarian societies into industrial ones and laid the foundations of the modern world as we know it today.",
    theory: "**The Two Waves of the Industrial Revolution:**\n\n1. **The First Industrial Revolution (1760–1840)**:\n   - **Origin**: Began in Great Britain due to its coal reserves and colonial trade.\n   - **Key Inventions**: James Watt's improved steam engine (1769), the spinning jenny, and the power loom.\n   - **Primary Industries**: Textiles and coal mining.\n   - **Transportation**: Invention of the steam locomotive and steamships.\n\n2. **The Second Industrial Revolution (1870–1914)**:\n   - **Key Drivers**: Electricity, petroleum (oil), and steel.\n   - **Mass Production**: Introduction of the assembly line (notably by Henry Ford).\n   - **Communications**: Invention of the telegraph, telephone, and radio.\n\n**Social and Economic Impacts:**\n- **Urbanization**: Massive migration from rural areas to rapidly growing industrial cities.\n- **Labor Movement**: Formation of trade unions to fight for better working conditions and the end of child labor.\n- **Environmental Change**: The beginning of significant human impact on the global climate due to fossil fuel consumption.",
    beginnerExplanation: "The Industrial Revolution started in Britain in the 18th century. It was a time when people stopped making everything by hand and started using steam engines, factories, and railways. This changed where people lived and how they worked.",
    detailedExplanation: "The transition occurred in two main stages. The first was characterized by steam power and textile manufacturing, while the second introduced electricity, chemical production, and mass assembly lines. This period saw a massive shift in population from farms to cities (urbanization) and the birth of modern capitalism.",
    simpleExplanation: "Before this, almost everything was made by hand. Then came machines—and one machine could do the work of a hundred people! It was the birth of the modern world.",
    keyTerms: [
      { term: "Urbanization", definition: "The large-scale movement of people from rural areas to cities" },
      { term: "Industrialization", definition: "The process of developing machine production of goods on a large scale" },
      { term: "Assembly Line", definition: "A manufacturing process where parts are added to a product in a sequential manner to create a finished product faster" },
      { term: "Steam Engine", definition: "A machine that uses the expansion or rapid condensation of steam to generate power" },
    ],
    quickSummary: "18th–19th centuries, started in Britain. Key invention: James Watt’s steam engine (1769). Led to factories, railways, and urbanization. Two waves: 1) Steam & Textiles, 2) Electricity & Assembly lines.",
    facts: [
      "James Watt's steam engine became the primary symbol of the revolution", 
      "London's population exploded from 1 million to 6 million in just one century", 
      "During the early days, children as young as 6 often worked 12–16 hours a day in factories"
    ],
    quiz: [
      q("Where did the Industrial Revolution begin?", ["France", "Great Britain", "Germany", "USA"], 1), 
      q("Which invention was the primary driver of the first revolution?", ["The computer", "The steam engine", "The telephone", "The airplane"], 1),
      q("What is urbanization?", ["Building more farms", "Moving from country to city", "Planting trees", "Staying in one place"], 1)
    ],
  },

  "ancient-greece": {
    title: "Ancient Greece",
    shortDescription: "The cradle of European civilization",
    introduction: "Ancient Greece gave the world democracy, philosophy, theater, the Olympics, and the foundations of science. Greek culture became the foundation of all European civilization.",
    beginnerExplanation: "Greece — the cradle of democracy, philosophy, Olympics. City-states: Athens (democracy), Sparta (military). Great thinkers: Socrates, Plato, Aristotle.",
    detailedExplanation: "Periods: Archaic, Classical, Hellenistic. Poleis: Athens (democracy), Sparta (oligarchy). Culture: philosophy, theater, Olympics, architecture (Parthenon).",
    simpleExplanation: "Ancient Greeks invented the Olympics, democracy, and theater! And all this over 2000 years ago!",
    keyTerms: [
      { term: "Polis", definition: "A Greek city-state with its own government" },
      { term: "Democracy", definition: "Government by the people (demos — people, kratos — power)" },
      { term: "Philosophy", definition: "Love of wisdom (from philos — love, sophia — wisdom)" },
    ],
    quickSummary: "Greece: city-states (poleis). Athens — democracy. Sparta — military. Philosophers: Socrates, Plato, Aristotle. Olympics from 776 BC. Theater, architecture, science.",
    facts: ["The Olympics were held since 776 BC", "Sparta raised warriors from age 7", "The word 'democracy' is Greek"],
    quiz: [q("Who invented democracy?", ["Romans", "Egyptians", "Greeks", "Persians"], 2), q("What is a polis?", ["Temple", "City-state", "Market", "Army"], 1)],
  },

  "world-war-1": {
    title: "World War I",
    shortDescription: "The Great War that changed the world",
    introduction: "World War I (1914-1918) — the conflict that destroyed empires, killed millions, and redrew the map of Europe.",
    beginnerExplanation: "1914-1918. Entente (England, France, Russia) vs Central Powers (Germany, Austria-Hungary). Trigger: assassination of Archduke Franz Ferdinand.",
    detailedExplanation: "Causes: imperialism, militarism, alliance system. Trench warfare. New weapons: tanks, gas, aviation. Revolutions. Versailles Treaty.",
    simpleExplanation: "The first world war — when countries fought for 4 years and millions died. After it, empires collapsed.",
    quickSummary: "1914-1918. Assassination of Franz Ferdinand → war. Entente vs Central Powers. Trenches, gas, tanks. 17 million dead. Collapse of empires. Versailles Treaty.",
    facts: ["17 million dead", "First use of tanks and chemical weapons", "4 empires fell"],
    quiz: [q("When did it start?", ["1914", "1939", "1918", "1900"], 0), q("Trigger?", ["Revolution", "Archduke assassination", "Earthquake", "Election"], 1)],
  },

  "world-war-2": {
    title: "World War II",
    shortDescription: "The biggest conflict in human history",
    introduction: "World War II (1939-1945) — the deadliest conflict in history. 70-85 million dead, the Holocaust, atomic bombs — this war changed humanity forever.",
    beginnerExplanation: "1939-1945. Nazi Germany invaded Poland. The Allies (USA, Britain, USSR) won in 1945.",
    detailedExplanation: "Causes: Versailles, Nazism, appeasement. Stages: blitzkrieg, Stalingrad, liberation of Europe. Holocaust. Atomic bombs. UN creation.",
    simpleExplanation: "The most terrible war. Hitler wanted to conquer the world, but united countries stopped him.",
    quickSummary: "1939-1945. Hitler, Nazism. Blitzkrieg → Stalingrad → liberation. Holocaust (6M Jews). Hiroshima, Nagasaki. 70-85M dead. UN created.",
    facts: ["70-85 million dead", "Victory Day — May 8/9", "The UN was created after the war"],
    quiz: [q("When did it start?", ["1914", "1939", "1941", "1945"], 1), q("Nazi Germany's leader?", ["Mussolini", "Stalin", "Hitler", "Churchill"], 2), q("How many died?", ["1M", "10M", "70-85M", "100K"], 2)],
  },

  "what-is-chemistry": {
    title: "What is Chemistry",
    shortDescription: "The science of substances and their transformations",
    introduction: "Chemistry is the central science connecting physics with biology. It explains what everything is made of and how substances transform into one another.",
    beginnerExplanation: "Chemistry — the science of substances, their properties, and transformations. Everything around us is made of substances.",
    detailedExplanation: "Branches: inorganic, organic, physical, analytical. Basic concepts: atom, molecule, element, compound, reaction.",
    simpleExplanation: "Chemistry — magic that can be explained! Why does iron rust? Chemistry knows!",
    keyTerms: [
      { term: "Substance", definition: "What physical bodies are made of" },
      { term: "Chemical reaction", definition: "The transformation of one substance into another" },
      { term: "Atom", definition: "The smallest particle of a chemical element" },
      { term: "Molecule", definition: "The smallest particle of a substance that retains its properties" },
    ],
    quickSummary: "Chemistry — the science of substances and their transformations. Atom → molecule → substance → reaction. Branches: inorganic, organic, physical, analytical.",
    facts: ["Alchemists tried to make gold", "The body is 60% water", "Billions of reactions happen in the body daily"],
    quiz: [q("What does chemistry study?", ["Stars", "Substances", "Living things", "Numbers"], 1), q("Smallest particle of an element?", ["Molecule", "Atom", "Electron", "Cell"], 1)],
  },

  "atom-structure": {
    title: "Atomic Structure",
    shortDescription: "Protons, neutrons, and electrons",
    introduction: "The atom is the basic building block of matter. Understanding atomic structure is key to all of chemistry.",
    theory: "**Atomic structure:**\n\n**Nucleus** (center):\n- Protons (p⁺) — positive charge, mass ≈ 1 a.m.u.\n- Neutrons (n⁰) — neutral, mass ≈ 1 a.m.u.\n\n**Electrons** (e⁻) — around the nucleus:\n- Negative charge\n- Mass ≈ 1/1836 a.m.u.\n\n**Key numbers:**\n- Atomic number Z = number of protons = number of electrons\n- Mass number A = protons + neutrons\n\n**Isotopes** — atoms with same protons but different neutrons.\n\n**Electron configuration:** 1s² 2s² 2p⁶ 3s¹ (for Na)",
    beginnerExplanation: "Atom: nucleus (protons + neutrons) + electrons around it. Protons +, electrons −, neutrons neutral.",
    detailedExplanation: "Nucleus: protons and neutrons. Electrons on orbitals. Z = protons. A = p + n. Isotopes. Configuration: 1s² 2s² 2p⁶...",
    simpleExplanation: "An atom is like a solar system! The nucleus is the sun, electrons are planets!",
    keyTerms: [
      { term: "Proton", definition: "A positively charged particle in the atomic nucleus" },
      { term: "Neutron", definition: "A neutral particle in the atomic nucleus" },
      { term: "Electron", definition: "A negatively charged particle around the nucleus" },
      { term: "Isotope", definition: "Atoms of the same element with different numbers of neutrons" },
    ],
    formulas: [
      "Atomic number Z = number of protons",
      "Mass number A = Z + N (protons + neutrons)",
      "Neutral atom: protons = electrons",
    ],
    problemSolving: [
      { problem: "Sodium (Na): Z=11, A=23. How many protons, neutrons, electrons?", solution: "Protons = Z = 11. Neutrons = A - Z = 23 - 11 = 12. Electrons = Z = 11 (neutral atom)." },
    ],
    quickSummary: "Atom: nucleus (p⁺ + n⁰) + electrons (e⁻). Z = protons. A = p+n. Isotopes — different neutron count. Electron configuration: 1s² 2s² 2p⁶...",
    facts: ["An atom is 99.9999% empty space", "The nucleus is like a pea in a stadium", "A proton is 1836 times heavier than an electron"],
    quiz: [q("What's in the center of an atom?", ["Electrons", "Nucleus", "Neutrons", "Molecule"], 1), q("Proton's charge?", ["Negative", "Positive", "Neutral", "Variable"], 1), q("What determines the element?", ["Neutrons", "Electrons", "Protons", "Mass"], 2)],
  },

  "periodic-table": {
    title: "Periodic Table",
    shortDescription: "How Mendeleev organized all elements",
    introduction: "The periodic table is the 'alphabet' of chemistry. Mendeleev arranged elements so their properties repeat periodically.",
    beginnerExplanation: "118 elements arranged by atomic number. Rows — periods, columns — groups. Metals on the left, nonmetals on the right.",
    detailedExplanation: "Periodic law: properties = function of atomic number. 7 periods, 18 groups. s, p, d, f blocks. Trends: electronegativity, radius, ionization energy.",
    simpleExplanation: "Mendeleev arranged nature's 'building blocks' in order. Similar ones — next to each other!",
    keyTerms: [
      { term: "Period", definition: "Horizontal row (number = energy levels)" },
      { term: "Group", definition: "Vertical column (elements with similar properties)" },
      { term: "Electronegativity", definition: "An atom's ability to attract electrons" },
    ],
    quickSummary: "118 elements. Periods (rows) + groups (columns). Left→right: electronegativity increases, radius decreases. Top→bottom: radius increases. Metals left, nonmetals right.",
    facts: ["Mendeleev allegedly saw the table in a dream", "He predicted undiscovered elements", "Hydrogen is the most common element in the Universe"],
    quiz: [q("Who created the table?", ["Newton", "Einstein", "Mendeleev", "Curie"], 2), q("How many elements?", ["50", "92", "118", "200"], 2), q("A group is...", ["Row", "Column", "Diagonal", "Center"], 1)],
  },

  "chemical-bonds": {
    title: "Chemical Bonds",
    shortDescription: "How atoms hold together",
    introduction: "A chemical bond is the force that holds atoms together in molecules and crystals. The type of bond determines substance properties.",
    beginnerExplanation: "Three types: covalent (share electrons), ionic (give/take), metallic (shared electrons). Hydrogen bond is weak but important.",
    detailedExplanation: "Covalent: polar and nonpolar. Ionic: metal+nonmetal. Metallic: delocalized. Hydrogen: weak but important.",
    simpleExplanation: "Atoms 'hold hands' — that's a chemical bond!",
    keyTerms: [
      { term: "Covalent bond", definition: "Sharing an electron pair between two atoms" },
      { term: "Ionic bond", definition: "Electrostatic attraction between ions (metal gives e⁻ to nonmetal)" },
      { term: "Metallic bond", definition: "Sharing electrons among all atoms in a metal" },
    ],
    quickSummary: "Covalent: share electrons (H₂O, CO₂). Ionic: give/take (NaCl). Metallic: free electrons (Fe, Cu). Hydrogen: weak, H...O/N (water!).",
    facts: ["Hydrogen bonds make water unique", "Diamond is hard due to covalent bonds", "NaCl — ionic bond"],
    quiz: [q("Covalent means...", ["Give e⁻", "Share e⁻", "Free e⁻", "No e⁻"], 1), q("NaCl — what bond?", ["Covalent", "Ionic", "Metallic", "Hydrogen"], 1)],
  },

  "chemical-reactions": {
    title: "Types of Chemical Reactions",
    shortDescription: "How substances transform",
    introduction: "Chemical reactions happen everywhere: burning a candle, rusting iron, digesting food. Understanding reaction types is the foundation of chemistry.",
    beginnerExplanation: "Types: synthesis (A+B→AB), decomposition (AB→A+B), substitution (A+BC→AC+B), exchange (AB+CD→AD+CB). Signs: color, gas, precipitate, heat.",
    detailedExplanation: "By number of substances, thermal effect, reversibility, oxidation states, catalyst. Law of conservation of mass.",
    simpleExplanation: "A chemical reaction is like cooking: ingredients turn into a new dish!",
    keyTerms: [
      { term: "Reactants", definition: "Substances that enter a reaction" },
      { term: "Products", definition: "Substances formed as a result of a reaction" },
      { term: "Catalyst", definition: "A substance that speeds up a reaction without being consumed" },
    ],
    formulas: [
      "Law of conservation of mass: m(reactants) = m(products)",
      "Synthesis: A + B → AB",
      "Decomposition: AB → A + B",
      "Substitution: A + BC → AC + B",
      "Exchange: AB + CD → AD + CB",
    ],
    quickSummary: "4 types: synthesis, decomposition, substitution, exchange. Law of conservation of mass. Signs: color change, gas, precipitate, heat. Exo/endothermic.",
    facts: ["Burning is a reaction with oxygen", "Rusting is a slow reaction", "An explosion is a very fast reaction"],
    quiz: [q("What is conserved?", ["Color", "Mass", "Volume", "Temperature"], 1), q("A+B→AB — type?", ["Decomposition", "Synthesis", "Substitution", "Exchange"], 1)],
  },

  "organic-chemistry-basics": {
    title: "Organic Chemistry Basics",
    shortDescription: "The chemistry of carbon and life",
    introduction: "Organic chemistry is the chemistry of carbon compounds. Carbon is unique: it can form long chains, rings, and diverse structures.",
    beginnerExplanation: "Carbon has 4 bonds and can form chains and rings. Organic substances: plastic, gasoline, sugar, DNA.",
    detailedExplanation: "Carbon: sp³ (alkanes), sp² (alkenes), sp (alkynes). Homologous series. Isomerism. Functional groups: -OH, -COOH, -NH₂.",
    simpleExplanation: "Carbon is like LEGO. Connects into chains and rings, creating millions of substances!",
    keyTerms: [
      { term: "Organic compound", definition: "A compound containing carbon (except CO₂, carbonates)" },
      { term: "Homologous series", definition: "A group of compounds with the same general formula, differing by CH₂" },
      { term: "Isomers", definition: "Compounds with the same formula but different structure" },
    ],
    formulas: [
      "Alkanes: CₙH₂ₙ₊₂ (CH₄, C₂H₆, C₃H₈...)",
      "Alkenes: CₙH₂ₙ (C₂H₄, C₃H₆...)",
      "Alkynes: CₙH₂ₙ₋₂ (C₂H₂, C₃H₄...)",
    ],
    quickSummary: "Organic = carbon chemistry. C has 4 bonds. Alkanes CₙH₂ₙ₊₂, alkenes CₙH₂ₙ, alkynes CₙH₂ₙ₋₂. Functional groups: -OH, -COOH, -NH₂. 100M+ compounds.",
    facts: ["100+ million organic compounds", "Diamond and graphite are both carbon", "CH₄ is the simplest organic substance"],
    quiz: [q("The basis of organic chemistry?", ["Oxygen", "Carbon", "Hydrogen", "Nitrogen"], 1), q("How many bonds does carbon have?", ["2", "3", "4", "6"], 2), q("CH₄ is...", ["Methane", "Ethane", "Propane", "Butane"], 0)],
  },

  "newtons-laws": {
    title: "Newton's Laws",
    shortDescription: "Three laws that explain motion",
    introduction: "Newton's three laws are the foundation of classical mechanics. They explain why bodies move, stop, and accelerate.",
    theory: "**1st Law (Inertia):**\nA body remains at rest or uniform motion unless acted upon by a force.\n\nΣF = 0 → v = const\n\n**2nd Law:**\nAcceleration is proportional to force and inversely proportional to mass.\n\n**F = ma**\n\n**3rd Law:**\nEvery action has an equal and opposite reaction.\n\n**F₁₂ = -F₂₁**\n\nForces act on DIFFERENT bodies, so they don't cancel.",
    beginnerExplanation: "1st: a body maintains its state without forces. 2nd: F=ma. 3rd: action = reaction.",
    detailedExplanation: "1st: ΣF=0 → v=const. 2nd: ΣF=ma. 3rd: F₁₂=-F₂₁. Valid for v<<c in inertial frames.",
    simpleExplanation: "1) Don't push it — it stays. 2) Push harder — it flies faster. 3) Push a wall — the wall pushes back!",
    keyTerms: [
      { term: "Inertia", definition: "A body's property to maintain its state of motion" },
      { term: "Force (F)", definition: "A measure of body interaction, measured in newtons (N)" },
      { term: "Acceleration (a)", definition: "Rate of velocity change, m/s²" },
    ],
    formulas: [
      "F = ma (2nd law)",
      "a = F/m",
      "F₁₂ = -F₂₁ (3rd law)",
      "1 N = 1 kg·m/s²",
    ],
    problemSolving: [
      { problem: "A 5 kg body accelerates at 2 m/s². What is the force?", solution: "F = ma = 5 × 2 = 10 N" },
      { problem: "A 20 N force acts on a 4 kg body. What acceleration?", solution: "a = F/m = 20/4 = 5 m/s²" },
    ],
    quickSummary: "1st: no force = no change in motion. 2nd: F=ma. 3rd: action=reaction. Valid for v<<c. 1N = 1kg·m/s².",
    facts: ["Newton described the laws in 1687", "On the ISS — weightlessness (1st law)", "3rd law: rockets fly"],
    quiz: [q("F=ma — which law?", ["First", "Second", "Third", "Fourth"], 1), q("1st law is about?", ["Force", "Inertia", "Energy", "Heat"], 1), q("3rd law:", ["Action=reaction", "F=ma", "E=mc²", "Perpetual motion"], 0)],
  },

  "energy-physics": {
    title: "Energy and Its Types",
    shortDescription: "Kinetic, potential, and conservation law",
    introduction: "Energy is one of the most fundamental concepts in physics. It doesn't disappear or appear from nothing — it only transforms from one type to another.",
    beginnerExplanation: "Kinetic — energy of motion. Potential — energy of position. Conservation law: energy doesn't disappear, it transforms.",
    detailedExplanation: "Ek = ½mv². Ep = mgh. Conservation law: Ek + Ep = const in a closed system. Work A = Fs·cos(α). Power P = A/t.",
    simpleExplanation: "A rock on a mountain has 'stored' energy. When it falls — it 'spends' it on speed!",
    keyTerms: [
      { term: "Kinetic energy", definition: "Energy of a moving body: Ek = ½mv²" },
      { term: "Potential energy", definition: "Energy of body position: Ep = mgh" },
      { term: "Work", definition: "Product of force and displacement: A = Fs·cos(α)" },
    ],
    formulas: [
      "Ek = ½mv²",
      "Ep = mgh",
      "Conservation law: Ek + Ep = const",
      "Work: A = Fs·cos(α)",
      "Power: P = A/t",
    ],
    problemSolving: [
      { problem: "A 2 kg body falls from 5 m height. Speed near the ground? (g=10)", solution: "By conservation law: mgh = ½mv² → v = √(2gh) = √(2×10×5) = √100 = 10 m/s" },
    ],
    quickSummary: "Ek=½mv² (motion), Ep=mgh (height). Conservation: Ek+Ep=const. Work A=Fs·cosα. Power P=A/t. Energy doesn't disappear!",
    facts: ["E=mc²: mass is a form of energy", "The Sun: 4M tons of mass → energy every second", "A person: ~2000 kcal/day"],
    quiz: [q("Kinetic is the energy of...", ["Position", "Motion", "Heat", "Light"], 1), q("Formula?", ["mgh", "½mv²", "Fs", "mc²"], 1), q("Conservation law:", ["Disappears", "Doesn't disappear", "Increases", "Decreases"], 1)],
  },

  "gravity": {
    title: "Gravity",
    shortDescription: "The force holding planets and apples",
    introduction: "Gravity is the most well-known and weakest fundamental force. It keeps planets in orbits, makes apples fall, and creates black holes.",
    beginnerExplanation: "Gravity is the force of attraction between bodies with mass. F = G·m₁·m₂/r². g ≈ 9.8 m/s².",
    detailedExplanation: "F = Gm₁m₂/r², G = 6.674×10⁻¹¹. g ≈ 9.8 m/s². First cosmic velocity: v₁ ≈ 7.9 km/s. Einstein: gravity = curvature of spacetime.",
    simpleExplanation: "Gravity is Earth's invisible magnet. That's why apples fall down!",
    keyTerms: [
      { term: "Gravitational constant G", definition: "Fundamental constant: 6.674×10⁻¹¹ N·m²/kg²" },
      { term: "Free fall acceleration g", definition: "g ≈ 9.8 m/s² on Earth's surface" },
    ],
    formulas: [
      "F = G·m₁·m₂ / r²",
      "g = GM/R² ≈ 9.8 m/s²",
      "First cosmic velocity: v₁ = √(gR) ≈ 7.9 km/s",
    ],
    quickSummary: "F=Gm₁m₂/r². G=6.674×10⁻¹¹. g≈9.8 m/s². First cosmic ~7.9 km/s. Einstein: gravity = spacetime curvature.",
    facts: ["On the Moon, weight is 6 times less", "Newton and the apple — a legend", "Gravitational waves detected in 2015"],
    quiz: [q("Gravity depends on...", ["Color", "Mass and distance", "Temperature", "Speed"], 1), q("g ≈ ?", ["1 m/s²", "9.8 m/s²", "100 m/s²", "3.14"], 1)],
  },

  "states-of-matter": {
    title: "States of Matter",
    shortDescription: "Solid, liquid, gas",
    introduction: "Every substance can exist in three main states: solid, liquid, and gaseous. The difference is in molecule behavior. There's also a fourth state — plasma.",
    beginnerExplanation: "Solid (ice), liquid (water), gas (steam). In solids, molecules vibrate in place; in gas, they fly chaotically.",
    detailedExplanation: "Solid: crystalline and amorphous. Liquid: short-range order. Gas: chaotic motion. Phase transitions. Plasma — fourth state.",
    simpleExplanation: "Molecules are like people: in ice they stand in line, in water they walk around the room, in steam they run everywhere!",
    keyTerms: [
      { term: "State of matter", definition: "The state of a substance: solid, liquid, gaseous, or plasma" },
      { term: "Melting", definition: "Transition from solid to liquid state" },
      { term: "Evaporation", definition: "Transition from liquid to gaseous state" },
    ],
    quickSummary: "3 states: solid (order), liquid (partial), gas (chaos). Transitions: melting, crystallization, evaporation, condensation, sublimation. Plasma — 4th state.",
    facts: ["99% of visible matter is plasma", "Water expands when freezing", "Helium is liquid at -272°C"],
    quiz: [q("How many main states?", ["2", "3", "4", "5"], 1), q("Fastest molecules are in...", ["Solid", "Liquid", "Gas", "Same"], 2)],
  },

  "electric-current": {
    title: "Electric Current",
    shortDescription: "Flow of charged particles",
    introduction: "Electricity is the foundation of modern civilization. Without electric current, phones, computers, lights, and transport wouldn't work.",
    theory: "**Electric current** — directed movement of charged particles.\n\n**Main quantities:**\n- Current I = q/t (ampere, A)\n- Voltage U — 'pressure' pushing electrons (volt, V)\n- Resistance R — 'obstacle' to current (ohm, Ω)\n\n**Ohm's Law:** I = U/R\n\n**Connections:**\n- Series: I = const, U = U₁+U₂, R = R₁+R₂\n- Parallel: U = const, I = I₁+I₂, 1/R = 1/R₁+1/R₂\n\n**Power:** P = UI = I²R = U²/R",
    beginnerExplanation: "Current — movement of electrons through a conductor. Ohm's Law: I = U/R. Measured in amperes.",
    detailedExplanation: "I = q/t. Ohm's Law: I = U/R. Series: I=const. Parallel: U=const. P = UI.",
    simpleExplanation: "Electric current — a flow of invisible balls (electrons) running through a wire!",
    keyTerms: [
      { term: "Current (I)", definition: "Amount of charge per unit time, measured in amperes" },
      { term: "Voltage (U)", definition: "Potential difference, measured in volts" },
      { term: "Resistance (R)", definition: "A conductor's opposition to current, measured in ohms" },
    ],
    formulas: [
      "I = U/R (Ohm's Law)",
      "P = UI (power)",
      "Series: R = R₁ + R₂",
      "Parallel: 1/R = 1/R₁ + 1/R₂",
    ],
    problemSolving: [
      { problem: "U = 12 V, R = 4 Ω. Find I.", solution: "I = U/R = 12/4 = 3 A" },
      { problem: "Two resistors R₁=6 Ω, R₂=3 Ω in parallel. Total resistance?", solution: "1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2. R = 2 Ω." },
    ],
    quickSummary: "Ohm's Law: I=U/R. Current (A), voltage (V), resistance (Ω). Series: R=R₁+R₂. Parallel: 1/R=1/R₁+1/R₂. Power P=UI.",
    facts: ["Lightning is millions of volts", "Ohm's Law — 1827", "The body conducts electricity"],
    quiz: [q("What is current?", ["Water flow", "Charge movement", "Air flow", "Magnetic field"], 1), q("I = ?", ["U+R", "U/R", "U×R", "R/U"], 1), q("Unit of current?", ["Volt", "Ampere", "Watt", "Ohm"], 1)],
  },

  "magnetism-basics": {
    title: "Magnetism",
    shortDescription: "The invisible force of magnets",
    introduction: "Magnetism is one of the fundamental forces of nature, closely linked to electricity. Earth's magnetic field protects us from solar wind.",
    beginnerExplanation: "Magnets: N and S poles. Like poles repel, unlike attract. Earth is a magnet. Current creates a magnetic field.",
    detailedExplanation: "B — magnetic induction (tesla). Lorentz force: F=qvBsin(α). Ampere force: F=BIlsin(α). Faraday's electromagnetic induction.",
    simpleExplanation: "A magnet is a wizard that attracts iron! Earth is the biggest magnet!",
    keyTerms: [
      { term: "Magnetic induction (B)", definition: "Characteristic of a magnetic field, measured in teslas" },
      { term: "Electromagnetic induction", definition: "EMF arising from changing magnetic flux" },
    ],
    formulas: [
      "Lorentz force: F = qvB·sin(α)",
      "Ampere force: F = BIl·sin(α)",
      "Induction EMF: ε = -dΦ/dt",
    ],
    quickSummary: "2 poles (N, S). Like poles repel. Current → magnetic field. Lorentz force: F=qvBsinα. Faraday's induction: changing Φ → EMF.",
    facts: ["Earth is a giant magnet", "MRI uses powerful magnets", "The magnetic field protects from solar wind"],
    quiz: [q("How many poles?", ["1", "2", "3", "4"], 1), q("Like poles?", ["Attract", "Repel", "Nothing", "Disappear"], 1)],
  },

  "light-basics": {
    title: "Light and Its Nature",
    shortDescription: "Wave or particle?",
    introduction: "Light is one of the most mysterious phenomena in physics. It is simultaneously a wave and a particle (photon). The speed of light is the absolute speed limit in the Universe.",
    beginnerExplanation: "Light is electromagnetic radiation. Speed ~300,000 km/s. White light = all colors. It reflects, refracts, and is absorbed.",
    detailedExplanation: "c ≈ 3×10⁸ m/s. Wave-particle duality. Spectrum: radio, IR, visible, UV, X-ray, gamma. Reflection law: angle of incidence = angle of reflection. Snell's law of refraction.",
    simpleExplanation: "Light is the fastest thing in the universe! It's both a wave and tiny particles called photons!",
    keyTerms: [
      { term: "Photon", definition: "A quantum (particle) of light" },
      { term: "Wave-particle duality", definition: "Light behaves as both a wave and a particle" },
      { term: "Refraction", definition: "Change of light direction when passing between media" },
    ],
    formulas: [
      "c ≈ 3 × 10⁸ m/s",
      "E = hf (photon energy)",
      "n = c/v (refractive index)",
      "Reflection: angle of incidence = angle of reflection",
    ],
    quickSummary: "Light: wave + particle. c ≈ 3×10⁸ m/s. Visible spectrum: red → violet. Reflection, refraction, dispersion. E = hf. Nothing travels faster than light.",
    facts: ["Light from the Sun takes 8 minutes to reach Earth", "Nothing can travel faster than light", "A rainbow is dispersion of light"],
    quiz: [q("Speed of light ≈ ?", ["300 km/s", "300,000 km/s", "1,000 km/s", "Speed of sound"], 1), q("Light is...", ["Only a wave", "Only a particle", "Both wave and particle", "Neither"], 2)],
  },

  "black-holes": {
    title: "Black Holes",
    shortDescription: "The most mysterious objects in the Universe",
    introduction: "Black holes are regions in space where gravity is so intense that nothing—not even light—can escape its pull. They typically form from the remnants of massive stars and remain among the most enigmatic phenomena in modern physics.",
    theory: "**Anatomy and Physics of a Black Hole:**\n\n1. **The Event Horizon**: The 'point of no return.' Once an object crosses this boundary, the escape velocity required to leave exceeds the speed of light, making escape physically impossible.\n2. **The Singularity**: The center of the black hole where, according to General Relativity, matter is crushed into a point of infinite density and zero volume. Here, the known laws of physics cease to function.\n3. **The Accretion Disk**: A swirling disk of gas and dust spiraling into the black hole at relativistic speeds, emitting intense X-rays and visible light due to friction.\n4. **Schwarzschild Radius**: The specific radius to which any mass must be compressed to become a black hole.\n5. **Spaghettification**: The process where extreme tidal forces stretch an object into a thin ribbon as it approaches the singularity.",
    beginnerExplanation: "A black hole is a region of space where gravity is so strong that even light cannot escape. It forms when a massive star dies and collapses under its own weight.",
    detailedExplanation: "Black holes are described by the Schwarzschild and Kerr metrics in General Relativity. Key concepts include the Event Horizon, the central Singularity, and Hawking Radiation—a theoretical thermal radiation emitted by black holes due to quantum effects near the horizon.",
    simpleExplanation: "Imagine a place in space with gravity so powerful it acts like a cosmic drain that swallows everything, including light itself!",
    keyTerms: [
      { term: "Event Horizon", definition: "The outer boundary of a black hole beyond which nothing can escape" },
      { term: "Singularity", definition: "The core of a black hole where density becomes infinite" },
      { term: "Relativistic speeds", definition: "Speeds that are a significant fraction of the speed of light" },
      { term: "Spaghettification", definition: "The vertical stretching and horizontal compression of objects falling into a black hole" },
    ],
    quickSummary: "Black Hole: Intense gravity traps everything, including light. Key parts: Event Horizon (boundary) and Singularity (center). Time slows down significantly near the horizon. The first-ever image was captured in 2019.",
    facts: [
      "There is a supermassive black hole called Sagittarius A* at the center of our Galaxy with a mass of 4 million Suns", 
      "Time dilation: Time passes much slower near a black hole compared to an observer far away", 
      "The first actual image of a black hole (M87*) was released in 2019 by the Event Horizon Telescope"
    ],
    quiz: [
      q("What is the only thing that CANNOT escape a black hole?", ["Planets", "Even light", "Stars", "Asteroids"], 1), 
      q("What is the name of the 'point of no return' boundary?", ["Atmosphere", "Event Horizon", "The Ring", "The Belt"], 1),
      q("What happens to time near a black hole?", ["It stops", "It slows down", "It speeds up", "It goes backward"], 1)
    ],
  },

  "relativity-basics": {
    title: "Theory of Relativity",
    shortDescription: "E = mc² and the curvature of spacetime",
    introduction: "Einstein's Theory of Relativity is one of the greatest achievements of the human mind. It demonstrated that space and time are not absolute constants but are interwoven into a four-dimensional fabric, and gravity is the curvature of that very fabric.",
    theory: "**Special Theory of Relativity (1905):**\n\nBased on two fundamental postulates:\n1. The laws of physics are invariant in all **Inertial Reference Frames**.\n2. The speed of light in a vacuum ($c$) is constant for all observers, regardless of their motion.\n\n**Key Consequences:**\n- **Time Dilation**: Time passes slower for an object in motion relative to a stationary observer: $t' = t / \\sqrt{1 - v^2/c^2}$.\n- **Length Contraction**: Objects appear shorter in the direction of motion: $l' = l \\cdot \\sqrt{1 - v^2/c^2}$.\n- **Mass-Energy Equivalence**: $E = mc^2$ — energy and mass are two forms of the same thing.\n\n**General Theory of Relativity (1916):**\n- Gravity is not a force acting at a distance, but a geometric property of spacetime.\n- Massive objects (like stars and planets) warp the fabric of spacetime, causing other objects to move along curved paths called **geodesics**.\n\n**Experimental Evidence:**\n- **Mercury’s Orbit**: Its precession couldn't be fully explained by Newton's laws.\n- **Gravitational Lensing**: Light from distant stars bends as it passes near the Sun.\n- **Gravitational Time Dilation**: Clocks on GPS satellites run slightly faster than those on Earth due to weaker gravity.\n- **Gravitational Waves**: Ripples in spacetime detected by LIGO in 2015.",
    beginnerExplanation: "Space and time are linked and can change depending on how fast you move or how much gravity is around you. The famous equation $E = mc^2$ shows that a tiny bit of matter can be turned into a massive amount of energy.",
    detailedExplanation: "Special Relativity focuses on the constant speed of light and its effects on time and mass. General Relativity explains gravity as the curvature of the spacetime fabric. Both have been proven through experiments like light deflection, GPS clock corrections, and the detection of gravitational waves.",
    simpleExplanation: "Think of time like a rubber band: the faster you fly through space, the more that 'band' stretches, and the slower you age compared to people on Earth!",
    keyTerms: [
      { term: "Spacetime", definition: "A four-dimensional continuum combining three dimensions of space and one dimension of time" },
      { term: "E = mc²", definition: "Einstein's equation proving that mass and energy are interchangeable" },
      { term: "Inertial Frame", definition: "A frame of reference in which an object remains at rest or moves at a constant velocity unless acted upon by a force" },
      { term: "Gravitational Waves", definition: "Ripples in the fabric of spacetime caused by massive accelerating objects" },
    ],
    formulas: [
      "E = mc^2",
      "Time Dilation: t' = t / \\sqrt{1 - v^2/c^2}",
      "Length Contraction: l' = l \\cdot \\sqrt{1 - v^2/c^2}",
    ],
    quickSummary: "Special Relativity: time slows down at high speeds, and mass equals energy. General Relativity: gravity is the warping of spacetime. This isn't just theory—GPS systems wouldn't work without accounting for these effects!",
    facts: [
      "GPS satellites must adjust their clocks by about 38 microseconds per day to account for relativity, or your location would be off by kilometers", 
      "If you traveled at 99% of the speed of light, one year for you would be seven years for people on Earth", 
      "The energy contained in 1 kg of mass is equivalent to a 21-megaton nuclear explosion"
    ],
    quiz: [
      q("What does E=mc² primarily represent?", ["Energy equals mass times the speed of light squared", "Mass never changes", "Light is slow", "Time is absolute"], 0), 
      q("What happens to time as an object approaches the speed of light?", ["It speeds up", "It slows down", "It stops completely", "It stays the same"], 1),
      q("Who is the primary author of the Theory of Relativity?", ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Niels Bohr"], 1)
    ],
  },
  },

  "cell-structure": {
    title: "Cell Structure", shortDescription: "Organelles and their functions",
    introduction: "The cell is the smallest structural unit of a living organism. Each cell is a miniature factory with dozens of organelles.",
    theory: "**Main organelles:** Nucleus (DNA), Mitochondria (ATP), ER, Golgi apparatus, Ribosomes, Lysosomes, Cell membrane. Plant cells also have: cell wall, chloroplasts, vacuole. Prokaryotes lack a nucleus.",
    beginnerExplanation: "A cell has a nucleus (brain), mitochondria (batteries), ribosomes (protein factories), and a membrane (wall).",
    detailedExplanation: "Nucleus: DNA. Mitochondria: ATP. ER: synthesis. Golgi: packaging. Ribosomes: proteins. Lysosomes: digestion.",
    simpleExplanation: "A cell is a tiny city! The nucleus is city hall, mitochondria are the power plant!",
    keyTerms: [{ term: "Organelle", definition: "A permanent cell structure with a specific function" }, { term: "Mitochondria", definition: "Organelle that produces energy (ATP)" }],
    quickSummary: "Nucleus (DNA), mitochondria (ATP), ER, Golgi, ribosomes, lysosomes, membrane.",
    facts: ["A human cell contains ~1000 mitochondria", "Mitochondria have their own DNA", "There are millions of ribosomes in a cell"],
    quiz: [q("Energy is produced by:", ["Ribosomes", "Mitochondria", "Lysosomes", "Vacuoles"], 1), q("DNA is in the:", ["Membrane", "Nucleus", "Ribosome", "Lysosome"], 1)],
  },
  "cell-division": {
    title: "Cell Division: Mitosis and Meiosis", shortDescription: "How cells reproduce",
    introduction: "Cell division is the basis of growth and reproduction. Mitosis ensures growth, meiosis produces sex cells.",
    beginnerExplanation: "Mitosis: 1 cell → 2 identical. Meiosis: 1 cell → 4 different (for reproduction).",
    detailedExplanation: "Mitosis: 2n→2n, 4 phases. Meiosis: 2n→n, two divisions, crossing over.",
    simpleExplanation: "Mitosis is photocopying a cell. Meiosis is shuffling cards for uniqueness!",
    keyTerms: [{ term: "Mitosis", definition: "Division producing two identical cells" }, { term: "Meiosis", definition: "Division producing four gametes with half chromosomes" }],
    quickSummary: "Mitosis: 2n→2n, 2 cells. Meiosis: 2n→n, 4 gametes. Crossing over ensures diversity.",
    facts: ["~3.8 million cells divide every second", "Cancer is uncontrolled mitosis", "Without meiosis there'd be no genetic diversity"],
    quiz: [q("Mitosis produces:", ["4 cells", "2 cells", "1 cell", "8 cells"], 1), q("Gametes are formed by:", ["Mitosis", "Meiosis", "Amitosis", "Phagocytosis"], 1)],
  },
  "blood-system": {
    title: "Circulatory System", shortDescription: "Heart, vessels, and blood",
    introduction: "The circulatory system is the body's transport network. The heart pumps 7,000 liters daily through 100,000 km of vessels.",
    beginnerExplanation: "Heart is a pump, arteries and veins are pipes, blood carries oxygen and nutrients.",
    detailedExplanation: "2 circuits. Heart: 4 chambers. Arteries→capillaries→veins. RBCs: O₂. WBCs: defense. Platelets: clotting.",
    simpleExplanation: "The heart is a motor, blood delivers oxygen like pizza to every cell!",
    keyTerms: [{ term: "Erythrocytes", definition: "Red blood cells that carry oxygen" }, { term: "Hemoglobin", definition: "Protein that binds oxygen" }],
    quickSummary: "Heart: 4 chambers, 2 circuits. Arteries→capillaries→veins. RBCs, WBCs, platelets.",
    facts: ["Heart beats ~100,000 times/day", "Vessels span 100,000 km", "A red blood cell lives ~120 days"],
    quiz: [q("Oxygen is carried by:", ["Leukocytes", "Erythrocytes", "Platelets", "Plasma"], 1), q("Heart chambers:", ["2", "3", "4", "6"], 2)],
  },
  "mendel-laws": {
    title: "Mendel's Laws", shortDescription: "Foundations of classical genetics",
    introduction: "Gregor Mendel — father of genetics. His pea experiments laid the foundation for understanding heredity.",
    beginnerExplanation: "3 laws of heredity. F₁ is uniform, F₂ segregates 3:1.",
    detailedExplanation: "1st: F₁ uniformity. 2nd: segregation 3:1. 3rd: independent assortment 9:3:3:1.",
    simpleExplanation: "Two brown-eyed parents can have a blue-eyed child — that's Mendel's genetics!",
    keyTerms: [{ term: "Dominant allele", definition: "Expressed in heterozygous state" }, { term: "Genotype", definition: "The set of genes" }, { term: "Phenotype", definition: "Observable expression of genotype" }],
    quickSummary: "1st: F₁ uniform. 2nd: F₂=3:1. 3rd: independent assortment=9:3:3:1.",
    facts: ["Published 1866", "Rediscovered in 1900", "Studied 7 pea traits"],
    quiz: [q("F₂ segregation:", ["1:1", "2:1", "3:1", "4:1"], 2), q("Father of genetics:", ["Darwin", "Mendel", "Lamarck", "Morgan"], 1)],
  },
  "fractions-basics": {
    title: "Common Fractions", shortDescription: "Numerator, denominator, and operations",
    introduction: "Fractions express parts of a whole and enable precise calculations.",
    beginnerExplanation: "a/b: a — parts taken, b — total parts. Add: common denominator. Multiply: num×num/den×den.",
    detailedExplanation: "Addition: common denominator. Multiplication: num×num, den×den. Division: flip and multiply.",
    simpleExplanation: "A fraction is a slice of pie! ½ is half, ¼ is a quarter!",
    keyTerms: [{ term: "Numerator", definition: "Top part — how many parts taken" }, { term: "Denominator", definition: "Bottom part — how many equal parts" }],
    quickSummary: "a/b. Add: common denominator. Multiply: num×num/den×den. Divide: multiply by reciprocal.",
    facts: ["Fractions used by Egyptians 3000 years ago", "Decimal fractions invented by Stevin in 1585"],
    quiz: [q("2/3 + 1/3 = ?", ["1", "2/3", "3/3", "1/6"], 0), q("1/2 × 1/3 = ?", ["1/5", "1/6", "2/3", "1/3"], 1)],
  },
  "inequalities": {
    title: "Inequalities", shortDescription: "Comparing and solving inequalities",
    introduction: "Inequalities describe ranges of values and constraints in real-world problems.",
    beginnerExplanation: "Solve like equations, but multiplying by negative flips the sign!",
    detailedExplanation: "Linear: ax+b>0. Quadratic: interval method. Multiplying by negative → sign flip.",
    simpleExplanation: "An inequality isn't '=', it's 'greater' or 'less.' Like comparing heights!",
    keyTerms: [{ term: "Interval method", definition: "Solving inequalities using signs on a number line" }],
    quickSummary: "Linear: like equations but sign flips with negative. Quadratic: interval method.",
    facts: ["Systematized by Cauchy", "Interval method works for any polynomial"],
    quiz: [q("-2x > 4, then x:", ["> -2", "< -2", "> 2", "< 2"], 1), q("Multiply by -1:", ["Sign stays", "Sign flips", "Disappears", "Becomes equation"], 1)],
  },
  "quadratic-function": {
    title: "Quadratic Function", shortDescription: "Parabola and its properties",
    introduction: "y = ax² + bx + c — its graph, the parabola, appears from ball trajectories to satellite dishes.",
    beginnerExplanation: "y=ax²+bx+c draws a parabola. a>0: cup, a<0: hill. Vertex: x=-b/2a.",
    detailedExplanation: "Vertex (-b/2a, f(-b/2a)). D=b²-4ac determines zeros. Vertex form: y=a(x-x₀)²+y₀.",
    simpleExplanation: "Throw a ball — it flies in a parabola! That's the quadratic function!",
    keyTerms: [{ term: "Parabola", definition: "Graph of a quadratic function" }, { term: "Vertex", definition: "Highest or lowest point of a parabola" }],
    quickSummary: "y=ax²+bx+c. a>0 up, a<0 down. Vertex: x=-b/2a. Zeros: D=b²-4ac.",
    facts: ["Parabolic antennas focus signals at the vertex", "Projectile trajectory is a parabola"],
    quiz: [q("Graph of y=ax²:", ["Line", "Parabola", "Circle", "Hyperbola"], 1), q("Vertex x=:", ["-b/a", "b/2a", "-b/2a", "b/a"], 2)],
  },
  "circle-area": {
    title: "Circle and Disc", shortDescription: "Circumference and area formulas",
    introduction: "The circle is one of the most perfect geometric shapes. π appears everywhere.",
    beginnerExplanation: "Circle — the line, disc — the area inside. C=2πr, S=πr².",
    detailedExplanation: "C=2πr=πd. S=πr². Arc: l=πrα/180. Sector: S=πr²α/360.",
    simpleExplanation: "A pizza is a disc! Its edge is a circle. Area = πr²!",
    keyTerms: [{ term: "Radius", definition: "Distance from center to circle" }, { term: "π", definition: "≈3.14159" }],
    quickSummary: "C=2πr, S=πr². π≈3.14159.",
    facts: ["π calculated to trillions of digits", "Pi Day is March 14", "Archimedes first calculated π"],
    quiz: [q("S = ?", ["2πr", "πr²", "πd", "r²"], 1), q("π ≈ ?", ["2.14", "3.14", "4.14", "1.14"], 1)],
  },
  "logarithms": {
    title: "Logarithms", shortDescription: "The inverse of exponentiation",
    introduction: "Logarithms turn multiplication into addition. Used in Richter scale, decibels, and more.",
    beginnerExplanation: "log_a(b) — what power to raise a to get b. log₂(8)=3 because 2³=8.",
    detailedExplanation: "log_a(b)=c ↔ a^c=b. Product→sum. Power→multiplier. lg=log₁₀, ln=logₑ.",
    simpleExplanation: "Logarithm is an 'anti-power.' 2³=8, so log₂(8)=3!",
    keyTerms: [{ term: "Logarithm", definition: "Exponent to which base must be raised to get a number" }],
    quickSummary: "log_a(b)=c ↔ a^c=b. Product→sum. lg=log₁₀, ln=logₑ.",
    facts: ["Invented by Napier in 1614", "Richter scale is logarithmic", "Decibels are logarithms"],
    quiz: [q("log₂(8) = ?", ["2", "3", "4", "8"], 1), q("log_a(1) = ?", ["1", "0", "a", "-1"], 1)],
  },
  "ancient-egypt": {
    title: "Ancient Egypt", shortDescription: "Pharaohs, pyramids, and the Nile",
    introduction: "Ancient Egypt — one of the oldest civilizations, lasting over 3,000 years along the Nile.",
    beginnerExplanation: "Pharaohs built pyramids. Egyptians invented papyrus, calendar, hieroglyphics.",
    detailedExplanation: "3000+ years. Pyramids, mummification, hieroglyphics, papyrus. Pharaoh = god.",
    simpleExplanation: "Egypt — land of pharaohs, mummies, and massive pyramids!",
    keyTerms: [{ term: "Pharaoh", definition: "Ruler of Egypt, considered a living god" }, { term: "Hieroglyphics", definition: "Egyptian writing system" }],
    quickSummary: "3000+ years on the Nile. Pyramids, hieroglyphics, papyrus, mummification, 365-day calendar.",
    facts: ["Great Pyramid: 146m, 2.3M blocks", "Cleopatra lived closer to iPhone than to pyramids", "Egyptians invented toothpaste"],
    quiz: [q("Ruler of Egypt:", ["King", "Pharaoh", "Emperor", "Consul"], 1), q("Egyptian writing:", ["Cuneiform", "Hieroglyphics", "Latin", "Cyrillic"], 1)],
  },
  "ancient-greece": {
    title: "Ancient Greece", shortDescription: "Democracy, philosophy, and Olympics",
    introduction: "Ancient Greece — cradle of European civilization. Democracy, philosophy, theater, and Olympics were born here.",
    beginnerExplanation: "Greece gave the world democracy, philosophy, Olympics, theater. Athens and Sparta.",
    detailedExplanation: "City-states: Athens (democracy), Sparta (military). Philosophers: Socrates, Plato, Aristotle.",
    simpleExplanation: "Greeks invented voting, Olympics, and loved thinking about everything!",
    keyTerms: [{ term: "Polis", definition: "A city-state in Ancient Greece" }, { term: "Democracy", definition: "Rule by the people" }],
    quickSummary: "City-states. Democracy, philosophy, theater, Olympics. Socrates, Plato, Aristotle.",
    facts: ["First Olympics — 776 BCE", "Democracy: demos + kratos", "Spartan training from age 7"],
    quiz: [q("Democracy created in:", ["Sparta", "Athens", "Rome", "Egypt"], 1), q("NOT a Greek philosopher:", ["Socrates", "Plato", "Caesar", "Aristotle"], 2)],
  },
  "ancient-rome": {
    title: "Ancient Rome", shortDescription: "From Republic to Empire",
    introduction: "Rome — from small settlement to the greatest empire. Roman law and engineering underpin modern civilization.",
    beginnerExplanation: "Kingdom → Republic → Empire. Roads, aqueducts, Colosseum. Roman law = modern law basis.",
    detailedExplanation: "753 BCE founding. Republic: senate. Empire: Augustus. Fall: 476 CE.",
    simpleExplanation: "Romans built the roads we walk on and the laws we live by!",
    keyTerms: [{ term: "Senate", definition: "Council of elders — supreme body of the Republic" }, { term: "Legion", definition: "Main military unit (~5000 soldiers)" }],
    quickSummary: "753 BCE–476 CE. Kingdom→Republic→Empire. Senate, legions, law, roads, Latin.",
    facts: ["Roman roads lasted 2000 years", "Colosseum held 50,000", "Latin is basis of Romance languages"],
    quiz: [q("Rome founded:", ["1000 BCE", "753 BCE", "500 BCE", "100 BCE"], 1), q("Fall of Western Rome:", ["476 CE", "100 CE", "1000 CE", "300 CE"], 0)],
  },
  "medieval-europe": {
    title: "Medieval Europe", shortDescription: "Feudalism, knights, and Crusades",
    introduction: "The Middle Ages (5th–15th c.) — era of knights, castles, Crusades, and birth of European nations.",
    beginnerExplanation: "Feudalism: king → lords → knights → peasants. Crusades to the Holy Land. Church = main power.",
    detailedExplanation: "5th-15th c. Feudalism. Crusades 1096-1291. Plague 1347-1353: 30-60% died. Universities from 12th c.",
    simpleExplanation: "Knights in shining armor, grand castles, and dangerous journeys!",
    keyTerms: [{ term: "Feudalism", definition: "Land in exchange for military service" }, { term: "Crusades", definition: "Military campaigns to the Middle East (1096-1291)" }],
    quickSummary: "5th-15th c. Feudalism. Crusades. Plague (1347). Church = center of power.",
    facts: ["Plague killed 30-60% of Europe", "First university — Bologna, 1088", "Knights had code of honor"],
    quiz: [q("Feudalism is:", ["Democracy", "Land for service", "Trade system", "Republic"], 1), q("First Crusade:", ["1000", "1096", "1200", "1300"], 1)],
  },
  "renaissance": {
    title: "The Renaissance", shortDescription: "New era of art and science",
    introduction: "The Renaissance (14th–16th c.) — Europe rediscovered ancient heritage and put humanity at center.",
    beginnerExplanation: "Return to ancient ideals. Leonardo, Michelangelo, Raphael. Humanism.",
    detailedExplanation: "14th-16th c., Italy. Art: Leonardo, Michelangelo. Science: Copernicus, Galileo. Printing press 1450.",
    simpleExplanation: "People started painting beautifully and thinking like the ancient Greeks again!",
    keyTerms: [{ term: "Humanism", definition: "Philosophy placing humans at the center" }, { term: "Renaissance", definition: "Cultural movement of 14th-16th centuries" }],
    quickSummary: "14th-16th c. Humanism. Leonardo, Michelangelo. Copernicus, Galileo. Printing 1450.",
    facts: ["Mona Lisa — most famous painting", "Gutenberg changed the world", "Leonardo was artist, scientist, engineer"],
    quiz: [q("Renaissance began in:", ["France", "England", "Italy", "Germany"], 2), q("Mona Lisa author:", ["Michelangelo", "Raphael", "Leonardo", "Botticelli"], 2)],
  },
  "french-revolution": {
    title: "The French Revolution", shortDescription: "Liberty, equality, fraternity",
    introduction: "The French Revolution (1789-1799) changed Europe forever. End of monarchy, birth of republic and human rights.",
    beginnerExplanation: "1789 — Bastille. End of monarchy, Declaration of Rights. Napoleon 1799.",
    detailedExplanation: "1789: Bastille. 1792: republic. 1793-94: Terror. 1799: Napoleon.",
    simpleExplanation: "The French decided having a king was unfair, and changed everything!",
    keyTerms: [{ term: "Bastille", definition: "Fortress-prison, stormed July 14, 1789" }],
    quickSummary: "1789-1799. Bastille, Declaration of Rights, republic, terror, Napoleon.",
    facts: ["July 14 is France's national holiday", "Guillotine was 'humane'", "Revolution changed the calendar"],
    quiz: [q("Bastille stormed:", ["1776", "1789", "1799", "1812"], 1), q("Motto:", ["God and King", "Liberty, Equality, Fraternity", "Glory to France", "Forward!"], 1)],
  },
  "independence-ukraine": {
    title: "Ukrainian Independence", shortDescription: "August 24, 1991",
    introduction: "Declaration of independence on August 24, 1991 — one of the most important events in Ukrainian history.",
    beginnerExplanation: "Aug 24, 1991 — Independence Act. Dec 1, 1991 — referendum (90.32% yes). First President: Kravchuk.",
    detailedExplanation: "Perestroika → People's Movement → Sovereignty 1990 → Coup 1991 → Independence → Referendum.",
    simpleExplanation: "Ukraine became free — with its own flag, anthem, and right to decide its fate!",
    keyTerms: [{ term: "Act of Independence", definition: "Document from August 24, 1991" }, { term: "Referendum", definition: "Nationwide vote" }],
    quickSummary: "24.08.1991 — Independence. 01.12.1991 — referendum (90.32%). First President: Kravchuk.",
    facts: ["90.32% voted yes", "Ukraine is largest country in Europe by area", "Hryvnia became currency in 1996"],
    quiz: [q("Independence date:", ["24.08.1990", "24.08.1991", "01.12.1991", "01.01.1992"], 1), q("First President:", ["Kuchma", "Kravchuk", "Yushchenko", "Poroshenko"], 1)],
  },
  "cold-war": {
    title: "The Cold War", shortDescription: "USA vs USSR",
    introduction: "The Cold War (1947-1991) — global standoff between two superpowers without direct conflict.",
    beginnerExplanation: "USA vs USSR. Arms race, space race, Berlin Wall. Ended with USSR collapse 1991.",
    detailedExplanation: "1947-1991. NATO vs Warsaw Pact. Cuban Crisis 1962. Gagarin 1961, Moon 1969. Berlin Wall 1961-1989.",
    simpleExplanation: "Two most powerful countries competed in everything but didn't fight directly!",
    keyTerms: [{ term: "Cold War", definition: "USA-USSR standoff without direct conflict" }, { term: "Iron Curtain", definition: "Boundary between capitalist and socialist blocs" }],
    quickSummary: "1947-1991. USA vs USSR. NATO vs Warsaw Pact. Arms race, space, Berlin Wall.",
    facts: ["Cuban Crisis — closest to nuclear war", "Berlin Wall stood 28 years", "Gagarin — first human in space"],
    quiz: [q("Cold War:", ["1900-1950", "1947-1991", "1950-2000", "1939-1945"], 1), q("First in space:", ["Armstrong", "Gagarin", "Titov", "Glenn"], 1)],
  },
  "atom-model": {
    title: "Atomic Structure", shortDescription: "Protons, neutrons, electrons",
    introduction: "The atom — smallest particle of a chemical element. Understanding its structure is key to all chemistry.",
    beginnerExplanation: "Atom: nucleus (protons+neutrons) + electrons. Protons = element number.",
    detailedExplanation: "Nucleus: p⁺+n⁰. Shells: K(2), L(8), M(18). Z=protons. A=p+n. Isotopes: different n.",
    simpleExplanation: "An atom is a mini solar system! Nucleus=Sun, electrons=planets!",
    keyTerms: [{ term: "Proton", definition: "Positively charged nuclear particle" }, { term: "Electron", definition: "Negatively charged particle around nucleus" }, { term: "Isotope", definition: "Same element, different neutrons" }],
    quickSummary: "Atom: nucleus (p⁺+n⁰) + electrons. Z=protons. A=p+n. Shells: K(2), L(8), M(18).",
    facts: ["Atom is 99.9% empty space", "If atom were a stadium, nucleus would be a pea", "Proton is 1836× heavier than electron"],
    quiz: [q("Proton charge:", ["-1", "0", "+1", "+2"], 2), q("Isotopes differ in:", ["Protons", "Neutrons", "Electrons", "Charge"], 1)],
  },
  "chemical-bonds": {
    title: "Chemical Bonds", shortDescription: "Ionic, covalent, metallic",
    introduction: "Chemical bonds hold atoms together. Bond type determines substance properties.",
    beginnerExplanation: "Ionic: gave-took electrons (NaCl). Covalent: shared electrons (H₂O). Metallic: free electrons (Fe).",
    detailedExplanation: "Ionic: metal+nonmetal. Covalent: nonmetals. Metallic: electron gas. Hydrogen: weak but important.",
    simpleExplanation: "Ionic — one gives, other takes. Covalent — sharing. Metallic — everything communal!",
    keyTerms: [{ term: "Ionic bond", definition: "Between cation and anion" }, { term: "Covalent bond", definition: "Through shared electron pairs" }],
    quickSummary: "Ionic: metal+nonmetal. Covalent: shared e⁻. Metallic: electron gas. Hydrogen: weak but important.",
    facts: ["Diamond — strongest covalent crystal", "Hydrogen bonds hold DNA", "NaCl — typical ionic crystal"],
    quiz: [q("NaCl bond:", ["Covalent", "Ionic", "Metallic", "Hydrogen"], 1), q("H₂ bond:", ["Ionic", "Covalent nonpolar", "Metallic", "Hydrogen"], 1)],
  },
  "solutions": {
    title: "Solutions", shortDescription: "Solvent, solute, concentration",
    introduction: "Solutions are everywhere — from salt water to blood.",
    beginnerExplanation: "Solution = solvent + solute. Mass fraction ω = m(solute)/m(solution) × 100%.",
    detailedExplanation: "ω = m(solute)/m(solution). Molar: C=n/V. Solubility depends on T.",
    simpleExplanation: "Tea with sugar is a solution! Water=solvent, sugar=solute!",
    keyTerms: [{ term: "Solution", definition: "Homogeneous mixture of solvent and solute" }, { term: "Mass fraction", definition: "Ratio of solute mass to solution mass" }],
    quickSummary: "Solution = solvent + solute. ω = m/m×100%. C = n/V.",
    facts: ["Blood is a complex solution", "Seawater ~3.5% salt", "Soda is CO₂ dissolved in water"],
    quiz: [q("ω is:", ["Molarity", "Mass fraction", "Volume", "Mass"], 1), q("5g in 100g, ω=:", ["5%", "10%", "50%", "0.5%"], 0)],
  },
  "organic-chemistry-intro": {
    title: "Basics of Organic Chemistry", shortDescription: "Chemistry of carbon compounds",
    introduction: "Organic chemistry — chemistry of carbon compounds. Over 20 million organic substances known.",
    beginnerExplanation: "Alkanes (CH₄), alkenes (C₂H₄), alcohols (C₂H₅OH), acids (CH₃COOH).",
    detailedExplanation: "C: valence IV. Alkanes CₙH₂ₙ₊₂, alkenes CₙH₂ₙ, alkynes CₙH₂ₙ₋₂. Isomerism.",
    simpleExplanation: "Everything that burns, is eaten, or worn — that's organic chemistry!",
    keyTerms: [{ term: "Alkanes", definition: "Saturated hydrocarbons CₙH₂ₙ₊₂" }, { term: "Isomerism", definition: "Same formula, different structure" }],
    quickSummary: "C=foundation. Alkanes, alkenes, alkynes. Alcohols, acids. Isomerism.",
    facts: ["20+ million organic compounds known", "Diamond and graphite both from C", "Petroleum = hydrocarbon mixture"],
    quiz: [q("Methane is:", ["Alkene", "Alkane", "Alkyne", "Alcohol"], 1), q("Valence of C:", ["II", "III", "IV", "V"], 2)],
  },
  "oxidation-reduction": {
    title: "Redox Reactions", shortDescription: "Electron transfer",
    introduction: "Redox reactions involve electron transfer. Combustion, corrosion, respiration — all redox.",
    beginnerExplanation: "Oxidation — loss of e⁻. Reduction — gain of e⁻.",
    detailedExplanation: "Oxidation: loss e⁻, oxidation state ↑. Reduction: gain e⁻, OS ↓.",
    simpleExplanation: "Rust on iron is slow burning. Iron gives electrons to oxygen!",
    keyTerms: [{ term: "Oxidation", definition: "Losing electrons" }, { term: "Reduction", definition: "Gaining electrons" }],
    quickSummary: "Oxidation: lose e⁻. Reduction: gain e⁻. Combustion, corrosion, respiration = redox.",
    facts: ["Breathing is slow glucose combustion", "Rusting is iron oxidation", "Batteries run on redox"],
    quiz: [q("Oxidation is:", ["Gaining e⁻", "Losing e⁻", "Gaining protons", "Losing neutrons"], 1), q("Corrosion is:", ["Reduction", "Metal oxidation", "Dissolving", "Heating"], 1)],
  },
  "ua-adjectives": {
    title: "Adjective (Прикметник)", shortDescription: "Describing characteristics",
    introduction: "An adjective denotes a characteristic and answers 'what kind?'",
    beginnerExplanation: "Describes objects: big, blue, tasty. Changes by gender, number, case.",
    detailedExplanation: "Types: qualitative, relative, possessive. Degrees: comparative, superlative.",
    simpleExplanation: "An adjective is 'paint' for a noun. Without it, the world would be gray!",
    keyTerms: [{ term: "Qualitative adjective", definition: "Can be more or less (big)" }, { term: "Relative adjective", definition: "Through relation (wooden)" }],
    quickSummary: "What kind? Types: qualitative, relative, possessive. Degrees of comparison.",
    facts: ["Only qualitative have degrees of comparison", "Possessive indicate ownership"],
    quiz: [q("Adjective answers:", ["What?", "What kind?", "Where?", "When?"], 1), q("'Wooden' type:", ["Qualitative", "Relative", "Possessive", "Numerical"], 1)],
  },
  "ua-apostrophe": {
    title: "Apostrophe in Ukrainian", shortDescription: "Rules for using apostrophe",
    introduction: "The apostrophe is an important orthographic mark. Incorrect use is one of the most common mistakes.",
    beginnerExplanation: "After б, п, в, м, ф before я, ю, є, ї: m'yaso, p'yat. After prefixes: z'yizd.",
    detailedExplanation: "б, п, в, м, ф + я, ю, є, ї = apostrophe. After prefixes on consonant.",
    simpleExplanation: "The apostrophe says: 'read these letters separately!'",
    keyTerms: [{ term: "Apostrophe", definition: "Orthographic mark indicating separate pronunciation" }],
    quickSummary: "After б,п,в,м,ф,р before я,ю,є,ї. After prefixes. Not after consonant+б,п,в,м,ф.",
    facts: ["Unique feature of Ukrainian orthography", "Most common mistakes involve apostrophe"],
    quiz: [q("Correct:", ["myaso", "m'yaso", "m`yaso", "mьyaso"], 1), q("Without apostrophe:", ["p'yat", "m'yach", "svyato", "z'yizd"], 2)],
  },
  "en-past-continuous": {
    title: "Past Continuous", shortDescription: "Ongoing action in the past",
    introduction: "Past Continuous describes an ongoing action at a specific past moment.",
    beginnerExplanation: "was/were + V-ing. I was reading at 5 PM.",
    detailedExplanation: "was/were + V-ing. Ongoing action. Parallel (while). Interruption (when + Past Simple).",
    simpleExplanation: "Like hitting pause on a movie: 'What was happening at that moment?'",
    keyTerms: [{ term: "Past Continuous", definition: "was/were + V-ing for ongoing past actions" }],
    quickSummary: "was/were + V-ing. Ongoing at past moment. While=parallel. When=interruption.",
    facts: ["While for two ongoing actions", "When + Past Simple interrupts", "Markers: at that moment, all day"],
    quiz: [q("I ___ at 8 PM.", ["read", "was reading", "readed", "am reading"], 1), q("While I ___, phone rang.", ["slept", "was sleeping", "sleep", "sleeping"], 1)],
  },
  "en-conditionals": {
    title: "Conditionals", shortDescription: "If-sentences: types 0, 1, 2, 3",
    introduction: "Conditionals describe 'if...then...' from real to impossible situations.",
    beginnerExplanation: "0: facts. 1: real future (will). 2: unreal present (would). 3: unreal past (would have).",
    detailedExplanation: "0: If+PrS,PrS. 1: If+PrS,will+V. 2: If+PaS,would+V. 3: If+PaPe,would have+V3.",
    simpleExplanation: "If I were a bird, I would fly! — dream (2nd). If it rains, I'll take an umbrella — plan (1st)!",
    keyTerms: [{ term: "First Conditional", definition: "Real future condition" }, { term: "Second Conditional", definition: "Unreal present condition" }],
    quickSummary: "0: facts. 1: if+PrS,will+V. 2: if+PaS,would+V. 3: if+PaPe,would have+V3.",
    facts: ["'If I were' — were for all persons in 2nd", "3rd expresses regret"],
    quiz: [q("If it rains, I ___.", ["would stay", "will stay", "stayed", "stay"], 1), q("2nd Conditional for:", ["Facts", "Real", "Unreal present", "Past"], 2)],
  },
  "en-passive-voice": {
    title: "Passive Voice", shortDescription: "When action matters more than doer",
    introduction: "Passive voice: what was done matters, not who did it.",
    beginnerExplanation: "Active: Tom writes. Passive: A letter is written by Tom. Formula: be + V3.",
    detailedExplanation: "be+V3. Present: is/are+V3. Past: was/were+V3. Future: will be+V3.",
    simpleExplanation: "Someone ate the cake → The cake was eaten! Cake matters, not who ate it!",
    keyTerms: [{ term: "Passive Voice", definition: "Subject receives the action" }, { term: "Past Participle", definition: "V3: written, done, made" }],
    quickSummary: "be+V3. Object becomes subject. By=doer. All tenses can be passive.",
    facts: ["Common in scientific writing", "By-phrase can be omitted", "Get+V3 is informal"],
    quiz: [q("The cake ___ by Tom.", ["ate", "was eaten", "is eating", "eats"], 1), q("Passive =", ["do+V", "be+V3", "have+V", "will+V"], 1)],
  },
  "waves": {
    title: "Waves and Oscillations", shortDescription: "From sound to earthquakes",
    introduction: "Waves are everywhere — sound, light, radio, water. Understanding waves is key to physics.",
    beginnerExplanation: "Wave = oscillation that propagates. Sound, light, water waves. λ=v/ν.",
    detailedExplanation: "Amplitude, period T, frequency ν=1/T. Transverse and longitudinal. λ=vT. Sound: 20-20000 Hz.",
    simpleExplanation: "Throw a stone in water — ripples spread! Sound is invisible ripples too!",
    keyTerms: [{ term: "Amplitude", definition: "Maximum displacement from equilibrium" }, { term: "Wavelength", definition: "Distance between two crests" }],
    quickSummary: "A, T, ν=1/T. Transverse, longitudinal. λ=v/ν. Sound: 20-20000 Hz, ~340 m/s.",
    facts: ["Whales communicate below 20 Hz", "Light is electromagnetic wave", "Earthquakes are crustal waves"],
    quiz: [q("ν = ?", ["T", "1/T", "λ/T", "T/λ"], 1), q("Sound wave type:", ["Transverse", "Longitudinal", "Standing", "EM"], 1)],
  },
  "thermodynamics": {
    title: "Laws of Thermodynamics", shortDescription: "Energy, heat, entropy",
    introduction: "Thermodynamics explains why coffee cools and refrigerators need electricity.",
    beginnerExplanation: "1st: energy conserved. 2nd: heat flows hot→cold. 3rd: absolute zero unreachable.",
    detailedExplanation: "1st: ΔU=Q-A. 2nd: entropy≥0. 3rd: S→0 at T→0K. Carnot: η=1-T₂/T₁.",
    simpleExplanation: "Coffee cools because heat escapes to cooler air — that's thermodynamics!",
    keyTerms: [{ term: "Entropy", definition: "Measure of disorder" }, { term: "Absolute zero", definition: "0K = -273.15°C" }],
    quickSummary: "1st: ΔU=Q-A. 2nd: entropy increases. 3rd: 0K unreachable. η=1-T₂/T₁.",
    facts: ["Absolute zero is -273.15°C", "Universe entropy increases", "Engine efficiency always <100%"],
    quiz: [q("1st law:", ["Entropy", "Energy conservation", "Absolute zero", "Pressure"], 1), q("Heat flows:", ["Cold→hot", "Hot→cold", "Nowhere", "Circles"], 1)],
  },
  "nuclear-physics": {
    title: "Nuclear Physics", shortDescription: "Radioactivity and nuclear energy",
    introduction: "Nuclear physics studies atomic nuclei. From radioactivity to nuclear power and stars.",
    beginnerExplanation: "Radioactivity: α, β, γ. Uranium fission → power plants. Hydrogen fusion → stars. E=mc².",
    detailedExplanation: "α, β, γ decay. T₁/₂. Fission: U→2 nuclei+E. Fusion: H→He+E. E=Δmc².",
    simpleExplanation: "The Sun is a giant nuclear reactor turning hydrogen into helium!",
    keyTerms: [{ term: "Radioactivity", definition: "Spontaneous nuclear decay" }, { term: "Half-life", definition: "Time for half nuclei to decay" }],
    quickSummary: "α, β, γ. T₁/₂. Fission→power plants. Fusion→stars. E=Δmc².",
    facts: ["Chernobyl — 1986", "U-238 half-life: 4.5 billion years", "Sun fuses 600M tons H/sec"],
    quiz: [q("α-particle:", ["Electron", "Helium nucleus", "Photon", "Neutron"], 1), q("Power plants use:", ["Fusion", "Fission", "Combustion", "Chemistry"], 1)],
  },
};
