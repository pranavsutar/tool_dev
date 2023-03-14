# Detecting Data Smells using SniffCSV - Team 6

### Data Smells

Data smells are like code smells, but for data. They're indicators of potential problems or issues in the data that could cause errors, anomalies, or incorrect results. Examples of data smells include missing values, outliers, inconsistencies, and duplicates.

## Problem Statement
The traditional approach of data quality assurance relied on manual testing, which was a time-consuming and error-prone process. With the increasing demand for data quality, automated data quality assurance tools have gained popularity. Our goal was to design a tool that identifies data smells, which can then be fixed to improve the overall quality of data.

## Overview

Our tool is a Flask-React-based web application that scans CSV files for data smells and generates a report of the issues it finds. 
It uses a combination of statistical analysis, machine learning, and rule-based methods to identify potential problems in the data. 
It also provides suggestions for correcting the data smells detected.

## Tech Stack

**Client:** React, BootStrap

**Server:** Flask, Python


## Techniques Used

- Regular Expressions: Used for pattern matching and rule creation
- Data Mining: Used for identifying complex patterns in the data
- Data Visualization: Used for presenting detected Data Smells in a clear and concise manner

### Features

- Automatic detection of Data Smells in CSV files
- Support for a wide range of Data Smells
- User-friendly interface for easy use
- Ability to customize the detection rules
- Quick detection and report generation
- Suggesting refactored data

### Prerequisites
- Python
- Node JS 
- npm
- Git

## Installation

1. Clone the repository:
```
git clone https://github.com/pranavsutar/tool_dev.git
```

2. Set up the backend environment:

```
cd tool_dev/backend
python -m venv myenv
.\myenv\Scripts\activate   # This command will not work in VS Code Terminal, but in cmd
pip install -r requirements.txt
```


3. Install the frontend dependencies:
```
cd ../frontend
npm install
```

## Usage

1. Start the Flask server:
```
cd ../backend
python app.py
```

2. Start the React development server:
```
cd ../frontend
npm start
```

Note: Make sure you have Python, Flask, and Node.js installed on your system before following the above installation steps.

