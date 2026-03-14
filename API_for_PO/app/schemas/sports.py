from app.extensions import ma, db
from app.models.sports import Sports

class SportsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Sports
        load_instance = True
        sqla_session = db.session

participation_cschema = SportsSchema()
participations_cschema = SportsSchema(many=True)
