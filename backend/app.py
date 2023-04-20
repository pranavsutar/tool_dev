# pip install numpy panda seaborn matplotlib flask flask_cors
from algorithm.sp_missingvalues import *
from algorithm.correlated import *
from algorithm.outliers import *
from algorithm.duplicates import *
from algorithm.imbalance import *
from algorithm.stringsmells import *
import json

df = None

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd, numpy as np, io, base64, matplotlib.pyplot as plt, seaborn as sns

# Initialize the Flask application
app = Flask(__name__)
CORS(app)



# route http posts to this method
@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    global df
    df = pd.read_csv(file)
    results = {}
    results['num_rows'] = len(df)
    results['num_cols'] = len(df.columns)
    results['column_names'] = list(df.columns)
    spd = SpecialMissingValues(df)
    results['sp_missing_values'] = {'Info': spd[0], 'InfoNan': spd[1], 'Code': spd[2], 'Code_Nan':spd[3],'splmissCols':spd[4],'missingPer':spd[5]}
    spd = missing_values(df)
    results['missing_values'] = {'Info': spd[0],  'Code': spd[1],'missCols':spd[2], 'missPer':spd[3]}
    results['heatmap'] = generate_heatmap(df)
    results['correlated'] = correlated(df)
    results['bargraph_miss'] = generate_bargraph_missing_values(df)
    results['bargraph_sp_miss'] = generate_bargraph_special_missing_values(df)
    results['bargraph_nan'] = generate_bargraph_nan_values(df)
    results['duplicates'] = duplicated(df)
    bnc = binning_cat(df)
    results['binning_cat'] = {'Info': bnc[0],  'Code': bnc[1], 'binCols': bnc[2], 'unqVals':bnc[3], 'plot': generate_bargraph_binning_cat(df)}
    imb = class_imbal(df)
    results['imbalance'] = {'Info': imb[0] + imb[1], 'imbCols': imb[2], 'imbRatio':imb[3],  'plot': generate_bargraph_class_imbal(df)}
    # Trailng Spaces, Special Characters, Human Friendly
    spcr = detect_special_characters(df)
    results['sp_char'] = {'Info': spcr[0], 'Code': spcr[1], 'plot': generate_bargraph_special_characters(df)}
    trsp = trailing_spaces(df)
    results['tr_spaces'] = {'Info': trsp[0], 'Code': trsp[1], 'plot': generate_bargraph_trailing_spaces(df)}
    humf = human_friendly(df)
    results['hum_friendly'] = {'Info': humf[0], 'Code': humf[1], 'plot': generate_bargraph_human_friendly(df)}
    outl = Outliers(df)
    results['outliers'] = {'Info': outl[0], 'Suggestion': outl[1], 'Code': outl[2], 'plot': generate_boxplot(df)}
    j = jsonify(results)
    # print(j)    
    return j

@app.route('/regularExp', methods=['POST'])
def regularExp():
    global df
    #print(df)
    count = 10
    regex = request.json['regex']
    colNo = request.json['colNo']
    #string to regex string
    #filtered_df = df[int(colNo)].str.match[(regex)]
    #print(filtered_df)
    # matches = df[col].astype(str).str.match(pattern)
    matches  = df[df.columns[int(colNo)]].astype(str).str.match(regex)
    # print lentgh of matches
    #count where matches is true
    count = len(matches[matches == True].index)
    print(count, len(matches))
    
    #print(matches)
    print(regex)
    print(colNo)
    
    #code.......
    return jsonify({'count': count})
if __name__ == '__main__':
    app.run(debug= True)





'''
# define the regular expression to match
regex_pattern = r'^[a-z]{3}\d{2}$'

col_name = 'Custom Name'
# # filter the DataFrame using the regular expression
filtered_df = df[col_name].str.match(regex_pattern)]

# for col in filtered_df.columns:
#     filtered_df = filtered_df[filtered_df[col].str.match(regex_pattern)]


# print the filtered DataFrame
print(filtered_df)


# print the filtered DataFrame
print(filtered_df)


'''