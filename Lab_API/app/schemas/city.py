from app.models.type_building import TypeBuilding
from app.models.country import Country
from app.extensions import ma, db
from app.models.city import City

from app.schemas.country import CountrySchema


class CitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = City
        country_id = ma.auto_field()
        country = ma.Nested(CountrySchema())


city_schema = CitySchema()
cities_schema = CitySchema(many=True)