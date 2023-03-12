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
