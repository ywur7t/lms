from app.extensions import ma, db
from app.models.events import Events

class EventsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Events
        load_instance = True
        sqla_session = db.session

participation_cschema = EventsSchema()
participations_cschema = EventsSchema(many=True)
