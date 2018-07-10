import RAKE
import nltk
from nltk.corpus import words
from nltk import word_tokenize
from nltk.stem.porter import *
import string
from nltk.stem.snowball import SnowballStemmer

def extractKeywords( text ) :
    data = stem(text)
    Rake = RAKE.Rake(RAKE.SmartStopList())
    data = Rake.run(data, minCharacters = 1, maxWords = 1, minFrequency = 1)
    data = list(map(lambda x: x[0], data))
    data = list(filter(lambda x: x in words.words(), data))
    return data

def stem(text) :
    stemmer = SnowballStemmer("english", ignore_stopwords=True)
    tokens = word_tokenize(text)
    singles = [stemmer.stem(token) for token in tokens]
    data ="".join([" "+i if not i.startswith("'") and i not in string.punctuation else i for i in singles]).strip()
    return data

#print(extractKeywords("Mountains are great during the winter."))
