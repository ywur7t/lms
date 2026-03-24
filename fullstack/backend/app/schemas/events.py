from backend.app.extensions import ma, db
from backend.app.models.events import Events

class EventsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Events
        load_instance = True
        sqla_session = db.session

event_cschema = EventsSchema()
events_cschema = EventsSchema(many=True)
