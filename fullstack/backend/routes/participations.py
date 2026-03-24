from flask import Blueprint, jsonify, request
from sqlalchemy import func, desc
from marshmallow import ValidationError
from extensions import db
from models.athlete_participations import AthleteParticipations
from models.aggregates import get_all_participations, stats_by_athletes, stats_by_games, stats_by_medals
from schemas.aggregates import all_patricipations_schema, stats_schema
from schemas.participations import participation_cschema, participations_cschema

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