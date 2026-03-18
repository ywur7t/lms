from app.extensions import ma, db
from app.models.countries import Countries

class CountriesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Countries
        load_instance = True
        sqla_session = db.session

country_cschema = CountriesSchema()
countries_cschema = CountriesSchema(many=True)
