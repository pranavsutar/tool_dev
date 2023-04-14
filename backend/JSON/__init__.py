import os
from flask import Flask, render_template, request
from jsonschema import Draft7Validator, exceptions

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'

# Allowed file extensions
ALLOWED_EXTENSIONS = {'json'}

def allowed_file(filename):
    """Check if a file has an allowed extension."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_jsonschema(file):
    """Validate a JSON schema and return a list of errors, if any."""
    try:
        with open(file, 'r') as f:
            schema = f.read()
        schema = Draft7Validator(schema)
        errors = sorted(schema.iter_errors({}), key=lambda e: e.path)
        error_messages = []
        for error in errors:
            error_messages.append(f"Error at {','.join(str(path) for path in error.path)}: {error.message}")
        return error_messages
    except Exception as e:
        return [f"Error: {str(e)}"]

@app.route('/')
def index():
    """Render the index page."""
    return render_template('home.html')

@app.route('/upload', methods=['POST'])
def upload():
    """Upload a JSON schema file and validate it."""
    # Check if a file was submitted
    if 'file' not in request.files:
        return render_template('home.html', error_message='No file selected.')
    
    file = request.files['file']
    
    # Check if the file is allowed
    if not allowed_file(file.filename):
        return render_template('home.html', error_message='Invalid file type. Only JSON files are allowed.')
    
    # Save the file to the upload folder
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)
    
    # Validate the JSON schema and get the error messages
    error_messages = validate_jsonschema(file_path)
    
    # Render the results page
    return render_template('results.html', error_messages=error_messages)

if __name__ == '__main__':
    app.run(debug=True)
