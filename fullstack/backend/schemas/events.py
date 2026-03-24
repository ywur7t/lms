from extensions import ma, db
from models.events import Events

class EventsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Events
        load_instance = True
        sqla_session = db.session

event_cschema = EventsSchema()
events_cschema = EventsSchema(many=True)
