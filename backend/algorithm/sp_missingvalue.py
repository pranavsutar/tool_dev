def SpecialMissingValues(df):
    # Check for special missing values
    s = ''
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
        sugg += '# check for NaN values again\n'
        sugg += 'df.isnull().sum().sum()\n'

        sugg += '# for each column, replace the NaN values with the mean of the column if the column is numeric.\n'
        sugg += 'for col in df.columns:\n'
        sugg += '    if df[col].dtype == np.float64 or df[col].dtype == np.int64:\n'
        sugg += '        df[col] = df[col].fillna(df[col].mean())\n'
        sugg += '# check for NaN values again\n'
        sugg += 'df.isnull().sum().sum()\n'

        sugg += '# for each column, replace the NaN values with the mode of the column if the column is categorical.\n'
        sugg += 'for col in df.columns:\n'
        sugg += '    if df[col].dtype == np.object:\n'
        sugg += '        df[col] = df[col].fillna(df[col].mode()[0])\n'
        sugg += '# check for NaN values again\n'
        
        s += sugg
    else:
        s += "There are no special missing values in the dataset.\n \n"

    # Check for NaN values
    sugg_2 = ''
    if df.isnull().values.any():
        s += f'''There are NaN values in the dataset.\n
    Number of NaN values: {df.isnull().sum().sum()}\n
    Percentage of NaN values: {round(df.isnull().sum().sum() / (df.shape[0] * df.shape[1]) * 100, 2)} %\n
    NaN values in each column:\n
    '''
        for col in df.columns:
            if df[col].isnull().sum():
                s += f'''{col}: {df[col].isnull().sum()}\n'''  
    # Refactoring :
        sugg_2 += '# for each column, replace the NaN values with the mean of the column if the column is numeric.\n'
        
        sugg_2 += 'for col in df.columns:\n'
        sugg_2 += '    if df[col].dtype == np.float64 or df[col].dtype == np.int64:\n'
        sugg_2 += '        df[col] = df[col].fillna(df[col].mean())\n'
        sugg_2 += '    elif df[col].dtype == np.object:\n'
        sugg_2 += '        df[col] = df[col].fillna(df[col].mode()[0])\n'
        sugg_2 += '# check for NaN values again\n'
        sugg_2 += 'df.isnull().sum().sum()\n'
        s += sugg_2

        

    else:
        s += "\nThere are no NaN values in the dataset."

    return s