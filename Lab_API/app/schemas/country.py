from app.models.type_building import TypeBuilding
from app.models.country import Country
from app.extensions import ma, db
from app.models.city import City


class CountrySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Country
        load_instance = True
        sqla_session = db.session
