from flask import Blueprint, jsonify, request
from app.models.buildings import Building
from app.extensions import db, auth
from app.schemas.building import buildings_cschema, building_cschema
from marshmallow import ValidationError

building_bp = Blueprint("building", __name__)


@building_bp.route("/", methods=["GET"])
@auth.login_required
def get_buildings():
    buildings = Building.query.all()
    return jsonify({"success": True, "buildings": buildings_cschema.dump(buildings)}), 200


@building_bp.route("/<int:id>", methods=["GET"])
def get_one_building(id):
    building = Building.query.get(id)
    if not building:
        return jsonify(
            {
                "success": False, 
                "building": 'Building not found'
            }
        ), 404
    return jsonify(
        {
            "success": True, 
            "building": building_cschema.dump(building)
        }
    ), 200


@building_bp.route('/', methods=['POST'])
@auth.login_required
def create_building():
    try:
        data = request.get_json()
        validated_data = building_cschema.load(data, session=db.session)

        building = Building(
            title=validated_data['title'],
            type_building_id=validated_data['type_building_id'],
            city_id=validated_data['city_id'],
            year=validated_data['year'],
            height=validated_data['height']
        )
        db.session.add(building)
        db.session.commit()

        return jsonify({
            "success": True,
            "building": building_cschema.dump(building)
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







@building_bp.route("/<int:id>", methods=["PUT"])
@auth.login_required
def update_one_building(id):
    try:
        building = Building.query.get(id)
        if not building:
            return jsonify({"success": False, "error": "Building not found"}), 404
        
        data = request.get_json()
        validated_data = building_cschema.load(data, session=db.session)


        if 'title' in validated_data:
            building.title = validated_data['title']
        if 'type_building_id' in validated_data:
            building.type_building_id = validated_data['type_building_id']
        if 'city_id' in validated_data:
            building.city_id = validated_data['city_id']
        if 'year' in validated_data:
            building.year = validated_data['year']
        if 'height' in validated_data:
            building.height = validated_data['height']

        db.session.commit()

        return jsonify({
            "success": True,
            "building": building_cschema.dump(building)
        }), 200
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
    
@building_bp.route('/<int:id>', methods=['DELETE'])
@auth.login_required
def delete_building(id):
    try:
        building = Building.query.get(id)
        if not building:
            return jsonify({"success": False, "error": "Building not found"}), 404
        
        db.session.delete(building)
        db.session.commit()
        
        return jsonify({
            "success": True,
            "message": f"Building with id {id} has been deleted"
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

