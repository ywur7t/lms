from ..models.type_building import TypeBuilding
from ..models.country import Country
from ..extensions import ma, db
from ..models.city import City


class TypeBuildingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TypeBuilding
        load_instance = True
        sqla_session = db.session

type_building_schema = TypeBuildingSchema()
type_buildings_schema = TypeBuildingSchema(many=True)

