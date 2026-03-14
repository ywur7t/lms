from flask import Blueprint, jsonify
from sqlalchemy import func, desc
from app.schemas.aggregate import all_patricipations_schema, all_patricipation_schema
from app.models.aggregate import get_all_athlete_participations
from app.models.athlete_participations import Athlete_Participations
from app.schemas.participations import participation_cschema, participations_cschema
aggregate_bp = Blueprint("aggregate", __name__)



@aggregate_bp.route("/all/", methods=["GET"])
def all_buildings():
    results = get_all_athlete_participations()
    return (
        jsonify({"success": True, "all_buildings": participations_cschema.dump(results)}),
        200,
    )


@aggregate_bp.route("/all/<int:id>", methods=["GET"])
def all_buildings(id):
    results = Athlete_Participations.query.get(id)
    if not results:
        return jsonify(
            {
                "success": False, 
                "building": 'Building not found'
            }
        ), 404
    return (
        jsonify({"success": True, "building": participation_cschema.dump(results)}),
        200,
    )