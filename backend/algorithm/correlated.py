
import pandas as pd, numpy as np, io, base64, matplotlib.pyplot as plt, seaborn as sns

# To check and visualize the correlation between the features in the dataset
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
