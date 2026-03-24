from extensions import ma, db
from models.sports import Sports

class SportsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Sports
        load_instance = True
        sqla_session = db.session

sport_cschema = SportsSchema()
sports_cschema = SportsSchema(many=True)
