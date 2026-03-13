from app.models.type_building import TypeBuilding
from app.models.country import Country
from app.extensions import ma, db
from app.models.city import City


class TypeBuildingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TypeBuilding
        load_instance = True
        sqla_session = db.session

type_building_schema = TypeBuildingSchema()
type_buildings_schema = TypeBuildingSchema(many=True)

