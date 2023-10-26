from flask import Flask, jsonify, request
from pomodoro_session import PomodoroSession  # Importez la classe depuis le fichier séparé

app = Flask(__name__)

# Liste des sessions (méthode provisoire avant d'utiliser une base de données)
sessions = []

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/create_session', methods=['POST'])
def create_pomodoro_session():
    # Créez une nouvelle session
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided.'}), 400
    
    duration = data.get('work_duration')
    short_break = data.get('short_break_duration')
    long_break = data.get('long_break_duration')
    if not duration or not short_break or not long_break:
        #mettre des valeurs par défaut
        duration = 25
        short_break = 5
        long_break = 15

    new_session = PomodoroSession(duration, short_break, long_break)
    # Ajoutez la nouvelle session à la liste
    sessions.append(new_session)

    # Retourner un message de succès
    return jsonify({'message': 'Pomodoro session created successfully.'}), 201

if __name__ == '__main__':
    app.run()