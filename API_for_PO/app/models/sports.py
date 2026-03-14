from app.extensions import db


class Sports(db.Model):
    __tablename__ = 'sports'
    
    id = db.Column('id', db.String(20), primary_key=True)    
    sport = db.Column('sport', db.String(100))

    events = db.relationship(
        "Events",
        secondary="events_sports",
        back_populates="sports"
    )

    def __init__(self, id, sport):
        self.id = id
        self.sport = sport
    
    def __repr__(self):
        return f'\nid: {self.id}, Спорт: {self.sport}'
