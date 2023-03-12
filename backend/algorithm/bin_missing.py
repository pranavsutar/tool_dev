def bin_missing(df):
    bin_miss = False
    instr = ''
    # Iterate over each column
    for col in df.columns:
        # Check if there are any missing values in the column
        if df[col].isnull().sum() > 0:
            # Check if the missing values are binary
            if df[col].nunique() == 2:
                # Check if there is an implicit meaning to the missing values
                non_missing_values = df[col].dropna().unique()
                if len(non_missing_values) == 1:
                    # print(f"{col} contains binary missing values with an implicit meaning of {non_missing_values[0]}")
                    instr += f"{col} contains binary missing values with an implicit meaning of {non_missing_values[0]}\n"
                    bin_miss = True

    if not bin_miss:
        # print("There are no binary missing values with an implicit meaning in the dataset.")
        instr += "There are no binary missing values with an implicit meaning in the dataset.\n"
    
    return instr