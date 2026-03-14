from app.extensions import ma, db
from app.models.athletes import Athletes

class AthleteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Athletes
        load_instance = True
        sqla_session = db.session

participation_cschema = AthleteSchema()
participations_cschema = AthleteSchema(many=True)
