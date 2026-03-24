from backend.app.extensions import db


class EventsSports(db.Model):
    __tablename__ = "events_sports"

    sport_id = db.Column(db.String(20), db.ForeignKey("sports.id"), primary_key=True)
    event_id = db.Column(db.String(20), db.ForeignKey("events.id"), primary_key=True)
    
    def __init__(self, id_sport, id_event):
            self.sport_id = id_sport
            self.event_id = id_event

    def __repr__(self):
        return f'\nid_sport: {self.sport_id}, id_event: {self.event_id}'