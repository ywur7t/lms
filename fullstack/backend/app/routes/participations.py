from flask import Blueprint, jsonify, request
from sqlalchemy import func, desc
from backend.app.models.aggregates import get_all_participations, stats_by_athletes, stats_by_games, stats_by_medals
from backend.app.extensions import db
from backend.app.schemas.participations import participation_cschema
from marshmallow import ValidationError
from backend.app.models.athlete_participations import AthleteParticipations
from backend.app.schemas.aggregates import all_patricipations_schema, stats_schema
from backend.app.schemas.participations import participation_cschema, participations_cschema
from sqlalchemy import text

participations_bp = Blueprint("participations", __name__)


@participations_bp.route('/', methods=['GET'])
def get_participations():
    data = get_all_participations()

    return (
        jsonify({"success": True, "participations": all_patricipations_schema.dump(data)}),
        200,
    )

@participations_bp.route('/<int:id>', methods=['GET'])
def get_participation(id):
    data = AthleteParticipations.query.get(id)
    if not data:
        return jsonify(
            {
                "success": False, 
                "participation": 'not found'
            }
        ), 404
    return jsonify(
        {
            "success": True, 
            "participation": participation_cschema.dump(data)
        }
    ), 200




@participations_bp.route('/', methods=['POST'])
def create_participation():
    try:
        
        data = request.get_json()    
        validated_data = participation_cschema.load(data, session=db.session)

        db.session.add(validated_data)
        db.session.commit()

        return jsonify({
            "success": True,
            "participation": participation_cschema.dump(validated_data)
        }), 201
    
    except ValidationError as err:
        db.session.rollback()
        return jsonify({
        "success": False,
        "errors": err.messages
        }), 400

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@participations_bp.route('/<int:id>', methods=['PUT'])
def update_participation(id):
    try:
        participation = AthleteParticipations.query.get(id)
        if not participation:
            return jsonify({"success": False, "error": "Building not found"}), 404

        data = request.get_json()
        validated_data = participation_cschema.load(data, session=db.session)

        updated = participation_cschema.load(
            data,
            instance=participation,
            partial=True
        )
        # if 'games_id' in validated_data:
        #     data.games_id = validated_data['games_id']
        # if 'athlete_id' in validated_data:
        #     data.athlete_id = validated_data['athlete_id']
        # if 'city_id' in validated_data:
        #     data.city_id = validated_data['city_id']
        # if 'event_id' in validated_data:
        #     data.event_id = validated_data['event_id']
        # if 'coach_id' in validated_data:
        #     data.coach_id = validated_data['coach_id']
        # if 'medal_id' in validated_data:
        #     data.medal_id = validated_data['medal_id']
        # if 'result_value' in validated_data:
        #     data.result_value = validated_data['result_value']
        # if 'result_unit' in validated_data:
        #     data.result_unit = validated_data['result_unit']
        # if 'is_record_holder' in validated_data:
        #     data.is_record_holder = validated_data['is_record_holder']
        # if 'notes' in validated_data:
        #     data.notes = validated_data['notes']

        db.session.commit()

        return jsonify({
            "success": True,
            "data": participation_cschema.dump(updated)
        })
    
    except ValidationError as err:
        db.session.rollback()
        return jsonify({
        "success": False,
        "errors": err.messages
        }), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@participations_bp.route('/<int:id>', methods=['DELETE'])
def delete_participation(id):
    try:
        participation = AthleteParticipations.query.get(id)
        if not participation:
                return jsonify({"success": False, "error": "not found"}), 404

        db.session.delete(participation)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Deleted"
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
    
    
@participations_bp.route('/stats/games')
def get_stats_games():
    data = stats_by_games()
    return jsonify(stats_schema.dump(data, many=True))


@participations_bp.route('/stats/athletes')
def get_stats_athletes():
    data = stats_by_athletes()
    return jsonify(stats_schema.dump(data, many=True))


@participations_bp.route('/stats/medals')
def get_stats_medals():
    data = stats_by_medals()
    return jsonify(stats_schema.dump(data, many=True))








quiz_bp = Blueprint('quiz', __name__, url_prefix='/api/v1')

@quiz_bp.route('/quizzes', methods=['GET'])
def get_quizzes():
    quizzes = db.session.execute(text("""SELECT * FROM quizzes ORDER BY id""")).mappings().all()

    result = []

    for q in quizzes:
        quiz_data = {
            "id": q["id"],
            "type": q["type"],
            "title": q["title"]
        }

        # MATCHING
        if q["type"] == "M":
            tasks = db.session.execute(text("""
                SELECT question, answer
                FROM matching_tasks
                WHERE quiz_id = :id
                ORDER BY sort_order
            """), {"id": q["id"]}).mappings().all()

            quiz_data["tasks"] = [dict(t) for t in tasks]

        # SORTING
        elif q["type"] == "S":
            options = db.session.execute(text("""
                SELECT option_text
                FROM sorting_options
                WHERE quiz_id = :id
                ORDER BY sort_order
            """), {"id": q["id"]}).scalars().all()

            correct = db.session.execute(text("""
                SELECT answer_value
                FROM correct_answers
                WHERE quiz_id = :id
                ORDER BY answer_order
            """), {"id": q["id"]}).scalars().all()

            quiz_data["options"] = options
            quiz_data["correct"] = correct
            

        # ONE / MULTI
        elif q["type"] in ["ONE", "MULTI"]:
            options = db.session.execute(text("""
                SELECT option_text, is_correct
                FROM choice_options
                WHERE quiz_id = :id
                ORDER BY sort_order
            """), {"id": q["id"]}).mappings().all()

            quiz_data["options"] = [o["option_text"] for o in options]

            if q["type"] == "ONE":
                quiz_data["correct"] = next(
                    o["option_text"] for o in options if o["is_correct"]
                )
            else:
                quiz_data["correct"] = [
                    o["option_text"] for o in options if o["is_correct"]
                ]

        result.append(quiz_data)

    return jsonify({"quiz": result})



@participations_bp.route('/raw', methods=['GET'])
def get_raw():
    data = AthleteParticipations.query.all()
    return jsonify({
        "participations": participations_cschema.dump(data)
    })