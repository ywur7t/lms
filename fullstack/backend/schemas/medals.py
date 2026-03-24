from extensions import ma, db
from models.medals import Medals

class MedalsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Medals
        load_instance = True
        sqla_session = db.session

medal_cschema = MedalsSchema()
medals_cschema = MedalsSchema(many=True)
