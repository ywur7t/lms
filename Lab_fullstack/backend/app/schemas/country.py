from ..models.type_building import TypeBuilding
from ..models.country import Country
from ..extensions import ma, db
from ..models.city import City


class CountrySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Country
        load_instance = True
        sqla_session = db.session
