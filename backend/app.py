# pip install numpy panda seaborn matplotlib flask flask_cors
from algorithm.sp_missingvalues import *
from algorithm.correlated import *
from algorithm.outliers import *
from algorithm.duplicates import *

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
    df = pd.read_csv(file)
    results = {}
    results['num_rows'] = len(df)
    results['num_cols'] = len(df.columns)
    results['column_names'] = list(df.columns)
    spd = SpecialMissingValues(df)
    results['sp_missing_values'] = {'Info': spd[0], 'InfoNan': spd[1], 'Code': spd[2], 'Code_Nan':spd[3]}
    spd = missing_values(df)
    results['missing_values'] = {'Info': spd[0],  'Code': spd[1]}
    results['heatmap'] = generate_heatmap(df)
    results['correlated'] = correlated(df)
    results['bargraph_miss'] = generate_bargraph_missing_values(df)
    results['bargraph_sp_miss'] = generate_bargraph_special_missing_values(df)
    results['bargraph_nan'] = generate_bargraph_nan_values(df)
    results['duplicates'] = duplicated(df)
    outl = Outliers(df)
    results['outliers'] = {'Info': outl[0], 'Suggestion': outl[1], 'Code': outl[2], 'plot': generate_boxplot(df)}
    j = jsonify(results)
    # print(j)    
    return j

if __name__ == '__main__':
    app.run(debug= True)
 