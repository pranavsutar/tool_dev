def imbalance(df):
    imb = False; nu = 1
    s = ''
    # Check for class imbalance
    for col in df.columns:
        class_counts = df[col].value_counts()
        if class_counts.min() / class_counts.max() < 0.1 and not col in ['Date', 'Time', 'Name' ] and not df[col].dtype in ['int', 'float32', 'float', 'c']:
            # if all values are unique, then continue
            if  len(df[col].unique()) == len(df):
                continue
            print(f"{nu}) Class imbalance detected in column '{col}' with ", end= '')
            s+= f"{nu}) Class imbalance detected in column '{col}' with "
            imb = True        
            print("Class imbalance ratio:", round(class_counts.min() / class_counts.max(), 10),'\n')
            s+= "Class imbalance ratio:" + str(round(class_counts.min() / class_counts.max(), 10)) + '\n'
            nu += 1
            # ck = class_counts.to_dict()
            # # print few elements of dictionary
            # print("Class counts:", {k: ck[k] for k in list(ck)[:5]}, '... etc')

    if imb:
        print("Potential mitigation strategies:")
        print("- Use appropriate sampling techniques to balance the classes.")
        print("- Use appropriate evaluation metrics like F1 score, precision, recall, etc. as accuracy is not a good metric for imbalanced datasets.")
        print("- Use appropriate regularization techniques like class weights to combat bias.")
        s += '''Potential mitigation strategies:
        - Use appropriate sampling techniques to balance the classes.
        - Use appropriate evaluation metrics like F1 score, precision, recall, etc. as accuracy is not a good metric for imbalanced datasets.
        - Use appropriate regularization techniques like class weights to combat bias.\n'''
    else:
        print("There is no class imbalance in the dataset.")
        print("No mitigation strategies are required.")
        s += "There is no class imbalance in the dataset.\nNo mitigation strategies are required.\n"
    return s