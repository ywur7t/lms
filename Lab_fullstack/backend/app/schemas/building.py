from ..schemas.city import CitySchema
from ..schemas.type_building import TypeBuildingSchema
from ..models.buildings import Building
from ..extensions import ma, db

class BuildingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Building
        load_instance = True
        sqla_session = db.session

    city_id = ma.auto_field()
    type_building_id = ma.auto_field()

    type_building = ma.Nested(TypeBuildingSchema())
    city = ma.Nested(CitySchema())

building_cschema = BuildingSchema()
buildings_cschema = BuildingSchema(many=True)



