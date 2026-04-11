from flask import Blueprint, jsonify
from sqlalchemy import func, desc
from ..schemas.aggregate import all_buildings_schema, all_stat_schema
from ..models.aggregate import get_all_buildings, get_stat_by_year, get_stat_by_country, get_stat_by_type

aggregate_bp = Blueprint("aggregate", __name__)


@aggregate_bp.route("/all/", methods=["GET"])
def all_buildings():
    results = get_all_buildings()
    return (
        jsonify({"success": True, "all_buildings": all_buildings_schema.dump(results)}),
        200,
    )

@aggregate_bp.route("/country/", methods=["GET"])
def stats_by_country():
    results = get_stat_by_country()
    return (
        jsonify({"success": True, "stats": all_stat_schema.dump(results)}),
        200,
    )

@aggregate_bp.route("/type-building/", methods=['GET'])
def stats_by_type():
    results = get_stat_by_type()
    return (
        jsonify({
            "success": True, 
            "stats":all_stat_schema.dump(results)
        }), 200
    )

@aggregate_bp.route("/year/", methods=['GET'])
def stats_by_year():
    results = get_stat_by_year()
    return (
        jsonify({
            "saccess": True,
            "stats": all_stat_schema.dump(results)
        })
    )