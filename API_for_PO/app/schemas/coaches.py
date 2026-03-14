from app.extensions import ma, db
from app.models.coaches import Coaches

class CoachesSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Coaches
        load_instance = True
        sqla_session = db.session

participation_cschema = CoachesSchema()
participations_cschema = CoachesSchema(many=True)
