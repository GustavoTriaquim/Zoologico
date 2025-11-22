from flask import Flask, jsonify, request
from flask_cors import CORS
from data import animais, animal_id_counter, cuidados, cuidados_id_counter
import unicodedata

app = Flask(__name__)
CORS(app)

# VALIDACAO
def validate_animal_data(data, is_update=False):
    required_fields = ["nome", "dataNascimento", "especie", "habitat", "paisOrigem"]

    for field in required_fields:
        if field not in data or not data[field]:
            if not is_update or field in data:
                return False, f"O campo '{field}' é obrigatório."
    
    if 'dataNascimento' in data:
        try:
            import datetime
            datetime.date.fromisoformat(data['dataNascimento'])
        except ValueError:
            return False, "O campo 'dataNascimento' deve estar no formato YYYY-MM-DD."
    
    if 'nome' in data and not isinstance(data['nome'], str):
        return False, "O campo 'nome' deve ser um texto."

    return True, None

def validate_care_data(data, is_update=False):
    required_fields = ["nomeCuidado", "frequencia"]

    for field in required_fields:
        if field not in data or not data[field]:
            if not is_update or field in data:
                return False, f"O campo '{field}' é obrigatório."

    allowed_frequencies = ["Diária", "Semanal", "Quinzenal", "Mensal", "Trimestral", "Semestral", "Anual"]
    if 'frequencia' in data and data['frequencia'] not in allowed_frequencies:
        return False, f"O campo 'frequencia' deve ser um dos seguintes: {', '.join(allowed_frequencies)}."

    return True, None

def normalize_string(text):
    if not isinstance(text, str):
        return text
    
    text = unicodedata.normalize('NFD', text).encode('ascii', 'ignore').decode("utf-8")
    return text.lower()

# ENDPOINTS ANIMAIS
@app.route('/api/animais', methods=['GET'])
def get_animals():
    habitat_filter = request.args.get('habitat')
    especie_filter = request.args.get('especie')
    pais_origem_filter = request.args.get('paisOrigem')
    data_nascimento_filter = request.args.get('dataNascimento')

    filtered_animals = animais

    if habitat_filter:
        filter_lower = habitat_filter.lower()
        filtered_animals = [a for a in filtered_animals if filter_lower in a.get('habitat', '').lower()]
    
    if especie_filter: 
        filter_lower = especie_filter.lower()
        filtered_animals = [a for a in filtered_animals if filter_lower in a.get('especie', '').lower()]
    
    if pais_origem_filter:
        filter_lower = pais_origem_filter.lower()
        filtered_animals = [a for a in filtered_animals if filter_lower in a.get('paisOrigem', '').lower()]
    
    if data_nascimento_filter:
        filter_lower = data_nascimento_filter.lower()

        def check_date_match(animal, filter_text):
            date_str_iso = animal.get('dataNascimento', '')
            if not date_str_iso:
                return False
            
            if filter_text in date_str_iso.lower():
                return True
            
            try:
                date_obj = datetime.date.fromisoformat(date_str_iso)
                date_str_br = date_obj.strftime('%d/%m/%y')

                if filter_text in date_str_br:
                    return True
            
            except ValueError:
                return False
            
            return False
        
        filtered_animals = [a for a in filtered_animals if check_date_match(a, filter_lower)]
    
    return jsonify(filtered_animals)

@app.route('/api/animais', methods=['POST'])
def create_animal():
    global animal_id_counter
    new_animal = request.json

    is_valid, error_message = validate_animal_data(new_animal)
    if not is_valid:
        return jsonify({"error": error_message}), 400

    new_animal['id'] = animal_id_counter
    animal_id_counter += 1
    animais.append(new_animal)
    return jsonify(new_animal), 201

@app.route('/api/animais/<int:animal_id>', methods=['PUT'])
def update_animal(animal_id):
    update_data = request.json
    animal = next((a for a in animais if a['id'] == animal_id), None)

    if animal:
        is_valid, error_message = validate_animal_data(update_data, is_update=True)
        if not is_valid:
            return jsonify({"error": error_message}), 400
        
        animal.update(update_data)
        return jsonify(animal)
    return jsonify({"error": "Animal não encontrado"}), 404

@app.route('/api/animais/<int:animal_id>', methods=['DELETE'])
def delete_animal(animal_id):
    global animais
    initial_len = len(animais)
    animais = [a for a in animais if a['id'] != animal_id]

    if len(animais) < initial_len:
        return jsonify({"message": "Animal deletado com sucesso"}), 200
    return jsonify({"error": "Animal não encontrado"}), 404

# ENDPOINTS CUIDADOS
@app.route('/api/cuidados', methods=['GET'])
def get_cares():
    return jsonify(cuidados)

@app.route('/api/cuidados', methods=['POST'])
def create_care():
    global cuidados_id_counter
    new_care = request.json

    is_valid, error_message = validate_care_data(new_care)
    if not is_valid:
        return jsonify({"error": error_message}), 400
    
    new_care['id'] = cuidados_id_counter
    cuidados_id_counter += 1
    cuidados.append(new_care)
    return jsonify(new_care), 201

@app.route('/api/cuidados/<int:care_id>', methods=['PUT'])
def update_care(care_id):
    update_data = request.json
    care = next((c for c in cuidados if c['id'] == care_id), None)

    if care:
        is_valid, error_message = validate_care_data(update_data, is_update=True)
        if not is_valid:
            return jsonify({"error": error_message}), 400
        
        care.update(update_data)
        return jsonify(care)
    return jsonify({"error": "Cuidados não encontrado"}), 404

@app.route('/api/cuidados/<int:care_id>', methods=['DELETE'])
def delete_care(care_id):
    global cuidados
    initial_len = len(cuidados)
    cuidados = [c for c in cuidados if c ['id'] != care_id]

    if len(cuidados) < initial_len:
        return jsonify({"message": "Cuidado deletado com sucesso"}), 200
    return jsonify({"error": "Cuidado não encontrado"}), 404

if __name__ == '__main__':
    import datetime
    app.run(debug=True, port=5000)