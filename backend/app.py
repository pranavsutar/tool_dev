# pip install numpy panda seaborn matplotlib flask flask_cors
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd, numpy as np, io, base64, matplotlib.pyplot as plt, seaborn as sns

app = Flask(__name__)
CORS(app)
   
def generate_heatmap(df):
    corr = df.corr()
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
    # If the graph is empty, return None
    if not pres:
        return None
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
    # If the graph is empty, return None
    if not pres:
        return None
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


def SpecialMissingValues(df):
    # Check for special missing values
    s = ''; s2 = ''
    special_missing_values = ['-', 'n/a', 'N/A', 'NA', '--', '?']
    pres = {val: 0 for val in special_missing_values}
    for val in special_missing_values:
        pres[val] = df.isin([val]).sum().sum()
    sugg = ''
    if any(pres.values()):
    #     print("There are special missing values in the dataset.")
    #     print("Number of special missing values:", sum(pres.values()))
    #     print("Percentage of special missing values:", round(sum(pres.values()) / (df.shape[0] * df.shape[1]) * 100, 2), "%")
    #     print("Special missing values in each column:")
    #     for col in df.columns:
    #         print(col, ":", df[col].isin(special_missing_values).sum())
    # else:
    #     print("There are no special missing values in the dataset.")
        s += f'''There are special missing values in the dataset.\n
    Number of special missing values: {sum(pres.values())}\n
    Percentage of special missing values: {round(sum(pres.values()) / (df.shape[0] * df.shape[1]) * 100, 2)} %\n
    Special missing values in each column:\n
    '''
        for col in df.columns:
            if df[col].isin(special_missing_values).sum():
                s += f'''{col}: {df[col].isin(special_missing_values).sum()}\n'''
    
    # Refactorting :
        sugg + '# for each column, replace the special missing values with NaN values.\n'
        sugg += 'for col in df.columns:\n'
        sugg += '    df[col] = df[col].replace(special_missing_values, np.nan)\n'
        # sugg += '# check for NaN values again\n'
        sugg += 'df.isnull().sum().sum()\n'

        # sugg += '# for each column, replace the NaN values with the mean of the column if the column is numeric.\n'
        sugg += 'for col in df.columns:\n'
        sugg += '    if df[col].dtype == np.float64 or df[col].dtype == np.int64:\n'
        sugg += '        df[col] = df[col].fillna(df[col].mean())\n'
        # sugg += '# check for NaN values again\n'
        sugg += 'df.isnull().sum().sum()\n'

        # sugg += '# for each column, replace the NaN values with the mode of the column if the column is categorical.\n'
        sugg += 'for col in df.columns:\n'
        sugg += '    if df[col].dtype == np.object:\n'
        sugg += '        df[col] = df[col].fillna(df[col].mode()[0])\n'
        # sugg += '# check for NaN values again\n'
        
        # s += sugg
    else:
        s += "There are no special missing values in the dataset.\n"

    # Check for NaN values
    sugg_2 = ''
    if df.isnull().values.any():
        s2 += f'''There are NaN values in the dataset.\n
    Number of NaN values: {df.isnull().sum().sum()}\n
    Percentage of NaN values: {round(df.isnull().sum().sum() / (df.shape[0] * df.shape[1]) * 100, 2)} %\n
    NaN values in each column:\n
    '''
        for col in df.columns:
            if df[col].isnull().sum():
                s2 += f'''{col}: {df[col].isnull().sum()}\n'''  
    # Refactoring :
        sugg_2 += '# for each column, replace the NaN values with the mean of the column if the column is numeric.\n'
        
        sugg_2 += 'for col in df.columns:\n'
        sugg_2 += '    if df[col].dtype == np.float64 or df[col].dtype == np.int64:\n'
        sugg_2 += '        df[col] = df[col].fillna(df[col].mean())\n'
        sugg_2 += '    elif df[col].dtype == np.object:\n'
        sugg_2 += '        df[col] = df[col].fillna(df[col].mode()[0])\n'
        sugg_2 += '# check for NaN values again\n'
        sugg_2 += 'df.isnull().sum().sum()\n'
        # s += sugg_2

        

    else:
        s2 += "\nThere are no NaN values in the dataset."

    return s,s2,sugg,sugg_2

def correlated(df):
    # Compute the correlation matrix
    corr_matrix = df.corr() 
    instr = []

    # Identify highly correlated features
    high_corr_features = set()
    for i in range(len(corr_matrix.columns)):
        for j in range(i):
            if abs(corr_matrix.iloc[i, j]) > 0.7: # Change the threshold value as needed
                colname = corr_matrix.columns[i]
                high_corr_features.add(colname)
    # Highest cvalue of correlation on non-diagonal elements
    max_corr = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(np.bool)).stack().max()
    print("Maximum correlation value among any two values:", max_corr)
    # instr += "Maximum correlation value among any two values: " + str(max_corr) + "\n"
    instr.append("Maximum correlation value among any two distinct values: " + str(max_corr) + "\n")

    # print giving info
    if len(high_corr_features) > 0:
        print("There are highly correlated features in the dataset.")
        print("Number of highly correlated features:", len(high_corr_features))
        print("Highly correlated features:", high_corr_features)
        # instr += "There are highly correlated features in the dataset.\n"
        # instr += "Number of highly correlated features: " + str(len(high_corr_features)) + "\n"
        # instr += "Highly correlated features: " + str(high_corr_features) + "\n"
        instr.extend(["There are highly correlated features in the dataset.\n", "Number of highly correlated features: " + str(len(high_corr_features)) + "\n", "Highly correlated features: " + str(high_corr_features) + "\n"])

        

        
    else:
        print("There are no highly correlated features in the dataset.")
        # instr += "There are no highly correlated features in the dataset.\n"
        instr.append("There are no highly correlated features in the dataset.\n")

    return instr

def duplicated(df):
    duplicates = df.duplicated()
    instr = ''
    if any(duplicates):
        # print("Duplicate examples are present in the dataset.")
        # print("Number of duplicate examples:", duplicates.sum())
        # print("Indices of duplicate examples:", df.index[duplicates].tolist())
        instr += "Duplicate examples are present in the dataset.\n"
        instr += "Number of duplicate examples: " + str(duplicates.sum()) + "\n"
        instr += "Indices of duplicate examples: " + str(df.index[duplicates].tolist()) + "\n"

    else:
        # print("There are no duplicate examples in the dataset.")
        instr += "There are no duplicate examples in the dataset.\n"

    return instr


@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    df = pd.read_csv(file)
    results = {}
    results['num_rows'] = len(df)
    results['num_cols'] = len(df.columns)
    results['column_names'] = list(df.columns)
    spd = SpecialMissingValues(df)
    results['missing_values'] = {'Info': spd[0], 'InfoNan': spd[1], 'Code': spd[2], 'Code_Nan':spd[3]}
    results['heatmap'] = generate_heatmap(df)
    results['correlated'] = correlated(df)
    results['bargraph_sp_miss'] = generate_bargraph_special_missing_values(df)
    results['bargraph_nan'] = generate_bargraph_nan_values(df)
    results['duplicates'] = duplicated(df)
    j = jsonify(results)
    print(j)    
    return j

if __name__ == '__main__':
    app.run(debug= True)
 