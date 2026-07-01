 "\"\"\"Static learning content for 5 Indian languages.

Each language has:
- meta: name, native_name, script_name, greeting, color
- alphabets: list of {char, transliteration, sound}
- words: list of {native, transliteration, english}
- phrases: list of {native, transliteration, english}
- quiz: list of {question, options, answer_index, explanation}
\"\"\"

LANGUAGES = {
    \"hindi\": {
        \"meta\": {
            \"id\": \"hindi\",
            \"name\": \"Hindi\",
            \"native_name\": \"हिन्दी\",
            \"script\": \"Devanagari\",
            \"greeting\": \"नमस्ते\",
            \"speakers\": \"600M+\",
            \"accent\": \"#D35400\",
        },
        \"alphabets\": [
            {\"char\": \"अ\", \"transliteration\": \"a\", \"sound\": \"a as in about\"},
            {\"char\": \"आ\", \"transliteration\": \"aa\", \"sound\": \"aa as in father\"},
            {\"char\": \"इ\", \"transliteration\": \"i\", \"sound\": \"i as in ink\"},
            {\"char\": \"उ\", \"transliteration\": \"u\", \"sound\": \"u as in put\"},
            {\"char\": \"क\", \"transliteration\": \"ka\", \"sound\": \"ka\"},
            {\"char\": \"ख\", \"transliteration\": \"kha\", \"sound\": \"kha aspirated\"},
            {\"char\": \"ग\", \"transliteration\": \"ga\", \"sound\": \"ga\"},
            {\"char\": \"म\", \"transliteration\": \"ma\", \"sound\": \"ma\"},
        ],
        \"words\": [
            {\"native\": \"पानी\", \"transliteration\": \"paani\", \"english\": \"water\"},
            {\"native\": \"किताब\", \"transliteration\": \"kitaab\", \"english\": \"book\"},
            {\"native\": \"दोस्त\", \"transliteration\": \"dost\", \"english\": \"friend\"},
            {\"native\": \"घर\", \"transliteration\": \"ghar\", \"english\": \"home\"},
            {\"native\": \"खाना\", \"transliteration\": \"khaana\", \"english\": \"food\"},
            {\"native\": \"दिन\", \"transliteration\": \"din\", \"english\": \"day\"},
        ],
        \"phrases\": [
            {\"native\": \"नमस्ते\", \"transliteration\": \"namaste\", \"english\": \"Hello\"},
            {\"native\": \"आप कैसे हैं?\", \"transliteration\": \"aap kaise hain?\", \"english\": \"How are you?\"},
            {\"native\": \"धन्यवाद\", \"transliteration\": \"dhanyavaad\", \"english\": \"Thank you\"},
            {\"native\": \"मेरा नाम है\", \"transliteration\": \"mera naam hai\", \"english\": \"My name is\"},
            {\"native\": \"फिर मिलेंगे\", \"transliteration\": \"phir milenge\", \"english\": \"See you again\"},
        ],
        \"quiz\": [
            {\"question\": \"What does 'नमस्ते' mean?\", \"options\": [\"Goodbye\", \"Hello\", \"Thank you\", \"Sorry\"], \"answer_index\": 1, \"explanation\": \"नमस्ते (namaste) is the traditional Indian greeting.\"},
            {\"question\": \"How do you say 'water' in Hindi?\", \"options\": [\"किताब\", \"घर\", \"पानी\", \"दिन\"], \"answer_index\": 2, \"explanation\": \"पानी (paani) means water.\"},
            {\"question\": \"The character 'आ' sounds like:\", \"options\": [\"a in about\", \"aa in father\", \"i in ink\", \"u in put\"], \"answer_index\": 1, \"explanation\": \"आ is a long 'aa' vowel.\"},
            {\"question\": \"'धन्यवाद' translates to?\", \"options\": [\"Please\", \"Hello\", \"Sorry\", \"Thank you\"], \"answer_index\": 3, \"explanation\": \"धन्यवाद (dhanyavaad) means Thank you.\"},
            {\"question\": \"What does 'दोस्त' mean?\", \"options\": [\"Enemy\", \"Friend\", \"Family\", \"Neighbor\"], \"answer_index\": 1, \"explanation\": \"दोस्त (dost) means friend.\"},
        ],
    },
    \"tamil\": {
        \"meta\": {
            \"id\": \"tamil\",
            \"name\": \"Tamil\",
            \"native_name\": \"தமிழ்\",
            \"script\": \"Tamil\",
            \"greeting\": \"வணக்கம்\",
            \"speakers\": \"80M+\",
            \"accent\": \"#1A237E\",
        },
        \"alphabets\": [
            {\"char\": \"அ\", \"transliteration\": \"a\", \"sound\": \"a as in about\"},
            {\"char\": \"ஆ\", \"transliteration\": \"aa\", \"sound\": \"aa as in father\"},
            {\"char\": \"இ\", \"transliteration\": \"i\", \"sound\": \"i as in ink\"},
            {\"char\": \"க\", \"transliteration\": \"ka\", \"sound\": \"ka\"},
            {\"char\": \"ச\", \"transliteration\": \"cha\", \"sound\": \"cha\"},
            {\"char\": \"ட\", \"transliteration\": \"ta\", \"sound\": \"ta retroflex\"},
            {\"char\": \"ந\", \"transliteration\": \"na\", \"sound\": \"na\"},
            {\"char\": \"ம\", \"transliteration\": \"ma\", \"sound\": \"ma\"},
        ],
        \"words\": [
            {\"native\": \"தண்ணீர்\", \"transliteration\": \"thanneer\", \"english\": \"water\"},
            {\"native\": \"புத்தகம்\", \"transliteration\": \"puthagam\", \"english\": \"book\"},
            {\"native\": \"நண்பன்\", \"transliteration\": \"nanban\", \"english\": \"friend\"},
            {\"native\": \"வீடு\", \"transliteration\": \"veedu\", \"english\": \"home\"},
            {\"native\": \"சாப்பாடு\", \"transliteration\": \"saappadu\", \"english\": \"food\"},
            {\"native\": \"நாள்\", \"transliteration\": \"naal\", \"english\": \"day\"},
        ],
        \"phrases\": [
            {\"native\": \"வணக்கம்\", \"transliteration\": \"vanakkam\", \"english\": \"Hello\"},
            {\"native\": \"எப்படி இருக்கிறீர்கள்?\", \"transliteration\": \"eppadi irukkireergal?\", \"english\": \"How are you?\"},
            {\"native\": \"நன்றி\", \"transliteration\": \"nandri\", \"english\": \"Thank you\"},
            {\"native\": \"என் பெயர்\", \"transliteration\": \"en peyar\", \"english\": \"My name is\"},
            {\"native\": \"மீண்டும் சந்திப்போம்\", \"transliteration\": \"meendum sandhippom\", \"english\": \"See you again\"},
        ],
        \"quiz\": [
            {\"question\": \"What does 'வணக்கம்' mean?\", \"options\": [\"Goodbye\", \"Hello\", \"Thank you\", \"Sorry\"], \"answer_index\": 1, \"explanation\": \"வணக்கம் (vanakkam) is the Tamil greeting.\"},
            {\"question\": \"How do you say 'water' in Tamil?\", \"options\": [\"புத்தகம்\", \"தண்ணீர்\", \"வீடு\", \"நாள்\"], \"answer_index\": 1, \"explanation\": \"தண்ணீர் (thanneer) means water.\"},
            {\"question\": \"'நன்றி' translates to?\", \"options\": [\"Please\", \"Hello\", \"Sorry\", \"Thank you\"], \"answer_index\": 3, \"explanation\": \"நன்றி (nandri) means Thank you.\"},
            {\"question\": \"What does 'நண்பன்' mean?\", \"options\": [\"Enemy\", \"Friend\", \"Brother\", \"Teacher\"], \"answer_index\": 1, \"explanation\": \"நண்பன் (nanban) means friend.\"},
            {\"question\": \"The character 'ஆ' sounds like:\", \"options\": [\"a in about\", \"aa in father\", \"i in ink\", \"u in put\"], \"answer_index\": 1, \"explanation\": \"ஆ is a long 'aa' vowel.\"},
        ],
    },
    \"telugu\": {
        \"meta\": {
            \"id\": \"telugu\",
            \"name\": \"Telugu\",
            \"native_name\": \"తెలుగు\",
            \"script\": \"Telugu\",
            \"greeting\": \"నమస్కారం\",
            \"speakers\": \"95M+\",
            \"accent\": \"#B7410E\",
        },
        \"alphabets\": [
            {\"char\": \"అ\", \"transliteration\": \"a\", \"sound\": \"a as in about\"},
            {\"char\": \"ఆ\", \"transliteration\": \"aa\", \"sound\": \"aa as in father\"},
            {\"char\": \"ఇ\", \"transliteration\": \"i\", \"sound\": \"i as in ink\"},
            {\"char\": \"క\", \"transliteration\": \"ka\", \"sound\": \"ka\"},
            {\"char\": \"గ\", \"transliteration\": \"ga\", \"sound\": \"ga\"},
            {\"char\": \"త\", \"transliteration\": \"ta\", \"sound\": \"ta dental\"},
            {\"char\": \"న\", \"transliteration\": \"na\", \"sound\": \"na\"},
            {\"char\": \"మ\", \"transliteration\": \"ma\", \"sound\": \"ma\"},
        ],
        \"words\": [
            {\"native\": \"నీళ్ళు\", \"transliteration\": \"neellu\", \"english\": \"water\"},
            {\"native\": \"పుస్తకం\", \"transliteration\": \"pustakam\", \"english\": \"book\"},
            {\"native\": \"స్నేహితుడు\", \"transliteration\": \"snehitudu\", \"english\": \"friend\"},
            {\"native\": \"ఇల్లు\", \"transliteration\": \"illu\", \"english\": \"home\"},
            {\"native\": \"భోజనం\", \"transliteration\": \"bhojanam\", \"english\": \"food\"},
            {\"native\": \"రోజు\", \"transliteration\": \"roju\", \"english\": \"day\"},
        ],
        \"phrases\": [
            {\"native\": \"నమస్కారం\", \"transliteration\": \"namaskaram\", \"english\": \"Hello\"},
            {\"native\": \"మీరు ఎలా ఉన్నారు?\", \"transliteration\": \"meeru ela unnaru?\", \"english\": \"How are you?\"},
            {\"native\": \"ధన్యవాదాలు\", \"transliteration\": \"dhanyavaadaalu\", \"english\": \"Thank you\"},
            {\"native\": \"నా పేరు\", \"transliteration\": \"naa peru\", \"english\": \"My name is\"},
            {\"native\": \"మళ్ళీ కలుద్దాం\", \"transliteration\": \"malli kaluddaam\", \"english\": \"See you again\"},
        ],
        \"quiz\": [
            {\"question\": \"What does 'నమస్కారం' mean?\", \"options\": [\"Goodbye\", \"Hello\", \"Thank you\", \"Sorry\"], \"answer_index\": 1, \"explanation\": \"నమస్కారం (namaskaram) is the Telugu greeting.\"},
            {\"question\": \"How do you say 'water' in Telugu?\", \"options\": [\"నీళ్ళు\", \"పుస్తకం\", \"ఇల్లు\", \"రోజు\"], \"answer_index\": 0, \"explanation\": \"నీళ్ళు (neellu) means water.\"},
            {\"question\": \"'ధన్యవాదాలు' means?\", \"options\": [\"Sorry\", \"Hello\", \"Please\", \"Thank you\"], \"answer_index\": 3, \"explanation\": \"ధన్యవాదాలు (dhanyavaadaalu) means Thank you.\"},
            {\"question\": \"What does 'ఇల్లు' mean?\", \"options\": [\"Home\", \"Book\", \"Friend\", \"Food\"], \"answer_index\": 0, \"explanation\": \"ఇల్లు (illu) means home.\"},
            {\"question\": \"The character 'ఆ' sounds like:\", \"options\": [\"a in about\", \"aa in father\", \"i in ink\", \"u in put\"], \"answer_index\": 1, \"explanation\": \"ఆ is a long 'aa' vowel.\"},
        ],
    },
    \"bengali\": {
        \"meta\": {
            \"id\": \"bengali\",
            \"name\": \"Bengali\",
            \"native_name\": \"বাংলা\",
            \"script\": \"Bengali\",
            \"greeting\": \"নমস্কার\",
            \"speakers\": \"270M+\",
            \"accent\": \"#8B4513\",
        },
        \"alphabets\": [
            {\"char\": \"অ\", \"transliteration\": \"a\", \"sound\": \"o as in hot\"},
            {\"char\": \"আ\", \"transliteration\": \"aa\", \"sound\": \"aa as in father\"},
            {\"char\": \"ই\", \"transliteration\": \"i\", \"sound\": \"i as in ink\"},
            {\"char\": \"ক\", \"transliteration\": \"ka\", \"sound\": \"ka\"},
            {\"char\": \"গ\", \"transliteration\": \"ga\", \"sound\": \"ga\"},
            {\"char\": \"ত\", \"transliteration\": \"ta\", \"sound\": \"ta\"},
            {\"char\": \"ন\", \"transliteration\": \"na\", \"sound\": \"na\"},
            {\"char\": \"ম\", \"transliteration\": \"ma\", \"sound\": \"ma\"},
        ],
        \"words\": [
            {\"native\": \"জল\", \"transliteration\": \"jol\", \"english\": \"water\"},
            {\"native\": \"বই\", \"transliteration\": \"boi\", \"english\": \"book\"},
            {\"native\": \"বন্ধু\", \"transliteration\": \"bondhu\", \"english\": \"friend\"},
            {\"native\": \"বাড়ি\", \"transliteration\": \"baari\", \"english\": \"home\"},
            {\"native\": \"খাবার\", \"transliteration\": \"khabar\", \"english\": \"food\"},
            {\"native\": \"দিন\", \"transliteration\": \"din\", \"english\": \"day\"},
        ],
        \"phrases\": [
            {\"native\": \"নমস্কার\", \"transliteration\": \"nomoshkar\", \"english\": \"Hello\"},
            {\"native\": \"আপনি কেমন আছেন?\", \"transliteration\": \"apni kemon achen?\", \"english\": \"How are you?\"},
            {\"native\": \"ধন্যবাদ\", \"transliteration\": \"dhonnobad\", \"english\": \"Thank you\"},
            {\"native\": \"আমার নাম\", \"transliteration\": \"amar naam\", \"english\": \"My name is\"},
            {\"native\": \"আবার দেখা হবে\", \"transliteration\": \"abar dekha hobe\", \"english\": \"See you again\"},
        ],
        \"quiz\": [
            {\"question\": \"What does 'নমস্কার' mean?\", \"options\": [\"Goodbye\", \"Hello\", \"Thank you\", \"Sorry\"], \"answer_index\": 1, \"explanation\": \"নমস্কার (nomoshkar) is the Bengali greeting.\"},
            {\"question\": \"How do you say 'water' in Bengali?\", \"options\": [\"বই\", \"জল\", \"বাড়ি\", \"দিন\"], \"answer_index\": 1, \"explanation\": \"জল (jol) means water.\"},
            {\"question\": \"'ধন্যবাদ' translates to?\", \"options\": [\"Please\", \"Hello\", \"Sorry\", \"Thank you\"], \"answer_index\": 3, \"explanation\": \"ধন্যবাদ (dhonnobad) means Thank you.\"},
            {\"question\": \"What does 'বন্ধু' mean?\", \"options\": [\"Enemy\", \"Friend\", \"Family\", \"Teacher\"], \"answer_index\": 1, \"explanation\": \"বন্ধু (bondhu) means friend.\"},
            {\"question\": \"'বাড়ি' means?\", \"options\": [\"Book\", \"Food\", \"Home\", \"Day\"], \"answer_index\": 2, \"explanation\": \"বাড়ি (baari) means home.\"},
        ],
    },
    \"marathi\": {
        \"meta\": {
            \"id\": \"marathi\",
            \"name\": \"Marathi\",
            \"native_name\": \"मराठी\",
            \"script\": \"Devanagari\",
            \"greeting\": \"नमस्कार\",
            \"speakers\": \"83M+\",
            \"accent\": \"#556B2F\",
        },
        \"alphabets\": [
            {\"char\": \"अ\", \"transliteration\": \"a\", \"sound\": \"a as in about\"},
            {\"char\": \"आ\", \"transliteration\": \"aa\", \"sound\": \"aa as in father\"},
            {\"char\": \"इ\", \"transliteration\": \"i\", \"sound\": \"i as in ink\"},
            {\"char\": \"क\", \"transliteration\": \"ka\", \"sound\": \"ka\"},
            {\"char\": \"ग\", \"transliteration\": \"ga\", \"sound\": \"ga\"},
            {\"char\": \"त\", \"transliteration\": \"ta\", \"sound\": \"ta\"},
            {\"char\": \"न\", \"transliteration\": \"na\", \"sound\": \"na\"},
            {\"char\": \"म\", \"transliteration\": \"ma\", \"sound\": \"ma\"},
        ],
        \"words\": [
            {\"native\": \"पाणी\", \"transliteration\": \"paani\", \"english\": \"water\"},
            {\"native\": \"पुस्तक\", \"transliteration\": \"pustak\", \"english\": \"book\"},
            {\"native\": \"मित्र\", \"transliteration\": \"mitra\", \"english\": \"friend\"},
            {\"native\": \"घर\", \"transliteration\": \"ghar\", \"english\": \"home\"},
            {\"native\": \"जेवण\", \"transliteration\": \"jevan\", \"english\": \"food\"},
            {\"native\": \"दिवस\", \"transliteration\": \"divas\", \"english\": \"day\"},
        ],
        \"phrases\": [
            {\"native\": \"नमस्कार\", \"transliteration\": \"namaskar\", \"english\": \"Hello\"},
            {\"native\": \"तुम्ही कसे आहात?\", \"transliteration\": \"tumhi kase aahat?\", \"english\": \"How are you?\"},
            {\"native\": \"धन्यवाद\", \"transliteration\": \"dhanyavaad\", \"english\": \"Thank you\"},
            {\"native\": \"माझं नाव\", \"transliteration\": \"majhe naav\", \"english\": \"My name is\"},
            {\"native\": \"पुन्हा भेटू\", \"transliteration\": \"punha bhetu\", \"english\": \"See you again\"},
        ],
        \"quiz\": [
            {\"question\": \"What does 'नमस्कार' mean?\", \"options\": [\"Goodbye\", \"Hello\", \"Thank you\", \"Sorry\"], \"answer_index\": 1, \"explanation\": \"नमस्कार (namaskar) is the Marathi greeting.\"},
            {\"question\": \"How do you say 'friend' in Marathi?\", \"options\": [\"पाणी\", \"पुस्तक\", \"मित्र\", \"दिवस\"], \"answer_index\": 2, \"explanation\": \"मित्र (mitra) means friend.\"},
            {\"question\": \"'धन्यवाद' translates to?\", \"options\": [\"Please\", \"Hello\", \"Sorry\", \"Thank you\"], \"answer_index\": 3, \"explanation\": \"धन्यवाद (dhanyavaad) means Thank you.\"},
            {\"question\": \"What does 'घर' mean?\", \"options\": [\"Book\", \"Food\", \"Home\", \"Day\"], \"answer_index\": 2, \"explanation\": \"घर (ghar) means home.\"},
            {\"question\": \"'जेवण' means?\", \"options\": [\"Water\", \"Food\", \"Book\", \"Friend\"], \"answer_index\": 1, \"explanation\": \"जेवण (jevan) means food.\"},
        ],
    },
}


def get_language(lang_id: str):
    return LANGUAGES.get(lang_id)


def list_languages():
    return [lang[\"meta\"] for lang in LANGUAGES.values()]
"
