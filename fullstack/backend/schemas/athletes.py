from extensions import ma, db
from models.athletes import Athletes
from schemas.countries import CountriesSchema  

class AthleteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Athletes
        load_instance = True
        sqla_session = db.session
    
    
    country = ma.Nested(CountriesSchema)

athlete_cschema = AthleteSchema()
athletes_cschema = AthleteSchema(many=True)
