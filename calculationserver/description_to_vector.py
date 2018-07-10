import urllib.request
import random
import json
import nltk
import math
from Keywords import extractKeywords
from nltk.corpus import wordnet
from nltk.metrics.distance import edit_distance

base = 'mountain snow ski beach sun sea museum culture architecture nature beauty wonder adventure exotic wild waterfall river splash water sports waves temple religion faith'
base = base.split(' ')

def get_synset(w):
    try:
        w = w.lower()
        synsets = wordnet.synsets(w)
        synsets = list(map(lambda x: (x.name().split('.')[0].lower(), int(x.name().split('.')[-1]), x), synsets))
        synsets = list(map(lambda x: (edit_distance(w, x[0]), x[1], x[2]), synsets))
        best = synsets[0]
        for s in synsets:
            if best[0] > s[0]:
                best = s
            elif best[0] == s[0] and best[1] > s[1]:
                best = s
        return best[2]
    except:
        return False

def mean(v):
    s = 0
    n = 0
    for x in v:
        s = s + x
        n = n + 1
    return s / n

def normalizeVector(v):
    s = 0
    for n in v:
        s = s + n * n
    s = math.sqrt(s)
    return list(map(lambda x: x / s, v))

def similarity(w1, w2):
    w1 = get_synset(w1)
    w2 = get_synset(w2)
    if not (w1 and w2):
        return 0.5
    res =  w1.wup_similarity(w2)
    if not res:
        res = 0.5
    return res

def convert_to_vector(key_words):
    if not key_words:
        return normalizeVector(list(map(lambda x: 1, base)))
    res = list(map(lambda x: 0, base))

    for wd in key_words:
        index = 0
        for wb in base:
            res[index] = res[index] + similarity(wb, wd)
            index = index + 1

    return normalizeVector(res)

def scalar_product(v1, v2):
    res = 0
    for i in range(len(v1)):
        res = res + v1[i] * v2[i]
    return res


def to_vector(description):
    description = extractKeywords(description)
    description = convert_to_vector(description)
    res = json.dumps(description);
    return res
