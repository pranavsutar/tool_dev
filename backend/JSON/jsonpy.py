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
