# Mood_V2

### Developer

|Zerochae|
|---|
|![ua](https://user-images.githubusercontent.com/84373490/149466662-281cf4cb-4a7c-4856-8aab-111904d645f3.jpg)|

### 개요

Classic Streaming App player

### Skill Stack

<img src="https://img.shields.io/badge/Vue-4FC08D?style=for-the badge&logo=vue.js&logoColor=FFFFFF"/> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the badge&logo=Node.js&logoColor=FFFFFF"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the badge&logo=MySQL&logoColor=FFFFFF"/>

### Architecture

![Mood Architect](https://user-images.githubusercontent.com/84373490/149466650-a2fbee5e-fc2c-4926-ab6e-ef0b2f4eccee.png)

### API

#### `Get` *https://moodserver.herokuapp.com/selectOne*

* 랜덤 Index의 데이터 1개를 받아 올 수 있습니다.

* **Example Response**
```Json
{
    "index": 5,
    "composer": "Sergei Rachmaninoff",
    "title": "Symphony No.2 I.Largo - Allegro moderato",
    "opus": "Op.27",
    "tonality": "e minor",
    "birth": "1906",
    "style": "Romantic",
    "category": "Romantic",
    "instrument": "Orchestra",
    "file": "https://imslp.org/images/6/6f/PMLP09270-uso20000304-01-rachmaninoff-symph2-mvtI_vbr.mp3",
    "img": "https://imslp.org/images/b/bc/Rachmaninov3.jpg"
}
```

`Get` *https://moodserver.herokuapp.com/selectAll*

* 전체 데이터를 받을 수 있습니다.

* **Example Response**

```JSON
[
    {
        "index": 1,
        "composer": "Frederic Chopin",
        "title": "Ballade No.4",
        "opus": "Op.52",
        "tonality": "f minor",
        "birth": "1843",
        "style": "Romantic",
        "category": "Romantic",
        "instrument": "Piano",
        "file": "https://imslp.org/images/6/62/PMLP01649-6Chopin_Ballade_4_Fmin.mp3",
        "img": "https://imslp.org/images/3/34/Chopin_Photo.jpg"
    },
    {
        "index": 2,
        "composer": "Frederic Chopin",
        "title": "Ballade No.1",
        "opus": "Op.23",
        "tonality": "g minor",
        "birth": "1836",
        "style": "Romantic",
        "category": "Romantic",
        "instrument": "Piano",
        "file": "https://imslp.org/images/c/ce/PMLP01646-Chopin_-_Ballade_No.1.mp3",
        "img": "https://imslp.org/images/3/34/Chopin_Photo.jpg"
    },
    {
        "index": 3,
        "composer": "Frederic Chopin",
        "title": "Ballade No.2",
        "opus": "Op.38",
        "tonality": "F major",
        "birth": "1839",
        "style": "Romantic",
        "category": "Romantic",
        "instrument": "Piano",
        "file": "https://imslp.org/images/e/e4/PMLP01647-Ballade_no._2_-_Op._38.mp3",
        "img": "https://imslp.org/images/3/34/Chopin_Photo.jpg"
    },
    ...
]
```

### History

[Mood_V1](https://github.com/zerochae/Mood)

