from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

tasks = []

@app.route('/')
def index():
    return send_from_directory('', 'index.html')

@app.route('/styles.css')
def css():
    return send_from_directory('', 'styles.css')

@app.route('/script.js')
def js():
    return send_from_directory('', 'script.js')

@app.route('/tasks', methods=['GET', 'POST'])
def manage_tasks():
    if request.method == 'POST':
        data = request.get_json()
        task = data.get('task')
        if task:
            tasks.append(task)
        return jsonify({'status': 'success'})

    elif request.method == 'GET':
        return jsonify(tasks)

if __name__ == '__main__':
    app.run(debug=True)
