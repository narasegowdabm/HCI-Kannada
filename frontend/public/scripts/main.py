kannada_letters = [
    # Vowels
    {"letter": "ಅ", "transliteration": "a"},
    {"letter": "ಆ", "transliteration": "aa"},
    {"letter": "ಇ", "transliteration": "i"},
    {"letter": "ಈ", "transliteration": "ii"},
    {"letter": "ಉ", "transliteration": "u"},
    {"letter": "ಊ", "transliteration": "uu"},
    {"letter": "ಋ", "transliteration": "ru"},
    {"letter": "ೠ", "transliteration": "r̄u"},
    {"letter": "ಎ", "transliteration": "e"},
    {"letter": "ಏ", "transliteration": "ee"},
    {"letter": "ಐ", "transliteration": "ai"},
    {"letter": "ಒ", "transliteration": "o"},
    {"letter": "ಓ", "transliteration": "oo"},
    {"letter": "ಔ", "transliteration": "au"},

    # Consonants
    {"letter": "ಕ", "transliteration": "ka"},
    {"letter": "ಖ", "transliteration": "kha"},
    {"letter": "ಗ", "transliteration": "ga"},
    {"letter": "ಘ", "transliteration": "gha"},
    {"letter": "ಙ", "transliteration": "nga"},
    
    {"letter": "ಚ", "transliteration": "cha"},
    {"letter": "ಛ", "transliteration": "chha"},
    {"letter": "ಜ", "transliteration": "ja"},
    {"letter": "ಝ", "transliteration": "jha"},
    {"letter": "ಞ", "transliteration": "nya"},
    
    {"letter": "ಟ", "transliteration": "ṭa"},
    {"letter": "ಠ", "transliteration": "ṭha"},
    {"letter": "ಡ", "transliteration": "ḍa"},
    {"letter": "ಢ", "transliteration": "ḍha"},
    {"letter": "ಣ", "transliteration": "ṇa"},
    
    {"letter": "ತ", "transliteration": "ta"},
    {"letter": "ಥ", "transliteration": "tha"},
    {"letter": "ದ", "transliteration": "da"},
    {"letter": "ಧ", "transliteration": "dha"},
    {"letter": "ನ", "transliteration": "na"},
    
    {"letter": "ಪ", "transliteration": "pa"},
    {"letter": "ಫ", "transliteration": "pha"},
    {"letter": "ಬ", "transliteration": "ba"},
    {"letter": "ಭ", "transliteration": "bha"},
    {"letter": "ಮ", "transliteration": "ma"},

    {"letter": "ಯ", "transliteration": "ya"},
    {"letter": "ರ", "transliteration": "ra"},
    {"letter": "ಲ", "transliteration": "la"},
    {"letter": "ವ", "transliteration": "va"},
    
    {"letter": "ಶ", "transliteration": "sha"},
    {"letter": "ಷ", "transliteration": "ṣha"},
    {"letter": "ಸ", "transliteration": "sa"},
    {"letter": "ಹ", "transliteration": "ha"},
    
    {"letter": "ಳ", "transliteration": "ḷa"},
    {"letter": "ೞ", "transliteration": "ḻa"},
    {"letter": "ಕ್ಷ", "transliteration": "kṣa"},
    {"letter": "ಜ್ಞ", "transliteration": "jña"},
]



from gtts import gTTS
for letter_data in kannada_letters:
    tts = gTTS(letter_data["letter"],lang='kn')
    tts.save(letter_data["transliteration"]+".mp3")

# tts = gTTS('ಅ',lang='kn')
# tts.save('a.mp3')