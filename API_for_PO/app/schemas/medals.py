from app.extensions import ma, db
from app.models.medals import Medals

class MedalsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Medals
        load_instance = True
        sqla_session = db.session

participation_cschema = MedalsSchema()
participations_cschema = MedalsSchema(many=True)
