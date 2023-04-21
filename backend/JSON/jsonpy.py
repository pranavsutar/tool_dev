# convert dict to json

d =dict()
d['name'] = 'John'
d['age'] = 30
d['married'] = True
d['children'] = ('Ann', 'Billy')
d['pets'] = None
d['data'] = {
    'Property1': 1,
    'Property2': '3',
    'Property3': 4.5,
    'Property4': False,
    'Property5': None,
    'Device': {
        'Device1': 'Device1',
        'Device2': True,
        'Device3': 3.5,
        'Device4': None
    }
}

import json


def dict_to_json(d):
    return json.dumps(d)

print(dict_to_json(d))

def excelColnoToColNo(cn:str) :
    if cn.isdigit():
        return int(cn)
    cn = cn.upper()
    for i in range(len(cn)):
        if not (ord(cn[i]) >= 65 and ord(cn[i]) <= 90):
            return -1
    if len(cn) == 1:
        # A->1
        return ord(cn) - 64
    elif len(cn) == 2:
        # AA->27
        return (ord(cn[0]) - 64) * 26 + (ord(cn[1]) - 64)
    
    elif len(cn) == 3:
        # AAA->703
        return (ord(cn[0]) - 64) * 26 * 26 + (ord(cn[1]) - 64) * 26 + (ord(cn[2]) - 64)
    else:
        ans = 0
        for i in range(len(cn)):
            ans += (ord(cn[i]) - 64) * 26 ** (len(cn) - i - 1)
        return ans
    