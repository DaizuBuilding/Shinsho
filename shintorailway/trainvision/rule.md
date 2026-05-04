# トレインビジョン　プログラムルール

ID: selectsta => value は駅番号を指定（！インデックスではない！）

<[linenum]><[typenum]><[destnum]>

### linenum
０　桜台線  
１　河島線  
２　築石線  
３　中央線  
４　街道線  
５  
６  
７  
８  
９  


### informations.json


```json:informations.json
{
    "linesinfo": [
        {
            "name": 【路線名】,
            "types": [
                {
                    "type": 【種別】,
                    "destination": [【行先（配列）】]
                },
                ...
            ]
        },
        ...
    ],
    "typesinfo": {
        【路線インデックス（lineIndex）】: {
            "line": 【路線名】,
            "numbering": 【路線略称】,
            "name": 【内回り／外回り、北行／南行】,
            "direction": 【1 or -1：進行方向（ナンバリングが増える方向が +1）】,
            "destination": 【行先（桜台線は無文字）】,
            "stops": [【停車駅の駅番号（1 ~ ）】]
        },
        ...
    },
    "stationsinfo": [
        {
            "number": 【駅番号】,
            "name": 【駅名（漢字）】,
            "terminal": 【true or false：ターミナルか否か（terminalDigit）】,
            "door": 【0 or 1：ドア開閉方向（左は 0, 右は 1）】,
            "transfer": [
                【乗り換え路線（配列）：Shinto_SS, Subway_H など】
            ]
        },
        ...
    ]
}
```