def unique_id(df):
    # Identify unique identifier columns
    uid_cols = []
    instr = ''
    for col in df.columns:
        if len(df[col].unique()) == len(df):
            uid_cols.append(col)

    # Print info
    if len(uid_cols) > 0:
        # print("There are unique identifier columns in the dataset.")
        # print("Number of unique identifier columns:", len(uid_cols))
        # print("Unique identifier columns:", uid_cols)
        instr += "There are unique identifier columns in the dataset.\n"
        instr += "Number of unique identifier columns: " + str(len(uid_cols)) + "\n"
        instr += "Unique identifier columns: " + str(uid_cols) + "\n"
    else:
        # print("There are no unique identifier columns in the dataset.")
        instr += "There are no unique identifier columns in the dataset.\n"
    
    return instr