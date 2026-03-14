from app.extensions import db


class Events(db.Model):
    __tablename__ = 'events'
    
    id = db.Column('id', db.String(20), primary_key=True)
    event = db.Column('event', db.String(100))
    team_or_individual = db.Column('team_or_individual', db.String(20))

    athlete_participation = db.relationship('Athlete_Participations', back_populates='event')
    sports = db.relationship(
        "Sports",
        secondary="events_sports",
        back_populates="events"
    )

    
    def __init__(self, id, event, team_or_individual):
        self.id = id
        self.event = event
        self.team_or_individual = team_or_individual
    
    def __repr__(self):
        return f'\nid: {self.id}, Событие: {self.event}, team_or_individual: {self.team_or_individual}'
