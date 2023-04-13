from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd, numpy as np, io, base64, matplotlib.pyplot as plt, seaborn as sns
import matplotlib
from algorithm.sp_missingvalue import *
from algorithm.correlated import *
from algorithm.duplicate import *
from algorithm.unique_id import *
from algorithm.bin_missing import *
import json
app = Flask(__name__)
CORS(app)
df  = None
matplotlib.use('Agg')
def generate_heatmap(df):
    corr = df.corr(numeric_only=True)
    plt.imshow(corr, cmap='coolwarm', interpolation='none')
    plt.xticks(range(len(corr.columns)), corr.columns, rotation=90)
    plt.yticks(range(len(corr.columns)), corr.columns)
    plt.colorbar()
    # Save the plot to a BytesIO object
    img_bytes = io.BytesIO()
    plt.savefig(img_bytes, format='png')
    img_bytes.seek(0)
    # Encode the image data as base64 string
    img_base64 = base64.b64encode(img_bytes.read()).decode('utf-8')
    plt.close()
    return img_base64

def generate_bargraph_special_missing_values(df):
    # Check for special missing value.
    # Display a bar graph that tells the number of special missing values in each column of the dataset
    special_missing_values = ['-', 'n/a', 'N/A', 'NA', '--', '?']
    pres = {num : 0 for num in df.columns if df[num].isin(special_missing_values).sum()}
    for num in df.columns:
        if df[num].isin(special_missing_values).sum():
            pres[num] = df[num].isin(special_missing_values).sum()
    plt.bar(pres.keys(), pres.values())
    plt.xticks(rotation=90)
    # Save the plot to a BytesIO object
    img_bytes = io.BytesIO()
    plt.savefig(img_bytes, format='png')
    img_bytes.seek(0)
    # Encode the image data as base64 string
    img_base64 = base64.b64encode(img_bytes.read()).decode('utf-8')
    plt.close()
    return img_base64

def generate_bargraph_nan_values(df):
    # Check for NaN values
    # Display a bar graph that tells the number of NaN values in each column of the dataset
    pres = {num : 0 for num in df.columns if df[num].isnull().sum() >0}
    for num in df.columns:
        if df[num].isnull().sum():
            pres[num] = df[num].isnull().sum()
    plt.bar(pres.keys(), pres.values())
    plt.xticks(rotation=90)
    # Save the plot to a BytesIO object
    img_bytes = io.BytesIO()
    plt.savefig(img_bytes, format='png')
    img_bytes.seek(0)
    # Encode the image data as base64 string
    img_base64 = base64.b64encode(img_bytes.read()).decode('utf-8')
    plt.close()
    return img_base64




@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    global df 
    df = pd.read_csv(file)
    
    results = {}
    results['num_rows'] = len(df)
    results['num_cols'] = len(df.columns)
    results['column_names'] = list(df.columns)
    results['missing_values'] = SpecialMissingValues(df)
    results['heatmap'] = generate_heatmap(df)
    results['correlated'] = correlated(df)
    results['bargraph_sp_miss'] = generate_bargraph_special_missing_values(df)
    results['bargraph_nan'] = generate_bargraph_nan_values(df)
    results['duplicates'] = duplicated(df)
    results['unique_id'] = unique_id(df)
    results['bin_missing'] = bin_missing(df)

    j = jsonify(results)
    print(df)    
    return results
@app.route('/regularExp', methods=['POST'])
def regularExp():
    global df
    print(df)
    d = request.form.to_dict()
    regex = ''
    for key in d:
        regex = key
    #code.......
    return regex
if __name__ == '__main__':
    app.run(debug= True)
 
