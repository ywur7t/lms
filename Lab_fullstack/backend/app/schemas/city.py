from ..models.type_building import TypeBuilding
from ..models.country import Country
from ..extensions import ma, db
from ..models.city import City

from ..schemas.country import CountrySchema


class CitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = City
        country_id = ma.auto_field()
        country = ma.Nested(CountrySchema())


city_schema = CitySchema()
cities_schema = CitySchema(many=True)