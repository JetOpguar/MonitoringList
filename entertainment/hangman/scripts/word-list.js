const wordList = [
    {
        word: "labyrinth",
        hint: "A complex maze or network of paths."
    },
    {
        word: "trebuchet",
        hint: "A medieval machine for hurling large stones."
    },
    {
        word: "albatross",
        hint: "A large seabird known for its long wingspan."
    },
    {
        word: "quarantine",
        hint: "Isolation to prevent the spread of disease."
    },
    {
        word: "monolith",
        hint: "A large single block of stone, often of cultural importance."
    },
    {
        word: "crucible",
        hint: "A severe test or trial; also a container for melting metals."
    },
    {
        word: "phoenix",
        hint: "A mythical bird that rises from its ashes."
    },
    {
        word: "zephyr",
        hint: "A soft, gentle breeze."
    },
    {
        word: "paradox",
        hint: "A statement that contradicts itself but might be true."
    },
    {
        word: "tsunami",
        hint: "A large sea wave caused by an underwater earthquake."
    },
    {
        word: "voyager",
        hint: "A traveler, often one on a long journey."
    },
    {
        word: "aristocrat",
        hint: "A member of the noble or upper class."
    },
    {
        word: "gauntlet",
        hint: "A challenge or ordeal; also a protective glove."
    },
    {
        word: "obsidian",
        hint: "A type of volcanic glass used for tools and weapons."
    },
    {
        word: "fortress",
        hint: "A stronghold or heavily protected place."
    },
    {
        word: "minotaur",
        hint: "A mythical creature with the body of a man and the head of a bull."
    },
    {
        word: "horizon",
        hint: "The line where the sky meets the land or sea."
    },
    {
        word: "alchemy",
        hint: "An ancient practice aimed at turning metals into gold."
    },
    {
        word: "trident",
        hint: "A three-pronged spear, often associated with Poseidon."
    },
    {
        word: "artillery",
        hint: "Large-caliber guns used in warfare."
    },
    {
        word: "basilisk",
        hint: "A mythical reptile said to kill with its gaze."
    },
    {
        word: "citadel",
        hint: "A fortress protecting a town or city."
    },
    {
        word: "serenade",
        hint: "A song or piece of music performed in someone's honor."
    },
    {
        word: "turbulent",
        hint: "Characterized by conflict, disorder, or confusion."
    },
    {
        word: "havoc",
        hint: "Widespread destruction or chaos."
    },
    {
        word: "wilderness",
        hint: "A wild, uninhabited, and natural area."
    },
    {
        word: "mantis",
        hint: "An insect known for its upright posture and predatory habits."
    },
    {
        word: "vortex",
        hint: "A swirling mass of air or water, like a whirlpool."
    },
    {
        word: "mariner",
        hint: "A sailor or seafarer."
    },
    {
        word: "artifact",
        hint: "An object made by a human, often of historical interest."
    },
    {
        word: "vengeance",
        hint: "Punishment inflicted for an injury or wrongdoing."
    },
    {
        word: "inferno",
        hint: "A large and dangerous fire."
    },
    {
        word: "spectacle",
        hint: "A visually striking or impressive display."
    },
    {
        word: "avalanche",
        hint: "A large mass of snow sliding down a mountainside."
    },
    {
        word: "fossil",
        hint: "The preserved remains of ancient organisms."
    },
    {
        word: "garrison",
        hint: "A group of troops stationed in a fortress or town."
    },
    {
        word: "labyrinthine",
        hint: "Intricate and confusing, like a labyrinth."
    },
    {
        word: "monsoon",
        hint: "A seasonal wind bringing heavy rains."
    },
    {
        word: "quagmire",
        hint: "A soft boggy area of land; a difficult situation."
    },
    {
        word: "renaissance",
        hint: "A cultural movement marking the revival of art, learning, and science in Europe."
    },
    {
        word: "pharaoh",
        hint: "The title of ancient Egyptian rulers."
    },
    {
        word: "crusade",
        hint: "A series of medieval military campaigns to reclaim the Holy Land."
    },
    {
        word: "sphinx",
        hint: "A mythical creature with the body of a lion and the head of a human, often found in Egyptian mythology."
    },
    {
        word: "armada",
        hint: "A large fleet of warships, like the Spanish Armada."
    },
    {
        word: "catapult",
        hint: "A device used in ancient warfare to hurl large stones or other projectiles."
    },
    {
        word: "chivalry",
        hint: "The medieval knightly code of conduct emphasizing honor, loyalty, and bravery."
    },
    {
        word: "dynasty",
        hint: "A line of hereditary rulers of a country, like China's Tang dynasty."
    },
    {
        word: "guild",
        hint: "An association of craftsmen or merchants in the Middle Ages."
    },
    {
        word: "knighthood",
        hint: "The rank or title of a knight, often granted for military service."
    },
    {
        word: "feudalism",
        hint: "A medieval social system in which land was exchanged for service and loyalty."
    },
    {
        word: "heraldry",
        hint: "The art and science of designing and studying coats of arms."
    },
    {
        word: "manuscript",
        hint: "A handwritten document, especially one from the medieval period."
    },
    {
        word: "siege",
        hint: "A military blockade of a city or fortress to force its surrender."
    },
    {
        word: "samurai",
        hint: "A member of the Japanese warrior class during the feudal era."
    },
    {
        word: "pagoda",
        hint: "A tiered tower with multiple eaves, common in East Asia."
    },
    {
        word: "ziggurat",
        hint: "A massive terraced structure built in ancient Mesopotamia."
    },
    {
        word: "hieroglyph",
        hint: "A character of the ancient Egyptian writing system."
    },
    {
        word: "oracle",
        hint: "A priest or priestess in ancient Greece who delivered prophecies."
    },
    {
        word: "pyramid",
        hint: "A monumental structure built in ancient Egypt as a tomb."
    },
    {
        word: "caravel",
        hint: "A small, fast ship used by explorers during the Age of Discovery."
    },
    {
        word: "colosseum",
        hint: "A large amphitheater in Rome used for gladiatorial contests."
    },
    {
        word: "tapestry",
        hint: "A large woven wall hanging depicting historical or mythical scenes."
    },
    {
        word: "legion",
        hint: "A unit of the ancient Roman army."
    },
    {
        word: "mosaic",
        hint: "An art form using small pieces of colored stone, glass, or tile to create an image."
    },
    {
        word: "plague",
        hint: "A deadly disease that swept across Europe during the Middle Ages."
    },
    {
        word: "bastion",
        hint: "A projecting part of a fortress, used for defense."
    },
    {
        word: "armistice",
        hint: "An agreement to stop fighting, often temporarily, during a war."
    },
    {
        word: "corsair",
        hint: "A pirate, especially one operating in the Mediterranean."
    },
    {
        word: "galleon",
        hint: "A large sailing ship used primarily by European powers for trade and war."
    },
    {
        word: "trireme",
        hint: "An ancient Greek or Roman warship powered by oars."
    },
    {
        word: "monastery",
        hint: "A building where monks live and practice their faith."
    },
    {
        word: "catacombs",
        hint: "Underground burial places used in ancient Rome."
    }
];
